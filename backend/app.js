const express = require("express");

const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");

const { PORT } = process.env;

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

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
