import React, { useState } from 'react';
import { localUsers } from '../data/users';
import UserCard from './UserCard';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter based on whether the user's name includes the search term (case-insensitive)
  const filteredUsers = localUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lab-component search-component">
      <h3>Search Users</h3>
      <input 
        type="text" 
        className="search-input"
        placeholder="Type a name to search..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="users-grid search-results">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No users found matching "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
