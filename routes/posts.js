// routes/posts.js
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getUserPosts } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

// Public: Get all posts
router.get('/', getAllPosts);

// Protected: Create a post
router.post('/', protect, createPost);

// Protected: Get current user's posts
router.get('/me', protect, getUserPosts);

module.exports = router;
