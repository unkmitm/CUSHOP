const User = require("../models/User");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const userFind = await User.findOne({ email });
    if (userFind) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // create new user
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  registerUser,
};
