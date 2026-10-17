'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

/** Dark-first theme toggle: persists to localStorage, no flash on load
 *  (an inline head script applies the saved theme before first paint). */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('holsera-theme', next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setTheme(next);
  };

  const target = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${target} mode`}
      title={`Switch to ${target} mode`}
    >
      <Icon name="sun" size={17} className="icon-sun" />
      <Icon name="moon" size={17} className="icon-moon" />
    </button>
  );
}
