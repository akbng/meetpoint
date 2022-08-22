const express = require("express");
const { body } = require("express-validator");
const passport = require("passport");
const router = express.Router();

const { User } = require("../models/User");
const {
  register,
  validateResult,
  logout,
  login,
  generateRtmUserToken,
  generateRtcAuthToken,
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

router.get(
  "/generate/token/rtc",
  passport.authenticate("jwt", { session: false }),
  generateRtcAuthToken
);

router.get(
  "/generate/token/rtm",
  passport.authenticate("jwt", { session: false }),
  generateRtmUserToken
);

module.exports = router;
