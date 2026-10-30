import { motion } from "motion/react";
import SectionTitle from "./SectionTitle.tsx";
import Reveal from "./Reveal.tsx";
import Tilt from "./Tilt.tsx";
import { resumeData } from "../data/resume.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";
import { renderSkillIcon } from "./CyberSkillsIcons.tsx";

export default function Skills() {
  const dispatch = useAppDispatch();
  const { cyberSkills } = resumeData;

  const col1 = cyberSkills.columns[0]; // Core & Languages (4 cards)
  const col2 = cyberSkills.columns[1]; // Frontend & State Management (3 cards + bridge)
  const col3 = cyberSkills.columns[2]; // Architecture & Tools (3 cards)

  return (
    <section aria-label="Technical Skills & Competencies" className="relative py-4">
      {/* Top Section Header */}
      <SectionTitle
        title="Technical Arsenal &"
        highlight="System Architecture"
        subtitle="A high-performance engineering stack mapped as an interconnected cybernetic ecosystem."
      />

      {/* ===================================================================== */}
      {/* CYBER MOTHERBOARD SHOWCASE CONTAINER (Matches Reference Image)         */}
      {/* ===================================================================== */}
      <Reveal delay={0.15}>
        <div className="relative mx-auto w-full max-w-[1360px] rounded-[2.5rem] bg-[#070b16] border border-cyan-500/25 p-5 sm:p-7 md:p-8 lg:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
          {/* Ambient Cybernetic Lighting Overlays */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[550px] rounded-full bg-purple-600/15 blur-[140px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-30 -right-40 h-[500px] w-[500px] rounded-full bg-rose-600/15 blur-[130px]"
          />

          {/* Matrix Circuit Grid Background Pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "24px 24px, 48px 48px",
            }}
          />

          {/* ================================================================= */}
          {/* 3-COLUMN MOTHERBOARD SYSTEM (With Inter-Column Circuit Bridges)     */}
          {/* ================================================================= */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-0">
            {/* --------------------------------------------------------------- */}
            {/* COLUMN 1: Core & Languages                                      */}
            {/* --------------------------------------------------------------- */}
            <div className="w-full lg:w-[28.5%] flex flex-col">
              <h3 className="mb-6 text-center font-bold text-lg sm:text-xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]">
                {col1.title}
              </h3>

              <div className="flex flex-col gap-4 flex-1 justify-between">
                {col1.cards.map((card) => (
                  <Tilt key={card.id} className="relative group">
                    <div
                      onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                      onMouseLeave={() => dispatch(setCursorVariant("default"))}
                      className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(56,189,248,0.15)] transition-all duration-300 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                    >
                      {/* Left: 3D Tech Icon */}
                      {renderSkillIcon(card.id)}

                      {/* Right: Title & 5 Bullets */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                          {card.title}
                        </h4>
                        <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                          {card.bullets.map((bullet) => (
                            <div key={bullet} className="truncate">
                              {bullet}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Edge Solder Output Pin (Desktop) */}
                      <span
                        aria-hidden="true"
                        className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-20"
                      />
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* BRIDGE 1: Multi-Trace Circuit Bus (Between Col 1 and Col 2)     */}
            {/* --------------------------------------------------------------- */}
            <div
              aria-hidden="true"
              className="hidden lg:flex w-[7.2%] items-center justify-center relative select-none"
            >
              <svg className="w-full h-[536px] mt-12 overflow-visible" viewBox="0 0 90 536" fill="none">
                <defs>
                  <filter id="busGlow1" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="wireCyanG" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="wireGoldG" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#facc15" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="wireGreenG" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22c55e" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="wirePurpleG" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a855f7" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Vertical Circuit Channel Bus Lines (Motherboard traces) */}
                <line x1="38" y1="40" x2="38" y2="500" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1.5" />
                <line x1="44" y1="55" x2="44" y2="485" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="1.5" />
                <line x1="50" y1="70" x2="50" y2="470" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="1.5" />

                {/* Solder Vias */}
                <circle cx="38" cy="198" r="3.5" fill="#070b16" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="44" cy="336" r="3.5" fill="#070b16" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="50" cy="400" r="3" fill="#070b16" stroke="#22c55e" strokeWidth="1.5" />

                {/* Wire 1: TypeScript (Y=61) -> React (Y=61) */}
                <path
                  d="M 0 61 L 90 61"
                  stroke="url(#wireCyanG)"
                  strokeWidth="2.5"
                  filter="url(#busGlow1)"
                />
                <circle r="3" fill="#ffffff" filter="url(#busGlow1)">
                  <animateMotion path="M 0 61 L 90 61" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Wire 2: JavaScript (Y=199) -> React & Redux */}
                <path
                  d="M 0 199 L 32 199 C 42 199, 44 140, 44 100 C 44 70, 56 61, 90 61"
                  stroke="url(#wireGoldG)"
                  strokeWidth="2"
                  filter="url(#busGlow1)"
                />
                <circle r="2.5" fill="#fef08a" filter="url(#busGlow1)">
                  <animateMotion
                    path="M 0 199 L 32 199 C 42 199, 44 140, 44 100 C 44 70, 56 61, 90 61"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Wire 3: Node.js (Y=337) -> Redux (Y=268) */}
                <path
                  d="M 0 337 L 30 337 C 40 337, 44 310, 48 285 C 52 268, 64 268, 90 268"
                  stroke="url(#wireGreenG)"
                  strokeWidth="2.5"
                  filter="url(#busGlow1)"
                />
                <circle r="3" fill="#86efac" filter="url(#busGlow1)">
                  <animateMotion
                    path="M 0 337 L 30 337 C 40 337, 44 310, 48 285 C 52 268, 64 268, 90 268"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Wire 4: Express.js (Y=475) -> Tailwind (Y=475) */}
                <path
                  d="M 0 475 L 90 475"
                  stroke="url(#wirePurpleG)"
                  strokeWidth="2.5"
                  filter="url(#busGlow1)"
                />
                <circle r="3" fill="#ffffff" filter="url(#busGlow1)">
                  <animateMotion path="M 0 475 L 90 475" dur="2.2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* COLUMN 2: Frontend & State Management                           */}
            {/* --------------------------------------------------------------- */}
            <div className="w-full lg:w-[28.5%] flex flex-col relative">
              <h3 className="mb-6 text-center font-bold text-lg sm:text-xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)]">
                {col2.title}
              </h3>

              <div className="flex flex-col flex-1 justify-between gap-4">
                {/* 1. React.js Card */}
                {(() => {
                  const reactCard = col2.cards.find((c) => c.id === "react")!;
                  return (
                    <Tilt className="relative group">
                      <div
                        onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                        onMouseLeave={() => dispatch(setCursorVariant("default"))}
                        className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(56,189,248,0.15)] transition-all duration-300 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.35)]"
                      >
                        {/* Left Edge Solder Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-20"
                        />

                        {renderSkillIcon(reactCard.id)}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                            {reactCard.title}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                            {reactCard.bullets.map((bullet) => (
                              <div key={bullet} className="truncate">
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Edge Solder Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400 shadow-[0_0_10px_#ec4899] z-20"
                        />
                      </div>
                    </Tilt>
                  );
                })()}

                {/* Floating Bridge Node: ⚛️ Redux Toolkit */}
                <div className="relative py-1 flex items-center justify-center">
                  {/* Vertical connecting line */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-purple-400 pointer-events-none"
                  />
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-400/60 bg-[#160c2e]/95 px-4 py-1.5 text-xs font-mono font-bold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.5)] backdrop-blur-xl"
                  >
                    <span className="text-sm">⚛️</span>
                    <span>Redux Toolkit</span>
                  </motion.div>
                </div>

                {/* 2. Redux Toolkit Card */}
                {(() => {
                  const reduxCard = col2.cards.find((c) => c.id === "redux")!;
                  return (
                    <Tilt className="relative group">
                      <div
                        onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                        onMouseLeave={() => dispatch(setCursorVariant("default"))}
                        className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(168,85,247,0.18)] transition-all duration-300 group-hover:border-purple-400/70 group-hover:shadow-[0_0_28px_rgba(168,85,247,0.35)]"
                      >
                        {/* Left Solder Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-purple-400 shadow-[0_0_10px_#a855f7] z-20"
                        />

                        {renderSkillIcon(reduxCard.id)}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-purple-200 transition-colors">
                            {reduxCard.title}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                            {reduxCard.bullets.map((bullet) => (
                              <div key={bullet} className="truncate">
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Solder Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400 shadow-[0_0_10px_#ec4899] z-20"
                        />
                      </div>
                    </Tilt>
                  );
                })()}

                {/* 3. Tailwind CSS Card */}
                {(() => {
                  const twCard = col2.cards.find((c) => c.id === "tailwind")!;
                  return (
                    <Tilt className="relative group">
                      <div
                        onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                        onMouseLeave={() => dispatch(setCursorVariant("default"))}
                        className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(56,189,248,0.15)] transition-all duration-300 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.35)]"
                      >
                        {/* Left Solder Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-20"
                        />

                        {renderSkillIcon(twCard.id)}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                            {twCard.title}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                            {twCard.bullets.map((bullet) => (
                              <div key={bullet} className="truncate">
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  );
                })()}
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* BRIDGE 2: Multi-Trace Circuit Bus (Between Col 2 and Col 3)     */}
            {/* --------------------------------------------------------------- */}
            <div
              aria-hidden="true"
              className="hidden lg:flex w-[7.2%] items-center justify-center relative select-none"
            >
              <svg className="w-full h-[536px] mt-12 overflow-visible" viewBox="0 0 90 536" fill="none">
                <defs>
                  <filter id="busGlow2" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="wirePinkG" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f43f5e" />
                    <stop offset="0.6" stopColor="#ec4899" />
                    <stop offset="1" stopColor="#fb7185" />
                  </linearGradient>
                  <linearGradient id="wireOrangeG" x1="0" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ec4899" />
                    <stop offset="1" stopColor="#f97316" />
                  </linearGradient>
                </defs>

                {/* Vertical Bus Line */}
                <line x1="45" y1="40" x2="45" y2="500" stroke="rgba(244, 63, 94, 0.45)" strokeWidth="1.5" />
                <line x1="51" y1="60" x2="51" y2="480" stroke="rgba(236, 72, 153, 0.35)" strokeWidth="1.5" />

                {/* Solder Vias */}
                <circle cx="45" cy="61" r="3.5" fill="#070b16" stroke="#f43f5e" strokeWidth="1.5" />
                <circle cx="45" cy="268" r="3.5" fill="#070b16" stroke="#ec4899" strokeWidth="1.5" />

                {/* Wire 1: React (Y=61) -> REST APIs (Y=61) */}
                <path
                  d="M 0 61 L 90 61"
                  stroke="url(#wirePinkG)"
                  strokeWidth="2.5"
                  filter="url(#busGlow2)"
                />
                <circle r="3" fill="#ffffff" filter="url(#busGlow2)">
                  <animateMotion path="M 0 61 L 90 61" dur="2.1s" repeatCount="indefinite" />
                </circle>

                {/* Wire 2: React (Y=75) -> JWT Auth (Y=268) */}
                <path
                  d="M 0 75 L 30 75 C 45 75, 45 170, 45 220 C 45 260, 58 268, 90 268"
                  stroke="url(#wirePinkG)"
                  strokeWidth="2"
                  filter="url(#busGlow2)"
                />
                <circle r="2.5" fill="#fbcfe8" filter="url(#busGlow2)">
                  <animateMotion
                    path="M 0 75 L 30 75 C 45 75, 45 170, 45 220 C 45 260, 58 268, 90 268"
                    dur="2.9s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Wire 3: Redux (Y=268) -> JWT Auth (Y=268) */}
                <path
                  d="M 0 268 L 90 268"
                  stroke="url(#wirePinkG)"
                  strokeWidth="2.5"
                  filter="url(#busGlow2)"
                />
                <circle r="3" fill="#ffffff" filter="url(#busGlow2)">
                  <animateMotion path="M 0 268 L 90 268" dur="2.3s" repeatCount="indefinite" />
                </circle>

                {/* Wire 4: Redux (Y=282) -> Git & GitHub (Y=475) */}
                <path
                  d="M 0 282 L 28 282 C 45 282, 45 380, 45 430 C 45 470, 58 475, 90 475"
                  stroke="url(#wireOrangeG)"
                  strokeWidth="2.5"
                  filter="url(#busGlow2)"
                />
                <circle r="3" fill="#fed7aa" filter="url(#busGlow2)">
                  <animateMotion
                    path="M 0 282 L 28 282 C 45 282, 45 380, 45 430 C 45 470, 58 475, 90 475"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* COLUMN 3: Architecture & Tools                                  */}
            {/* --------------------------------------------------------------- */}
            <div className="w-full lg:w-[28.5%] flex flex-col">
              <h3 className="mb-6 text-center font-bold text-lg sm:text-xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(244,63,94,0.4)]">
                {col3.title}
              </h3>

              <div className="flex flex-col gap-4 flex-1 justify-between">
                {/* 1. REST APIs */}
                {(() => {
                  const restCard = col3.cards.find((c) => c.id === "rest")!;
                  return (
                    <Tilt className="relative group">
                      <div
                        onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                        onMouseLeave={() => dispatch(setCursorVariant("default"))}
                        className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(244,63,94,0.18)] transition-all duration-300 group-hover:border-rose-400/70 group-hover:shadow-[0_0_28px_rgba(244,63,94,0.35)]"
                      >
                        {/* Left Solder Input Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400 shadow-[0_0_10px_#ec4899] z-20"
                        />

                        {renderSkillIcon(restCard.id)}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-rose-200 transition-colors">
                            {restCard.title}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                            {restCard.bullets.map((bullet) => (
                              <div key={bullet} className="truncate">
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  );
                })()}

                {/* 2. JWT Authentication */}
                {(() => {
                  const jwtCard = col3.cards.find((c) => c.id === "jwt")!;
                  return (
                    <Tilt className="relative group">
                      <div
                        onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                        onMouseLeave={() => dispatch(setCursorVariant("default"))}
                        className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(244,63,94,0.18)] transition-all duration-300 group-hover:border-rose-400/70 group-hover:shadow-[0_0_28px_rgba(244,63,94,0.35)]"
                      >
                        {/* Left Solder Input Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400 shadow-[0_0_10px_#ec4899] z-20"
                        />

                        {renderSkillIcon(jwtCard.id)}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-rose-200 transition-colors">
                            {jwtCard.title}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                            {jwtCard.bullets.map((bullet) => (
                              <div key={bullet} className="truncate">
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  );
                })()}

                {/* 3. Git & GitHub */}
                {(() => {
                  const gitCard = col3.cards.find((c) => c.id === "git")!;
                  return (
                    <Tilt className="relative group">
                      <div
                        onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                        onMouseLeave={() => dispatch(setCursorVariant("default"))}
                        className="relative flex items-center gap-3.5 sm:gap-4 h-[122px] rounded-2xl bg-gradient-to-br from-indigo-950/45 via-slate-900/65 to-slate-950/90 px-4 py-3 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_18px_rgba(244,63,94,0.18)] transition-all duration-300 group-hover:border-rose-400/70 group-hover:shadow-[0_0_28px_rgba(244,63,94,0.35)]"
                      >
                        {/* Left Solder Input Pin */}
                        <span
                          aria-hidden="true"
                          className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400 shadow-[0_0_10px_#ec4899] z-20"
                        />

                        {renderSkillIcon(gitCard.id)}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base sm:text-[16.5px] text-white tracking-tight group-hover:text-rose-200 transition-colors">
                            {gitCard.title}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-slate-300 text-xs sm:text-[12px] font-normal leading-[1.36]">
                            {gitCard.bullets.map((bullet) => (
                              <div key={bullet} className="truncate">
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
