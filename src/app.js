const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authenticate = require("./middleware/authenticate");

const postController = require("./controllers/postController");
const userController = require("./controllers/userController");

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
app.post("/posts", authenticate, postController.createNewPost);
app.put("/posts/:id", authenticate, postController.editPostById);
app.delete("/posts/:id", authenticate, postController.deletePostById);

app.post("/register", userController.register);
app.post("/login", userController.login);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
