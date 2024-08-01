import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString());
    };

    updateClock(); // Set initial time
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-lg font-mono">
      {time ? time : 'Loading...'}
    </div>
  );
};

export default Clock;
