const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { bio } = req.body;

    if (!bio) return res.status(400).json({ message: 'Bio is required' });

    user.bio = bio;
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};

