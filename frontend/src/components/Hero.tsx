import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { resumeData } from "../data/resume.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";
import Tilt from "./Tilt.tsx";

export default function Hero() {
  const dispatch = useAppDispatch();
  const { personal } = resumeData;

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = personal.subRoles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personal.subRoles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, personal.subRoles]);

  const heroNameWords = personal.name.split(" ");

  return (
    <section
      aria-label="Introduction & Hero"
      className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center py-6 sm:py-10"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Content (7 cols on lg) */}
          <div className="lg:col-span-7 text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-[11px] font-mono font-medium tracking-wider text-violet-900">
                AVAILABLE FOR MERN / FULL STACK ROLES
              </span>
            </motion.div>

            {/* 3D Letter-by-Letter Hero Name (Mobile-first, wraps cleanly) */}
            <div className="mt-5 sm:mt-6 perspective-1000">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] flex flex-wrap">
                {heroNameWords.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="inline-block mr-3 sm:mr-5 whitespace-nowrap"
                  >
                    {word.split("").map((char, charIndex) => {
                      const totalIndex = wordIndex * 8 + charIndex;
                      return (
                        <motion.span
                          key={charIndex}
                          initial={{
                            opacity: 0,
                            y: 40,
                            rotateX: -85,
                            filter: "blur(6px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.7,
                            delay: 0.15 + totalIndex * 0.04,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                          className="inline-block transform-gpu transition-colors hover:text-violet-700"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                ))}
              </h1>
            </div>

            {/* Typewriter Role Line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-4 flex items-center gap-2 text-lg sm:text-2xl font-mono font-bold"
            >
              <span className="text-violet-500">&gt;</span>
              <span className="bg-gradient-to-r from-violet-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {displayText}
              </span>
              <span className="inline-block h-5 sm:h-6 w-0.5 bg-violet-600 animate-pulse" />
            </motion.div>

            {/* Summary paragraph verbatim from resume */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600"
            >
              {personal.summary}
            </motion.p>

            {/* Quick Feature Badges from Resume */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              <span className="rounded-xl border border-violet-200 bg-violet-50/80 px-3 py-1 text-xs font-mono font-medium text-violet-800 shadow-sm">
                💼 D-Table Analytics Internship
              </span>
              <span className="rounded-xl border border-cyan-200 bg-cyan-50/80 px-3 py-1 text-xs font-mono font-medium text-cyan-800 shadow-sm">
                🎓 BCA • Eklavya University (6.77)
              </span>
              <span className="rounded-xl border border-pink-200 bg-pink-50/80 px-3 py-1 text-xs font-mono font-medium text-pink-800 shadow-sm">
                🏆 4x Coding Ninjas Certified
              </span>
            </motion.div>

            {/* CTAs and Verified Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                to="/projects"
                onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                onMouseLeave={() => dispatch(setCursorVariant("default"))}
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-500/35"
              >
                <span>Explore Projects</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                to="/contact"
                onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                onMouseLeave={() => dispatch(setCursorVariant("default"))}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-violet-500 hover:text-violet-700"
              >
                <span>Get In Touch</span>
              </Link>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-400 hover:text-violet-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-400 hover:text-violet-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Developer Portrait Card (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full max-w-sm sm:max-w-md"
            >
              <Tilt
                maxTilt={7}
                spotlightColor="rgba(124, 58, 237, 0.15)"
                className="glass-panel-glow rounded-3xl p-3 sm:p-4 relative overflow-hidden shadow-2xl"
              >
                {/* Image Frame Container */}
                <div
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-b from-violet-100/50 to-cyan-50/50 shadow-inner group"
                >
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
