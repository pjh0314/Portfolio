import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useLang } from "../context/LangContext";

const USERNAME = "pjh0314";

const EVENT_META = {
  PushEvent:        { emoji: "⬆️", en: (e) => `Pushed ${e.payload.commits?.length ?? 0} commit(s) to ${repo(e)}`,   ko: (e) => `${repo(e)}에 커밋 ${e.payload.commits?.length ?? 0}개 push` },
  CreateEvent:      { emoji: "✨", en: (e) => `Created ${e.payload.ref_type} in ${repo(e)}`,                          ko: (e) => `${repo(e)}에 ${e.payload.ref_type} 생성` },
  PullRequestEvent: { emoji: "🔀", en: (e) => `${cap(e.payload.action)} pull request in ${repo(e)}`,                  ko: (e) => `${repo(e)}에서 PR ${e.payload.action}` },
  WatchEvent:       { emoji: "⭐", en: (e) => `Starred ${repo(e)}`,                                                   ko: (e) => `${repo(e)} 스타 추가` },
  ForkEvent:        { emoji: "🍴", en: (e) => `Forked ${repo(e)}`,                                                    ko: (e) => `${repo(e)} 포크` },
  IssuesEvent:      { emoji: "🐛", en: (e) => `${cap(e.payload.action)} issue in ${repo(e)}`,                         ko: (e) => `${repo(e)}에서 이슈 ${e.payload.action}` },
  DeleteEvent:      { emoji: "🗑️", en: (e) => `Deleted ${e.payload.ref_type} in ${repo(e)}`,                         ko: (e) => `${repo(e)}에서 ${e.payload.ref_type} 삭제` },
};

const VISIBLE_TYPES = new Set(Object.keys(EVENT_META));

function repo(e) { return e.repo.name.replace(`${USERNAME}/`, ""); }
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function timeAgo(dateStr, lang) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (lang === "ko") {
    if (d > 0) return `${d}일 전`;
    if (h > 0) return `${h}시간 전`;
    return `${m}분 전`;
  }
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

export default function GitHubActivity() {
  const lang = useLang();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}/events?per_page=30`)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) { setError(true); return; }
        setEvents(data.filter((e) => VISIBLE_TYPES.has(e.type)).slice(0, 12));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 border-t-gray-700 dark:border-t-gray-300 rounded-full animate-spin" />
    </div>
  );

  if (error || events.length === 0) return (
    <div className="text-center py-16 text-gray-400 dark:text-gray-600 text-sm">
      {lang === "en" ? "No recent activity found." : "최근 활동이 없습니다."}
    </div>
  );

  return (
    <div className="w-full px-4 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <a
        href={`https://github.com/${USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
      >
        <FaGithub size={15} />
        @{USERNAME}
      </a>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />

        <div className="flex flex-col gap-5">
          {events.map((event, idx) => {
            const meta = EVENT_META[event.type];
            const desc = meta[lang](event);
            const commitMsg = event.type === "PushEvent" && event.payload.commits?.[0]?.message;

            return (
              <motion.div
                key={event.id}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
              >
                {/* Dot */}
                <div className="w-9 h-9 rounded-full bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center text-base shrink-0 z-10">
                  {meta.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5 pb-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{desc}</p>
                  {commitMsg && (
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5 truncate italic">
                      "{commitMsg}"
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                    {timeAgo(event.created_at, lang)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
