require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const busboy = require("connect-busboy");
const path = require("path");
const passport = require("passport");

const {
  generateRtcToken,
  generateRtmToken,
  generateRsaKeyPair,
} = require("./utils");
const initializePassport = require("./config/passport");
// api routes
const authRoutes = require("./routes/auth");

// connect to database
require("./config/database");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(busboy({ highWaterMark: 2 * 1024 * 1024 }));

initializePassport(passport);
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

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

// Example of protected route
// app.get(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     res.status(200).json({
//       error: false,
//       msg: "You are successfully authenticated to this route!",
//       data: req.user,
//     });
//   }
// );

app.listen(port, (err) => {
  if (err) console.error("Something went wrong starting the Server", err);
  else console.log(`[**SERVER**] ArtSchool API is running on PORT ${port}`);
});

if (process.env.NODE_ENV === "production")
  generateRsaKeyPair(
    path.resolve(__dirname, "./private.pem"),
    path.resolve(__dirname, "./public.pem")
  );
