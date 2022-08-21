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
  generateRtcUserToken,
  generateRtmUserToken,
  generateRtcGuestToken,
  generateRtmGuestToken,
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
  "/generate/token/rtc/user",
  passport.authenticate("jwt", { session: false }),
  generateRtcUserToken
);

router.get(
  "/generate/token/rtm/user",
  passport.authenticate("jwt", { session: false }),
  generateRtmUserToken
);

router.get("/generate/token/rtc/guest", generateRtcGuestToken);
router.get("/generate/token/rtm/guest", generateRtmGuestToken);

module.exports = router;
