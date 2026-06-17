import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Heart from "lucide-react/dist/esm/icons/heart.js";
import ProjectModal from "./ProjectModal";
import { supabase, toSlug } from "../lib/supabase";
import { useLang } from "../context/LangContext";

export const projects = [
  {
    title: "Route N",
    description: {
      en: "Travel planning app with Google Maps integration and personalized recommendations.",
      ko: "Google Maps 연동 및 개인 맞춤 추천 기능을 갖춘 여행 계획 앱.",
    },
    details: {
      en: "Travel planning app with Google Maps integration and personalized recommendations from FirebaseDB. Users can search destinations, save routes, and get AI-driven suggestions based on their preferences.",
      ko: "FirebaseDB 기반 개인 맞춤 추천과 Google Maps를 연동한 여행 계획 앱. 목적지 검색, 루트 저장, 선호도 기반 AI 추천 기능 제공.",
    },
    tech: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    image: "/route-n.png",
    link: "https://github.com/pjh0314/RouteN",
  },
  {
    title: "ghostdiedie",
    description: {
      en: "Multiplayer 3D fighting game where your webcam is the controller. Built for Bitcamp 2026.",
      ko: "웹캠이 컨트롤러가 되는 멀티플레이어 3D 격투 게임. Bitcamp 2026 출품작.",
    },
    details: {
      en: "You punch, your character punches. No controller, no setup, just a webcam and a browser. Built for Bitcamp 2026, ghostdiedie detects punches, kicks, jumps, and headbutts in real time using MediaPipe pose estimation at around 20fps. Matches are synced server-side over WebSocket and players can see each other via WebRTC video. Pick an arena, calibrate, and fight best of 3.",
      ko: "네가 치면 캐릭터가 친다. 컨트롤러도, 셋업도 필요 없고 웹캠과 브라우저만 있으면 된다. Bitcamp 2026을 위해 만든 ghostdiedie는 MediaPipe 포즈 추정으로 펀치·킥·점프·박치기를 약 20fps로 실시간 감지한다. 매치는 WebSocket으로 서버 동기화, WebRTC 영상으로 상대방 얼굴을 보며 3판 2선승제로 싸운다.",
    },
    tech: ["React", "Three.js", "MediaPipe", "FastAPI", "Supabase", "WebSocket", "WebRTC"],
    image: "/DIEDIE.png",
    link: "https://github.com/pjh0314/ghostdiedie-bitcamp2026",
    demo: "https://ghostdiedie.surf",
  },
  {
    title: "Portfolio Website",
    description: {
      en: "A modern, responsive personal portfolio built with React, TailwindCSS, and Framer Motion.",
      ko: "React, TailwindCSS, Framer Motion으로 만든 반응형 개인 포트폴리오.",
    },
    details: {
      en: "A modern, responsive personal portfolio built with React, TailwindCSS, and Framer Motion. Showcases projects, experiences, and skills in an interactive way with dark mode support.",
      ko: "React, TailwindCSS, Framer Motion으로 제작한 반응형 개인 포트폴리오. 프로젝트·경력·기술을 인터랙티브하게 소개하며 다크 모드를 지원한다.",
    },
    tech: ["React", "TailwindCSS", "Framer Motion"],
    image: "/Joonhyung Park Sq.jpg",
    link: "https://github.com/pjh0314/portfolio",
  },
];

export default function Projects() {
  const lang = useLang();
  const [selected, setSelected] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedMap, setLikedMap] = useState({});

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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("liked_projects") || "{}");
    setLikedMap(stored);
    fetchCounts();

    const channel = supabase
      .channel("projects-likes-grid")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "likes" }, () => {
        fetchCounts();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleModalClose = () => {
    setSelected(null);
    const stored = JSON.parse(localStorage.getItem("liked_projects") || "{}");
    setLikedMap(stored);
  };

  const toTranslated = (p) => ({
    ...p,
    description: typeof p.description === "object" ? p.description[lang] : p.description,
    details: typeof p.details === "object" ? p.details[lang] : p.details,
  });

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
              onClick={() => setSelected(toTranslated(project))}
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
