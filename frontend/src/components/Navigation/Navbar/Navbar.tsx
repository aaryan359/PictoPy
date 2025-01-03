import React, { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavbarProps {
  title?: string;
  onNameChange?: (name: string) => void;
}

export function Navbar({ title, onNameChange }: NavbarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(title || '');
  const [showPlaceholder, setShowPlaceholder] = useState(!title);

  // Handle initial load and localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('pictopy-username');
    if (storedName) {
      setName(storedName);
      setShowPlaceholder(false);
    }
  }, []);

  const handleNameSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const inputValue = (e.target as HTMLInputElement).value.trim();
        if (inputValue) {
          setName(inputValue);
          setShowPlaceholder(false);
          setIsEditing(false);
          localStorage.setItem('pictopy-username', inputValue);
          onNameChange?.(inputValue);
        }
      }
    },
    [onNameChange]
  );

  const handleNameClick = useCallback(() => {
    if (!isEditing) {
      setIsEditing(true);
    }
  }, [isEditing]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.trim();
      if (inputValue) {
        setName(inputValue);
        setShowPlaceholder(false);
        localStorage.setItem('pictopy-username', inputValue);
        onNameChange?.(inputValue);
      }
      setIsEditing(false);
    },
    [onNameChange]
  );

  return (
    <header className="flex w-full flex-row items-center justify-center align-middle">
      <div className="mb-4 mt-3 flex h-16 items-center justify-between rounded-2xl border border-gray-200 px-4 sm:px-8 md:px-16 shadow-lg backdrop-blur-lg backdrop-saturate-150 bg-gradient-to-r from-blue-500 to-purple-600 dark:border-white/10 dark:bg-gradient-to-r dark:from-gray-800 dark:to-black w-[90%] sm:w-[70%] md:w-[55%] transition-all duration-300 ease-in-out transform hover:scale-105">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/PictoPy_Logo.png"
              className="h-7 hover:opacity-80 transition-opacity duration-200"
              alt="PictoPy Logo"
            />
            <span className="text-theme-dark dark:text-theme-light font-sans text-base sm:text-lg font-bold drop-shadow-sm">
              PictoPy
            </span>
          </div>
        </div>

        {/* Welcome Section and Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-white font-sans text-lg font-medium">
              Welcome{' '}
            </span>
            {isEditing || showPlaceholder ? (
              <input
                type="text"
                placeholder="Enter your name"
                defaultValue={name}
                onKeyDown={handleNameSubmit}
                onBlur={handleBlur}
                className="ml-2 px-2 py-1 bg-white/10 rounded-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 transition-colors duration-200 w-32"
                autoFocus
                aria-label="Enter your name"
              />
            ) : (
              <button
                onClick={handleNameClick}
                className="ml-2 text-white hover:text-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2"
                aria-label="Click to edit name"
              >
                {name || 'User'}
              </button>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

