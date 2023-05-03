import User from '../models/User.js';
import Post from './../models/Post.js';

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.userPicturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.msg });
  }
};
export const getFeedsPosts = async (req, res) => {
  try {
  } catch (error) {
    res.status(409).json({ message: error.msg });
  }
};
export const getUserPosts = async (req, res) => {
  try {
  } catch (error) {
    res.status(409).json({ message: error.msg });
  }
};
export const likePost = async (req, res) => {
  try {
  } catch (error) {
    res.status(409).json({ message: error.msg });
  }
};
