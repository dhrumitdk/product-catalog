import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "../styles/Product.css";

function Product() {
  const [productData, setProductData] = useState([]);
  const [smShow, setSmShow] = useState(false);

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://product-catalog-backend.herokuapp.com/api/product"
      );
      setProductData(response.data);
      return response;
    }

    fetchData();
  }, []); // gets executed only once

  const addToCart = (id) => {
    axios.post(
      `https://product-catalog-backend.herokuapp.com/api/add-to-cart/${id}`
    );
    setSmShow(true);
  };

  return (
    <div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Added to cart!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Selected item has been added to cart.</Modal.Body>
      </Modal>
      <div className="Product-body">
        {productData.map(
          ({
            _id,
            productName,
            productImageUrl,
            productDescription,
            productPrice,
          }) => (
            <div>
              <Card className="Product-card">
                <Card.Img variant="top" src={productImageUrl} />
                <Card.Body>
                  <Card.Title>{productName}</Card.Title>
                  <Card.Text>{productDescription}</Card.Text>
                </Card.Body>
                <Card.Body className="Product-footer">
                  <strong className="Price"> Rs. {productPrice} </strong>
                  <Button
                    onClick={() => addToCart(_id)}
                    variant="primary"
                    type="submit"
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Product;
