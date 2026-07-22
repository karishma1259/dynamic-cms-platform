const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./src/routes/authRoutes');
const contentRoutes = require('./src/routes/contentRoutes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'CMS Backend API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
server.on('error', (err) => {
  console.error('SERVER LISTEN ERROR:', err);
});

