import ProjectCard from "./ProjectCard";

export default function Projects() {
  const projects = [
    {
      title: "Route N",
      description:
        "Travel planning app with Google Maps integration and personalized recommendations from FirebaseDB.",
      tech: ["Flutter", "Dart", "Firebase", "Google Maps API"],
      image: "/route-n.png",
      link: "https://github.com/pjh0314/RouteN",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive personal portfolio built with React, TailwindCSS, and Framer Motion. Showcases projects, experiences, and skills in an interactive way.",
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
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </div>
  );
}
