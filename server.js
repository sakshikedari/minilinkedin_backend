// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/posts');
const path = require('path');


dotenv.config();

const app = express();
const protect = require('./middleware/authMiddleware');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));


// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is running ');
});

app.get('/api/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
