import React, { useState } from 'react';

const Toggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="lab-component">
      <h3>Toggle Component (Conditional Rendering)</h3>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide Text' : 'Show Text'}
      </button>
      {isVisible && (
        <p className="toggle-text">This is the hidden text revealed by conditional rendering!</p>
      )}
    </div>
  );
};

export default Toggle;
