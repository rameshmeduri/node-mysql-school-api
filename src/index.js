require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api', router);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  const error = {
    status: err.status || 500,
    message: err.message || 'Server Error'
  };
  res.status(err.status).json(error);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port} !!!`);
});

module.exports = app;
