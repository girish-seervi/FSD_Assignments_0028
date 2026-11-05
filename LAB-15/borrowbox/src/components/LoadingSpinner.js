import React from 'react';

const LoadingSpinner = ({ label = 'Loading BorrowBox...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      {label && <p className="spinner-label">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
