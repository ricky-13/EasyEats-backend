const express = require("express");
const router = express.Router();
// try straight with app.post
const User = require("../models/User");

router.post("/createuser", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      location: req.body.location,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;

// {
//     name: "Ricky",
//     password: "12345",
//     email: "abcde@gmail.com",
//     location: "chandigarh",
//   }
