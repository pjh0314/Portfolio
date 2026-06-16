import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { useVisitorCount } from "../hooks/useVisitorCount";

const bio = {
  en: {
    role: "Software Engineer · Full-Stack Developer",
    uni: "CS @ University of Maryland",
    line: "Building things that work well and feel good to use.",
    projects: "projects",
    followers: "followers",
    skills: "skills",
    resume: "Resume",
    contact: "Contact",
  },
  ko: {
    role: "소프트웨어 엔지니어 · 풀스택 개발자",
    uni: "메릴랜드 대학교 컴퓨터 사이언스",
    line: "잘 동작하고 쓰기 좋은 것들을 만듭니다.",
    projects: "프로젝트",
    followers: "팔로워",
    skills: "기술",
    resume: "이력서",
    contact: "연락하기",
  },
};

export default function ProfileHeader({ onContactClick, toggleLang }) {
  const lang = useLang();
  const t = bio[lang];
  const visitorCount = useVisitorCount();

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12 md:gap-16">
        {/* Profile Photo */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/Joonhyung Park.jpg"
            alt="Joonhyung Park"
            className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          />
        </motion.div>

        {/* Profile Info */}
        <motion.div
          className="flex flex-col gap-4 flex-1 text-center sm:text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Username + Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 flex-wrap">
            <h1 className="text-xl font-light tracking-wide">Joonhyung Park</h1>
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
              <a
                href="/Joonhyung Park.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
              >
                {t.resume}
              </a>
              <button
                onClick={onContactClick}
                className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
              >
                {t.contact}
              </button>
              <button
                onClick={toggleLang}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors tracking-wide"
              >
                {lang === "en" ? "한국어" : "EN"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-8">
            <div className="text-center sm:text-left">
              <span className="font-semibold text-base block">3</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{t.projects}</span>
            </div>
            <div className="text-center sm:text-left">
              <motion.span
                key={visitorCount}
                className="font-semibold text-base block"
                initial={{ scale: 1.3, color: "#3b82f6" }}
                animate={{ scale: 1, color: "inherit" }}
                transition={{ duration: 0.4 }}
              >
                {visitorCount === null ? "—" : visitorCount.toLocaleString()}
              </motion.span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{t.followers}</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-semibold text-base block">20+</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{t.skills}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Joonhyung Park</p>
            <p className="text-gray-500 dark:text-gray-400">{t.role}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{t.uni}</p>
            <p className="text-gray-700 dark:text-gray-300">{t.line}</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center sm:justify-start gap-5 text-xl text-gray-500 dark:text-gray-400">
            <a href="https://github.com/pjh0314" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/joonhyung-park-716b9b266" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com/jxxn_etincexxe" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="mailto:0314pjh@gmail.com" className="hover:text-red-500 transition-colors">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
