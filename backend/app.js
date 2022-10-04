const express = require("express");
const mongoose = require("mongoose");

const app = express();

const DB = `mongodb+srv://ganeshdimri71:jttmPFs9675e8GW1@cluster0.8mznbfn.mongodb.net/mernstack?retryWrites=true&w=major`;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
// middleware
const middleware = (_req, _res, _next) => {
  console.log("Hello my middleware");
  _next();
};

// Basic routes

app.get("/", (_req, res) => {
  res.send("Hello World from the server");
});
app.get("/about", middleware, (_req, res) => {
  console.log("Hello my About");
  res.send("Hello World from the About");
});
app.get("/contact", (_req, res) => {
  res.send("Hello World from the Contact");
});
app.get("/signin", (_req, res) => {
  res.send("Hello World from the Login");
});
app.get("/signup", (_req, res) => {
  res.send("Hello World from the Registration");
});

app.listen(4000, () => {
  console.log("Server is running at port no 4000");
});
