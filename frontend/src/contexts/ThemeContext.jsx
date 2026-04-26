import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('gita-theme') || 'dharma');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gita-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => (p === 'dharma' ? 'vishvarupa' : 'dharma'));
  const isDharma = theme === 'dharma';
  const isVishvarupa = theme === 'vishvarupa';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDharma, isVishvarupa }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
