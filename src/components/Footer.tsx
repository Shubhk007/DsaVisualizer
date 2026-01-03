import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
      <div className="px-4 sm:px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Built with <span className="text-red-500">❤️</span> by Shubham
      </div>
    </footer>
  );
};

export default Footer;
