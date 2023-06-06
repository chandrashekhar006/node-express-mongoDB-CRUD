const mongoose = require('mongoose');
const winston = require('winston');

mongoose.connect('mongodb+srv://app:app@cluster0.d7rchhc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    winston.info('Connected to the MongoDB database.');
  })
  .catch((error) => {
    winston.error('Failed to connect to the MongoDB database:', error);
  });
