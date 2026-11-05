const express = require('express');
const { readData, writeData } = require('../utils/database');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Helper to push a notification
const createNotification = (userId, title, message, type, requestId, itemId) => {
  try {
    const notifications = readData('notifications');
    notifications.unshift({
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      title,
      message,
      type,
      requestId,
      itemId,
      read: false,
      createdAt: new Date().toISOString()
    });
    writeData('notifications', notifications);
  } catch (err) {
    console.error('Failed to create notification:', err.message);
  }
};

// @route   GET /api/requests/sent
// @desc    Get borrowing requests sent by the logged-in user
// @access  Private
router.get('/sent', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const sent = requests
      .filter((r) => r.borrowerId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: sent.length,
      data: sent
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/requests/received
// @desc    Get borrowing requests received for items owned by logged-in user
// @access  Private
router.get('/received', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const received = requests
      .filter((r) => r.ownerId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: received.length,
      data: received
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/requests
// @desc    Create a new borrowing request
// @access  Private
router.post('/', authMiddleware, validateRequest, (req, res, next) => {
  try {
    const { itemId, startDate, endDate, message } = req.body;

    const items = readData('items');
    const item = items.find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'The requested item does not exist.'
      });
    }

    // Business Rule #1: Cannot request own item
    if (item.ownerId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot request to borrow your own listed item.'
      });
    }

    // Business Rule #2: Cannot request unavailable item
    if (item.availability === 'Unavailable') {
      return res.status(400).json({
        success: false,
        message: 'This item is currently unavailable for borrowing.'
      });
    }

    const requests = readData('requests');

    // Business Rule #3: Prevent duplicate active requests by the same borrower for the same item
    const duplicateRequest = requests.find(
      (r) =>
        r.itemId === itemId &&
        r.borrowerId === req.user.id &&
        ['Pending', 'Accepted', 'Return Requested'].includes(r.status)
    );

    if (duplicateRequest) {
      return res.status(409).json({
        success: false,
        message: `You already have an active request (${duplicateRequest.status}) for this item.`
      });
    }

    const newRequest = {
      id: `req-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemImage: item.imageUrl,
      itemCategory: item.category,
      itemCostType: item.costType,
      itemPrice: item.price,
      borrowerId: req.user.id,
      borrowerName: req.user.name,
      borrowerEmail: req.user.email,
      borrowerCollege: req.user.college,
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      ownerCollege: item.ownerCollege,
      startDate,
      endDate,
      message: message ? message.trim() : '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    requests.unshift(newRequest);
    writeData('requests', requests);

    // Notify item owner
    createNotification(
      item.ownerId,
      'New Borrowing Request',
      `${req.user.name} sent a request to borrow "${item.name}" from ${startDate} to ${endDate}.`,
      'request_received',
      newRequest.id,
      item.id
    );

    return res.status(201).json({
      success: true,
      message: 'Borrowing request sent successfully!',
      data: newRequest
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/requests/:id/accept
// @desc    Owner accepts a borrowing request
// @access  Private
router.put('/:id/accept', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const reqIndex = requests.findIndex((r) => r.id === req.params.id);

    if (reqIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Borrowing request not found.'
      });
    }

    const currentReq = requests[reqIndex];

    // Business Rule #5: Only owner can accept
    if (currentReq.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only the item owner can accept this request.'
      });
    }

    if (currentReq.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot accept request with status '${currentReq.status}'.`
      });
    }

    // Business Rule #8: An item cannot have multiple accepted active transactions
    const hasAnotherActive = requests.some(
      (r) =>
        r.itemId === currentReq.itemId &&
        r.id !== currentReq.id &&
        (r.status === 'Accepted' || r.status === 'Return Requested')
    );

    if (hasAnotherActive) {
      return res.status(409).json({
        success: false,
        message: 'This item already has an active ongoing borrowing transaction.'
      });
    }

    // Update request status
    currentReq.status = 'Accepted';
    currentReq.updatedAt = new Date().toISOString();
    requests[reqIndex] = currentReq;
    writeData('requests', requests);

    // Update item availability to Unavailable
    const items = readData('items');
    const itemIndex = items.findIndex((i) => i.id === currentReq.itemId);
    if (itemIndex !== -1) {
      items[itemIndex].availability = 'Unavailable';
      items[itemIndex].updatedAt = new Date().toISOString();
      writeData('items', items);
    }

    // Notify borrower
    createNotification(
      currentReq.borrowerId,
      'Request Accepted!',
      `${req.user.name} accepted your borrowing request for "${currentReq.itemName}".`,
      'request_accepted',
      currentReq.id,
      currentReq.itemId
    );

    return res.status(200).json({
      success: true,
      message: 'Borrowing request accepted successfully.',
      data: currentReq
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/requests/:id/reject
// @desc    Owner rejects a borrowing request
// @access  Private
router.put('/:id/reject', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const reqIndex = requests.findIndex((r) => r.id === req.params.id);

    if (reqIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Borrowing request not found.'
      });
    }

    const currentReq = requests[reqIndex];

    // Business Rule #5: Only owner can reject
    if (currentReq.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only the item owner can reject this request.'
      });
    }

    if (currentReq.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot reject request with status '${currentReq.status}'.`
      });
    }

    currentReq.status = 'Rejected';
    currentReq.updatedAt = new Date().toISOString();
    requests[reqIndex] = currentReq;
    writeData('requests', requests);

    // Notify borrower
    createNotification(
      currentReq.borrowerId,
      'Request Rejected',
      `Your request to borrow "${currentReq.itemName}" was declined by ${req.user.name}.`,
      'request_rejected',
      currentReq.id,
      currentReq.itemId
    );

    return res.status(200).json({
      success: true,
      message: 'Borrowing request rejected.',
      data: currentReq
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/requests/:id/cancel
// @desc    Borrower cancels their pending request
// @access  Private
router.put('/:id/cancel', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const reqIndex = requests.findIndex((r) => r.id === req.params.id);

    if (reqIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Borrowing request not found.'
      });
    }

    const currentReq = requests[reqIndex];

    // Only borrower can cancel
    if (currentReq.borrowerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You can only cancel your own requests.'
      });
    }

    if (currentReq.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending requests can be cancelled.'
      });
    }

    currentReq.status = 'Cancelled';
    currentReq.updatedAt = new Date().toISOString();
    requests[reqIndex] = currentReq;
    writeData('requests', requests);

    return res.status(200).json({
      success: true,
      message: 'Borrowing request cancelled.',
      data: currentReq
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/requests/:id/return
// @desc    Borrower initiates return of borrowed item
// @access  Private
router.put('/:id/return', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const reqIndex = requests.findIndex((r) => r.id === req.params.id);

    if (reqIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Borrowing transaction not found.'
      });
    }

    const currentReq = requests[reqIndex];

    // Business Rule #6: Only borrower can initiate return
    if (currentReq.borrowerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only the borrower can mark an item for return.'
      });
    }

    if (currentReq.status !== 'Accepted') {
      return res.status(400).json({
        success: false,
        message: `Cannot request return for transaction with status '${currentReq.status}'.`
      });
    }

    currentReq.status = 'Return Requested';
    currentReq.updatedAt = new Date().toISOString();
    requests[reqIndex] = currentReq;
    writeData('requests', requests);

    // Notify owner
    createNotification(
      currentReq.ownerId,
      'Return Initiated',
      `${req.user.name} has marked "${currentReq.itemName}" as returned. Please inspect and confirm receipt.`,
      'return_requested',
      currentReq.id,
      currentReq.itemId
    );

    return res.status(200).json({
      success: true,
      message: 'Return initiated. Awaiting owner confirmation.',
      data: currentReq
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/requests/:id/confirm-return
// @desc    Item owner confirms receipt of returned item
// @access  Private
router.put('/:id/confirm-return', authMiddleware, (req, res, next) => {
  try {
    const requests = readData('requests');
    const reqIndex = requests.findIndex((r) => r.id === req.params.id);

    if (reqIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Borrowing transaction not found.'
      });
    }

    const currentReq = requests[reqIndex];

    // Business Rule #7: Only owner can confirm return
    if (currentReq.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only the item owner can confirm the return.'
      });
    }

    if (currentReq.status !== 'Accepted' && currentReq.status !== 'Return Requested') {
      return res.status(400).json({
        success: false,
        message: `Cannot confirm return for transaction with status '${currentReq.status}'.`
      });
    }

    currentReq.status = 'Returned';
    currentReq.returnedAt = new Date().toISOString();
    currentReq.updatedAt = new Date().toISOString();
    requests[reqIndex] = currentReq;
    writeData('requests', requests);

    // Business Rule #10: Item must automatically become available after confirmed return
    const items = readData('items');
    const itemIndex = items.findIndex((i) => i.id === currentReq.itemId);
    if (itemIndex !== -1) {
      items[itemIndex].availability = 'Available';
      items[itemIndex].updatedAt = new Date().toISOString();
      writeData('items', items);
    }

    // Notify borrower
    createNotification(
      currentReq.borrowerId,
      'Return Confirmed',
      `${req.user.name} confirmed the return of "${currentReq.itemName}". Thank you for sharing on BorrowBox!`,
      'return_confirmed',
      currentReq.id,
      currentReq.itemId
    );

    // Also notify owner confirmation
    createNotification(
      currentReq.ownerId,
      'Item Returned & Available',
      `"${currentReq.itemName}" has been returned and is now marked Available again.`,
      'return_confirmed',
      currentReq.id,
      currentReq.itemId
    );

    return res.status(200).json({
      success: true,
      message: 'Item return confirmed and listing marked as Available.',
      data: currentReq
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
