import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const projects = [
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

  return (
    <div className="w-full min-h-screen px-6 md:px-20 lg:px-32 py-24 flex flex-col items-center">
      <h2
        id="projects"
        className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-mt-32"
      >
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} onClick={() => setSelected(project)} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
