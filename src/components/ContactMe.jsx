import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

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

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 sm:gap-5 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-2xl transition-colors duration-500">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-300"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-300"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 h-36 resize-none text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-300"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-blue-800 dark:bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Submit"}
          </button>
          {status === "success" && <p className="text-green-500 text-sm text-center">Message sent!</p>}
          {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Try again.</p>}
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
                {["home","about","skills","projects","contact"].map((id) => (
                  <li key={id}>
                    <Link to={id} smooth duration={600} offset={-64} className="capitalize hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition">
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Socials</h3>
              <ul className="flex flex-col gap-2">
                <li><a href="https://github.com/pjh0314" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-800 dark:hover:text-blue-400 transition"><FaGithub /> GitHub</a></li>
                <li><a href="https://linkedin.com/in/joonhyung-park-716b9b266" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-800 dark:hover:text-blue-400 transition"><FaLinkedin /> LinkedIn</a></li>
                <li><a href="https://instagram.com/jxxn_etincexxe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-800 dark:hover:text-blue-400 transition"><FaInstagram /> Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
