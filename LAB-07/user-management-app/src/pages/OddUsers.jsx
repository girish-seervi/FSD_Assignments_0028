import React from 'react';
import { localUsers } from '../data/users';
import UserCard from '../components/UserCard';

const OddUsers = () => {
  // Filter the localUsers array to only include users with an odd ID
  const oddUsersList = localUsers.filter(user => user.id % 2 !== 0);

  return (
    <div className="page-container">
      <h2>Odd ID Users</h2>
      <p>This page displays only users who have an odd ID number.</p>
      
      <div className="users-grid">
        {oddUsersList.length > 0 ? (
          oddUsersList.map(user => (
            // We pass the user data as props to the UserCard component
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p>No odd users found.</p>
        )}
      </div>
    </div>
  );
};

export default OddUsers;
