const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const { User } = require("../models/User");
const {
  register,
  validateResult,
  logout,
  login,
} = require("../controllers/auth");

router.post(
  "/login",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((email) => {
      return User.findOne({ email }, "email").then(
        (user) => user && Promise.reject("Email already in use!")
      );
    })
    .normalizeEmail()
    .trim(),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be at least 8 characters long"),
  validateResult,
  login
);

router.post(
  "/register",
  body("email").isEmail().withMessage("Please enter a valid email").trim(),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be at least 6 characters long"),
  validateResult,
  register
);

router.get("/signout", logout);

module.exports = router;
