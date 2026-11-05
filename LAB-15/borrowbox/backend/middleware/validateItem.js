const ALLOWED_CATEGORIES = [
  'Books & Notes',
  'Electronics',
  'Stationery',
  'Sports Equipment',
  'Lab Equipment',
  'Accessories',
  'Others'
];

const ALLOWED_CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const validateItem = (req, res, next) => {
  const { name, description, category, condition, location, costType, price, imageUrl } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Item name is required and cannot be empty.'
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Item description is required and cannot be empty.'
    });
  }

  if (!category || !ALLOWED_CATEGORIES.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Must be one of: ${ALLOWED_CATEGORIES.join(', ')}`
    });
  }

  if (!condition || !ALLOWED_CONDITIONS.includes(condition)) {
    return res.status(400).json({
      success: false,
      message: `Invalid condition. Must be one of: ${ALLOWED_CONDITIONS.join(', ')}`
    });
  }

  if (!location || typeof location !== 'string' || !location.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Campus location is required.'
    });
  }

  const numericPrice = Number(price) || 0;
  if (numericPrice < 0) {
    return res.status(400).json({
      success: false,
      message: 'Borrowing cost cannot be negative.'
    });
  }

  if (costType === 'Paid' && numericPrice <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Paid items must have a cost greater than $0.'
    });
  }

  if (imageUrl && typeof imageUrl === 'string') {
    try {
      new URL(imageUrl);
    } catch (_) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image URL provided.'
      });
    }
  }

  next();
};

module.exports = {
  validateItem,
  ALLOWED_CATEGORIES,
  ALLOWED_CONDITIONS
};
