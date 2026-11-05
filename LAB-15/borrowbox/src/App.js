import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ItemDetails from './pages/ItemDetails';
import AddItem from './pages/AddItem';
import MyListings from './pages/MyListings';
import BorrowRequests from './pages/BorrowRequests';
import ActiveBorrowings from './pages/ActiveBorrowings';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

// Stylesheets
import './styles/global.css';
import './styles/components.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/marketplace.css';

// Dashboard layout wrapper with sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">{children}</main>
    </div>
  );
};

// Route controller deciding whether to render footer
const AppLayout = () => {
  const location = useLocation();
  const isDashboardRoute = [
    '/dashboard',
    '/add-item',
    '/my-listings',
    '/requests',
    '/active-borrowings',
    '/notifications',
    '/profile'
  ].includes(location.pathname);

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddItem />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyListings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BorrowRequests />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/active-borrowings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ActiveBorrowings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
