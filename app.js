const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const port = 3000;

const app = express();
app.use(express.json());

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


  const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
  });
  
  const Item = mongoose.model('Item', itemSchema);