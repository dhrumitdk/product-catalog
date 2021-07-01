import React from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { Plus } from "react-feather";
import "../styles/ProductList.css";
import Header from "./Header";
import Product from "./Product";
import Footer from "./Footer";

function ProductList() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div className="Product-list-title">
        <strong> New Arrivals: </strong>
        <Button
          onClick={() => history.push("/add-product")}
          className="Add-product-btn"
          variant="primary"
          type="submit"
        >
          <Plus size={18} /> &nbsp; Add Product
        </Button>
      </div>
      <div className="Products-list">
        <Product />
      </div>
      <Footer />
    </div>
  );
}

export default ProductList;
