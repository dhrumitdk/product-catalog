import React from "react";
import "../styles/Header.css";
import { ShoppingBag } from "react-feather";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <div className="App">
      <div className="Branding" onClick={() => history.push("/")}>
        <p className="Branding"> The Product Catalog </p>
      </div>
      <div className="Cart">
        <Link className="Cart-link" to="/cart">
          <ShoppingBag />
        </Link>
      </div>
    </div>
  );
}

export default Header;
