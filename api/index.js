require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('../Routes/product');
const orderRoutes = require('../Routes/order');

const app = express();

app.use(cors());
app.use(express.json());

// مسار افتراضي للتأكد من أن السيرفر يعمل (يمنع ظهور الـ 404 عند فتح الرابط الرئيسي)
app.get('/', (req, res) => {
  res.send('Dodo Snacks API is running...');
});

// مسارات التطبيق الخاصة بك
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/snax';

// الاتصال بقاعدة البيانات بشكل منفصل حتى لا يعطل تشغيل الـ Serverless Function
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

// تصدير التطبيق وهو الخطوة الأهم لكي يقرأه Vercel
module.exports = app;