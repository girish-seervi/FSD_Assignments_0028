const express = require('express');
const { readData, writeData } = require('../utils/database');
const authMiddleware = require('../middleware/authMiddleware');
const { validateItem } = require('../middleware/validateItem');

const router = express.Router();

// Helper to normalize category matching
const normalizeCategory = (cat) => {
  if (!cat || cat.toLowerCase() === 'all') return null;
  const lower = cat.toLowerCase();
  if (lower.includes('book')) return 'Books & Notes';
  if (lower.includes('elect')) return 'Electronics';
  if (lower.includes('station')) return 'Stationery';
  if (lower.includes('sport')) return 'Sports Equipment';
  if (lower.includes('lab')) return 'Lab Equipment';
  if (lower.includes('access')) return 'Accessories';
  if (lower.includes('other')) return 'Others';
  return cat;
};

// @route   GET /api/items/my-listings
// @desc    Get all listings belonging to current authenticated user
// @access  Private
router.get('/my-listings', authMiddleware, (req, res, next) => {
  try {
    const items = readData('items');
    const requests = readData('requests');

    const myListings = items
      .filter((item) => item.ownerId === req.user.id)
      .map((item) => {
        // Count total requests and active requests for this item
        const itemRequests = requests.filter((r) => r.itemId === item.id);
        const pendingCount = itemRequests.filter((r) => r.status === 'Pending').length;
        const activeCount = itemRequests.filter(
          (r) => r.status === 'Accepted' || r.status === 'Return Requested'
        ).length;
        return {
          ...item,
          requestCount: itemRequests.length,
          pendingRequestsCount: pendingCount,
          activeTransactionCount: activeCount
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: myListings.length,
      data: myListings
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/items
// @desc    Get all items with search, category, condition, availability, cost filter and sorting
// @access  Public
router.get('/', (req, res, next) => {
  try {
    const {
      search,
      category,
      condition,
      availability,
      costType,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    let items = readData('items');

    // Filter by search query
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.location && item.location.toLowerCase().includes(q))
      );
    }

    // Filter by category
    const cat = normalizeCategory(category);
    if (cat) {
      items = items.filter((item) => item.category === cat);
    }

    // Filter by condition
    if (condition && condition.toLowerCase() !== 'all') {
      items = items.filter(
        (item) => item.condition.toLowerCase() === condition.toLowerCase()
      );
    }

    // Filter by availability
    if (availability && availability.toLowerCase() !== 'all') {
      items = items.filter(
        (item) => item.availability.toLowerCase() === availability.toLowerCase()
      );
    }

    // Filter by costType (Free / Paid)
    if (costType && costType.toLowerCase() !== 'all') {
      items = items.filter(
        (item) => item.costType.toLowerCase() === costType.toLowerCase()
      );
    }

    // Sorting
    switch (sort) {
      case 'oldest':
        items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-asc':
        items.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-desc':
        items.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'recently-added':
      default:
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    // Pagination
    const totalItems = items.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = items.slice(startIndex, startIndex + limitNum);

    return res.status(200).json({
      success: true,
      total: totalItems,
      page: pageNum,
      totalPages: Math.ceil(totalItems / limitNum) || 1,
      limit: limitNum,
      data: paginatedItems
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/items/:id
// @desc    Get detailed information for a single item
// @access  Public
router.get('/:id', (req, res, next) => {
  try {
    const items = readData('items');
    const item = items.find((i) => i.id === req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found.'
      });
    }

    // Also get active requests if any to display availability schedule
    const requests = readData('requests');
    const activeRequests = requests
      .filter(
        (r) =>
          r.itemId === item.id &&
          (r.status === 'Accepted' || r.status === 'Return Requested')
      )
      .map((r) => ({
        startDate: r.startDate,
        endDate: r.endDate,
        status: r.status
      }));

    return res.status(200).json({
      success: true,
      data: {
        ...item,
        activeSchedules: activeRequests
      }
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/items
// @desc    Create a new item listing
// @access  Private
router.post('/', authMiddleware, validateItem, (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      condition,
      imageUrl,
      location,
      costType,
      price
    } = req.body;

    const items = readData('items');

    const defaultImages = {
      'Books & Notes': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'Electronics': 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
      'Stationery': 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80',
      'Sports Equipment': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
      'Lab Equipment': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'Accessories': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'Others': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    };

    const finalImage =
      imageUrl && imageUrl.trim()
        ? imageUrl.trim()
        : defaultImages[category] || defaultImages['Others'];

    const newItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      category,
      condition,
      imageUrl: finalImage,
      location: location.trim(),
      costType: costType === 'Paid' ? 'Paid' : 'Free',
      price: costType === 'Paid' ? Math.max(0, Number(price) || 0) : 0,
      availability: 'Available',
      ownerId: req.user.id,
      ownerName: req.user.name,
      ownerCollege: req.user.college,
      createdAt: new Date().toISOString()
    };

    items.unshift(newItem);
    writeData('items', items);

    return res.status(201).json({
      success: true,
      message: 'Item listing created successfully!',
      data: newItem
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item listing
// @access  Private
router.put('/:id', authMiddleware, validateItem, (req, res, next) => {
  try {
    const items = readData('items');
    const index = items.findIndex((i) => i.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found.'
      });
    }

    const item = items[index];

    // Authorization check
    if (item.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You can only edit your own listings.'
      });
    }

    const {
      name,
      description,
      category,
      condition,
      imageUrl,
      location,
      costType,
      price,
      availability
    } = req.body;

    const updatedItem = {
      ...item,
      name: name.trim(),
      description: description.trim(),
      category,
      condition,
      imageUrl: imageUrl && imageUrl.trim() ? imageUrl.trim() : item.imageUrl,
      location: location.trim(),
      costType: costType === 'Paid' ? 'Paid' : 'Free',
      price: costType === 'Paid' ? Math.max(0, Number(price) || 0) : 0,
      availability:
        availability === 'Unavailable' ? 'Unavailable' : 'Available',
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedItem;
    writeData('items', items);

    return res.status(200).json({
      success: true,
      message: 'Item listing updated successfully.',
      data: updatedItem
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/items/:id/availability
// @desc    Toggle item availability (Available / Unavailable)
// @access  Private
router.put('/:id/availability', authMiddleware, (req, res, next) => {
  try {
    const items = readData('items');
    const index = items.findIndex((i) => i.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found.'
      });
    }

    const item = items[index];
    if (item.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not own this item.'
      });
    }

    const { availability } = req.body;
    const targetStatus = availability === 'Unavailable' ? 'Unavailable' : 'Available';

    // If attempting to mark available while active borrowing exists
    if (targetStatus === 'Available') {
      const requests = readData('requests');
      const hasActive = requests.some(
        (r) =>
          r.itemId === item.id &&
          (r.status === 'Accepted' || r.status === 'Return Requested')
      );
      if (hasActive) {
        return res.status(400).json({
          success: false,
          message: 'Cannot mark as Available while an active borrowing transaction is ongoing.'
        });
      }
    }

    items[index].availability = targetStatus;
    items[index].updatedAt = new Date().toISOString();
    writeData('items', items);

    return res.status(200).json({
      success: true,
      message: `Item marked as ${targetStatus}.`,
      data: items[index]
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item listing
// @access  Private
router.delete('/:id', authMiddleware, (req, res, next) => {
  try {
    const items = readData('items');
    const item = items.find((i) => i.id === req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found.'
      });
    }

    // Authorization
    if (item.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You can only delete your own listings.'
      });
    }

    // Business rule #9: A user cannot delete an item with an active borrowing transaction
    const requests = readData('requests');
    const hasActiveBorrowing = requests.some(
      (r) =>
        r.itemId === item.id &&
        (r.status === 'Accepted' || r.status === 'Return Requested')
    );

    if (hasActiveBorrowing) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete item: There is currently an active borrowing transaction in progress.'
      });
    }

    // Remove item
    const updatedItems = items.filter((i) => i.id !== req.params.id);
    writeData('items', updatedItems);

    // Also clean up favorites
    const favorites = readData('favorites');
    const updatedFavorites = favorites.filter((f) => f.itemId !== req.params.id);
    writeData('favorites', updatedFavorites);

    return res.status(200).json({
      success: true,
      message: 'Item listing deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
