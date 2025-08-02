// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/posts');
const path = require('path');
const protect = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://mini-linkedin-frontend-sage.vercel.app/'], // add both dev & deployed frontend URLs
  credentials: true,
}));

// Middleware
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Sample health check route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ✅ Protected route for profile
app.get('/api/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
