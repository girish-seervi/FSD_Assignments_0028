import React from 'react';
import { localUsers } from '../data/users';
import UserCard from '../components/UserCard';

const EvenUsers = () => {
  // Filter the localUsers array to only include users with an even ID
  const evenUsersList = localUsers.filter(user => user.id % 2 === 0);

  return (
    <div className="page-container">
      <h2>Even ID Users</h2>
      <p>This page displays only users who have an even ID number.</p>
      
      <div className="users-grid">
        {evenUsersList.length > 0 ? (
          evenUsersList.map(user => (
            // We pass the user data as props to the UserCard component
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p>No even users found.</p>
        )}
      </div>
    </div>
  );
};

export default EvenUsers;
