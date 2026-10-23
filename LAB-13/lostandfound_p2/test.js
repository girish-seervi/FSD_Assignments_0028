/**
 * Comprehensive Automated Test Suite for Campus Lost & Found System - Phase 2
 * Tests Models, Relationships, Business Rules, Ownership Controls, HTTP Endpoints,
 * and the complete Claim-to-Return Workflow.
 */
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const app = require('./index');
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

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

// Helper to make HTTP requests against the local server
function request(serverPort, path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : '';
    const reqHeaders = {
      Accept: 'application/json',
      ...headers
    };

    if (body) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(dataString);
    }

    const options = {
      hostname: '127.0.0.1',
      port: serverPort,
      path,
      method,
      headers: reqHeaders
    };

    const req = http.request(options, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(rawData);
        } catch (e) {
          json = rawData;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json
        });
      });
    });

    req.on('error', (e) => reject(e));
    if (body) req.write(dataString);
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('CAMPUS LOST & FOUND - PHASE 2 COMPREHENSIVE SUITE');
  console.log('====================================================\n');

  // ==========================================
  // SUITE 1: Model Schema Validations
  // ==========================================
  console.log('1. Testing Model Schema Validations:');

  const emptyClaim = new Claim({});
  let emptyClaimErr;
  try { await emptyClaim.validate(); } catch (err) { emptyClaimErr = err; }
  assert(emptyClaimErr && emptyClaimErr.errors.foundItemId, 'Claim schema requires foundItemId reference');
  assert(emptyClaimErr && emptyClaimErr.errors.claimedBy, 'Claim schema requires claimedBy reference');
  assert(emptyClaimErr && emptyClaimErr.errors.reason, 'Claim schema requires reason');

  const shortReasonClaim = new Claim({
    foundItemId: new mongoose.Types.ObjectId(),
    claimedBy: new mongoose.Types.ObjectId(),
    reason: 'abc'
  });
  let shortReasonErr;
  try { await shortReasonClaim.validate(); } catch (err) { shortReasonErr = err; }
  assert(shortReasonErr && shortReasonErr.errors.reason, 'Claim schema rejects reasons shorter than 5 characters');

  const validClaimInstance = new Claim({
    foundItemId: new mongoose.Types.ObjectId(),
    claimedBy: new mongoose.Types.ObjectId(),
    reason: 'I left my Dell blue charger on the desk during 3rd period.'
  });
  let validClaimErr = null;
  try { await validClaimInstance.validate(); } catch (err) { validClaimErr = err; }
  assert(!validClaimErr, 'Claim schema validates with correct fields');
  assert(validClaimInstance.status === 'Pending', 'Default Claim status is "Pending"');

  const invalidStatusClaim = new Claim({
    foundItemId: new mongoose.Types.ObjectId(),
    claimedBy: new mongoose.Types.ObjectId(),
    reason: 'Valid proof description',
    status: 'InvalidStatus'
  });
  let invalidStatusErr;
  try { await invalidStatusClaim.validate(); } catch (err) { invalidStatusErr = err; }
  assert(invalidStatusErr && invalidStatusErr.errors.status, 'Claim schema rejects invalid status values');

  // ==========================================
  // SUITE 2: Live HTTP Endpoints & Business Rules
  // ==========================================
  if (!MONGODB_URL) {
    console.log('\n[SKIP] MONGODB_URL not found. Skipping live tests.');
  } else {
    let server;
    const TEST_PORT = 3199;

    try {
      console.log('\n2. Connecting to MongoDB & Initializing Test Server...');
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URL);
      }
      console.log('MongoDB connected.');

      await new Promise((resolve) => {
        server = app.listen(TEST_PORT, () => {
          console.log(`Test server running on port ${TEST_PORT}\n`);
          resolve();
        });
      });

      const testRunId = Date.now();

      // TEST: POST /students (Create Student A - Finder)
      console.log('3. Testing Student Creation & Retrieval:');
      const createStudentARes = await request(TEST_PORT, '/students', 'POST', {
        fullName: `Alice Finder_${testRunId}`,
        email: `alice_${testRunId}@campus.edu`,
        department: 'Electronics & Communication',
        contactNumber: '9123456780'
      });
      assert(createStudentARes.statusCode === 201, 'POST /students returns 201 Created');
      const studentA = createStudentARes.data;
      assert(studentA._id && studentA.fullName.includes('Alice'), 'Student A created successfully');

      // TEST: POST /students (Create Student B - Claimant)
      const createStudentBRes = await request(TEST_PORT, '/students', 'POST', {
        fullName: `Bob Claimant_${testRunId}`,
        email: `bob_${testRunId}@campus.edu`,
        department: 'Computer Science',
        contactNumber: '9876543210'
      });
      assert(createStudentBRes.statusCode === 201, 'POST /students creates second student');
      const studentB = createStudentBRes.data;

      // TEST: POST /students (Create Student C - Unauthorized Imposter)
      const createStudentCRes = await request(TEST_PORT, '/students', 'POST', {
        fullName: `Charlie Imposter_${testRunId}`,
        email: `charlie_${testRunId}@campus.edu`,
        department: 'Civil Engineering',
        contactNumber: '9988776655'
      });
      const studentC = createStudentCRes.data;

      // TEST: Duplicate student email validation
      const duplicateEmailRes = await request(TEST_PORT, '/students', 'POST', {
        fullName: 'Duplicate Alice',
        email: `alice_${testRunId}@campus.edu`,
        department: 'CSE',
        contactNumber: '1122334455'
      });
      assert(duplicateEmailRes.statusCode === 400, 'POST /students rejects duplicate email with 400');

      // TEST: GET /students/:id
      const getStudentRes = await request(TEST_PORT, `/students/${studentA._id}`, 'GET');
      assert(getStudentRes.statusCode === 200, 'GET /students/:id returns 200 OK');
      assert(getStudentRes.data.student.email === studentA.email, 'GET /students/:id returns correct profile');

      // TEST: GET /students/:id with invalid ID
      const invalidIdRes = await request(TEST_PORT, '/students/not-an-id', 'GET');
      assert(invalidIdRes.statusCode === 404, 'GET /students/:id returns 404 for invalid ObjectId format');

      // TEST: POST /lost-items
      console.log('\n4. Testing Lost Items:');
      const createLostRes = await request(TEST_PORT, '/lost-items', 'POST', {
        itemName: 'Blue Casio Scientific Calculator',
        category: 'Electronics',
        description: 'Model fx-991EX with physics formulas written on back cover',
        lastSeenLocation: 'Science Block Lab 2',
        dateLost: new Date().toISOString(),
        reportedBy: studentB._id
      });
      assert(createLostRes.statusCode === 201, 'POST /lost-items returns 201 Created');
      const lostItem = createLostRes.data;

      // TEST: GET /lost-items
      const listLostRes = await request(TEST_PORT, '/lost-items?search=Calculator', 'GET');
      assert(listLostRes.statusCode === 200, 'GET /lost-items returns 200 with search filtering');

      // TEST: GET /lost-items/:id
      const getLostRes = await request(TEST_PORT, `/lost-items/${lostItem._id}`, 'GET');
      assert(getLostRes.statusCode === 200, 'GET /lost-items/:id returns 200 OK');

      // TEST: POST /found-items
      console.log('\n5. Testing Found Items:');
      const createFoundRes = await request(TEST_PORT, '/found-items', 'POST', {
        itemName: 'HP Blue Backpack',
        category: 'Clothing / Accessories',
        description: 'Contains a spiral notebook and pen holder.',
        foundLocation: 'Auditorium Row F',
        dateFound: new Date().toISOString(),
        reportedBy: studentA._id
      });
      assert(createFoundRes.statusCode === 201, 'POST /found-items returns 201 Created');
      const foundItem = createFoundRes.data;
      assert(foundItem.status === 'Found', 'FoundItem default status is "Found"');

      // TEST: GET /found-items
      const listFoundRes = await request(TEST_PORT, '/found-items', 'GET');
      assert(listFoundRes.statusCode === 200, 'GET /found-items returns 200 OK');

      // TEST: GET /found-items/:id
      const getFoundRes = await request(TEST_PORT, `/found-items/${foundItem._id}`, 'GET');
      assert(getFoundRes.statusCode === 200, 'GET /found-items/:id returns 200 OK with claims list');

      // ==========================================
      // BUSINESS RULE TESTS: CLAIMS WORKFLOW
      // ==========================================
      console.log('\n6. Testing Phase 2 Claims & Business Rules Workflow:');

      // RULE: Self-claim rejection
      const selfClaimRes = await request(TEST_PORT, `/found-items/${foundItem._id}/claims`, 'POST', {
        claimedBy: studentA._id,
        reason: 'I am claiming the item that I reported myself.'
      });
      assert(selfClaimRes.statusCode === 400, 'Self-Claim Prevention: Finder claiming own found item returns 400 Bad Request');

      // RULE: Successful Claim Submission by Student B
      const submitClaimRes = await request(TEST_PORT, `/found-items/${foundItem._id}/claims`, 'POST', {
        claimedBy: studentB._id,
        reason: 'The blue HP backpack has my physics notebook inside with my name Bob.'
      });
      assert(submitClaimRes.statusCode === 201, 'POST /found-items/:id/claims creates claim with 201 Created');
      const claim = submitClaimRes.data;
      assert(claim.status === 'Pending', 'New claim starts in "Pending" status');

      // RULE: Duplicate-Claim Prevention
      const duplicateClaimRes = await request(TEST_PORT, `/found-items/${foundItem._id}/claims`, 'POST', {
        claimedBy: studentB._id,
        reason: 'Second attempt to claim the exact same item.'
      });
      assert(duplicateClaimRes.statusCode === 400, 'Duplicate-Claim Prevention: Second claim by same student returns 400 Bad Request');

      // RULE: Relationship check on missing student
      const fakeStudentClaimRes = await request(TEST_PORT, `/found-items/${foundItem._id}/claims`, 'POST', {
        claimedBy: new mongoose.Types.ObjectId(),
        reason: 'Valid reason but non-existent student record.'
      });
      assert(fakeStudentClaimRes.statusCode === 404, 'Relationship Check: Claim with missing student returns 404 Not Found');

      // RULE: Ownership check - Unauthorized Approval attempt by Student C
      console.log('\n7. Testing Ownership Check & Security Controls:');
      const unauthorizedApprovalRes = await request(TEST_PORT, `/claims/${claim._id}/status`, 'PATCH', {
        reviewerId: studentC._id,
        status: 'Approved'
      });
      assert(unauthorizedApprovalRes.statusCode === 403, 'Ownership Check: Unauthorized approval attempt by Student C rejected with 403 Forbidden');

      // RULE: Invalid status update attempt
      const invalidStatusRes = await request(TEST_PORT, `/claims/${claim._id}/status`, 'PATCH', {
        reviewerId: studentA._id,
        status: 'InvalidStatus'
      });
      assert(invalidStatusRes.statusCode === 400, 'Safe Update: Invalid status value rejected with 400 Bad Request');

      // RULE: Authorized Approval by Student A (The Finder) & Safe Update
      console.log('\n8. Testing Authorized Approval & Item Return Transition:');
      const authorizedApprovalRes = await request(TEST_PORT, `/claims/${claim._id}/status`, 'PATCH', {
        reviewerId: studentA._id,
        status: 'Approved'
      });
      assert(authorizedApprovalRes.statusCode === 200, 'PATCH /claims/:id/status by authorized finder returns 200 OK');
      assert(authorizedApprovalRes.data.claim.status === 'Approved', 'Claim status safely updated to "Approved"');

      // RULE: Automatic Item Status update to Returned
      const verifyItemRes = await request(TEST_PORT, `/found-items/${foundItem._id}`, 'GET');
      assert(verifyItemRes.data.item.status === 'Returned', 'State Transition: FoundItem status automatically transitioned to "Returned"');

      // RULE: State Check - Prevent claims on Returned item
      console.log('\n9. Testing State Check (Reject claims on Returned item):');
      const claimOnReturnedRes = await request(TEST_PORT, `/found-items/${foundItem._id}/claims`, 'POST', {
        claimedBy: studentC._id,
        reason: 'Trying to claim an item that was already returned.'
      });
      assert(claimOnReturnedRes.statusCode === 400, 'State Check: Attempting to claim an already "Returned" item rejected with 400 Bad Request');

      // RULE: PATCH /found-items/:id/status
      console.log('\n10. Testing PATCH /found-items/:id/status:');
      const updateItemStatusRes = await request(TEST_PORT, `/found-items/${foundItem._id}/status`, 'PATCH', {
        reviewerId: studentA._id,
        status: 'Returned'
      });
      assert(updateItemStatusRes.statusCode === 200, 'PATCH /found-items/:id/status updates status with 200 OK');

      // TEST: GET /claims tracker endpoint
      console.log('\n11. Testing Claims Tracker & Filtering:');
      const getClaimsRes = await request(TEST_PORT, '/claims?status=Approved', 'GET');
      assert(getClaimsRes.statusCode === 200, 'GET /claims returns 200 OK with status filtering');
      assert(getClaimsRes.data.claims && getClaimsRes.data.claims.length > 0, 'Claims tracker returns approved claim records');

      // Cleanup test documents
      await Claim.deleteMany({ _id: claim._id });
      await FoundItem.deleteMany({ _id: foundItem._id });
      await LostItem.deleteMany({ _id: lostItem._id });
      await Student.deleteMany({ _id: { $in: [studentA._id, studentB._id, studentC._id] } });
      console.log('\nDatabase cleanup completed successfully.');

      server.close();
      await mongoose.disconnect();
    } catch (err) {
      console.error('Error during live integration tests:', err);
      if (server) server.close();
      failed++;
    }
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
