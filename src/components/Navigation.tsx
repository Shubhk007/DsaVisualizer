import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { DSAType } from '../types';

interface NavigationProps {
  selectedDSA: DSAType;
  onDSAChange: (dsa: DSAType) => void;
  onHelpClick: () => void;
  onReset: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  selectedDSA, 
  onDSAChange, 
  onHelpClick,
  onReset 
}) => {
  const { theme, toggleTheme } = useTheme();

  const dsaOptions: { value: DSAType; label: string }[] = [
    { value: 'array', label: 'Array' },
    { value: 'linkedlist', label: 'Linked List (Singly)' },
    { value: 'doublylinkedlist', label: 'Linked List (Doubly)' },
    { value: 'circularlinkedlist', label: 'Linked List (Circular)' },
    { value: 'stack', label: 'Stack' },
    { value: 'queue', label: 'Queue' },
    { value: 'hashmap', label: 'HashMap' },
    { value: 'bst', label: 'Binary Search Tree' },
    { value: 'graph', label: 'Graph' },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-800/60">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">DS</span>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">DSA Visual Practice</h1>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <label htmlFor="dsa-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Data Structure:
              </label>
              <select
                id="dsa-select"
                value={selectedDSA}
                onChange={(e) => onDSAChange(e.target.value as DSAType)}
                className="select"
              >
                {dsaOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="icon-btn"
              title="Reset visualization"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button
              onClick={onHelpClick}
              className="btn-primary"
              title="Help & Documentation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">Help</span>
            </button>

            <button
              onClick={toggleTheme}
              className="icon-btn"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile DSA selector */}
        <div className="mt-3 md:hidden">
          <label htmlFor="dsa-select-mobile" className="sr-only">Data Structure</label>
          <select
            id="dsa-select-mobile"
            value={selectedDSA}
            onChange={(e) => onDSAChange(e.target.value as DSAType)}
            className="select w-full"
          >
            {dsaOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
