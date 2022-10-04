const express = require("express");

const router = express.Router();
router.get("/", (_req, res) => {
  res.send("Hello World from the server router.js");
});

router.post("/register", (_req, _res) => {
    console.log(_req.body);
    _res.json({ message: _req.body });
});

module.exports = router;
