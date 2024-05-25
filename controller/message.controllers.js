const Message = require('../models/message.model');

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({})
      .sort({ created_at: 'desc' })
      .populate('user');
    return res.status(statusCode.success).json(messages);
  } catch (error) {}
};

const getMessagesById = async (req, res) => {};

const addMessage = async (req, res) => {};

const editMessage = async (req, res) => {};

const deleteMessage = async (req, res) => {};

module.exports = {
  getMessages,
  getMessagesById,
  addMessage,
  editMessage,
  deleteMessage,
};
