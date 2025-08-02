const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/userController');

router.patch('/update', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.bio = req.body.bio || user.bio;
    await user.save();
    res.json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
