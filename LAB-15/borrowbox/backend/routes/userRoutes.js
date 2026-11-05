const express = require('express');
const { readData, writeData } = require('../utils/database');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/users/stats/platform
// @desc    Get aggregate platform statistics for landing page
// @access  Public
router.get('/stats/platform', (req, res, next) => {
  try {
    const items = readData('items');
    const users = readData('users');
    const requests = readData('requests');

    const totalItems = items.length;
    const activeStudents = users.length;
    const successfulBorrowings = requests.filter((r) => r.status === 'Returned').length;
    const activeBorrowings = requests.filter(
      (r) => r.status === 'Accepted' || r.status === 'Return Requested'
    ).length;

    return res.status(200).json({
      success: true,
      data: {
        totalItemsShared: totalItems,
        activeStudents,
        successfulBorrowings,
        activeBorrowings
      }
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/users/dashboard
// @desc    Get stats and recent activity for the logged-in user dashboard
// @access  Private
router.get('/dashboard', authMiddleware, (req, res, next) => {
  try {
    const items = readData('items');
    const requests = readData('requests');
    const notifications = readData('notifications');

    const userId = req.user.id;

    // My Listings count
    const myListings = items.filter((i) => i.ownerId === userId);

    // Active Borrowings (where user is borrower and item is currently borrowed)
    const activeBorrowings = requests.filter(
      (r) =>
        r.borrowerId === userId &&
        (r.status === 'Accepted' || r.status === 'Return Requested')
    );

    // Pending Requests (received or sent)
    const pendingReceived = requests.filter(
      (r) => r.ownerId === userId && r.status === 'Pending'
    );
    const pendingSent = requests.filter(
      (r) => r.borrowerId === userId && r.status === 'Pending'
    );
    const totalPending = pendingReceived.length + pendingSent.length;

    // Completed Transactions (either as owner or borrower)
    const completedTransactions = requests.filter(
      (r) =>
        (r.ownerId === userId || r.borrowerId === userId) &&
        r.status === 'Returned'
    );

    // Recent Activity derived from recent requests, user listings, and notifications
    const userNotifications = notifications
      .filter((n) => n.userId === userId)
      .slice(0, 6)
      .map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        description: n.message,
        timestamp: n.createdAt,
        read: n.read
      }));

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          myListingsCount: myListings.length,
          activeBorrowingsCount: activeBorrowings.length,
          pendingRequestsCount: totalPending,
          pendingReceivedCount: pendingReceived.length,
          pendingSentCount: pendingSent.length,
          completedTransactionsCount: completedTransactions.length
        },
        recentActivity: userNotifications
      }
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/users/profile
// @desc    Get detailed user profile including loan history counts
// @access  Private
router.get('/profile', authMiddleware, (req, res, next) => {
  try {
    const users = readData('users');
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const items = readData('items');
    const requests = readData('requests');

    const myListingsCount = items.filter((i) => i.ownerId === user.id).length;
    const successfulLends = requests.filter(
      (r) => r.ownerId === user.id && r.status === 'Returned'
    ).length;
    const successfulBorrows = requests.filter(
      (r) => r.borrowerId === user.id && r.status === 'Returned'
    ).length;

    const { password, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      data: {
        ...safeUser,
        myListingsCount,
        successfulBorrowingsCount: successfulBorrows + successfulLends,
        successfulLendsCount: successfulLends,
        successfulBorrowsCount: successfulBorrows
      }
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile (fullName, college, studentId only)
// @access  Private
router.put('/profile', authMiddleware, (req, res, next) => {
  try {
    const { fullName, college, studentId } = req.body;

    if (!fullName || !college || !studentId) {
      return res.status(400).json({
        success: false,
        message: 'Full name, college, and student ID are required.'
      });
    }

    const users = readData('users');
    const userIndex = users.findIndex((u) => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Never allow email or password modification through this basic profile editor
    users[userIndex].name = fullName.trim();
    users[userIndex].college = college.trim();
    users[userIndex].studentId = studentId.trim();
    users[userIndex].updatedAt = new Date().toISOString();

    writeData('users', users);

    // Also update cached owner names in items
    const items = readData('items');
    let itemsUpdated = false;
    items.forEach((item) => {
      if (item.ownerId === req.user.id) {
        item.ownerName = fullName.trim();
        item.ownerCollege = college.trim();
        itemsUpdated = true;
      }
    });
    if (itemsUpdated) writeData('items', items);

    const { password, ...safeUser } = users[userIndex];

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: safeUser
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/users/favorites
// @desc    Get user's favorited items
// @access  Private
router.get('/favorites', authMiddleware, (req, res, next) => {
  try {
    const favorites = readData('favorites');
    const items = readData('items');

    const userFavIds = favorites
      .filter((f) => f.userId === req.user.id)
      .map((f) => f.itemId);

    const favoritedItems = items.filter((item) => userFavIds.includes(item.id));

    return res.status(200).json({
      success: true,
      data: favoritedItems,
      favoriteIds: userFavIds
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/users/favorites/:itemId
// @desc    Add item to user favorites
// @access  Private
router.post('/favorites/:itemId', authMiddleware, (req, res, next) => {
  try {
    const favorites = readData('favorites');
    const exists = favorites.find(
      (f) => f.userId === req.user.id && f.itemId === req.params.itemId
    );

    if (!exists) {
      favorites.push({
        userId: req.user.id,
        itemId: req.params.itemId,
        createdAt: new Date().toISOString()
      });
      writeData('favorites', favorites);
    }

    return res.status(200).json({
      success: true,
      message: 'Item added to favorites.'
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/users/favorites/:itemId
// @desc    Remove item from favorites
// @access  Private
router.delete('/favorites/:itemId', authMiddleware, (req, res, next) => {
  try {
    const favorites = readData('favorites');
    const updated = favorites.filter(
      (f) => !(f.userId === req.user.id && f.itemId === req.params.itemId)
    );

    writeData('favorites', updated);

    return res.status(200).json({
      success: true,
      message: 'Item removed from favorites.'
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/users/leaderboard
// @desc    Campus Leaderboard: top sharing students
// @access  Public
router.get('/leaderboard', (req, res, next) => {
  try {
    const users = readData('users');
    const requests = readData('requests');
    const items = readData('items');

    const leaderboard = users.map((user) => {
      const itemsShared = items.filter((i) => i.ownerId === user.id).length;
      const successfulLends = requests.filter(
        (r) => r.ownerId === user.id && r.status === 'Returned'
      ).length;
      const activeLends = requests.filter(
        (r) =>
          r.ownerId === user.id &&
          (r.status === 'Accepted' || r.status === 'Return Requested')
      ).length;

      return {
        id: user.id,
        name: user.name,
        college: user.college,
        itemsCount: itemsShared,
        successfulLends,
        activeLends,
        score: successfulLends * 10 + itemsShared * 2 + activeLends * 5
      };
    });

    leaderboard.sort((a, b) => b.score - a.score);

    return res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
