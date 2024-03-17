const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/posts", (req, res) => {
  res.send({ msg: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
