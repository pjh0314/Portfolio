import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Heart from "lucide-react/dist/esm/icons/heart.js";
import ProjectModal from "./ProjectModal";
import { supabase, toSlug } from "../lib/supabase";

export const projects = [
  {
    title: "Route N",
    description: "Travel planning app with Google Maps integration and personalized recommendations.",
    details: "Travel planning app with Google Maps integration and personalized recommendations from FirebaseDB. Users can search destinations, save routes, and get AI-driven suggestions based on their preferences.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    image: "/route-n.png",
    link: "https://github.com/pjh0314/RouteN",
  },
  {
    title: "ghostdiedie",
    description: "Multiplayer 3D fighting game where your webcam is the controller. Built for Bitcamp 2026.",
    details: "You punch, your character punches. No controller, no setup, just a webcam and a browser. Built for Bitcamp 2026, ghostdiedie detects punches, kicks, jumps, and headbutts in real time using MediaPipe pose estimation at around 20fps. Matches are synced server-side over WebSocket and players can see each other via WebRTC video. Pick an arena, calibrate, and fight best of 3.",
    tech: ["React", "Three.js", "MediaPipe", "FastAPI", "Supabase", "WebSocket", "WebRTC"],
    image: "/DIEDIE.png",
    link: "https://github.com/pjh0314/ghostdiedie-bitcamp2026",
    demo: "https://ghostdiedie.surf",
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive personal portfolio built with React, TailwindCSS, and Framer Motion.",
    details: "A modern, responsive personal portfolio built with React, TailwindCSS, and Framer Motion. Showcases projects, experiences, and skills in an interactive way with dark mode support.",
    tech: ["React", "TailwindCSS", "Framer Motion"],
    image: "/Joonhyung Park Sq.jpg",
    link: "https://github.com/pjh0314/portfolio",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("liked_projects") || "{}");
    setLikedMap(stored);

    const fetchCounts = async () => {
      const counts = {};
      await Promise.all(
        projects.map(async (p) => {
          const slug = toSlug(p.title);
          const { count } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("project_id", slug);
          counts[slug] = count || 0;
        })
      );
      setLikeCounts(counts);
    };

    fetchCounts();
  }, []);

  const handleModalClose = () => {
    setSelected(null);
    // Refresh like counts after modal closes (user may have liked)
    const stored = JSON.parse(localStorage.getItem("liked_projects") || "{}");
    setLikedMap(stored);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 sm:gap-1 mt-1">
        {projects.map((project, idx) => {
          const slug = toSlug(project.title);
          const count = likeCounts[slug] || 0;
          const liked = !!likedMap[slug];

          return (
            <motion.div
              key={idx}
              className="relative aspect-square overflow-hidden cursor-pointer group bg-gray-100 dark:bg-gray-900"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-white font-semibold text-xs sm:text-sm text-center leading-tight">
                  {project.title}
                </p>
                <div className="flex items-center gap-1 text-white">
                  <Heart size={14} fill="currentColor" />
                  <span className="text-xs">{count}</span>
                </div>
              </div>

              {/* Like badge (always visible when liked) */}
              {liked && (
                <div className="absolute top-2 right-2 text-red-400 opacity-70 group-hover:opacity-0 transition-opacity">
                  <Heart size={14} fill="currentColor" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <ProjectModal project={selected} onClose={handleModalClose} />
    </>
  );
}
