import { useState } from "react";
import { FaPython, FaJava, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaDocker } from "react-icons/fa";
import { SiC, SiCplusplus, SiDart, SiOcaml, SiFlutter, SiFirebase, SiMongodb, SiJavascript, SiRust, SiRuby, SiSwift, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

const categories = {
  Programming: [
    { name: "Python", icon: <FaPython size={36} /> },
    { name: "C", icon: <SiC size={36} /> },
    { name: "C++", icon: <SiCplusplus size={36} /> },
    { name: "Java", icon: <FaJava size={36} /> },
    { name: "Dart", icon: <SiDart size={36} /> },
    { name: "OCaml", icon: <SiOcaml size={36} /> },
    { name: "Rust", icon: <SiRust size={36} /> },
    { name: "Ruby", icon: <SiRuby size={36} /> },
    { name: "Swift", icon: <SiSwift size={36} /> },
  ],
  "Web / Mobile": [
    { name: "HTML", icon: <FaHtml5 size={36} /> },
    { name: "CSS", icon: <FaCss3Alt size={36} /> },
    { name: "JavaScript", icon: <SiJavascript size={36} /> },
    { name: "React", icon: <FaReact size={36} /> },
    { name: "Flutter", icon: <SiFlutter size={36} /> },
    { name: "TailwindCSS", icon: <SiTailwindcss size={36} /> },
  ],
  "Server / DB": [
    { name: "Node.js", icon: <FaNodeJs size={36} /> },
    { name: "Firebase", icon: <SiFirebase size={36} /> },
    { name: "MongoDB", icon: <SiMongodb size={36} /> },
  ],
  "Dev Tools": [
    { name: "Git", icon: <FaGitAlt size={36} /> },
    { name: "Docker", icon: <FaDocker size={36} /> },
  ],
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Programming");

  return (
    <div className="w-full px-4 py-6 flex flex-col items-center">
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${activeCategory === cat
                ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full max-w-2xl">
        {categories[activeCategory].map((skill) => (
          <motion.div
            key={skill.name}
            layout
            className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors cursor-default"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-gray-700 dark:text-gray-300"
            >
              {skill.icon}
            </motion.div>
            <p className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
