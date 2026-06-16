import { Sun, Moon } from "lucide-react";
import Grid from "lucide-react/dist/esm/icons/grid.js";
import Bookmark from "lucide-react/dist/esm/icons/bookmark.js";
import Code2 from "lucide-react/dist/esm/icons/code-2.js";

const navItems = [
  { id: "projects", icon: Grid, label: "Projects" },
  { id: "experience", icon: Bookmark, label: "Experience" },
  { id: "skills", icon: Code2, label: "Skills" },
];

export default function Navigation({ toggleTheme, dark, activeTab, setActiveTab }) {
  return (
    <>
      {/* ── Desktop: collapsible icon sidebar ── */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-[72px] hover:w-[210px] flex-col py-6 bg-white dark:bg-black z-40 transition-[width] duration-200 ease-in-out overflow-hidden group">

        {/* Logo — icon stays centered in 72px, text fades in on expand */}
        <div className="flex items-center mb-8 shrink-0">
          <span className="flex items-center justify-center w-[72px] shrink-0">
            <img src={`${process.env.PUBLIC_URL}/JHP.png`} alt="JHP" className="h-7 w-auto" />
          </span>
        </div>

        {/* Nav items — centered vertically */}
        <div className="flex flex-col justify-center flex-1 gap-1">
          {navItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center w-full py-3 rounded-xl transition-colors
                  ${isActive
                    ? "text-black dark:text-white"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
              >
                {/* Icon — always centered in 72px column */}
                <span className="flex items-center justify-center w-[72px] shrink-0">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.75} />
                </span>
                {/* Label — fades in when sidebar group is hovered */}
                <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pr-4">
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center w-full py-3 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shrink-0"
        >
          <span className="flex items-center justify-center w-[72px] shrink-0">
            {!dark ? <Moon size={22} strokeWidth={1.75} /> : <Sun size={22} strokeWidth={1.75} />}
          </span>
          <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pr-4">
            {dark ? "Light mode" : "Dark mode"}
          </span>
        </button>
      </nav>

      {/* ── Mobile: fixed bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-40 px-2">
        {navItems.map(({ id, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`p-3 transition-colors ${
                isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.75} />
            </button>
          );
        })}
        <button onClick={toggleTheme} className="p-3 text-gray-400 dark:text-gray-600">
          {!dark ? <Moon size={22} strokeWidth={1.75} /> : <Sun size={22} strokeWidth={1.75} />}
        </button>
      </nav>
    </>
  );
}
