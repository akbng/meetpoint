require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const busboy = require("connect-busboy");
const path = require("path");

const {
  generateRtcToken,
  generateRtmToken,
} = require("./utils/generateTokens");
const generateRsaKeyPair = require("./utils/generateRsaKeyPair");

// connect to database
require("./config/database");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(busboy({ highWaterMark: 2 * 1024 * 1024 }));

app.get("/", (req, res) => {
  res.send("The server is responding correctly");
});

app.get("/generate/token", (req, res) => {
  const { uid, channel, type } = req.query;
  const options = { rtc: generateRtcToken, rtm: generateRtmToken };
  options[type](channel, uid)
    .then((token) => res.status(200).json({ error: false, data: token }))
    .catch((err) => res.status(400).json({ error: true, reason: err.message }));
});

app.listen(port, (err) => {
  if (err) console.error("Something went wrong starting the Server", err);
  else console.log(`[**SERVER**] ArtSchool API is running on PORT ${port}`);
});

if (process.env.NODE_ENV === "production")
  generateRsaKeyPair(
    path.resolve(__dirname, "./private.pem"),
    path.resolve(__dirname, "./public.pem")
  );
