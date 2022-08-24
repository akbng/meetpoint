const { User } = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-hashed_password -salt");

    if (users.length === 0)
      return res.status(400).json({
        error: true,
        reason: "No Events found for the user",
      });

    return res.status(200).json({ error: false, data: users });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};

module.exports = { getAllUsers };
