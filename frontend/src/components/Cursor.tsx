import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAppSelector } from "../store/hooks.ts";

export default function Cursor() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const cursorVariant = useAppSelector((state) => state.ui.cursorVariant);
  const cursorText = useAppSelector((state) => state.ui.cursorText);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  const isHovered = cursorVariant === "hover";
  const isGlow = cursorVariant === "glow";

  return (
    <>
      {/* Outer Spring Follower */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full"
        animate={{
          x: mousePos.x - (isHovered ? 28 : isGlow ? 38 : 16),
          y: mousePos.y - (isHovered ? 28 : isGlow ? 38 : 16),
          width: isHovered ? 56 : isGlow ? 76 : 32,
          height: isHovered ? 56 : isGlow ? 76 : 32,
          borderColor: isHovered
            ? "rgba(2, 132, 199, 0.9)"
            : "rgba(124, 58, 237, 0.55)",
          backgroundColor: isHovered
            ? "rgba(2, 132, 199, 0.1)"
            : isGlow
              ? "rgba(219, 39, 119, 0.12)"
              : "rgba(124, 58, 237, 0.05)",
          backdropFilter: isHovered ? "blur(1px)" : "blur(0px)",
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
          mass: 0.4,
        }}
        style={{
          borderWidth: "1.5px",
          borderStyle: "solid",
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-wider text-violet-900">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.5)]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 40,
        }}
      />
    </>
  );
}
