const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const pathToPrivKey = path.resolve(__dirname, "../private.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");

function generateJwt(user) {
  const { _id } = user;
  const expiresIn = "6h";
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports = generateJwt;
