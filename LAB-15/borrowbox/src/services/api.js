/**
 * BorrowBox API Service Layer
 * Bulletproof HTTP client using Fetch API with JWT token handling,
 * error parsing, and automatic port fallback between 5000 and 5001.
 */

let activeBaseUrl =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5001/api'
    : '/api');

// Primary fallback candidate if first port is unreachable
const alternativeBaseUrl =
  activeBaseUrl.includes(':5001')
    ? activeBaseUrl.replace(':5001', ':5000')
    : activeBaseUrl.replace(':5000', ':5001');

const getAuthToken = () => {
  return localStorage.getItem('borrowbox_token');
};

/**
 * Universal request wrapper with authentication and auto-port retry
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const makeCall = async (baseUrl) => {
    const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    return fetch(url, {
      ...options,
      headers
    });
  };

  let response;
  try {
    response = await makeCall(activeBaseUrl);
  } catch (err) {
    // If primary port failed with network error, attempt fallback port once
    if (alternativeBaseUrl && alternativeBaseUrl !== activeBaseUrl) {
      try {
        response = await makeCall(alternativeBaseUrl);
        // Switch activeBaseUrl to the working port
        activeBaseUrl = alternativeBaseUrl;
      } catch (retryErr) {
        throw new Error('Unable to connect to BorrowBox server. Please ensure the backend is running.');
      }
    } else {
      throw new Error('Unable to connect to BorrowBox server. Please ensure the backend is running.');
    }
  }

  // Parse JSON response safely
  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    const errorMsg = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// ----------------- Auth APIs -----------------
export const authApi = {
  register: (userData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  getMe: () => apiRequest('/auth/me')
};

// ----------------- Item APIs -----------------
export const itemApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const queryString = query.toString();
    return apiRequest(`/items${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => apiRequest(`/items/${id}`),

  create: (itemData) =>
    apiRequest('/items', {
      method: 'POST',
      body: JSON.stringify(itemData)
    }),

  update: (id, itemData) =>
    apiRequest(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData)
    }),

  toggleAvailability: (id, availability) =>
    apiRequest(`/items/${id}/availability`, {
      method: 'PUT',
      body: JSON.stringify({ availability })
    }),

  delete: (id) =>
    apiRequest(`/items/${id}`, {
      method: 'DELETE'
    }),

  getMyListings: () => apiRequest('/items/my-listings')
};

// ----------------- Request APIs -----------------
export const requestApi = {
  getSent: () => apiRequest('/requests/sent'),

  getReceived: () => apiRequest('/requests/received'),

  create: (requestData) =>
    apiRequest('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    }),

  accept: (id) =>
    apiRequest(`/requests/${id}/accept`, {
      method: 'PUT'
    }),

  reject: (id) =>
    apiRequest(`/requests/${id}/reject`, {
      method: 'PUT'
    }),

  cancel: (id) =>
    apiRequest(`/requests/${id}/cancel`, {
      method: 'PUT'
    }),

  requestReturn: (id) =>
    apiRequest(`/requests/${id}/return`, {
      method: 'PUT'
    }),

  confirmReturn: (id) =>
    apiRequest(`/requests/${id}/confirm-return`, {
      method: 'PUT'
    })
};

// ----------------- Notification APIs -----------------
export const notificationApi = {
  getAll: () => apiRequest('/notifications'),

  markAsRead: (id) =>
    apiRequest(`/notifications/${id}/read`, {
      method: 'PUT'
    }),

  markAllAsRead: () =>
    apiRequest('/notifications/read-all', {
      method: 'PUT'
    })
};

// ----------------- User & Stats APIs -----------------
export const userApi = {
  getPlatformStats: () => apiRequest('/users/stats/platform'),

  getDashboard: () => apiRequest('/users/dashboard'),

  getProfile: () => apiRequest('/users/profile'),

  updateProfile: (profileData) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }),

  getFavorites: () => apiRequest('/users/favorites'),

  addFavorite: (itemId) =>
    apiRequest(`/users/favorites/${itemId}`, {
      method: 'POST'
    }),

  removeFavorite: (itemId) =>
    apiRequest(`/users/favorites/${itemId}`, {
      method: 'DELETE'
    }),

  getLeaderboard: () => apiRequest('/users/leaderboard')
};
