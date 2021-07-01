import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "../styles/Cart.css";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [changeQuantity, setChangeQuantity] = useState();
  const [smShow, setSmShow] = useState(false);

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://product-catalog-backend.herokuapp.com/api/view-cart"
      );
      setCartData(response.data);
      return response;
    }

    fetchData();
  }, []); // gets executed only once

  const updateCart = (id) => {
    const values = { productQuantity: changeQuantity };
    axios.post(
      `https://product-catalog-backend.herokuapp.com/api/update-cart/${id}`,
      values
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
            Cart updated!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Selected item quantity has been updated to cart.
        </Modal.Body>
      </Modal>
      {cartData.map(
        ({
          _id,
          productName,
          productImageUrl,
          productDescription,
          productQuantity,
          productPrice,
        }) => (
          <div className="Cart-body">
            <img className="Cart-image" src={productImageUrl} alt="" />
            <div className="Cart-item">
              <Card.Title> {productName} </Card.Title>
              <p>{productDescription}</p>
              <input
                className="Cart-quantity"
                type="number"
                defaultValue={productQuantity}
                onChange={(e) => setChangeQuantity(e.target.value)}
              />
              <br /> <br />
              <strong className="Cart-price">Rs. {productPrice}</strong>
              <br /> <br />
              <Button onClick={() => updateCart(_id)}> Update Quantity </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Cart;
