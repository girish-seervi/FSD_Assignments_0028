require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Models
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_lost_found';

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper for validating MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================
// ROUTES
// ==========================================

// 1. Dashboard / Homepage
app.get('/', async (req, res, next) => {
  try {
    const [studentCount, lostCount, foundCount, recentLostItems, recentFoundItems] = await Promise.all([
      Student.countDocuments(),
      LostItem.countDocuments(),
      FoundItem.countDocuments(),
      LostItem.find().populate('reportedBy').sort({ createdAt: -1 }).limit(3),
      FoundItem.find().populate('reportedBy').sort({ createdAt: -1 }).limit(3)
    ]);

    res.render('home', {
      studentCount,
      lostCount,
      foundCount,
      recentLostItems,
      recentFoundItems
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// STUDENT ROUTES
// ==========================================

// List all students
app.get('/students', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    res.render('students', {
      students,
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// Render register student form
app.get('/students/new', (req, res) => {
  res.render('student-new', {
    errorMessage: null,
    formData: {}
  });
});

// Create student profile
app.post('/students', async (req, res, next) => {
  try {
    let { fullName, email, department, contactNumber } = req.body;

    fullName = fullName ? fullName.trim() : '';
    email = email ? email.trim().toLowerCase() : '';
    department = department ? department.trim() : '';
    contactNumber = contactNumber ? contactNumber.trim() : '';

    const formData = { fullName, email, department, contactNumber };

    // Validation for empty or whitespace-only fields
    if (!fullName || !email || !department || !contactNumber) {
      return res.status(400).render('student-new', {
        errorMessage: 'All fields are required and cannot be empty or just spaces.',
        formData
      });
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).render('student-new', {
        errorMessage: 'Please enter a valid college email address.',
        formData
      });
    }

    // Check for duplicate student email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).render('student-new', {
        errorMessage: `A student profile with the email "${email}" already exists.`,
        formData
      });
    }

    const student = await Student.create({
      fullName,
      email,
      department,
      contactNumber
    });

    res.status(201).redirect(`/students/${student._id}?success=Profile created successfully!`);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).render('student-new', {
        errorMessage: 'This email address is already registered.',
        formData: req.body
      });
    }
    next(err);
  }
});

// Display one student profile
app.get('/students/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).render('404', {
        message: 'Invalid Student ID provided. Must be a valid MongoDB ObjectId.'
      });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).render('404', {
        message: 'Student profile not found.'
      });
    }

    const [lostItems, foundItems] = await Promise.all([
      LostItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
      FoundItem.find({ reportedBy: student._id }).sort({ createdAt: -1 })
    ]);

    res.render('student-profile', {
      student,
      lostItems,
      foundItems,
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// LOST ITEM ROUTES
// ==========================================

// List lost items with search and filter
app.get('/lost-items', async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (category && category.trim()) {
      filter.category = category.trim();
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { itemName: searchRegex },
        { description: searchRegex },
        { lastSeenLocation: searchRegex }
      ];
    }

    const items = await LostItem.find(filter).populate('reportedBy').sort({ createdAt: -1 });

    res.render('lost-items', {
      items,
      searchQuery: search || '',
      selectedCategory: category || '',
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// Render report lost item form
app.get('/lost-items/new', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    res.render('lost-item-new', {
      students,
      errorMessage: null,
      formData: {}
    });
  } catch (err) {
    next(err);
  }
});

// Create lost item report
app.post('/lost-items', async (req, res, next) => {
  try {
    let { itemName, category, description, lastSeenLocation, dateLost, reportedBy } = req.body;

    itemName = itemName ? itemName.trim() : '';
    category = category ? category.trim() : '';
    description = description ? description.trim() : '';
    lastSeenLocation = lastSeenLocation ? lastSeenLocation.trim() : '';
    reportedBy = reportedBy ? reportedBy.trim() : '';

    const formData = { itemName, category, description, lastSeenLocation, dateLost, reportedBy };

    if (!itemName || !category || !description || !lastSeenLocation || !dateLost || !reportedBy) {
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('lost-item-new', {
        students,
        errorMessage: 'All fields are required and cannot be empty or just spaces.',
        formData
      });
    }

    if (!isValidObjectId(reportedBy)) {
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('lost-item-new', {
        students,
        errorMessage: 'Selected reporting student ID is invalid.',
        formData
      });
    }

    const studentExists = await Student.findById(reportedBy);
    if (!studentExists) {
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('lost-item-new', {
        students,
        errorMessage: 'The selected reporting student does not exist.',
        formData
      });
    }

    const item = await LostItem.create({
      itemName,
      category,
      description,
      lastSeenLocation,
      dateLost: new Date(dateLost),
      reportedBy
    });

    res.status(201).redirect(`/lost-items/${item._id}?success=Lost item reported successfully!`);
  } catch (err) {
    next(err);
  }
});

// Display one lost item report
app.get('/lost-items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).render('404', {
        message: 'Invalid Lost Item ID provided. Must be a valid MongoDB ObjectId.'
      });
    }

    const item = await LostItem.findById(id).populate('reportedBy');
    if (!item) {
      return res.status(404).render('404', {
        message: 'Lost item report not found.'
      });
    }

    res.render('lost-item-details', {
      item,
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// FOUND ITEM ROUTES
// ==========================================

// List found items with search and filter
app.get('/found-items', async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (category && category.trim()) {
      filter.category = category.trim();
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { itemName: searchRegex },
        { description: searchRegex },
        { foundLocation: searchRegex }
      ];
    }

    const items = await FoundItem.find(filter).populate('reportedBy').sort({ createdAt: -1 });

    res.render('found-items', {
      items,
      searchQuery: search || '',
      selectedCategory: category || '',
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// Render report found item form
app.get('/found-items/new', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    res.render('found-item-new', {
      students,
      errorMessage: null,
      formData: {}
    });
  } catch (err) {
    next(err);
  }
});

// Create found item report
app.post('/found-items', async (req, res, next) => {
  try {
    let { itemName, category, description, foundLocation, dateFound, reportedBy } = req.body;

    itemName = itemName ? itemName.trim() : '';
    category = category ? category.trim() : '';
    description = description ? description.trim() : '';
    foundLocation = foundLocation ? foundLocation.trim() : '';
    reportedBy = reportedBy ? reportedBy.trim() : '';

    const formData = { itemName, category, description, foundLocation, dateFound, reportedBy };

    if (!itemName || !category || !description || !foundLocation || !dateFound || !reportedBy) {
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('found-item-new', {
        students,
        errorMessage: 'All fields are required and cannot be empty or just spaces.',
        formData
      });
    }

    if (!isValidObjectId(reportedBy)) {
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('found-item-new', {
        students,
        errorMessage: 'Selected reporting student ID is invalid.',
        formData
      });
    }

    const studentExists = await Student.findById(reportedBy);
    if (!studentExists) {
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('found-item-new', {
        students,
        errorMessage: 'The selected reporting student does not exist.',
        formData
      });
    }

    const item = await FoundItem.create({
      itemName,
      category,
      description,
      foundLocation,
      dateFound: new Date(dateFound),
      reportedBy
    });

    res.status(201).redirect(`/found-items/${item._id}?success=Found item reported successfully!`);
  } catch (err) {
    next(err);
  }
});

// Display one found item report
app.get('/found-items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).render('404', {
        message: 'Invalid Found Item ID provided. Must be a valid MongoDB ObjectId.'
      });
    }

    const item = await FoundItem.findById(id).populate('reportedBy');
    if (!item) {
      return res.status(404).render('404', {
        message: 'Found item report not found.'
      });
    }

    res.render('found-item-details', {
      item,
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 404 & ERROR HANDLING MIDDLEWARE
// ==========================================

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    message: `Page not found: ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).render('error', {
      statusCode: 400,
      title: 'Validation Error',
      message: messages.join(', ')
    });
  }

  // Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).render('error', {
      statusCode: 400,
      title: 'Invalid Identifier',
      message: 'The requested resource identifier format is invalid.'
    });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).render('error', {
    statusCode,
    title: statusCode === 404 ? 'Not Found' : 'Server Error',
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

// ==========================================
// DATABASE CONNECTION & SERVER START
// ==========================================

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Successfully connected to MongoDB.');

    app.listen(PORT, () => {
      console.log(`Campus Lost & Found server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('Please check your MONGODB_URL in .env');
    // Start server anyway so error handling and offline experience can be viewed
    app.listen(PORT, () => {
      console.log(`Server started in offline mode on http://localhost:${PORT} (MongoDB not connected)`);
    });
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
