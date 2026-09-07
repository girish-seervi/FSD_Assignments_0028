import React from 'react';
import { localUsers } from '../data/users';
import UserCard from '../components/UserCard';

const AllUsers = () => {
  return (
    <div className="page-container">
      <h2>All Local Users</h2>
      <p>This page displays all users from our local data file.</p>
      
      <div className="users-grid">
        {localUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
