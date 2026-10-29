import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(hideTimer);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loader"
      style={{
        opacity: fading ? 0 : 1,
        visibility: fading ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      <div className="loader-content">
        <div
          className="spinner-border text-warning"
          style={{ width: '70px', height: '70px' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-4">Department of Computer Applications</h3>
        <p>Loading Official Website...</p>
      </div>
    </div>
  );
};

export default Loader;
