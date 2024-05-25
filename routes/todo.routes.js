const express = require('express');
const { getTodos } = require('../controller/todo.controllers');

// Create a new router instance
const router = express.Router();

// Define the route for getting all todos
router.get('/', getTodos);

// Export the router
module.exports = router;
