import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true));

  if (!hasMounted) return null;
  return (
    <div>
      The current theme is: {theme} : {systemTheme}
      <button
        className="dark:bg-red-400 dark:text-white btn"
        onClick={() => setTheme('light')}
      >
        Light Mode
      </button>
      <button className="btn" onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
    </div>
  );
}

export default ThemeToggle;
