import { useState, useEffect } from 'react';

const getCurrentTheme = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 22 || hours < 6) {
    return 'dark';
  } else {
    return 'light';
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(getCurrentTheme());

  useEffect(() => {
    const updateTheme = () => {
      setTheme(getCurrentTheme());
    };

    const intervalId = setInterval(updateTheme, 60 * 60 * 1000);

    updateTheme();

    return () => clearInterval(intervalId);
  }, []);

  return { theme };
};
