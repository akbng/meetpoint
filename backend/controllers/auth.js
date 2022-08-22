const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../models/User");
const {
  generateJwt,
  makeObject,
  generateRtcToken,
  generateRtmToken,
} = require("../utils");

const cookieExpiryMs = Date.now() + 6 * 60 * 60 * 1000;

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      error: true,
      reason: errors.array()[0].msg,
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
    res.cookie("token", token.token, { expire: cookieExpiryMs });
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
    res.cookie("token", token.token, { expire: cookieExpiryMs });
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

const generateRtcAuthToken = async (req, res) => {
  const { channel } = req.query;
  const channelName = channel || uuidv4();
  try {
    const data = await generateRtcToken(channelName);
    return res
      .status(200)
      .json({ error: false, data: { channelName, ...data } });
  } catch (err) {
    return res
      .status(400)
      .json({ error: true, reason: err.reason || err.message });
  }
};

const generateRtmUserToken = async (req, res) => {
  try {
    const data = await generateRtmToken(req.user._id);
    return res.status(200).json({ error: false, data: data });
  } catch (err) {
    return res
      .status(400)
      .json({ error: true, reason: err.reason || err.message });
  }
};

const generateRtmGuestToken = async (req, res) => {
  try {
    const data = await generateRtmToken();
    return res.status(200).json({ error: false, data: data });
  } catch (err) {
    return res
      .status(400)
      .json({ error: true, reason: err.reason || err.message });
  }
};

module.exports = {
  validateResult,
  register,
  login,
  logout,
  generateRtcAuthToken,
  generateRtmUserToken,
  generateRtmGuestToken,
};
