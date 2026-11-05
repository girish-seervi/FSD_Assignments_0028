const validateRequest = (req, res, next) => {
  const { itemId, startDate, endDate } = req.body;

  if (!itemId) {
    return res.status(400).json({
      success: false,
      message: 'Item ID is required to create a borrowing request.'
    });
  }

  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: 'Start date and expected return date are required.'
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date format provided. Please use YYYY-MM-DD.'
    });
  }

  // Today at 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If start is before today (comparing timestamps with today's beginning)
  const startDay = new Date(startDate);
  startDay.setHours(0, 0, 0, 0);
  if (startDay < today) {
    return res.status(400).json({
      success: false,
      message: 'Borrowing start date cannot be in the past.'
    });
  }

  if (end <= start) {
    return res.status(400).json({
      success: false,
      message: 'Expected return date must be strictly after the start date.'
    });
  }

  next();
};

module.exports = validateRequest;
