import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      title: "Frontline Coastal Surveillance TOD Operator",
      company: "GOP, Goseong, Gangwon-do, South Korea",
      period: "Jan 2024 - Jul 2025",
      responsibilities: [
        "Maintained high level of focus and responsibility during frontline duty",
        "Operated surveillance equipment and performed real-time situation assessments",
        "Collaborated effectively with team members to respond quickly to potential threats",
      ],
      icon: "/ROKA.jpg",
    },
    {
      title: "Fundraise Event Chair",
      company: "Korean Undergraduate Student Association (KUSA), University of Maryland",
      period: "Aug 2023 - Dec 2023",
      responsibilities: [
        "Organized and led fundraising events to support Korean student community initiatives",
        "Coordinated logistics, budgeting, and marketing strategies for successful event execution",
        "Collaborated with executive team members and external partners to maximize outreach and participation",
      ],
      icon: "/KUSA.png", 
    },
  ];

  return (
    <div className="w-full min-h-screen px-6 md:px-20 lg:px-32 py-24 flex flex-col items-center">
      <h2 id="experience" className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-mt-32">
        Work Experience
      </h2>

      <div className="flex flex-col gap-12 w-full max-w-4xl">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
              <img
                src={exp.icon}
                alt={`${exp.title} Icon`}
                className="w-10 h-10 object-cover border-2 border-gray-300 dark:border-gray-600 rounded-md"
              />
              {exp.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.company}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{exp.period}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              {exp.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
