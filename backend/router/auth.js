const express = require("express");

const router = express.Router();

require("../db/conn");
const User = require("../model/userShema");

router.get("/", (_req, _res) => {
  res.send("Hello World from the server router.js");
});

router.post("/register", (_req, _res) => {
  const { name, email, phone, work, password, cpassword } = _req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return _res.status(422).json({ error: "Plz filled the required filed" });
  }
  User.findOne({ email })
    .then((userExist) => {
      if (userExist) {
        return _res.status(422).json({ error: "Email Already Exists" });
      }

      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      user
        .save()
        .then(() => {
          _res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) => {
          _res.status(500).json({ message: "Failed to register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
