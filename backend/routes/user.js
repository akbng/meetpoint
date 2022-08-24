const express = require("express");
const passport = require("passport");
const router = express.Router();

const { getAllUsers } = require("../controllers/user");

router.get(
  "/user/all",
  passport.authenticate("jwt", { session: false }),
  getAllUsers
);

module.exports = router;
