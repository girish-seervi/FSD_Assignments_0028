# BorrowBox – Campus Sharing Platform

> **Tagline:** *Borrow More. Buy Less. Share Better.*

BorrowBox is a full-stack, campus-based sharing marketplace engineered to help university students borrow and lend essential academic supplies, electronics, calculators, textbooks, lab instruments, and sports gear safely and affordably.

---

## 1. Problem Statement

University students frequently need items such as scientific graphing calculators for calculus exams, organic chemistry lab coats, specialized textbooks, sports equipment, and laptop chargers for short periods. Purchasing these items brand-new is financially wasteful, while thousands of unused items sit idle across campus dorms. BorrowBox connects student lenders and borrowers within a trusted campus community, cutting costs and reducing waste.

---

## 2. Key Objectives

- **Dual-Role Accounts:** Every registered user can act seamlessly as both a **Lender** and a **Borrower**.
- **Live Search & Multi-Filter Marketplace:** Filter by 7 categories, 4 conditions, availability status, price type (Free vs. Paid), and sorting orders.
- **Request & Approval Workflow:** Date range validation, owner approval, and automatic item availability toggles.
- **Active Loan & Return Tracking:** Hand-off lifecycle with borrower-initiated return requests and owner confirmation receipts.
- **Persistent JSON Database:** Resilient file-based database storing users, listings, requests, notifications, and favorites across restarts.
- **Bank-Grade Authentication:** JWT token authentication, password hashing with bcryptjs, and protected API routes.

---

## 3. Technology Stack

### Frontend
- **React.js 19** (Functional Components & React Hooks)
- **React Router DOM v7** (Declarative routing, Protected Route guards, dynamic params)
- **Lucide React** (Clean, consistent iconography)
- **Fetch API** (Adaptive API client with auto-port fallback)
- **Modern CSS3 Design System** (Deep Navy `#172554`, Vibrant Indigo `#6366F1`, Light Grey `#F8FAFC`)

### Backend
- **Node.js & Express.js** (RESTful API architecture)
- **JSON File-Based Database** (`users.json`, `items.json`, `requests.json`, `notifications.json`, `favorites.json`)
- **JSON Web Tokens (JWT)** for secure stateless sessions
- **bcryptjs** (10 salt rounds for password security)
- **CORS** middleware enabling multi-origin requests

---

## 4. Folder Structure

```text
borrowbox/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js             # Global navigation bar & mobile drawer
│   │   ├── Sidebar.js            # Collapsible authenticated dashboard sidebar
│   │   ├── Footer.js             # Campus safety, terms, and platform links
│   │   ├── ItemCard.js           # Marketplace card with quick favorite toggle
│   │   ├── CategoryCard.js       # Interactive category filter cards
│   │   ├── SearchBar.js          # Live search input with instant clear
│   │   ├── FilterPanel.js        # Multi-attribute dropdown filter panel
│   │   ├── StatisticsCard.js     # Metric counters with status icons
│   │   ├── NotificationBell.js   # Real-time bell dropdown with unread badge
│   │   ├── ProtectedRoute.js     # Route guard redirecting to login
│   │   ├── LoadingSpinner.js     # Smooth animated loading indicator
│   │   ├── EmptyState.js         # Informative empty states with CTA
│   │   └── ConfirmDialog.js      # Modal for delete & return confirmations
│   ├── pages/
│   │   ├── Home.js               # Landing page with hero, how-it-works & stats
│   │   ├── Login.js              # Auth login with 1-click demo credential chips
│   │   ├── Register.js           # Student onboarding with input validation
│   │   ├── Dashboard.js          # Metrics, recent activity feed & quick actions
│   │   ├── Marketplace.js        # Grid, search, filters & pagination
│   │   ├── ItemDetails.js        # Full item specs, schedule & borrow request
│   │   ├── AddItem.js            # Listing creator with real-time photo preview
│   │   ├── MyListings.js         # Inventory manager with edit modal & delete
│   │   ├── BorrowRequests.js     # Received and Sent request tabs
│   │   ├── ActiveBorrowings.js   # Return tracker and receipt confirm
│   │   ├── Notifications.js      # Full notifications center with mark read
│   │   └── Profile.js            # Student profile editor & Campus Leaderboard
│   ├── context/
│   │   └── AuthContext.js        # Authentication context & persistent tokens
│   ├── services/
│   │   └── api.js                # Bulletproof API service layer with retry
│   ├── hooks/
│   │   └── useAuth.js            # Custom hook for auth context
│   ├── styles/
│   │   ├── global.css            # Colors, layout variables, typography, badges
│   │   ├── components.css        # Modals, navigation, cards, dropdowns
│   │   ├── auth.css              # Authentication form cards & quick-fill
│   │   ├── dashboard.css         # Metrics grid, activity feed, request cards
│   │   └── marketplace.css       # Landing showcase, product grids & details
│   ├── App.js                    # Routing controller and route layout
│   └── index.js                  # React DOM mount point
├── backend/
│   ├── data/
│   │   ├── users.json            # Hashed user records
│   │   ├── items.json            # 10 seeded campus listings
│   │   ├── requests.json         # Borrowing request transactions
│   │   ├── notifications.json    # User alert notifications
│   │   └── favorites.json        # User bookmarked listings
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT bearer token verification
│   │   ├── logger.js             # HTTP request duration & status logger
│   │   ├── validateItem.js       # Payload validator for item creation
│   │   ├── validateRequest.js    # Date range and logic validator
│   │   └── errorHandler.js       # Centralized JSON error response handler
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth (register, login, me)
│   │   ├── itemRoutes.js         # /api/items (CRUD, search, filters)
│   │   ├── requestRoutes.js      # /api/requests (accept, reject, return)
│   │   ├── notificationRoutes.js # /api/notifications (read, read-all)
│   │   └── userRoutes.js         # /api/users (profile, stats, leaderboard)
│   ├── utils/
│   │   ├── database.js           # Atomic JSON read/write persistence
│   │   └── generateToken.js      # JWT generator utility
│   ├── .env                      # Backend configuration
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server bootstrap
├── package.json                  # Frontend dependencies & npm scripts
└── README.md
```

---

## 5. RESTful API Endpoints

### A. Authentication (`/api/auth`)
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student account | Public |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token | Public |
| `GET` | `/api/auth/me` | Fetch logged-in user profile | Private |

### B. Items Marketplace (`/api/items`)
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/api/items` | Search & filter listings (pagination, categories) | Public |
| `GET` | `/api/items/:id` | Get single item details & loan schedules | Public |
| `POST` | `/api/items` | Create a new campus listing | Private |
| `PUT` | `/api/items/:id` | Update existing listing details | Private (Owner) |
| `PUT` | `/api/items/:id/availability` | Toggle between Available & Unavailable | Private (Owner) |
| `DELETE` | `/api/items/:id` | Delete listing (prevented if actively on loan) | Private (Owner) |
| `GET` | `/api/items/my-listings` | Get all listings created by current user | Private |

### C. Borrowing Transactions (`/api/requests`)
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/api/requests/received` | Incoming requests for user's items | Private |
| `GET` | `/api/requests/sent` | Outgoing requests sent by user | Private |
| `POST` | `/api/requests` | Submit request (date range & rule validations) | Private |
| `PUT` | `/api/requests/:id/accept` | Accept request & mark item Unavailable | Private (Owner) |
| `PUT` | `/api/requests/:id/reject` | Reject request & notify borrower | Private (Owner) |
| `PUT` | `/api/requests/:id/cancel` | Cancel pending request | Private (Borrower) |
| `PUT` | `/api/requests/:id/return` | Borrower marks item as returned | Private (Borrower) |
| `PUT` | `/api/requests/:id/confirm-return` | Owner confirms return & restores Available | Private (Owner) |

### D. Notifications (`/api/notifications`)
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/api/notifications` | Get user notifications & unread count | Private |
| `PUT` | `/api/notifications/:id/read` | Mark single notification as read | Private |
| `PUT` | `/api/notifications/read-all` | Mark all notifications as read | Private |

### E. User & Stats (`/api/users`)
| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `GET` | `/api/users/stats/platform` | Landing page aggregate statistics | Public |
| `GET` | `/api/users/dashboard` | Personalized dashboard metrics & feed | Private |
| `GET` | `/api/users/profile` | View profile and borrowing counters | Private |
| `PUT` | `/api/users/profile` | Edit full name, college, and student ID | Private |
| `GET` | `/api/users/favorites` | Get user bookmarked items | Private |
| `POST` | `/api/users/favorites/:itemId` | Add item to favorites | Private |
| `DELETE` | `/api/users/favorites/:itemId` | Remove item from favorites | Private |
| `GET` | `/api/users/leaderboard` | Campus Sharing Honor Roll Leaderboard | Public |

---

## 6. Business Logic & Security

1. **Self-Borrowing Prevention:** Users are prohibited from requesting their own listings.
2. **Conflict Prevention:** Cannot request unavailable items or submit duplicate active requests for the same item.
3. **Date Validation:** Start date cannot be in the past; return date must strictly follow start date.
4. **Ownership Verification:** Only the item owner can accept/reject requests, edit listings, or confirm returns.
5. **Active Loan Protection:** Items with ongoing active transactions cannot be deleted.
6. **Automatic Status Lifecycle:** Confirmed returns automatically reset the item status back to `Available`.
7. **Password Hashing:** Passwords are never stored in plain text and hashes are excluded from all client responses.

---

## 7. Demo Accounts & Credentials

BorrowBox comes pre-seeded with 3 realistic student accounts and 10 campus items.

> **Tip:** On the Login page, click any of the **Quick-Fill Demo Account** buttons to log in instantly with zero typing!

| Student Name | Email Address | Password | College Department |
|---|---|---|---|
| **Alex Chen** | `alex.chen@campus.edu` | `Password123!` | School of Engineering & Computing |
| **Sarah Jenkins** | `sarah.j@campus.edu` | `Password123!` | Faculty of Science & Mathematics |
| **Marcus Williams** | `marcus.w@campus.edu` | `Password123!` | School of Business & Economics |

---

## 8. Installation & Execution

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Step 1: Start the Backend Server
```bash
cd borrowbox/backend
npm install
npm run dev
```
*The backend automatically binds to `http://localhost:5000` (or falls back to `http://localhost:5001` if macOS AirPlay Receiver occupies port 5000).*

### Step 2: Start the Frontend Application
In a separate terminal:
```bash
cd borrowbox
npm install
npm start
```
*The React application will be available at `http://localhost:3000`.*
