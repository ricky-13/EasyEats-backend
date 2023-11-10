const express = require("express");
const router = express.Router();
// try straight with app.post
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // the above lines check for validation of various params n if there is no error then it goes ahead and creates the user
    // using the lines below
    async (req, res) => {
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
    };
  }
);

module.exports = router;

// {
//     name: "Ricky",
//     password: "12345",
//     email: "abcde@gmail.com",
//     location: "chandigarh",
//   }
