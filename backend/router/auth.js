const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

require("../db/conn");
const User = require("../model/userShema");

router.get("/", (_req, _res) => {
  _res.send("Hello World from the server router.js");
});

// async and await
router.post("/register", async (_req, _res) => {
  const { name, email, phone, work, password, cpassword } = _req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return _res.status(422).json({ error: "Plz filled the required filed" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return _res.status(422).json({ error: "Email Already Exists" });
    } else if (password != cpassword) {
      return _res.status(422).json({ error: "Password are not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      // hashing password
      await user.save();

      _res.status(201).json({ message: "User Register Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route
router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"awesome"})
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the data" });
    }

    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatched = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatched) {
        res.json({ message: "Invalid Credentials" });
      } else {
        res.status(400).json({ message: "user Signin successfully" });
      }
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
