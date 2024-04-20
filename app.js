const express = require('express');
const winston = require('winston');
const taskRoutes = require('./routes/taskRoutes');
const mongooseConfig = require('./config/mongoose');
const taskController = require('./controllers/taskController');


const port = 3000;

const app = express();
app.use(express.json());

app.use('/api/items', taskRoutes);

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
