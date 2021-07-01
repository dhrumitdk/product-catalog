import React from "react";
import "../styles/Cart.css";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";

function CartList() {
  return (
    <div>
      <Header />
      <div className="Cart-list-title">
        <strong> Your cart: </strong>
      </div>
      <Cart />
      <Footer />
    </div>
  );
}

export default CartList;
