import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../context/LangContext';

const highlights = [
  {
    id: 'umd',
    image: '/University_of_Maryland.png',
    label: 'UMD',
    en: {
      school: 'University of Maryland',
      city: 'College Park, MD',
      degree: 'B.S. in Computer Science',
      period: 'Aug 2022 – Present',
      gpa: '3.71 / 4.00',
      honors: ["Dean's List 2023–2024"],
      coursework: ['Data Structures', 'Computer Graphics', 'Mobile App Dev', 'Algorithms', 'OOP', 'Linear Algebra'],
    },
    ko: {
      school: '메릴랜드 대학교',
      city: 'College Park, MD',
      degree: '컴퓨터 사이언스 학사',
      period: '2022년 8월 – 현재',
      gpa: '3.71 / 4.00',
      honors: ['총장 우등생 명단 2023–2024'],
      coursework: ['자료구조', '컴퓨터 그래픽스', '모바일 앱 개발', '알고리즘', '객체지향', '선형대수'],
    },
  },
  {
    id: 'asu',
    image: '/Angelo_State_University.png',
    label: 'ASU',
    en: {
      school: 'Angelo State University',
      city: 'San Angelo, TX',
      degree: 'B.S. in Computer Science (Transferred)',
      period: 'Aug 2020 – May 2022',
      gpa: '3.96 / 4.00',
      honors: ["Dean's List 2020–2022"],
    },
    ko: {
      school: '앤젤로 주립대학교',
      city: 'San Angelo, TX',
      degree: '컴퓨터 사이언스 학사 (편입)',
      period: '2020년 8월 – 2022년 5월',
      gpa: '3.96 / 4.00',
      honors: ['총장 우등생 명단 2020–2022'],
    },
  },
];

export default function HighlightStories() {
  const lang = useLang();
  const [selected, setSelected] = useState(null);
  const [seen, setSeen] = useState(() =>
    JSON.parse(localStorage.getItem('seen_highlights') || '{}')
  );

  const handleOpen = (h) => {
    setSelected(h);
    const updated = { ...seen, [h.id]: true };
    setSeen(updated);
    localStorage.setItem('seen_highlights', JSON.stringify(updated));
  };

  const info = selected ? selected[lang] : null;

  return (
    <>
      <div className="flex gap-5 px-4 py-5 overflow-x-auto">
        {highlights.map((h) => (
          <button
            key={h.id}
            onClick={() => handleOpen(h)}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            {/* Story ring — gradient if unseen, gray if seen */}
            <div className={`p-[2.5px] rounded-full ${
              seen[h.id]
                ? 'bg-gray-300 dark:bg-gray-700'
                : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
            }`}>
              <div className="bg-white dark:bg-black p-0.5 rounded-full">
                <img
                  src={h.image}
                  alt={h[lang].school}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{h.label}</span>
          </button>
        ))}
      </div>

      {/* Education detail modal */}
      <AnimatePresence>
        {selected && info && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-sm z-10 overflow-hidden"
              initial={{ scale: 0.93, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              {/* School image header */}
              <div className="relative h-40 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <img
                  src={selected.image}
                  alt={info.school}
                  className="h-24 w-24 object-contain"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">{info.school}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{info.city}</p>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">{info.degree}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{info.period}</p>

                {/* GPA */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">GPA</span>
                  <span className="font-bold text-gray-900 dark:text-white">{info.gpa}</span>
                </div>

                {/* Honors */}
                <div className="flex flex-col gap-1.5">
                  {info.honors.map((honor, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-base">🏆</span>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">{honor}</span>
                    </div>
                  ))}
                </div>

                {/* Coursework */}
                {info.coursework && (
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-2">
                      {lang === 'en' ? 'Relevant Coursework' : '관련 과목'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {info.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
