import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Heart from "lucide-react/dist/esm/icons/heart.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import Send from "lucide-react/dist/esm/icons/send.js";
import { supabase, toSlug } from "../lib/supabase";

function useLikes(projectId) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    const likedMap = JSON.parse(localStorage.getItem("liked_projects") || "{}");
    setLiked(!!likedMap[projectId]);
    fetchCount(projectId);

    const channel = supabase
      .channel(`likes-${projectId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "likes", filter: `project_id=eq.${projectId}` }, () => {
        fetchCount(projectId);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [projectId]);

  const fetchCount = async (id) => {
    const { count: c } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id);
    setCount(c || 0);
  };

  const toggleLike = async () => {
    if (liked || !projectId) return;
    const { error } = await supabase.from("likes").insert({ project_id: projectId });
    if (!error) {
      const likedMap = JSON.parse(localStorage.getItem("liked_projects") || "{}");
      likedMap[projectId] = true;
      localStorage.setItem("liked_projects", JSON.stringify(likedMap));
      setLiked(true);
      setCount((c) => c + 1);
    }
  };

  return { count, liked, toggleLike };
}

function useComments(projectId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!projectId) return;
    fetchComments(projectId);

    const channel = supabase
      .channel(`comments-${projectId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments", filter: `project_id=eq.${projectId}` }, (payload) => {
        setComments((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [projectId]);

  const fetchComments = async (id) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });
    setComments(data || []);
  };

  const addComment = async (author, body) => {
    await supabase.from("comments").insert({ project_id: projectId, author: author.trim() || "Anonymous", body });
  };

  return { comments, addComment };
}

export default function ProjectModal({ project, onClose }) {
  const projectId = project ? toSlug(project.title) : null;
  const { count: likeCount, liked, toggleLike } = useLikes(projectId);
  const { comments, addComment } = useComments(projectId);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;
    await addComment(commentAuthor, commentBody.trim());
    setCommentBody("");
  };

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
            className="relative bg-white dark:bg-gray-950 rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            {/* Image */}
            <div className="relative w-full h-48 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain p-6" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex flex-col overflow-y-auto">
              {/* Info */}
              <div className="p-5 flex flex-col gap-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {project.details || project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-1">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-xs font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition">
                      <FaGithub size={13} /> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Likes + comment count */}
              <div className="px-5 py-3 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
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

              {/* Comments list */}
              <div className="px-5 py-3 flex flex-col gap-3 max-h-48 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-600 text-center py-2">No comments yet. Be the first!</p>
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
              <form onSubmit={handleComment} className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your name (optional)"
                  className="text-xs bg-transparent border-none outline-none text-gray-500 dark:text-gray-400 placeholder-gray-400"
                  maxLength={40}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                    maxLength={280}
                  />
                  <button
                    type="submit"
                    disabled={!commentBody.trim()}
                    className="text-blue-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
