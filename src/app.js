const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", () => console.log("MongoDB connected"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
