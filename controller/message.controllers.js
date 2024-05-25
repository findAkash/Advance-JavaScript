const Message = require('../models/message.model');
const statusCode = require('../constants/statusCodes');

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({})
      .sort({ created_at: 'desc' })
      .populate('user');
    return res.status(statusCode.success).json(messages);
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

const getMessagesById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId).populate(
      'user'
    );
    if (!message) {
      return res
        .status(statusCode.notfound)
        .json({ error: 'Message not found' });
    }
    return res.status(statusCode.success).json(message);
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    return res.status(statusCode.success).json(message);
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

const editMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      req.body,
      { new: true }
    );
    if (!message) {
      return res
        .status(statusCode.notfound)
        .json({ error: 'Message not found' });
    }
    return res.status(statusCode.success).json(message);
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    if (!messageId) {
      return res.status(statusCode.error).json({ error: 'MessageId required' });
    }
    const message = await Message.findByIdAndDelete(req.params.messageId);
    if (!message) {
      return res
        .status(statusCode.notfound)
        .json({ error: 'Message not found' });
    }
    return res.status(statusCode.success).json({ message: 'Message deleted' });
  } catch (error) {
    return res.status(statusCode.error).json({ error: error.message });
  }
};

module.exports = {
  getMessages,
  getMessagesById,
  addMessage,
  editMessage,
  deleteMessage,
};
