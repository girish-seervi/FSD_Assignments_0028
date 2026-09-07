import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // This function runs when the component mounts
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup function: runs when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="clock-component">
      <strong>Current Time:</strong> {time}
    </div>
  );
};

export default Clock;
