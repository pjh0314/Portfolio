import { motion } from "framer-motion";
import Code from "lucide-react/dist/esm/icons/code.js";
import Users from "lucide-react/dist/esm/icons/users.js";
import Lightbulb from "lucide-react/dist/esm/icons/lightbulb.js";

export default function About() {
  const highlights = [
    {
      icon: <Code className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 dark:text-blue-400" />,
      title: "Software Engineer",
      desc: "I specialize in building efficient, scalable, and user-focused applications while exploring how AI can transform modern development.",
    },
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 dark:text-green-400" />,
      title: "Collaborative Spirit",
      desc: "I thrive in dynamic teams where creativity, problem-solving, and strong communication drive meaningful progress.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 dark:text-yellow-400" />,
      title: "Curious Explorer",
      desc: "I stay at the forefront of technology by actively learning new frameworks, tools, and AI-driven methodologies.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 sm:px-12 md:px-20 lg:px-36 py-16 gap-12 md:gap-16 text-center md:text-left">
      
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          About Me
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
          Hi, I’m <span className="font-semibold text-blue-600 dark:text-blue-400">Joonhyung Park</span>, a computer science student and software engineer passionate about turning ideas into impactful digital experiences. My focus is on building applications that are not only efficient but also intuitive and human-centered. 
        </p>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          I’m fascinated by the intersection of technology and human experience — how well-designed software can enhance everyday life. Constantly curious, I dive into emerging technologies and AI-driven solutions to stay ahead, while enjoying collaboration in teams that value creativity and innovation.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center
                       bg-white/90 dark:bg-gray-800/70
                       shadow-lg backdrop-blur-lg border border-gray-200 dark:border-gray-700
                       hover:scale-105 hover:shadow-2xl transition-transform duration-300
                       w-full sm:max-w-xs min-h-[280px]"
          >
            {item.icon}
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
