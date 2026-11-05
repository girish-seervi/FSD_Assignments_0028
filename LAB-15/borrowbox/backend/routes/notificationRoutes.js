const express = require('express');
const { readData, writeData } = require('../utils/database');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get all notifications for logged-in user
// @access  Private
router.get('/', authMiddleware, (req, res, next) => {
  try {
    const notifications = readData('notifications');
    const userNotifs = notifications
      .filter((n) => n.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const unreadCount = userNotifs.filter((n) => !n.read).length;

    return res.status(200).json({
      success: true,
      unreadCount,
      count: userNotifs.length,
      data: userNotifs
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/notifications/read-all
// @desc    Mark all user notifications as read
// @access  Private
router.put('/read-all', authMiddleware, (req, res, next) => {
  try {
    const notifications = readData('notifications');
    let updated = false;

    notifications.forEach((n) => {
      if (n.userId === req.user.id && !n.read) {
        n.read = true;
        updated = true;
      }
    });

    if (updated) {
      writeData('notifications', notifications);
    }

    return res.status(200).json({
      success: true,
      message: 'All notifications marked as read.'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark a specific notification as read
// @access  Private
router.put('/:id/read', authMiddleware, (req, res, next) => {
  try {
    const notifications = readData('notifications');
    const notif = notifications.find(
      (n) => n.id === req.params.id && n.userId === req.user.id
    );

    if (!notif) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found.'
      });
    }

    notif.read = true;
    writeData('notifications', notifications);

    return res.status(200).json({
      success: true,
      message: 'Notification marked as read.',
      data: notif
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
