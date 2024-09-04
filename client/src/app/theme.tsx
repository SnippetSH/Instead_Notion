import { useEffect } from 'react';
import { ThemeStore } from '../api/store/themeStore';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = ThemeStore(state => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className={`w-screen h-screen ${theme === 'dark' ? 'bg-dark-700' : 'bg-white-500'}`}>
      {children}
    </div>
  );
};