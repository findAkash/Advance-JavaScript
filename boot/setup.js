const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

//connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/todos')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

const registerCoreMiddleWare = () => {
  try {
    app.use(
      session({
        secret: '12231',
        // forces the session to be saved back to the session store, even if the session was never modified during the request
        resave: false,
        // forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
          // maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      })
    );
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //routes
    const todoRoutes = require('../routes/todo.routes');

    app.use('/todos', todoRoutes);

    app.get('/', (req, res) => {
      res.send('Hello World');
    });
  } catch (error) {}
};

//handling uncought exceptions
const handleError = () => {
  // ''

  process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
};

const startApp = async () => {
  try {
    // register core application level middleware
    registerCoreMiddleWare();

    // exit on uncaught exceptions
    handleError();
  } catch (error) {
    console.log('startup :: Error while booting application');
    throw error;
  }
};

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { startApp };
