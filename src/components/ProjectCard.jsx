import { motion } from "framer-motion";

export default function ProjectCard({ title, description, tech, image, link, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-md p-6 w-full md:w-80 flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
     
      <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700 dark:text-gray-200 text-sm text-center">{description}</p>

      <div className="flex flex-wrap justify-center gap-2">
        {tech.map((t, idx) => (
          <span
            key={idx}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-blue-500 font-medium hover:underline"
        >
          🔗 View on GitHub
        </a>
      )}
    </motion.div>
  );
}
