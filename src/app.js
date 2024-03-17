const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const postController = require("./controllers/postController");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", () => console.log("MongoDB connected"));

app.use(bodyParser.json());

// Routes
app.get("/posts", postController.getAllPost);
app.get("/posts/:id", postController.getPostById);
app.post("/posts", postController.createNewPost);
app.put("/posts/:id", postController.editPostById);
app.delete("/posts/:id", postController.deletePostById);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
