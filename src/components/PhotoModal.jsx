import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Heart from "lucide-react/dist/esm/icons/heart.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import Send from "lucide-react/dist/esm/icons/send.js";
import { supabase } from "../lib/supabase";
import { useLang } from "../context/LangContext";

const BLOCKED_WORDS = [
  "fuck", "shit", "bitch", "ass", "asshole", "dick", "cunt", "nigger", "nigga",
  "faggot", "retard", "whore", "slut", "bastard", "damn", "hell", "piss",
  "시발", "씨발", "병신", "개새끼", "좆", "보지", "자지", "섹스", "섹x", "존나",
  "개년", "창녀", "걸레", "미친놈", "미친년", "새끼",
];
function containsProfanity(text) {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((w) => lower.includes(w));
}

const i18n = {
  en: {
    noComments: "No comments yet. Be the first!",
    namePlaceholder: "Your name (optional)",
    commentPlaceholder: "Add a comment...",
    profanityWarning: "Please keep it respectful.",
  },
  ko: {
    noComments: "아직 댓글이 없어요. 첫 댓글을 남겨보세요!",
    namePlaceholder: "이름 (선택)",
    commentPlaceholder: "댓글 달기...",
    profanityWarning: "예의 바른 댓글을 달아주세요.",
  },
};

function useLikes(photoId) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!photoId) return;
    const key = `liked_photos`;
    const map = JSON.parse(localStorage.getItem(key) || "{}");
    setLiked(!!map[photoId]);
    fetch(photoId);

    const channel = supabase
      .channel(`photo-likes-${photoId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "likes", filter: `project_id=eq.${photoId}` }, () => fetch(photoId))
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [photoId]);

  const fetch = async (id) => {
    const { count: c } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id);
    setCount(c || 0);
  };

  const toggleLike = async () => {
    if (liked || !photoId) return;
    const { error } = await supabase.from("likes").insert({ project_id: photoId });
    if (!error) {
      const key = `liked_photos`;
      const map = JSON.parse(localStorage.getItem(key) || "{}");
      map[photoId] = true;
      localStorage.setItem(key, JSON.stringify(map));
      setLiked(true);
      setCount((c) => c + 1);
    }
  };

  return { count, liked, toggleLike };
}

function useComments(photoId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!photoId) return;
    fetchAll(photoId);

    const channel = supabase
      .channel(`photo-comments-${photoId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments", filter: `project_id=eq.${photoId}` }, (payload) => {
        setComments((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [photoId]);

  const fetchAll = async (id) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });
    setComments(data || []);
  };

  const addComment = async (author, body) => {
    await supabase.from("comments").insert({ project_id: photoId, author: author.trim() || "Anonymous", body });
  };

  return { comments, addComment };
}

export default function PhotoModal({ photo, onClose }) {
  const lang = useLang();
  const t = i18n[lang];
  const photoId = photo?.id ?? null;
  const { count: likeCount, liked, toggleLike } = useLikes(photoId);
  const { comments, addComment } = useComments(photoId);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [profanityError, setProfanityError] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    if (containsProfanity(body) || containsProfanity(author)) {
      setProfanityError(true);
      return;
    }
    setProfanityError(false);
    await addComment(author, body.trim());
    setBody("");
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative bg-white dark:bg-gray-950 rounded-2xl shadow-2xl w-full max-w-sm z-10 overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            {/* Photo */}
            <div className="relative w-full aspect-square shrink-0 bg-gray-100 dark:bg-gray-900">
              <img src={photo.url} alt={photo.caption || ""} className="w-full h-full object-cover" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col overflow-y-auto">
              {/* Caption */}
              {photo.caption && (
                <div className="px-4 pt-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{photo.caption}</p>
                </div>
              )}

              {/* Likes + comment count */}
              <div className="px-4 py-2.5 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-1.5 transition-colors ${
                    liked ? "text-red-500" : "text-gray-500 dark:text-gray-400 hover:text-red-400"
                  }`}
                >
                  <Heart size={20} fill={liked ? "currentColor" : "none"} strokeWidth={1.75} />
                  <span className="text-sm font-medium">{likeCount}</span>
                </button>
                <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                  <MessageCircle size={20} strokeWidth={1.75} />
                  <span className="text-sm">{comments.length}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="px-4 py-3 flex flex-col gap-3 max-h-40 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-600 text-center py-1">{t.noComments}</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold shrink-0">
                        {c.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white mr-1.5">{c.author}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{c.body}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Comment input */}
              <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => { setAuthor(e.target.value); setProfanityError(false); }}
                  placeholder={t.namePlaceholder}
                  className="text-xs bg-transparent border-none outline-none text-gray-500 dark:text-gray-400 placeholder-gray-400"
                  maxLength={40}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={body}
                    onChange={(e) => { setBody(e.target.value); setProfanityError(false); }}
                    placeholder={t.commentPlaceholder}
                    className="flex-1 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                    maxLength={280}
                  />
                  <button
                    type="submit"
                    disabled={!body.trim()}
                    className="text-blue-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {profanityError && (
                  <p className="text-red-500 text-xs">{t.profanityWarning}</p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
