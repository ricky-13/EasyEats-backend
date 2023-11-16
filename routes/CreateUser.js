const express = require("express");
const router = express.Router();
// try straight with app.post
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "IWillGetAJobBeforeTheEndOf2023";

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

        const passwordCompare = bcrypt.compare(password, userData.password);
        if (!passwordCompare) {
          return res.status(400).send({ error: "Incorrect Password" });
        }

        const data = {
          user: {
            id: userData.id,
          },
        };

        const Token = jwt.sign(data, jwtSecret);
        // only body is sent in send function, put 2 values in curly braces and youre good as it goes as json
        return res.status(200).send({ userData, Token });
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

    // hashing the password first using bcrypt for enhanced security
    const salt = await bcrypt.genSalt(13);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: securePassword,
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
