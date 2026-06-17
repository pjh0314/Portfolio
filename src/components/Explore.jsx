import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Heart from "lucide-react/dist/esm/icons/heart.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import Send from "lucide-react/dist/esm/icons/send.js";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left.js";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.js";
import { supabase } from "../lib/supabase";
import { useLang } from "../context/LangContext";

const BLOCKED_WORDS = [
  "fuck","shit","bitch","ass","asshole","dick","cunt","nigger","nigga",
  "faggot","retard","whore","slut","bastard","시발","씨발","병신","개새끼",
  "좆","보지","자지","존나","개년","창녀","걸레","미친놈","미친년","새끼",
];
const hasProfanity = (t) => BLOCKED_WORDS.some((w) => t.toLowerCase().includes(w));

const i18n = {
  en: { namePlaceholder: "Your name (optional)", commentPlaceholder: "Add a comment...", warn: "Please keep it respectful." },
  ko: { namePlaceholder: "이름 (선택)", commentPlaceholder: "댓글 달기...", warn: "예의 바른 댓글을 달아주세요." },
};

function relativeDate(d) {
  const days = Math.floor((Date.now() - new Date(d)) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}


// ── Modal ──────────────────────────────────────────────────────────────────
function PhotoModal({ photos, index, onClose, onNav, likedMap, onLike }) {
  const lang = useLang();
  const t = i18n[lang];
  const photo = photos[index];
  const liked = !!likedMap[photo?.id];
  const [direction, setDirection] = useState(0);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [profanityErr, setProfanityErr] = useState(false);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    if (!photo) return;
    setComments([]);
    supabase.from("comments").select("*").eq("project_id", photo.id).order("created_at", { ascending: true })
      .then(({ data }) => setComments(data || []));
    const ch = supabase.channel(`modal-comments-${photo.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments", filter: `project_id=eq.${photo.id}` },
        (p) => setComments((prev) => [...prev, p.new]))
      .subscribe();
    return () => supabase.removeChannel(ch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo?.id]);

  useEffect(() => { commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [comments]);

  const nav = useCallback((dir) => { setDirection(dir); onNav(dir); }, [onNav]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, nav]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    if (hasProfanity(body) || hasProfanity(author)) { setProfanityErr(true); return; }
    setProfanityErr(false);
    await supabase.from("comments").insert({ project_id: photo.id, author: author.trim() || "Anonymous", body: body.trim() });
    setBody("");
  };

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? "40%" : "-40%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative bg-white dark:bg-gray-950 rounded-2xl shadow-2xl w-full max-w-3xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Photo with nav arrows */}
        <div className="relative bg-black flex items-center justify-center md:flex-1 min-h-[220px] md:min-h-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={photo.id}
              src={photo.url}
              alt={photo.caption || ""}
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.3 }}
              className="max-w-full max-h-[360px] md:max-h-full object-contain select-none"
              draggable={false}
            />
          </AnimatePresence>

          {/* Prev */}
          {index > 0 && (
            <button onClick={() => nav(-1)}
              className="absolute left-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition">
              <ChevronLeft size={18} />
            </button>
          )}
          {/* Next */}
          {index < photos.length - 1 && (
            <button onClick={() => nav(1)}
              className="absolute right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition">
              <ChevronRight size={18} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/30 text-white/70 text-xs px-2 py-0.5 rounded-full">
            {index + 1} / {photos.length}
          </div>
        </div>

        {/* Info panel */}
        <div className="md:w-72 flex flex-col max-h-[50vh] md:max-h-full">
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <img src="/Joonhyung Park.jpg" alt="" className="w-7 h-7 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">joonhyung</p>
                <p className="text-xs text-gray-400">{relativeDate(photo.created_at)}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <X size={16} />
            </button>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0">
            {photo.caption && (
              <div className="flex gap-2">
                <img src="/Joonhyung Park.jpg" alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white mr-1.5">joonhyung</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">{photo.caption}</span>
                </div>
              </div>
            )}
            {comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold shrink-0">
                  {c.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white mr-1.5">{c.author}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">{c.body}</span>
                </div>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </div>

          {/* Actions */}
          <div className="px-4 pt-2.5 pb-1 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-3 mb-1">
              <motion.button onClick={() => onLike(photo)} whileTap={{ scale: 1.3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Heart size={22} fill={liked ? "#ef4444" : "none"} stroke={liked ? "#ef4444" : "currentColor"}
                  strokeWidth={1.75} className="text-gray-800 dark:text-gray-200" />
              </motion.button>
              <MessageCircle size={22} strokeWidth={1.75} className="text-gray-800 dark:text-gray-200" />
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white">{photo.likeCount} likes</p>
          </div>

          {/* Comment input */}
          <form onSubmit={handleComment} className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-1.5 shrink-0">
            <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value); setProfanityErr(false); }}
              placeholder={t.namePlaceholder} maxLength={40}
              className="text-xs bg-transparent outline-none text-gray-500 dark:text-gray-400 placeholder-gray-400" />
            <div className="flex items-center gap-2">
              <input type="text" value={body} onChange={(e) => { setBody(e.target.value); setProfanityErr(false); }}
                placeholder={t.commentPlaceholder} maxLength={280}
                className="flex-1 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
              <button type="submit" disabled={!body.trim()} className="text-blue-500 hover:text-blue-600 disabled:opacity-30 transition-colors">
                <Send size={15} />
              </button>
            </div>
            {profanityErr && <p className="text-red-500 text-xs">{t.warn}</p>}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Explore (Bento Grid) ───────────────────────────────────────────────────
export default function Explore() {
  const [photos, setPhotos] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    setLikedMap(JSON.parse(localStorage.getItem("liked_photos") || "{}"));
    (async () => {
      const { data } = await supabase.from("photos").select("*").order("created_at", { ascending: false });
      if (!data) return;
      const withCounts = await Promise.all(
        data.map(async (p) => {
          const [{ count: lc }, { count: cc }] = await Promise.all([
            supabase.from("likes").select("*", { count: "exact", head: true }).eq("project_id", p.id),
            supabase.from("comments").select("*", { count: "exact", head: true }).eq("project_id", p.id),
          ]);
          return { ...p, likeCount: lc || 0, commentCount: cc || 0 };
        })
      );
      setPhotos(withCounts);
    })();
  }, []);

  const handleLike = async (photo) => {
    if (likedMap[photo.id]) return;
    const { error } = await supabase.from("likes").insert({ project_id: photo.id });
    if (!error) {
      const m = { ...likedMap, [photo.id]: true };
      setLikedMap(m);
      localStorage.setItem("liked_photos", JSON.stringify(m));
      setPhotos((prev) => prev.map((p) => p.id === photo.id ? { ...p, likeCount: p.likeCount + 1 } : p));
    }
  };

  const handleNav = useCallback((dir) => {
    setSelectedIdx((i) => Math.max(0, Math.min(photos.length - 1, i + dir)));
  }, [photos.length]);

  if (!photos.length) return (
    <div className="flex items-center justify-center py-20 text-gray-400 text-sm">No photos yet.</div>
  );

  // 3-column masonry: distribute photos across columns
  const cols = [[], [], []];
  photos.forEach((photo, i) => cols[i % 3].push({ photo, idx: i }));

  return (
    <>
      <div className="pb-20 md:pb-8 px-0.5 pt-0.5">
        <div className="flex gap-0.5 items-start">
          {cols.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-0.5">
              {col.map(({ photo, idx }) => (
                <motion.div
                  key={photo.id}
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedIdx(idx)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || ""}
                    className="w-full block transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-200 flex items-center justify-center gap-4">
                    <span className="text-white font-semibold text-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Heart size={16} fill="white" stroke="white" /> {photo.likeCount}
                    </span>
                    <span className="text-white font-semibold text-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <MessageCircle size={16} fill="white" stroke="white" /> {photo.commentCount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <PhotoModal
            photos={photos}
            index={selectedIdx}
            onClose={() => setSelectedIdx(null)}
            onNav={handleNav}
            likedMap={likedMap}
            onLike={handleLike}
          />
        )}
      </AnimatePresence>
    </>
  );
}
