import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16 flex flex-col justify-between transition-colors duration-500">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Me</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg transition-colors duration-500">
            Feel free to reach out for questions or collaborations!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/pjh0314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-800 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/joonhyung-park-716b9b266"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-800 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://instagram.com/jxxn_etincexxe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-800 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300"
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>

        <form className="flex-1 flex flex-col gap-4 sm:gap-5 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-2xl transition-colors duration-500">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-300"
          />
          <textarea
            placeholder="Your Message"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 h-36 resize-none text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-300"
          />
          <button className="bg-blue-800 dark:bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300">
            Submit
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="mt-24 border-t border-gray-200 dark:border-gray-700 pt-10 transition-colors duration-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Joonhyung Park</h2>
            <p className="text-blue-800 dark:text-blue-400 transition-colors duration-500">
              Software Engineer & Full-Stack Developer
            </p>
            <p className="italic">Senior Computer Science Student at UMCP</p>
          </div>
          <div className="flex flex-wrap gap-12 text-center md:text-left">
            <div>
              <h3 className="font-semibold mb-3">Sitemap</h3>
              <ul className="flex flex-col gap-2">
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition">Home</li>
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition">About</li>
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition">Skills</li>
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition">Projects</li>
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition">Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Socials</h3>
              <ul className="flex flex-col gap-2">
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition flex items-center gap-2">
                  <FaGithub /> GitHub
                </li>
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition flex items-center gap-2">
                  <FaLinkedin /> LinkedIn
                </li>
                <li className="hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition flex items-center gap-2">
                  <FaInstagram /> Instagram
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
