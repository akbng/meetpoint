const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User");
const generateJwt = require("../utils/generateJwt");
const makeObject = require("../utils/makeObject");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      error: true,
      reason: errors.array(),
    });

  next();
};

const register = async (req, res) => {
  const { name, fullName, email, password, phone } = req.body;

  const user = User(
    makeObject({
      name,
      fullName,
      email,
      password,
      phone,
    })
  );

  try {
    const newUser = await user.save({ validateBeforeSave: true });
    // issue a token for the new user
    const token = generateJwt(newUser);
    res.cookie("token", { ...token }, { expire: new Date() + 2160 });
    // hide the sensitive information
    newUser.hashed_password = undefined;
    newUser.salt = undefined;

    return res.json({
      error: false,
      data: {
        ...token,
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        error: true,
        reason: "User not found",
      });

    const isValid = await user.authenticate(password);
    if (!isValid)
      return res.status(400).json({
        error: true,
        reason: "Email and password do not match",
      });
    // issue a token for the user
    const token = generateJwt(user);
    res.cookie("token", { ...token }, { expire: new Date() + 2160 });
    // hide the sensitive information
    user.hashed_password = undefined;
    user.salt = undefined;

    return res.json({
      error: false,
      data: {
        ...token,
        user,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    error: false,
    reason: "You have been logged out",
  });
};

module.exports = { validateResult, register, login, logout };
