import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navigation({ toggleTheme, dark }) {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        <div className="text-xl font-bold z-10 text-blue-800 dark:text-blue-400">
          JHP
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-4 relative">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <AnimatePresence>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute rounded-lg pointer-events-none bg-gray-300 dark:bg-gray-700 shadow-md"
                    style={{
                      top: -4,
                      left: -4,
                      width: "calc(100% + 8px)",
                      height: "calc(100% + 8px)",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <button
                onClick={() => handleScroll(item.id)}
                className="relative z-10 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                <span
                  className={`${
                    activeSection === item.id
                      ? "text-black dark:text-white"
                      : "text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-2 z-10">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {!dark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

      
        <div className="md:hidden flex items-center space-x-2 z-10">
      
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {!dark ? <Moon size={20} /> : <Sun size={20} />}
          </button>

   
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기/닫기">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)} 
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    activeSection === item.id
                      ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
