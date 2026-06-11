import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor({ dark }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const spotRef = useRef(null);

  const ringX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (spotRef.current) {
        spotRef.current.style.background = dark
          ? `radial-gradient(400px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.13), transparent 70%)`
          : "none";
      }
    };
    const onOver = (e) => setHovered(!!e.target.closest("a, button"));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [dark, mouseX, mouseY]);

  return (
    <>
      <div ref={spotRef} className="fixed inset-0 pointer-events-none z-[9997]" />

      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovered ? 44 : 8,
          height: hovered ? 44 : 8,
          backgroundColor: hovered ? "rgba(99, 102, 241, 0.15)" : "rgb(99, 102, 241)",
          border: hovered ? "1.5px solid rgba(99, 102, 241, 0.5)" : "0px solid transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-400/40 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
