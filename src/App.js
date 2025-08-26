import React, { useState } from "react";
import Navbar from './components/Navigation';
import Section from "./components/Section";

import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";

import "./index.css";

function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark(!dark);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-gray-100 transition-colors duration-700 min-h-screen flex flex-col">
        {/* 네비게이션 */}
        <Navbar toggleTheme={toggleTheme} dark={dark} />

        {/* 콘텐츠 영역 */}
        <main className="flex-1 flex flex-col w-full">
          <Section id="home"><Home /></Section>
          <Section id="about"><About /></Section>
          <Section id="skills"><Skills /></Section>
          <Section id="experience"><Experience /></Section>
          <Section id="projects"><Projects /></Section>
          <Section id="contact"><ContactMe /></Section>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-gray-600 dark:text-gray-400 text-sm">
          © 2025 Joonhyung Park
        </footer>
      </div>
    </div>
  );
}

export default App;
