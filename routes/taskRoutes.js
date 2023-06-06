const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getItems);
router.get('/:id', taskController.getItemById);
router.post('/', taskController.createItem);
router.put('/:id', taskController.updateItem);
router.delete('/:id', taskController.deleteItem);

router.use((error, req, res, next) => {
    winston.error('Unhandled error:', error);
    res.status(error.status || 500).json({ error: error.message || 'Something went wrong.' });
  });

module.exports = router;