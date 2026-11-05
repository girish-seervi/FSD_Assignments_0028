const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const requestRoutes = require('./routes/requestRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration allowing React development server
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Global Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Base Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'BorrowBox – Campus Sharing Platform',
    timestamp: new Date().toISOString()
  });
});

// Mount RESTful API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server with automatic port fallback for macOS AirPlay Receiver
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`=========================================`);
    console.log(`📦 BorrowBox Backend Server Running`);
    console.log(`🚀 URL: http://localhost:${port}`);
    console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
    console.log(`=========================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is already in use (commonly macOS AirPlay Receiver on port 5000).`);
      if (Number(port) === 5000) {
        console.log(`🔄 Falling back to port 5001...`);
        startServer(5001);
      } else {
        console.error(`❌ Failed to start server: Port ${port} is unavailable.`);
      }
    } else {
      console.error('Server startup error:', err);
    }
  });

  return server;
};

startServer(PORT);

module.exports = app;
