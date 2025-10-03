import { useState, useEffect, useRef } from 'react';

const useScramble = (text, duration = 2000) => {
  const [scrambledText, setScrambledText] = useState('');
  const intervalRef = useRef(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let counter = 0;
    const scramble = () => {
      const newText = text
        .split('')
        .map((char, index) => {
          if (index < counter) {
            return text[index];
          }
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setScrambledText(newText);
      
      if (counter >= text.length) {
        clearInterval(intervalRef.current);
      }
      counter += text.length / (duration / 50); // Control the speed of reveal
    };

    intervalRef.current = setInterval(scramble, 50);

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [text, duration]);

  return scrambledText;
};

export default useScramble;