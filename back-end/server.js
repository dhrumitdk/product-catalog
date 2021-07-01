import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import products from "./models/products.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
const connectionUrl =
  "mongodb+srv://admin:admin@cluster0.1n0tw.mongodb.net/productCatalogDatabase?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// DB Config
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API endpoints
app.get("/", (req, res) => {
  res.send("Hello express server from Dhrumit Kansara!");
});

// Add and view products
app.post("/api/add-product", (req, res) => {
  const dbProduct = req.body;
  products.create(dbProduct, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/product", (req, res) => {
  products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Add and view cart API
app.post("/api/add-to-cart/:id", (req, res) => {
  const productID = req.params.id;
  products.findByIdAndUpdate(
    { _id: productID },
    { addedToCart: true },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

// Update cart quantity
app.post("/api/update-cart/:id", (req, res) => {
  const productID = req.params.id;
  const quantity = req.body.productQuantity;
  products.findByIdAndUpdate(
    { _id: productID },
    { productQuantity: quantity },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get("/api/view-cart", (req, res) => {
  products.find({ addedToCart: true }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listen
app.listen(port, () => {
  console.log("App has started! Listening at:", port);
});
