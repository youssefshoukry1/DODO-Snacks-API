require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('../Routes/product');
const orderRoutes = require('../Routes/order');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/snax';
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = client;
  return client;
}

// Attach a middleware to ensure database is connected on every request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// مسار افتراضي للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
  res.send('Dodo Snacks API is running...');
});

// مسارات التطبيق الخاصة بك
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;