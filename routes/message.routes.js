const express = require('express');
const {
  getMessages,
  createMessage,
} = require('../controller/message.services');

// Create a new router instance
const router = express.router();

// Define the route for getting all messages
router.get('/', getMessages);
router.get('/:messageId');
router.post('/');
router.put('/:messageId');
