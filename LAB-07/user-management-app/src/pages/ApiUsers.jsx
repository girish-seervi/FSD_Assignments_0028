import React, { useState, useEffect } from 'react';
import { fetchApiUsers } from '../services/api';
import UserCard from '../components/UserCard';

const ApiUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to load data
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchApiUsers();
        // The API returns users with different fields (e.g. address.city instead of city)
        // We will map it to match our UserCard structure
        const formattedUsers = data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          city: u.address ? u.address.city : 'Unknown'
        }));
        setUsers(formattedUsers);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="page-container">
      <h2>API Users</h2>
      <p>Data fetched from JSONPlaceholder API</p>

      {loading && <p className="loading">Loading users...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <div className="users-grid">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiUsers;
