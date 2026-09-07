import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>{user.name}</h3>
        <span className="user-id">ID: {user.id}</span>
      </div>
      <div className="user-card-body">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>City:</strong> {user.city}</p>
      </div>
    </div>
  );
};

export default UserCard;
