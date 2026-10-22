/**
 * Test Suite for Campus Lost & Found Management System - Phase 1
 * Validates Models, Schemas, Templates, Validations, and DB operations if connected.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');

const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI;

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('CAMPUS LOST & FOUND - PHASE 1 TEST SUITE');
  console.log('====================================================\n');

  // TEST SUITE 1: Model Schema & Field Validations
  console.log('1. Testing Student Model Validations:');
  const emptyStudent = new Student({});
  let emptyStudentErr;
  try { await emptyStudent.validate(); } catch (e) { emptyStudentErr = e; }
  assert(emptyStudentErr && emptyStudentErr.errors.fullName, 'Student requires fullName');
  assert(emptyStudentErr && emptyStudentErr.errors.email, 'Student requires email');
  assert(emptyStudentErr && emptyStudentErr.errors.department, 'Student requires department');
  assert(emptyStudentErr && emptyStudentErr.errors.contactNumber, 'Student requires contactNumber');

  const invalidEmailStudent = new Student({
    fullName: 'Test User',
    email: 'notanemail',
    department: 'CSE',
    contactNumber: '9876543210'
  });
  let emailErr;
  try { await invalidEmailStudent.validate(); } catch (e) { emailErr = e; }
  assert(emailErr && emailErr.errors.email, 'Student rejects invalid email format');

  const validStudentInstance = new Student({
    fullName: 'John Doe',
    email: 'john.doe@campus.edu',
    department: 'Computer Science',
    contactNumber: '+91 9876543210'
  });
  let validStudentErr = null;
  try { await validStudentInstance.validate(); } catch (e) { validStudentErr = e; }
  assert(!validStudentErr, 'Student validates with all correct fields');

  // TEST SUITE 2: LostItem Model Validations
  console.log('\n2. Testing LostItem Model Validations:');
  const emptyLost = new LostItem({});
  let emptyLostErr;
  try { await emptyLost.validate(); } catch (e) { emptyLostErr = e; }
  assert(emptyLostErr && emptyLostErr.errors.itemName, 'LostItem requires itemName');
  assert(emptyLostErr && emptyLostErr.errors.category, 'LostItem requires category');
  assert(emptyLostErr && emptyLostErr.errors.description, 'LostItem requires description');
  assert(emptyLostErr && emptyLostErr.errors.lastSeenLocation, 'LostItem requires lastSeenLocation');
  assert(emptyLostErr && emptyLostErr.errors.reportedBy, 'LostItem requires reportedBy (Student ref)');

  const validLostInstance = new LostItem({
    itemName: 'Scientific Calculator',
    category: 'Electronics',
    description: 'Casio fx-991EX',
    lastSeenLocation: 'Science Block Lab 2',
    dateLost: new Date(),
    reportedBy: new mongoose.Types.ObjectId()
  });
  let validLostErr = null;
  try { await validLostInstance.validate(); } catch (e) { validLostErr = e; }
  assert(!validLostErr, 'LostItem validates with all correct fields');
  assert(validLostInstance.status === 'Lost', 'LostItem default status is "Lost"');

  // TEST SUITE 3: FoundItem Model Validations
  console.log('\n3. Testing FoundItem Model Validations:');
  const emptyFound = new FoundItem({});
  let emptyFoundErr;
  try { await emptyFound.validate(); } catch (e) { emptyFoundErr = e; }
  assert(emptyFoundErr && emptyFoundErr.errors.itemName, 'FoundItem requires itemName');
  assert(emptyFoundErr && emptyFoundErr.errors.category, 'FoundItem requires category');
  assert(emptyFoundErr && emptyFoundErr.errors.description, 'FoundItem requires description');
  assert(emptyFoundErr && emptyFoundErr.errors.foundLocation, 'FoundItem requires foundLocation');
  assert(emptyFoundErr && emptyFoundErr.errors.reportedBy, 'FoundItem requires reportedBy (Student ref)');

  const validFoundInstance = new FoundItem({
    itemName: 'Student ID Card',
    category: 'ID Card / Documents',
    description: 'Student ID card in blue lanyard',
    foundLocation: 'Cafeteria Table 4',
    dateFound: new Date(),
    reportedBy: new mongoose.Types.ObjectId()
  });
  let validFoundErr = null;
  try { await validFoundInstance.validate(); } catch (e) { validFoundErr = e; }
  assert(!validFoundErr, 'FoundItem validates with all correct fields');
  assert(validFoundInstance.status === 'Found', 'FoundItem default status is "Found"');

  // TEST SUITE 4: EJS Template Compilation
  console.log('\n4. Testing EJS Templates:');
  const viewsDir = path.join(__dirname, 'views');
  const mockStudent = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Test Student',
    email: 'test@college.edu',
    department: 'CSE',
    contactNumber: '9876543210',
    createdAt: new Date()
  };
  const mockItem = {
    _id: new mongoose.Types.ObjectId(),
    itemName: 'Water Bottle',
    category: 'Water Bottle',
    description: 'Stainless steel bottle',
    lastSeenLocation: 'Library',
    foundLocation: 'Library',
    dateLost: new Date(),
    dateFound: new Date(),
    status: 'Lost',
    reportedBy: mockStudent,
    createdAt: new Date()
  };

  const templatesToTest = [
    { file: 'home.ejs', data: { studentCount: 1, lostCount: 1, foundCount: 1, recentLostItems: [mockItem], recentFoundItems: [mockItem] } },
    { file: 'home.ejs', data: { studentCount: 0, lostCount: 0, foundCount: 0, recentLostItems: [], recentFoundItems: [] } },
    { file: 'students.ejs', data: { students: [mockStudent], successMessage: null } },
    { file: 'students.ejs', data: { students: [], successMessage: null } },
    { file: 'student-new.ejs', data: { errorMessage: null, formData: {} } },
    { file: 'student-profile.ejs', data: { student: mockStudent, lostItems: [mockItem], foundItems: [mockItem], successMessage: null } },
    { file: 'lost-items.ejs', data: { items: [mockItem], searchQuery: '', selectedCategory: '', successMessage: null } },
    { file: 'lost-items.ejs', data: { items: [], searchQuery: 'water', selectedCategory: 'Water Bottle', successMessage: null } },
    { file: 'lost-item-new.ejs', data: { students: [mockStudent], errorMessage: null, formData: {} } },
    { file: 'lost-item-details.ejs', data: { item: mockItem, successMessage: null } },
    { file: 'found-items.ejs', data: { items: [mockItem], searchQuery: '', selectedCategory: '', successMessage: null } },
    { file: 'found-items.ejs', data: { items: [], searchQuery: '', selectedCategory: '', successMessage: null } },
    { file: 'found-item-new.ejs', data: { students: [mockStudent], errorMessage: null, formData: {} } },
    { file: 'found-item-details.ejs', data: { item: mockItem, successMessage: null } },
    { file: '404.ejs', data: { message: 'Not found' } },
    { file: 'error.ejs', data: { statusCode: 500, title: 'Server Error', message: 'Test error' } }
  ];

  for (const t of templatesToTest) {
    try {
      const rendered = await ejs.renderFile(path.join(viewsDir, t.file), t.data, { views: [viewsDir] });
      assert(rendered && rendered.length > 0, `Template ${t.file} rendered successfully`);
    } catch (e) {
      assert(false, `Template ${t.file} render error: ${e.message}`);
    }
  }

  // TEST SUITE 5: MongoDB Live Connectivity & Operations (if accessible)
  console.log('\n5. Testing Live MongoDB Database Connectivity:');
  if (!MONGODB_URL) {
    console.log('  [INFO] No MONGODB_URL configured in .env. Skipping live DB test.');
  } else {
    try {
      await mongoose.connect(MONGODB_URL, { serverSelectionTimeoutMS: 3000 });
      console.log('  [PASS] Successfully connected to MongoDB database.');
      passed++;

      // Create test student
      const testEmail = `test.student.${Date.now()}@campus.edu`;
      const createdStudent = await Student.create({
        fullName: 'Test Automation Student',
        email: testEmail,
        department: 'Electronics Engineering',
        contactNumber: '9988776655'
      });
      assert(createdStudent._id && createdStudent.email === testEmail, 'Live DB: Student record created successfully');

      // Test duplicate email rejection
      try {
        await Student.create({
          fullName: 'Duplicate Student',
          email: testEmail,
          department: 'CSE',
          contactNumber: '1122334455'
        });
        assert(false, 'Live DB: Should have rejected duplicate student email');
      } catch (dupErr) {
        assert(dupErr.code === 11000, 'Live DB: Correctly rejected duplicate student email (code 11000)');
      }

      // Create test lost item referencing student
      const createdLost = await LostItem.create({
        itemName: 'Test Keys Bundle',
        category: 'Keys / Wallets',
        description: 'Set of 3 keys with Honda keychain',
        lastSeenLocation: 'Parking Lot C',
        dateLost: new Date(),
        reportedBy: createdStudent._id
      });
      assert(createdLost._id, 'Live DB: LostItem created with Student reference');

      // Test population
      const populatedLost = await LostItem.findById(createdLost._id).populate('reportedBy');
      assert(populatedLost && populatedLost.reportedBy.fullName === 'Test Automation Student', 'Live DB: Populated reportedBy references correct student');

      // Clean up test records
      await LostItem.findByIdAndDelete(createdLost._id);
      await Student.findByIdAndDelete(createdStudent._id);
      console.log('  [INFO] Live DB: Cleaned up test records.');

      await mongoose.disconnect();
    } catch (dbErr) {
      console.log(`  [INFO] MongoDB server not reachable at current URI: ${dbErr.message}`);
      console.log('  [INFO] Configure MONGODB_URL in .env with your MongoDB Atlas connection string.');
    }
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
