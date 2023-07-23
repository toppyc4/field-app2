import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set in local storage
    const storedDarkMode = localStorage.getItem('darkMode');
    setIsDarkMode(storedDarkMode === 'true');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    // Toggle the 'dark' class on the HTML element
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className={`transition ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-end p-4">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
          </div>
          <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">Dark Mode</div>
        </label>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
