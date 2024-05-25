const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const statusCode = require('../constants/statusCodes');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(statusCode.notfound).json({ error: 'User not found' });
    }
    return res.status(statusCode.success).json(user);
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(statusCode.missingParameters)
        .json({ error: 'User ID is required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(statusCode.notFound).json({ error: 'User not found' });
    }
    return res.status(statusCode.success).json(user);
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(statusCode.missingParameters)
        .json({ error: 'All fields are required' });
    }
    const user = new User(req.body);
    await user.save();
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};
