import React from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  width?: "full" | "auto";
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 30,
  className = "",
  width = "full",
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`${width === "full" ? "w-full" : "w-auto"} ${className}`}
    >
      {children}
    </motion.div>
  );
}

