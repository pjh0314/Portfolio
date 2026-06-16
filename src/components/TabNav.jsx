import { motion, AnimatePresence } from "framer-motion";
import Grid from "lucide-react/dist/esm/icons/grid.js";
import Bookmark from "lucide-react/dist/esm/icons/bookmark.js";
import Code2 from "lucide-react/dist/esm/icons/code-2.js";
const tabs = [
  { id: "projects",  icon: Grid,     en: "Posts",    ko: "포스트" },
  { id: "experience",icon: Bookmark, en: "Saved",    ko: "저장됨" },
  { id: "skills",    icon: Code2,    en: "Reels",    ko: "릴스" },
];

export default function TabNav({ activeTab, setActiveTab, lang }) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 mt-4">
      <div className="flex justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center gap-1 px-5 sm:px-9 py-3 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="tabBorder"
                    className="absolute top-0 left-0 right-0 h-px bg-gray-900 dark:bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.75}
                className={isActive ? "text-gray-900 dark:text-white" : ""}
              />
              <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-gray-900 dark:text-white" : ""}`}>
                {lang === "ko" ? tab.ko : tab.en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
