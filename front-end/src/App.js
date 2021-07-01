import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddProducts from "./components/AddProducts";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/add-product" exact component={AddProducts} />
        <Route path="/cart" exact component={CartList} />
        <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
