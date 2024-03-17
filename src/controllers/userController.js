const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .send({ status: 201, message: "User registered successfull" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ status: 401, message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.send({ status: 200, message: "success", data: token });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Error logging in" });
  }
};
