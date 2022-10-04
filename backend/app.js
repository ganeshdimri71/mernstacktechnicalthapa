const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from the server");
});
app.get("/about", (req, res) => {
  res.send("Hello World from the About");
});
app.get("/contact", (req, res) => {
  res.send("Hello World from the Contact");
});
app.get("/signin", (req, res) => {
  res.send("Hello World from the Login");
});
app.get("/signup", (req, res) => {
  res.send("Hello World from the Registration");
});

app.listen(4000, () => {
  console.log("Server is running at port no 4000");
});
