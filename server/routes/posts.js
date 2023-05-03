import express from 'express';
import { getFeedsPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get('/', verifyToken, getFeedsPosts);
router.get('/:id/posts', verifyToken, getUserPosts);

// UPDATE
router.patch('/:id/like', verifyToken, likePost);

export default router;
