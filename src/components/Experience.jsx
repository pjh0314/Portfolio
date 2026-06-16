import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";

const experiences = {
  en: [
    {
      title: "TOD Surveillance Operator",
      company: "Republic of Korea Army, GOP Frontline",
      period: "Jan 2024 – Jul 2025",
      responsibilities: [
        "Operated TOD surveillance systems for 24/7 monitoring of frontline coastal areas",
        "Coordinated real-time threat reporting with squad members in time-critical scenarios",
        "Reinforced operational discipline and team communication under high-security conditions",
      ],
      icon: "/ROKA.jpg",
    },
    {
      title: "Fundraise Event Chair",
      company: "Korean Undergraduate Student Association (KUSA), University of Maryland",
      period: "Aug 2023 – Dec 2023",
      responsibilities: [
        "Organized and led fundraising events to support the Korean student community",
        "Coordinated logistics, budgeting, and marketing strategies for successful execution",
        "Collaborated with executive team members and external partners to maximize outreach",
      ],
      icon: "/KUSA.png",
    },
  ],
  ko: [
    {
      title: "TOD 감시 운용병",
      company: "대한민국 육군, GOP 최전방",
      period: "2024년 1월 – 2025년 7월",
      responsibilities: [
        "최전방 해안 지역 24시간 감시를 위한 TOD 장비 운용",
        "실시간 위협 상황 보고 및 분대원과의 긴밀한 협조",
        "고긴장 상황에서의 작전 규율 유지 및 팀 커뮤니케이션 강화",
      ],
      icon: "/ROKA.jpg",
    },
    {
      title: "모금 행사 의장",
      company: "한인 대학생 연합 (KUSA), 메릴랜드 대학교",
      period: "2023년 8월 – 2023년 12월",
      responsibilities: [
        "한인 학생 커뮤니티 지원을 위한 모금 행사 기획 및 총괄",
        "행사 물류·예산·마케팅 전략 수립 및 실행",
        "임원진 및 외부 파트너와 협력하여 참여율 극대화",
      ],
      icon: "/KUSA.png",
    },
  ],
};

export default function Experience() {
  const lang = useLang();
  const list = experiences[lang];

  return (
    <div className="w-full px-4 py-6 flex flex-col items-center gap-6">
      {list.map((exp, idx) => (
        <motion.div
          key={idx}
          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl w-full max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <img
              src={exp.icon}
              alt={exp.title}
              className="w-10 h-10 object-cover rounded-md border border-gray-200 dark:border-gray-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-snug">
                {exp.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{exp.company}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{exp.period}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-1.5">
            {exp.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-gray-400 mt-0.5 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
