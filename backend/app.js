const express = require("express");

const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json()); // converting josn into object

const User = require("./model/userShema");

// we link the router files to make our route easy
app.use(require("./router/auth"));

const { PORT } = process.env;
// middleware
const middleware = (_req, _res, _next) => {
  console.log("Hello my middleware");
  _next();
};

// Basic routes

// app.get("/", (_req, res) => {
//   res.send("Hello World from the server from app.js");
// });
app.get("/about", middleware, (_req, res) => {
  console.log("Hello my About");
  res.send("Hello World from the About");
});
app.get("/contact", (_req, res) => {
  res.cookie("ganesh",'dimri')
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
