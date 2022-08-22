const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const pathToPrivKey = path.resolve(__dirname, "../private.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");

function generateJwt(user) {
  const { _id } = user;
  const expiresIn = "6h";
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    sub: _id,
    iat: issuedAt,
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: issuedAt + parseInt(expiresIn.split("h")[0]) * 60 * 60,
  };
}

module.exports = generateJwt;
