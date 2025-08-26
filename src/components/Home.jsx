import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-scroll";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-6 sm:px-12 md:px-24 lg:px-40 gap-8 pt-24 sm:pt-28 md:pt-32">
      
    
      <motion.div
        className="flex-[0.45] text-center md:text-left max-w-xs sm:max-w-sm md:max-w-md"
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 scroll-mt-32">
          Joonhyung Park
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Senior Computer Science Student at UMCP
        </p>

        
        <motion.div
          className="flex justify-center md:justify-start gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
          >
            Download Resume
          </a>

          <Link
            to="contact"
            smooth={true}
            duration={600}
            offset={-50}
            className="cursor-pointer px-6 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg font-medium shadow hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 transition-transform duration-300"
          >
            Contact Me
          </Link>
        </motion.div>

       
        <motion.div
          className="flex justify-center md:justify-start gap-4 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <a href="https://github.com/pjh0314" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
            <FaLinkedin />
          </a>
          <a href="mailto:0314pjh@gmail.com" className="hover:scale-110 transition-transform duration-300">
            <FaEnvelope />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-[0.45] flex justify-center md:justify-end"
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src="/Joonhyung Park.jpg"
          alt="Joonhyung Park"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
