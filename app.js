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
  
  app.get('/api/items', async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      winston.error('Failed to retrieve items:', error);
      res.status(500).json({ error: 'Failed to retrieve items.' });
    }
  });
  
  app.get('/api/items/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      res.json(item);
    } catch (error) {
      winston.error(`Failed to retrieve item: ${req.params.id}`, error);
      res.status(500).json({ error: 'Failed to retrieve item.' });
    }
  });
  
  
  app.post('/api/items', async (req, res) => {
    try {
      const item = new Item(req.body);
      const savedItem = await item.save();
      res.status(201).json(savedItem);
    } catch (error) {
      winston.error('Failed to create item:', error);
      res.status(500).json({ error: 'Failed to create item.' });
    }
  });
  

  app.put('/api/items/:id', async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No fields provided to update.' });
      }
  
      const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }
  
      res.json(item);
    } catch (error) {
      winston.error('Failed to update item:', error);
      res.status(500).json({ error: 'Failed to update item.' });
    }
  });
  
  
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.sendStatus(204);
  } catch (error) {
    winston.error('Failed to delete item:', error);
    res.status(500).json({ error: 'Failed to delete item.' });
  }
});


  app.use((error, req, res, next) => {
    winston.error('Unhandled error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  });

winston.configure({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
