import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LangContext } from "./context/LangContext";
import Navigation from './components/Navigation';
import Cursor from "./components/Cursor";
import ProfileHeader from "./components/ProfileHeader";
import HighlightStories from "./components/HighlightStories";
import TabNav from "./components/TabNav";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import FloatingMessage from "./components/FloatingMessage";
import Explore from "./components/Explore";

import "./styles/index.css";

function App() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [messageOpen, setMessageOpen] = useState(false);
  const [lang, setLang] = useState("en");

  const tabContent = {
    projects: <Projects />,
    experience: <Experience />,
    skills: <Skills />,
  };

  const isExplore = activeTab === "explore";

  return (
    <div className={dark ? "dark" : ""}>
      <LangContext.Provider value={lang}>
        <Cursor dark={dark} />
        <div className="bg-white text-black dark:bg-black dark:text-gray-100 min-h-screen cursor-none transition-colors duration-300">

          <Navigation
            toggleTheme={() => setDark(!dark)}
            dark={dark}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="md:ml-[72px]">
            {isExplore ? (
              <Explore />
            ) : (
              <>
                <main className="max-w-[935px] mx-auto px-4 pt-6 pb-20 md:pb-8">
                  <ProfileHeader
                    onContactClick={() => setMessageOpen(true)}
                    toggleLang={() => setLang((l) => (l === "en" ? "ko" : "en"))}
                  />

                  <HighlightStories />

                  <TabNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      {tabContent[activeTab]}
                    </motion.div>
                  </AnimatePresence>
                </main>

                <footer className="text-center py-6 text-gray-400 dark:text-gray-700 text-xs border-t border-gray-100 dark:border-gray-900">
                  © 2025 Joonhyung Park
                </footer>
              </>
            )}
          </div>

          {!isExplore && <FloatingMessage open={messageOpen} setOpen={setMessageOpen} />}
        </div>
      </LangContext.Provider>
    </div>
  );
}

export default App;
