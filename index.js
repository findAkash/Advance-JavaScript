const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const app = express();
const mongoose = require('mongoose');

//connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/todos')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());

//routes
const todoRoutes = require('./routes/todo.routes');

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
