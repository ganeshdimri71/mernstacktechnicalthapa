const express = require("express");

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
    }

    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });

    await user.save();

    _res.status(201).json({ message: "User Register Successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
