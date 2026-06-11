import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain p-6" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {project.details || project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
