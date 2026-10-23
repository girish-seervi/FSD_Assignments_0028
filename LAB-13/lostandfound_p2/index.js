require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

// Models
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_lost_found_p2';

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Method override support for HTML forms to send PATCH / DELETE
app.use(methodOverride('_method'));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Helper for validating MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================
// 1. DASHBOARD / HOMEPAGE
// ==========================================
app.get('/', async (req, res, next) => {
  try {
    const [
      studentCount,
      lostCount,
      foundCount,
      claimCount,
      pendingCount,
      returnedCount,
      recentLostItems,
      recentFoundItems,
      recentClaims
    ] = await Promise.all([
      Student.countDocuments(),
      LostItem.countDocuments(),
      FoundItem.countDocuments(),
      Claim.countDocuments(),
      Claim.countDocuments({ status: 'Pending' }),
      FoundItem.countDocuments({ status: 'Returned' }),
      LostItem.find().populate('reportedBy').sort({ createdAt: -1 }).limit(3),
      FoundItem.find().populate('reportedBy').sort({ createdAt: -1 }).limit(3),
      Claim.find().populate('claimedBy').populate('foundItemId').sort({ createdAt: -1 }).limit(3)
    ]);

    res.render('home', {
      studentCount,
      lostCount,
      foundCount,
      claimCount,
      pendingCount,
      returnedCount,
      recentLostItems,
      recentFoundItems,
      recentClaims
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 2. STUDENT ROUTES
// ==========================================

// List all students
app.get('/students', async (req, res, next) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json(students);
    }
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

// POST /students - Create student profile
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
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'All fields are required and cannot be empty or just spaces.' });
      }
      return res.status(400).render('student-new', {
        errorMessage: 'All fields are required and cannot be empty or just spaces.',
        formData
      });
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'Please enter a valid college email address.' });
      }
      return res.status(400).render('student-new', {
        errorMessage: 'Please enter a valid college email address.',
        formData
      });
    }

    // Check for duplicate student email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: `A student profile with the email "${email}" already exists.` });
      }
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

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(student);
    }

    res.status(201).redirect(`/students/${student._id}?success=Profile created successfully!`);
  } catch (err) {
    if (err.code === 11000) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'This email address is already registered.' });
      }
      return res.status(400).render('student-new', {
        errorMessage: 'This email address is already registered.',
        formData: req.body
      });
    }
    next(err);
  }
});

// GET /students/:id - Display one student profile
app.get('/students/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Invalid Student ID provided. Must be a valid MongoDB ObjectId.' });
      }
      return res.status(404).render('404', {
        message: 'Invalid Student ID provided. Must be a valid MongoDB ObjectId.'
      });
    }

    const student = await Student.findById(id);
    if (!student) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Student profile not found.' });
      }
      return res.status(404).render('404', {
        message: 'Student profile not found.'
      });
    }

    const [lostItems, foundItems, claims] = await Promise.all([
      LostItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
      FoundItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
      Claim.find({ claimedBy: student._id }).populate({
        path: 'foundItemId',
        populate: { path: 'reportedBy', select: 'fullName' }
      }).sort({ createdAt: -1 })
    ]);

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json({ student, lostItems, foundItems, claims });
    }

    res.render('student-profile', {
      student,
      lostItems,
      foundItems,
      claims,
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 3. LOST ITEM ROUTES
// ==========================================

// GET /lost-items - List lost-item reports
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

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json(items);
    }

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

// GET /lost-items/new - Render report lost item form
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

// POST /lost-items - Create a lost-item report
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
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'All fields are required and cannot be empty or just spaces.' });
      }
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('lost-item-new', {
        students,
        errorMessage: 'All fields are required and cannot be empty or just spaces.',
        formData
      });
    }

    if (!isValidObjectId(reportedBy)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'Selected reporting student ID is invalid.' });
      }
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('lost-item-new', {
        students,
        errorMessage: 'Selected reporting student ID is invalid.',
        formData
      });
    }

    const studentExists = await Student.findById(reportedBy);
    if (!studentExists) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'The selected reporting student does not exist.' });
      }
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

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(item);
    }

    res.status(201).redirect(`/lost-items/${item._id}?success=Lost item reported successfully!`);
  } catch (err) {
    next(err);
  }
});

// GET /lost-items/:id - Display one lost-item report
app.get('/lost-items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Invalid Lost Item ID provided. Must be a valid MongoDB ObjectId.' });
      }
      return res.status(404).render('404', {
        message: 'Invalid Lost Item ID provided. Must be a valid MongoDB ObjectId.'
      });
    }

    const item = await LostItem.findById(id).populate('reportedBy');
    if (!item) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Lost item report not found.' });
      }
      return res.status(404).render('404', {
        message: 'Lost item report not found.'
      });
    }

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json(item);
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
// 4. FOUND ITEM ROUTES
// ==========================================

// GET /found-items - List found-item reports
app.get('/found-items', async (req, res, next) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};

    if (category && category.trim()) {
      filter.category = category.trim();
    }

    if (status && status.trim()) {
      filter.status = status.trim();
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

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json(items);
    }

    res.render('found-items', {
      items,
      searchQuery: search || '',
      selectedCategory: category || '',
      selectedStatus: status || '',
      successMessage: req.query.success || null
    });
  } catch (err) {
    next(err);
  }
});

// GET /found-items/new - Render report found item form
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

// POST /found-items - Create a found-item report
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
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'All fields are required and cannot be empty or just spaces.' });
      }
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('found-item-new', {
        students,
        errorMessage: 'All fields are required and cannot be empty or just spaces.',
        formData
      });
    }

    if (!isValidObjectId(reportedBy)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'Selected reporting student ID is invalid.' });
      }
      const students = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('found-item-new', {
        students,
        errorMessage: 'Selected reporting student ID is invalid.',
        formData
      });
    }

    const studentExists = await Student.findById(reportedBy);
    if (!studentExists) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'The selected reporting student does not exist.' });
      }
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

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(item);
    }

    res.status(201).redirect(`/found-items/${item._id}?success=Found item reported successfully!`);
  } catch (err) {
    next(err);
  }
});

// GET /found-items/:id - Display one found item and its claim options
app.get('/found-items/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Invalid Found Item ID provided. Must be a valid MongoDB ObjectId.' });
      }
      return res.status(404).render('404', {
        message: 'Invalid Found Item ID provided. Must be a valid MongoDB ObjectId.'
      });
    }

    const item = await FoundItem.findById(id).populate('reportedBy');
    if (!item) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Found item report not found.' });
      }
      return res.status(404).render('404', {
        message: 'Found item report not found.'
      });
    }

    // Fetch claims for this found item and all registered students
    const [claims, students] = await Promise.all([
      Claim.find({ foundItemId: id }).populate('claimedBy').sort({ createdAt: -1 }),
      Student.find().sort({ fullName: 1 })
    ]);

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json({ item, claims });
    }

    res.render('found-item-details', {
      item,
      claims,
      students,
      successMessage: req.query.success || null,
      errorMessage: req.query.error || null
    });
  } catch (err) {
    next(err);
  }
});

// PATCH & POST /found-items/:id/status - Update item status when appropriate
const handleFoundItemStatusUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { status, reviewerId } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid Found Item ID provided.' });
    }

    const item = await FoundItem.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Found item not found.' });
    }

    const allowedStatuses = ['Found', 'Claimed', 'Returned'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` });
    }

    // Ownership check: If reviewerId supplied, verify it matches reportedBy
    if (reviewerId) {
      if (!isValidObjectId(reviewerId) || item.reportedBy.toString() !== reviewerId.toString()) {
        return res.status(403).json({ error: 'Unauthorized: Only the student who reported this item can change its status.' });
      }
    }

    // Safe update: update only the status field
    item.status = status;
    await item.save();

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json({ message: 'Found item status updated successfully', item });
    }

    res.redirect(`/found-items/${item._id}?success=Status updated to ${status}`);
  } catch (err) {
    next(err);
  }
};

app.patch('/found-items/:id/status', handleFoundItemStatusUpdate);
app.post('/found-items/:id/status', handleFoundItemStatusUpdate);

// ==========================================
// 5. CLAIMS & BUSINESS RULES WORKFLOW (PHASE 2)
// ==========================================

// POST /found-items/:id/claims - Submit a claim for a found item
app.post('/found-items/:id/claims', async (req, res, next) => {
  try {
    const { id } = req.params;
    let { claimedBy, reason } = req.body;

    reason = reason ? reason.trim() : '';
    claimedBy = claimedBy ? claimedBy.trim() : '';

    // 1. Relationship check: Check whether found item ID is a valid MongoDB ObjectId
    if (!isValidObjectId(id)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'Invalid Found Item ID format.' });
      }
      return res.status(400).render('404', { message: 'Invalid Found Item ID format.' });
    }

    // 2. Relationship check: Found item must exist in database
    const foundItem = await FoundItem.findById(id);
    if (!foundItem) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'The requested found item does not exist.' });
      }
      return res.status(404).render('404', { message: 'The requested found item does not exist.' });
    }

    // 3. State check: Once an item is marked Returned, a new claim must be rejected
    if (foundItem.status === 'Returned') {
      const errorMsg = 'Cannot submit claim: This item has already been marked as Returned to its owner.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    // 4. Input validation: Required fields
    if (!claimedBy || !reason) {
      const errorMsg = 'Both the claimant student profile and claim reason are required.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    if (reason.length < 5) {
      const errorMsg = 'Claim explanation must be at least 5 characters long with meaningful proof.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    // 5. Relationship check: Claimant must be a valid ObjectId and exist in database
    if (!isValidObjectId(claimedBy)) {
      const errorMsg = 'Invalid Student ID provided for claimant.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    const studentExists = await Student.findById(claimedBy);
    if (!studentExists) {
      const errorMsg = 'Claiming student record does not exist in the database.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: errorMsg });
      }
      return res.status(404).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    // 6. Ownership boundary: The finder who reported the item cannot claim their own found item
    if (foundItem.reportedBy.toString() === claimedBy.toString()) {
      const errorMsg = 'Invalid Claim: You cannot submit a claim for an item you reported finding.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    // 7. Duplicate-claim check: Same student cannot submit multiple active (Pending/Approved) claims
    const existingClaim = await Claim.findOne({
      foundItemId: id,
      claimedBy,
      status: { $in: ['Pending', 'Approved'] }
    });

    if (existingClaim) {
      const errorMsg = `Duplicate Claim: You have already submitted an active claim (${existingClaim.status}) for this item.`;
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${id}?error=${encodeURIComponent(errorMsg)}`);
    }

    // 8. Create new claim (starts as Pending by default)
    const newClaim = await Claim.create({
      foundItemId: id,
      claimedBy,
      reason,
      status: 'Pending'
    });

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(newClaim);
    }

    res.status(201).redirect(`/found-items/${id}?success=Claim submitted successfully! Your claim is now Pending review by the finder.`);
  } catch (err) {
    next(err);
  }
});

// PATCH & POST /claims/:id/status - Approve or reject a claim
const handleClaimStatusUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { status, reviewerId } = req.body;

    // 1. Validate Claim ID format
    if (!isValidObjectId(id)) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: 'Invalid Claim ID format.' });
      }
      return res.status(400).render('error', {
        statusCode: 400,
        title: 'Invalid Claim ID',
        message: 'The requested claim ID format is not a valid MongoDB ObjectId.'
      });
    }

    // 2. Fetch claim and populate the associated found item
    const claim = await Claim.findById(id).populate('foundItemId');
    if (!claim) {
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(404).json({ error: 'Claim record not found.' });
      }
      return res.status(404).render('404', { message: 'Claim record not found.' });
    }

    if (!claim.foundItemId) {
      return res.status(400).json({ error: 'Associated found item record is missing.' });
    }

    // 3. Validate status value (Safe Update: Only 'Approved' or 'Rejected' allowed)
    if (!status || !['Approved', 'Rejected'].includes(status)) {
      const errorMsg = 'Invalid status value. Allowed values are strictly "Approved" or "Rejected".';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${claim.foundItemId._id}?error=${encodeURIComponent(errorMsg)}`);
    }

    // 4. Ownership check: Allow ONLY the student who reported the found item to approve or reject claims
    if (!reviewerId || !isValidObjectId(reviewerId)) {
      const errorMsg = 'Reviewer Student ID is required to verify ownership before approving or rejecting a claim.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(400).json({ error: errorMsg });
      }
      return res.status(400).redirect(`/found-items/${claim.foundItemId._id}?error=${encodeURIComponent(errorMsg)}`);
    }

    const reporterId = claim.foundItemId.reportedBy.toString();
    if (reporterId !== reviewerId.toString()) {
      const errorMsg = 'Forbidden: Unauthorized approval attempt! Only the student who reported this found item is authorized to approve or reject claims.';
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(403).json({ error: errorMsg });
      }
      return res.status(403).render('error', {
        statusCode: 403,
        title: '403 Forbidden - Ownership Check Failed',
        message: errorMsg
      });
    }

    // 5. Safe update: update only the intended status field on this claim
    claim.status = status;
    await claim.save();

    // 6. State check workflow: When a claim is approved, mark found item as Returned
    if (status === 'Approved') {
      await FoundItem.findByIdAndUpdate(claim.foundItemId._id, { status: 'Returned' });

      // Automatically reject any other pending claims for this item
      await Claim.updateMany(
        { foundItemId: claim.foundItemId._id, _id: { $ne: claim._id }, status: 'Pending' },
        { status: 'Rejected' }
      );
    }

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json({
        message: `Claim successfully marked as ${status}.`,
        claim
      });
    }

    res.redirect(`/found-items/${claim.foundItemId._id}?success=Claim was successfully ${status}!${status === 'Approved' ? ' Item marked as Returned.' : ''}`);
  } catch (err) {
    next(err);
  }
};

app.patch('/claims/:id/status', handleClaimStatusUpdate);
app.post('/claims/:id/status', handleClaimStatusUpdate);

// GET /claims - All claims tracker page with status filtering
app.get('/claims', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) {
      filter.status = status;
    }

    const [claims, totalClaims, pendingClaimsCount, approvedClaimsCount, rejectedClaimsCount] = await Promise.all([
      Claim.find(filter)
        .populate('claimedBy')
        .populate({
          path: 'foundItemId',
          populate: { path: 'reportedBy', select: 'fullName department foundLocation' }
        })
        .sort({ createdAt: -1 }),
      Claim.countDocuments(),
      Claim.countDocuments({ status: 'Pending' }),
      Claim.countDocuments({ status: 'Approved' }),
      Claim.countDocuments({ status: 'Rejected' })
    ]);

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(200).json({ claims, totalClaims, pendingClaimsCount, approvedClaimsCount, rejectedClaimsCount });
    }

    res.render('claims', {
      claims,
      totalClaims,
      pendingClaimsCount,
      approvedClaimsCount,
      rejectedClaimsCount,
      selectedStatus: status || '',
      successMessage: req.query.success || null,
      errorMessage: req.query.error || null
    });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 6. 404 & ERROR HANDLING MIDDLEWARE
// ==========================================

// Catch-all 404 handler
app.use((req, res) => {
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
  }
  res.status(404).render('404', {
    message: `Page or resource not found: ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(400).json({ error: 'Validation Error', details: messages });
    }
    return res.status(400).render('error', {
      statusCode: 400,
      title: 'Validation Error',
      message: messages.join(', ')
    });
  }

  // Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(400).json({ error: 'Invalid identifier format.' });
    }
    return res.status(400).render('error', {
      statusCode: 400,
      title: 'Invalid Identifier',
      message: 'The requested resource identifier format is invalid.'
    });
  }

  const statusCode = err.status || 500;
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(statusCode).json({ error: err.message || 'Internal Server Error' });
  }
  res.status(statusCode).render('error', {
    statusCode,
    title: statusCode === 404 ? 'Not Found' : 'Server Error',
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

// ==========================================
// 7. DATABASE CONNECTION & SERVER START
// ==========================================

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Successfully connected to MongoDB.');

    app.listen(PORT, () => {
      console.log(`Campus Lost & Found Phase 2 server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('Please check your MONGODB_URL in .env');
    app.listen(PORT, () => {
      console.log(`Server started in offline mode on http://localhost:${PORT} (MongoDB not connected)`);
    });
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
