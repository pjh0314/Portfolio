import { useState } from "react";
import { FaPython, FaJava, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiC, SiCplusplus, SiDart, SiOcaml, SiFlutter, SiFirebase, SiMongodb, SiJavascript, SiRust, SiRuby, SiSwift, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

export default function Skills() {
  const categories = {
    Programming: [
      { name: "Python", icon: <FaPython size={50} /> },
      { name: "C", icon: <SiC size={50} /> },
      { name: "C++", icon: <SiCplusplus size={50} /> },
      { name: "Java", icon: <FaJava size={50} /> },
      { name: "Dart", icon: <SiDart size={50} /> },
      { name: "OCaml", icon: <SiOcaml size={50} /> },
      { name: "Rust", icon: <SiRust size={50} /> },
      { name: "Ruby", icon: <SiRuby size={50} /> },
      { name: "Swift", icon: <SiSwift size={50} /> }, 
    ],
    "Web / Mobile": [
      { name: "HTML", icon: <FaHtml5 size={50} /> },
      { name: "CSS", icon: <FaCss3Alt size={50} /> },
      { name: "JavaScript", icon: <SiJavascript size={50} /> },
      { name: "React", icon: <FaReact size={50} /> },
      { name: "Flutter", icon: <SiFlutter size={50} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={50} /> }, 
    ],
    "Server / Database": [
      { name: "Node.js", icon: <FaNodeJs size={50} /> },
      { name: "Firebase", icon: <SiFirebase size={50} /> },
      { name: "MongoDB", icon: <SiMongodb size={50} /> },
    ],
    "Dev Tools": [
      { name: "Git", icon: <FaGitAlt size={50} /> },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("Programming");

  return (
    <div className="w-full min-h-screen px-6 sm:px-12 md:px-20 lg:px-32 py-24 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-mt-32">
        My Skills
      </h2>

      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl justify-center">
        {categories[activeCategory].map((skill) => (
          <motion.div
            key={skill.name}
            layout
            className="flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-transform duration-300 w-full sm:max-w-xs min-h-[180px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 200 }}>
              {skill.icon}
            </motion.div>
            <p className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
