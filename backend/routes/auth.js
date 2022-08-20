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
  body("email").isEmail().trim().withMessage("Please enter a valid email"),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be strong & at least 8 characters long"),
  validateResult,
  login
);

router.post(
  "/register",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((email) => {
      return User.findOne({ email }, "email").then(
        (user) => user && Promise.reject("Email already in use!")
      );
    })
    .trim()
    .normalizeEmail(),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be strong & at least 8 characters long"),
  validateResult,
  register
);

router.get("/signout", logout);

module.exports = router;
