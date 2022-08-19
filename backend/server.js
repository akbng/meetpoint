require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const busboy = require("connect-busboy");

const app = express();
const port = process.env.PORT || 9000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/meetpoint";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) =>
  console.log(`Error Connecting DATABASE: ${err}`)
);
dbConnection.once("open", () => console.log("DATABASE CONNECTED"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(busboy({ highWaterMark: 2 * 1024 * 1024 }));

app.get("/", (req, res) => {
  res.send("The server is responding correctly");
});

app.listen(port, (err) => {
  if (err) console.error("Something went wrong starting the Server", err);
  else console.log(`[**SERVER**] ArtSchool API is running on PORT ${port}`);
});
