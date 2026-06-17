import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";

export default function FloatingMessage({ open, setOpen }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

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
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Send a message"
      >
        <MessageCircle size={18} />
        <span className="text-sm font-semibold">Message</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-sm z-10 p-5"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">Send a Message</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message..."
                  rows={4}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send"}
                </button>
                {status === "success" && (
                  <p className="text-green-500 text-xs text-center">Sent!</p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-xs text-center">Something went wrong. Try again.</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
