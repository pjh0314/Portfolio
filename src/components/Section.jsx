import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Section({ id, children }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    controls.start({
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 30, 
      transition: { duration: 0.8, ease: inView ? "easeOut" : "easeInOut" },
    });
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="min-h-[80vh] flex items-center justify-center px-6 md:px-20 lg:px-32 py-10" 
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
    >
      {children}
    </motion.section>
  );
}
