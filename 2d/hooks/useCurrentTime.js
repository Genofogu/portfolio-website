import { useState, useEffect } from 'react';

const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup
  }, []);

  return time;
};

export default useCurrentTime;