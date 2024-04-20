const winston = require('winston');
const Item = require('../models/task');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    winston.error('Failed to retrieve items:', error);
    res.status(500).json({ error: 'Failed to retrieve items.' });
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      const error = new Error('Item not found.');
      error.status = 404;
      throw error;
    }
    res.json(item);
  } catch (error) {
    winston.error(`Failed to retrieve item: ${req.params.id}`, error);
    next(error);
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    winston.error('Failed to create item:', error);
    res.status(500).json({ error: 'Failed to create item.' });
  }
};

exports.updateItem = async (req, res) => {
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
};

exports.deleteItem = async (req, res) => {
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
};

module.exports = taskController;
