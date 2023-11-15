const express = require("express");
const router = express.Router();
// try straight with app.post
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    await User.findOne({ email })
      .then((userData) => {
        // if no userdata for that email if found then throw error
        if (!userData) {
          return res.status(400).send({ error: "Enter a valid Email" });
        }

        if (password !== userData.password) {
          return res.status(400).send({ error: "Incorrect Password" });
        }

        return res.status(200).send(userData);
      })
      .catch((error) => res.status(400).send(error));
  }
);

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // console.log(
    //   req.body.name,
    //   req.body.password,
    //   req.body.email,
    //   req.body.location
    // );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // the above lines check for validation of various params n if there is no error then it goes ahead and creates the user
    // using the lines below
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
      // console.log(res);
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
