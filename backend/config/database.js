const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/meetpoint";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) =>
  console.log(`Error Connecting DATABASE: ${err}`)
);
dbConnection.once("open", () => console.log("DATABASE CONNECTED"));
