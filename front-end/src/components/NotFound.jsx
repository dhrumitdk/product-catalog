import React from "react";
import Header from "./Header";
import "../styles/Notfound.css";

function NotFound() {
  return (
    <div>
      <Header />
      <div className="Not-found">
        <img
          src="https://productcatalog-app.s3.ap-south-1.amazonaws.com/notfound.png"
          alt=""
          width="300"
        />
        <h1 style={{ fontSize: "42px" }}>Oops! Looks like you're lost!!!</h1>
      </div>
    </div>
  );
}

export default NotFound;
