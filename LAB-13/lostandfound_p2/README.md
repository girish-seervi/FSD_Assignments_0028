# Campus Lost & Found Management System — Phase 2

A complete, production-grade web application designed for university campuses to streamline lost-and-found management. Built strictly with **Node.js, Express.js, EJS, and MongoDB / Mongoose**, Phase 2 extends the core foundation with **item ownership claims, strict backend ownership verification, lifecycle state enforcement, duplicate claim prevention, and full claim-to-return resolution**.

---

## 1. Phase 2 Key Features & Enhancements

Phase 2 introduces the complete **Claim and Return Lifecycle** along with robust business rules:
- **Claim Model & Relationships:** A dedicated `Claim` collection linking a found item to the student submitting the claim, complete with proof of ownership, timestamps, and status lifecycle (`Pending`, `Approved`, `Rejected`).
- **Strict Ownership Verification:** Only the student who reported finding an item is authorized to review, approve, or reject claims for that item. Attempts by unauthorized students are rejected by the backend with HTTP `403 Forbidden`.
- **State Check & Automatic Item Transition:** Approving a claim automatically updates the item's status to `Returned`, closes conflicting pending claims, and permanently disables further claims on that item.
- **Duplicate & Self-Claim Prevention:** Students cannot submit multiple active claims for the same item, and the student who found an item is prevented from claiming it themselves.
- **Safe Updates:** Document updates strictly modify intended status fields, preserving the integrity of user and claim records.
- **Interactive UI & Claims Tracker:** Real-time dashboards, dynamic status badges (`badge-pending`, `badge-approved`, `badge-rejected`, `badge-returned`), filterable claims tracker, and inline review controls.
- **Comprehensive Automated Test Suite:** 35 automated unit and end-to-end integration tests verifying every business rule, model constraint, and HTTP status code.

---

## 2. Technology Stack

- **Runtime Environment:** Node.js (v18+)
- **Backend Framework:** Express.js (v5)
- **Templating Engine:** EJS (Embedded JavaScript)
- **Database:** MongoDB (Local or MongoDB Atlas)
- **Object Data Modeling (ODM):** Mongoose (v9)
- **HTTP Method Override:** `method-override` (supporting RESTful `PATCH` actions from standard HTML browser forms)
- **Environment Management:** `dotenv`
- **Styling:** Vanilla CSS (Responsive, accessible, clean UI components)

---

## 3. Installation & Setup Instructions

### Prerequisites
- Node.js installed on your machine (`node -v`)
- MongoDB Atlas cluster URI or running local MongoDB daemon

### Setup Steps
1. **Navigate to the Phase 2 project directory:**
   ```bash
   cd LAB-13/lostandfound_p2
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   A sample `.env.example` file is included in the repository. Create or verify `.env`:
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables:
   ```env
   PORT=3000
   MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/campus_lost_found_p2?retryWrites=true&w=majority
   ```

4. **Run the Automated Test Suite:**
   Execute all 35 unit, integration, and security checks:
   ```bash
   npm test
   ```

5. **Start the Application:**
   - Standard / Production start:
     ```bash
     npm start
     ```
   - Development mode with live reload:
     ```bash
     npm run dev
     ```

6. **Open in Browser:**
   ```
   http://localhost:3000
   ```

---

## 4. Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Local port number for Express web server | `3000` |
| `MONGODB_URL` | MongoDB connection string (Atlas or Local) | `mongodb://127.0.0.1:27017/campus_lost_found_p2` |

---

## 5. Database Design & Entity Relationships

The database utilizes four Mongoose collections interconnected by MongoDB `ObjectId` references:

```
  ┌─────────────────────────────────────────────────────────┐
  │                         Student                         │
  ├─────────────────────────────────────────────────────────┤
  │ _id: ObjectId                                           │
  │ fullName: String                                        │
  │ email: String (unique)                                  │
  │ department: String                                      │
  │ contactNumber: String                                   │
  └──────────┬───────────────────────────────┬──────────────┘
             │ 1                             │ 1
             │                               │
             ▼ reportedBy                    ▼ claimedBy
  ┌───────────────────────────┐   ┌───────────────────────────┐
  │         FoundItem         │   │           Claim           │
  ├───────────────────────────┤   ├───────────────────────────┤
  │ _id: ObjectId             │   │ _id: ObjectId             │
  │ itemName: String          │   │ foundItemId: ObjectId ────┼─┐
  │ category: String          │   │ claimedBy: ObjectId       │ │
  │ description: String       │   │ reason: String            │ │
  │ foundLocation: String     │   │ status: Enum              │ │
  │ dateFound: Date           │   │   ['Pending',             │ │
  │ status: Enum              │   │    'Approved',            │ │
  │   ['Found', 'Claimed',    │   │    'Rejected']            │ │
  │    'Returned']            │   │ createdAt: Date           │ │
  │ reportedBy: ObjectId      │   └───────────────────────────┘ │
  └──────────▲────────────────┘                                 │
             │                                                  │
             └────────────────── links to ──────────────────────┘
```

### Models Overview
1. **`Student` (`models/Student.js`):**
   - Stores student identity (`fullName`, `email`, `department`, `contactNumber`).
   - `email` is unique and validated with college format regex.
2. **`LostItem` (`models/LostItem.js`):**
   - Details of items lost by students (`itemName`, `category`, `description`, `lastSeenLocation`, `dateLost`, `status`, `reportedBy`).
3. **`FoundItem` (`models/FoundItem.js`):**
   - Details of items found on campus (`itemName`, `category`, `description`, `foundLocation`, `dateFound`, `status`, `reportedBy`).
   - Lifecycle: starts as `'Found'`; transitions to `'Returned'` upon verified claim approval.
4. **`Claim` (`models/Claim.js`):**
   - Links a `Student` to a `FoundItem`.
   - Fields: `foundItemId`, `claimedBy`, `reason`, `status` (`'Pending'`, `'Approved'`, `'Rejected'`), `createdAt`.
   - Compound index on `{ foundItemId: 1, claimedBy: 1 }` for high-performance lookup and duplicate mitigation.

---

## 6. Required Routes & Endpoint Documentation

| HTTP Method | Route | Description / Purpose | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Dashboard with stats, recent items, and recent claims feed | `200` |
| **GET** | `/students` | List all registered students directory | `200` |
| **GET** | `/students/new` | Render student registration form | `200` |
| **POST** | `/students` | Create a new student profile | `201`, `400` |
| **GET** | `/students/:id` | Display student profile, reported items & submitted claims | `200`, `404` |
| **GET** | `/lost-items` | List lost-item reports with search & category filter | `200` |
| **GET** | `/lost-items/new` | Render form to report lost item | `200` |
| **POST** | `/lost-items` | Create a lost-item report | `201`, `400` |
| **GET** | `/lost-items/:id` | Display one lost-item report with reporter details | `200`, `404` |
| **GET** | `/found-items` | List found-item reports with search, category & status filter | `200` |
| **GET** | `/found-items/new` | Render form to report found item | `200` |
| **POST** | `/found-items` | Create a found-item report | `201`, `400` |
| **GET** | `/found-items/:id` | Display one found item, claims list, and claim submission form | `200`, `404` |
| **POST** | `/found-items/:id/claims` | **Submit a claim for a found item** | `201`, `400`, `404` |
| **PATCH / POST** | `/claims/:id/status` | **Approve or reject a claim (Ownership verified)** | `200`, `400`, `403`, `404` |
| **PATCH / POST** | `/found-items/:id/status` | Update found item status when appropriate | `200`, `400`, `403`, `404` |
| **GET** | `/claims` | Global Claims Tracker with status filters (`Pending`, `Approved`, `Rejected`) | `200` |

*Note: For maximum interoperability with HTML forms and API tools (curl / Postman), the update endpoints accept both native `PATCH` and browser `POST` with `_method=PATCH`.*

---

## 7. Required Thinking Challenges & Business Rule Solutions

### 1. Ownership Check
- **Challenge:** If Student A reported a found item, Student B must not be able to approve a claim for it by tampering with an ID in the URL or request body.
- **Implementation:**
  In `PATCH /claims/:id/status`, the backend loads the claim and populates `claim.foundItemId`. It compares the reporting student's ID (`foundItem.reportedBy.toString()`) with the requester's `reviewerId`.
  If they do not match, the backend immediately halts execution and returns HTTP **`403 Forbidden`**:
  ```javascript
  const reporterId = claim.foundItemId.reportedBy.toString();
  if (reporterId !== reviewerId.toString()) {
    return res.status(403).render('error', {
      statusCode: 403,
      title: '403 Forbidden - Ownership Check Failed',
      message: 'Unauthorized: Only the student who reported this found item can approve or reject claims.'
    });
  }
  ```
  This is strictly enforced server-side, preventing any client-side spoofing.

### 2. Relationship Check
- **Challenge:** A claim must refer to an existing found item and an existing student. It must not be saved if either record is missing.
- **Implementation:**
  Before saving any claim in `POST /found-items/:id/claims`:
  1. Validates that both `foundItemId` and `claimedBy` are valid 24-character hexadecimal MongoDB ObjectIds.
  2. Queries `FoundItem.findById(id)`. If `null`, returns `404 Not Found`.
  3. Queries `Student.findById(claimedBy)`. If `null`, returns `404 Not Found`.

### 3. State Check
- **Challenge:** Once an item is marked `Returned`, a new claim must be rejected.
- **Implementation:**
  Enforced directly in the backend in `POST /found-items/:id/claims`:
  ```javascript
  if (foundItem.status === 'Returned') {
    return res.status(400).json({
      error: 'Cannot submit claim: This item has already been marked as Returned to its owner.'
    });
  }
  ```
  Additionally, on `GET /found-items/:id`, when `item.status === 'Returned'`, the claim submission form is automatically disabled and replaced with a green return confirmation banner.

### 4. Duplicate-Claim Check & Self-Claim Prevention
- **Challenge:** Handle multiple claims by the same student for the same found item.
- **Implementation:**
  - **Duplicate Check Rule:** A student cannot submit a new claim if they already have an active (`Pending` or `Approved`) claim for that item:
    ```javascript
    const existingClaim = await Claim.findOne({
      foundItemId: id,
      claimedBy,
      status: { $in: ['Pending', 'Approved'] }
    });
    if (existingClaim) {
      return res.status(400).json({ error: 'Duplicate Claim: You have already submitted an active claim for this item.' });
    }
    ```
  - **Self-Claim Rule:** A student cannot claim an item they reported finding (`foundItem.reportedBy.equals(claimedBy)`). Returns `400 Bad Request`.

### 5. Safe Update
- **Challenge:** When changing a claim's status, update only the intended fields without overwriting unrelated data.
- **Implementation:**
  Rather than performing blind updates (e.g. `req.body` replacement), the backend explicitly validates the status against allowed values (`'Approved'` or `'Rejected'`) and modifies only `claim.status`:
  ```javascript
  claim.status = status;
  await claim.save();
  ```
  When a claim is marked `'Approved'`, the system atomically:
  1. Sets `foundItem.status = 'Returned'`.
  2. Automatically transitions any other pending claims for this item to `'Rejected'` to maintain consistent state.

---

## 8. Step-by-Step Claim-to-Return Demonstration

During evaluation or presentation, follow this sequence to demonstrate the entire lifecycle:

```
[1. Register Students]
    ├── Student A (Finder Alice)
    └── Student B (Claimant Bob)
           │
           ▼
[2. Finder Alice Reports Found Item]
    └── Item: "Blue HP Backpack" (Initial Status: Found)
           │
           ▼
[3. Security Verification: Self-Claim Rejection]
    └── Alice attempts to claim own item ──► System blocks with 400 Bad Request
           │
           ▼
[4. Claimant Bob Submits Ownership Claim]
    └── Reason: "Contains my physics notebook with name Bob"
    └── Status begins as: ⏳ Pending
           │
           ▼
[5. Security Verification: Duplicate Claim Rejection]
    └── Bob attempts a 2nd claim for same backpack ──► System blocks with 400 Bad Request
           │
           ▼
[6. Security Verification: Imposter Approval Rejection]
    └── Third-party Charlie attempts to approve claim ──► System blocks with 403 Forbidden
           │
           ▼
[7. Finder Alice Approves Claim]
    └── Status transitions to: ✓ Approved
    └── Backpack status automatically transitions to: ✓ Returned
           │
           ▼
[8. Security Verification: State Check Enforcement]
    └── Another student attempts to claim Returned backpack ──► System blocks with 400 Bad Request
```

---

## 9. Automated Test Suite Results

The project includes an end-to-end automated test suite in `test.js`. Run with:
```bash
npm test
```

### Verified Test Output:
```
====================================================
CAMPUS LOST & FOUND - PHASE 2 COMPREHENSIVE SUITE
====================================================

1. Testing Model Schema Validations:
  [PASS] Claim schema requires foundItemId reference
  [PASS] Claim schema requires claimedBy reference
  [PASS] Claim schema requires reason
  [PASS] Claim schema rejects reasons shorter than 5 characters
  [PASS] Claim schema validates with correct fields
  [PASS] Default Claim status is "Pending"
  [PASS] Claim schema rejects invalid status values

2. Connecting to MongoDB & Initializing Test Server...
MongoDB connected.
Test server running on port 3199

3. Testing Student Creation & Retrieval:
  [PASS] POST /students returns 201 Created
  [PASS] Student A created successfully
  [PASS] POST /students creates second student
  [PASS] POST /students rejects duplicate email with 400
  [PASS] GET /students/:id returns 200 OK
  [PASS] GET /students/:id returns correct profile
  [PASS] GET /students/:id returns 404 for invalid ObjectId format

4. Testing Lost Items:
  [PASS] POST /lost-items returns 201 Created
  [PASS] GET /lost-items returns 200 with search filtering
  [PASS] GET /lost-items/:id returns 200 OK

5. Testing Found Items:
  [PASS] POST /found-items returns 201 Created
  [PASS] FoundItem default status is "Found"
  [PASS] GET /found-items returns 200 OK
  [PASS] GET /found-items/:id returns 200 OK with claims list

6. Testing Phase 2 Claims & Business Rules Workflow:
  [PASS] Self-Claim Prevention: Finder claiming own found item returns 400 Bad Request
  [PASS] POST /found-items/:id/claims creates claim with 201 Created
  [PASS] New claim starts in "Pending" status
  [PASS] Duplicate-Claim Prevention: Second claim by same student returns 400 Bad Request
  [PASS] Relationship Check: Claim with missing student returns 404 Not Found

7. Testing Ownership Check & Security Controls:
  [PASS] Ownership Check: Unauthorized approval attempt by Student C rejected with 403 Forbidden
  [PASS] Safe Update: Invalid status value rejected with 400 Bad Request

8. Testing Authorized Approval & Item Return Transition:
  [PASS] PATCH /claims/:id/status by authorized finder returns 200 OK
  [PASS] Claim status safely updated to "Approved"
  [PASS] State Transition: FoundItem status automatically transitioned to "Returned"

9. Testing State Check (Reject claims on Returned item):
  [PASS] State Check: Attempting to claim an already "Returned" item rejected with 400 Bad Request

10. Testing PATCH /found-items/:id/status:
  [PASS] PATCH /found-items/:id/status updates status with 200 OK

11. Testing Claims Tracker & Filtering:
  [PASS] GET /claims returns 200 OK with status filtering
  [PASS] Claims tracker returns approved claim records

Database cleanup completed successfully.

====================================================
TEST SUMMARY: 35 PASSED | 0 FAILED
====================================================
```

---

## 10. Project Directory Structure

```
lostandfound_p2/
├── .env                  # Environment configuration
├── .env.example          # Sample environment variables
├── .gitignore            # Git exclusion rules
├── package.json          # Node.js dependencies and test script
├── index.js              # Express app, business rules, controllers, routes
├── test.js               # Comprehensive 35-assertion automated test suite
├── models/
│   ├── Student.js        # Student profile schema & validations
│   ├── LostItem.js       # Lost item schema & student reference
│   ├── FoundItem.js      # Found item schema, status lifecycle & student reference
│   └── Claim.js          # Claim schema linking FoundItem and Student
├── views/
│   ├── home.ejs               # Dashboard with metrics, recent reports & claims feed
│   ├── lost-items.ejs         # Lost items catalog with search and filters
│   ├── lost-item-new.ejs      # Lost item reporting form
│   ├── lost-item-details.ejs  # Lost item detail view
│   ├── found-items.ejs        # Found items catalog with status badges
│   ├── found-item-new.ejs     # Found item reporting form
│   ├── found-item-details.ejs # Found item details, claim submission & claims review
│   ├── claims.ejs             # Global claims tracking and filter dashboard
│   ├── students.ejs           # Students directory
│   ├── student-new.ejs        # Student registration form
│   ├── student-profile.ejs    # Student profile with reported items & claims
│   ├── 404.ejs                # Not found error view
│   ├── error.ejs              # Application & security error view (400, 403, 500)
│   └── partials/
│       ├── header.ejs         # Responsive navigation header
│       └── footer.ejs         # Shared footer
└── public/
    ├── styles.css             # Unified modern CSS design system
    └── favicon.ico            # Application icon
```
