import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Col } from "react-bootstrap";
import "../styles/AddProducts.css";
import { Plus } from "react-feather";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import S3FileUpload from "react-s3";

// validation function for formik
const validate = (values) => {
  let errors = {};

  if (!values.productName) {
    errors.productName = "This field cannot be empty";
  }

  if (!values.productQuantity) {
    errors.productQuantity = "This field cannot be empty";
  }

  if (!values.productPrice) {
    errors.productPrice = "This field cannot be empty";
  }

  return errors;
};

function AddProducts() {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");

  const S3Config = {
    bucketName: "productcatalog-app",
    region: "ap-south-1",
    accessKeyId: "AKIA5UWWZWS5GG47XW2Q",
    secretAccessKey: "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",
  };

  const uploadImage = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], S3Config)
      .then((data) => {
        setImageUrl(data.location);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      productName: "",
      productImageUrl: "",
      productDescription: "",
      productQuantity: "",
      productPrice: "",
      addedToCart: false,
    },
    validate,
    onSubmit: (values) => {
      Object.assign(values, { productImageUrl: imageUrl });
      axios
        .post(
          "https://product-catalog-backend.herokuapp.com/api/add-product",
          values
        )
        .then((res) => {
          history.push("/");
        });
    },
  });

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="Form-div">
        <Col sm={8}>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name*</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productName}
              />
              {/* displays validations */}
              {formik.touched.productName && formik.errors.productName ? (
                <div className="Error-div"> {formik.errors.productName} </div>
              ) : null}
            </Form.Group>

            <Form.Group controlId="productImageUrl">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="productImageUrl"
                onChange={uploadImage}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                name="productDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productDescription}
              />
            </Form.Group>

            <Form.Group controlId="productQuantity">
              <Form.Label>Quantity*</Form.Label>
              <Form.Control
                type="number"
                name="productQuantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productQuantity}
              />
              {/* displays validations */}
              {formik.touched.productQuantity &&
              formik.errors.productQuantity ? (
                <div className="Error-div">{formik.errors.productQuantity}</div>
              ) : null}
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Unit Price*</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productPrice}
              />
              {/* displays validations */}
              {formik.touched.productPrice && formik.errors.productPrice ? (
                <div className="Error-div">{formik.errors.productPrice}</div>
              ) : null}
            </Form.Group>
            <div className="Footer">
              <Button
                className="Add-product-btn"
                variant="primary"
                type="submit"
              >
                <Plus size={18} /> &nbsp; Add Product
              </Button>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Link to="/"> Cancel </Link>
            </div>
          </form>
        </Col>
      </div>
      <Footer />
    </div>
  );
}

export default AddProducts;
