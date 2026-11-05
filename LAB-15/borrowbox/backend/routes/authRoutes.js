const express = require('express');
const bcrypt = require('bcryptjs');
const { readData, writeData } = require('../utils/database');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Helper to remove password from user object
const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// @route   POST /api/auth/register
// @desc    Register a new student account
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, studentId, college, password, confirmPassword } = req.body;

    // Validate presence
    if (!fullName || !email || !studentId || !college || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All registration fields are required.'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Password length validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.'
      });
    }

    const users = readData('users');

    // Duplicate email check (case-insensitive)
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: `user-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      studentId: studentId.trim(),
      college: college.trim(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeData('users', users);

    const token = generateToken(newUser);

    // Welcome notification
    const notifications = readData('notifications');
    notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: newUser.id,
      title: 'Welcome to BorrowBox!',
      message: 'Explore campus listings, share your unused items, and start borrowing easily.',
      type: 'welcome',
      read: false,
      createdAt: new Date().toISOString()
    });
    writeData('notifications', notifications);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: sanitizeUser(newUser)
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get JWT token
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const users = readData('users');
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: sanitizeUser(user)
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/auth/me
// @desc    Get currently logged in user profile
// @access  Private
router.get('/me', authMiddleware, (req, res, next) => {
  try {
    const users = readData('users');
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    return res.status(200).json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
