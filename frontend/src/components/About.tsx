import { useEffect, useState, useRef } from "react";
import Reveal from "./Reveal.tsx";
import Tilt from "./Tilt.tsx";
import { resumeData } from "../data/resume.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";
import {
  Gears3DIcon,
  CertificateScroll3DIcon,
  CloudDatabase3DIcon,
  TargetBullseye3DIcon,
  EnterpriseBuildings3DIcon,
  SecurityShield3DIcon,
  SpaceRocket3DIcon,
  CopaMedalSealIcon,
} from "./AboutCyberIcons.tsx";

// ============================================================================
// Animated Counter Component
// ============================================================================
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight">
      {count}
      <span className="text-cyan-400 ml-0.5">{suffix}</span>
    </div>
  );
}

// ============================================================================
// Helper Icons
// ============================================================================
function GraduationCapIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  );
}

function CertBadgeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function CalendarIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

// ============================================================================
// Main About Component
// ============================================================================
export default function About() {
  const dispatch = useAppDispatch();
  const { education, certifications } = resumeData;

  const edu = education[0];
  const certTrack = certifications[0];

  return (
    <section aria-label="About Hemant Kushwaha" className="relative py-4">
      <Reveal delay={0.1}>
        {/* ===================================================================== */}
        {/* CYBERNETIC DASHBOARD CONTAINER (Exact Match to Reference UI)          */}
        {/* ===================================================================== */}
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

          {/* Ambient Glowing Floating Dust Particles */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
            <div className="absolute bottom-1/4 left-1/2 h-1 w-1 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185]" />
            <div className="absolute top-2/3 right-1/4 h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
          </div>

          {/* ================================================================= */}
          {/* TWO-COLUMN LAYOUT: Left (63%) & Right (37%)                        */}
          {/* ================================================================= */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            {/* --------------------------------------------------------------- */}
            {/* LEFT COLUMN: Headline, Body Bio, 4 Metrics, At a Glance          */}
            {/* --------------------------------------------------------------- */}
            <div className="w-full lg:w-[63%] flex flex-col justify-between space-y-5 sm:space-y-6">
              {/* Top Headline & Subtitle */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)]">
                  MERN Stack &amp; Full Stack Engineering Solutions
                </h1>
                <div className="mt-1 text-xs sm:text-[13px] font-mono font-medium text-slate-400 tracking-wide">
                  Body Bio
                </div>

                {/* Body Bio Glass Card */}
                <div className="mt-3 relative rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-4 sm:p-5 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-200/90 font-normal">
                    Highly motivated Software Engineer specializing in scalable MERN stack applications
                    and robust backend architectures. Experienced in the entire software development life
                    cycles, including enterprise-style deployments, REST APIs, JWT authentication,
                    Role-Based Access Control (RBAC), and dynamic dashboards. Eager to contribute to a
                    high-performance engineering team.
                  </p>
                </div>
              </div>

              {/* Row of 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {/* Metric 1: ERP Modules Built */}
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-3.5 sm:p-4 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] group"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <Gears3DIcon className="w-full h-full" />
                    </div>
                    <AnimatedCounter target={5} suffix="+" />
                    <div className="mt-1 text-xs sm:text-[12.5px] font-semibold text-slate-300 leading-tight">
                      ERP Modules Built
                    </div>
                  </div>
                </Tilt>

                {/* Metric 2: Industry Certifications */}
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-3.5 sm:p-4 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] group"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <CertificateScroll3DIcon className="w-full h-full" />
                    </div>
                    <AnimatedCounter target={4} suffix="" />
                    <div className="mt-1 text-xs sm:text-[12.5px] font-semibold text-slate-300 leading-tight">
                      Industry Certifications
                    </div>
                  </div>
                </Tilt>

                {/* Metric 3: Core MERN Projects */}
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-3.5 sm:p-4 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] group"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <CloudDatabase3DIcon className="w-full h-full" />
                    </div>
                    <AnimatedCounter target={3} suffix="" />
                    <div className="mt-1 text-xs sm:text-[12.5px] font-semibold text-slate-300 leading-tight">
                      Core MERN Projects
                    </div>
                  </div>
                </Tilt>

                {/* Metric 4: Modern & Responsive UX */}
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-3.5 sm:p-4 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] group"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <TargetBullseye3DIcon className="w-full h-full" />
                    </div>
                    <AnimatedCounter target={100} suffix="%" />
                    <div className="mt-1 text-xs sm:text-[12.5px] font-semibold text-slate-300 leading-tight">
                      Modern &amp; Responsive UX
                    </div>
                  </div>
                </Tilt>
              </div>

              {/* Sub-section: At a Glance */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white mb-3">
                  At a Glance
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                  {/* At a Glance 1: ERP & Enterprise Engineering */}
                  <Tilt className="h-full">
                    <div
                      onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                      onMouseLeave={() => dispatch(setCursorVariant("default"))}
                      className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-4 sm:p-4.5 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] group"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2 group-hover:scale-105 transition-transform">
                        <EnterpriseBuildings3DIcon className="w-full h-full" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-[14.5px] font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                          ERP &amp; Enterprise Engineering
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-300/90 leading-relaxed font-normal">
                          Expertise in CRM, HRMS, and delegation systems, built for scale.
                        </p>
                      </div>
                    </div>
                  </Tilt>

                  {/* At a Glance 2: API & Backend Security */}
                  <Tilt className="h-full">
                    <div
                      onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                      onMouseLeave={() => dispatch(setCursorVariant("default"))}
                      className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-4 sm:p-4.5 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] group"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2 group-hover:scale-105 transition-transform">
                        <SecurityShield3DIcon className="w-full h-full" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-[14.5px] font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                          API &amp; Backend Security
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-300/90 leading-relaxed font-normal">
                          Proficient in secure API design, authentication, and database schema management.
                        </p>
                      </div>
                    </div>
                  </Tilt>

                  {/* At a Glance 3: High-Performance Frontend */}
                  <Tilt className="h-full">
                    <div
                      onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                      onMouseLeave={() => dispatch(setCursorVariant("default"))}
                      className="h-full rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/80 p-4 sm:p-4.5 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 hover:border-rose-400/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.25)] group"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2 group-hover:scale-105 transition-transform">
                        <SpaceRocket3DIcon className="w-full h-full" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-[14.5px] font-bold text-white tracking-tight group-hover:text-rose-200 transition-colors">
                          High-Performance Frontend
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-300/90 leading-relaxed font-normal">
                          Focused on clean, responsive, and high-performance user interfaces.
                        </p>
                      </div>
                    </div>
                  </Tilt>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* RIGHT COLUMN: Education & Certifications                         */}
            {/* --------------------------------------------------------------- */}
            <div className="w-full lg:w-[37%] flex flex-col justify-between gap-5 sm:gap-6">
              {/* Card 1: Education Card */}
              <Tilt className="w-full">
                <div
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="w-full rounded-3xl bg-gradient-to-b from-indigo-950/45 via-slate-900/65 to-slate-950/85 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                >
                  {/* Top Header Pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                    <GraduationCapIcon className="w-4 h-4 text-cyan-400" />
                    <span>Education</span>
                  </div>

                  {/* Recessed Inner Card with Rosette Medal */}
                  <div className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 pr-20 sm:pr-24 overflow-hidden">
                    {/* Glowing 3D COPA Rosette Medal in top-right */}
                    <div className="absolute top-2 right-2 sm:right-3 pointer-events-none">
                      <CopaMedalSealIcon className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {edu.degree}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-purple-400 mt-1">
                      {edu.institution}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      {edu.location}
                    </div>
                    <div className="mt-3.5 flex items-center gap-1.5 text-xs font-mono font-medium text-pink-400">
                      <CalendarIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              </Tilt>

              {/* Card 2: Certifications Card */}
              <Tilt className="w-full">
                <div
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="w-full rounded-3xl bg-gradient-to-b from-indigo-950/45 via-slate-900/65 to-slate-950/85 backdrop-blur-2xl border-t border-l border-white/25 border-b border-r border-white/10 p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-rose-400/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
                >
                  {/* Top Header Pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/35 text-rose-300 text-xs sm:text-sm font-semibold mb-4 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
                    <CertBadgeIcon className="w-4 h-4 text-rose-400" />
                    <span>Certifications</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-2.5">
                    Verified Coding Ninjas Track
                  </h3>

                  {/* Bullet Items Track */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                      <span>{certTrack.items[0]?.name || "Full Stack Web Development"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                      <span>{certTrack.items[1]?.name || "Generative AI"}</span>
                    </div>
                  </div>

                  {/* Period */}
                  <div className="my-3.5 flex items-center gap-1.5 text-xs font-mono font-medium text-pink-400">
                    <CalendarIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>{certTrack.period}</span>
                  </div>

                  {/* Interactive Verified Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href={certTrack.items[2]?.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                      onMouseLeave={() => dispatch(setCursorVariant("default"))}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-rose-500/20 border border-white/15 hover:border-rose-400/40 text-xs text-slate-200 hover:text-white transition-all duration-200 shadow-sm"
                      title="View Verified Soft Skills Credential"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span>{certTrack.items[2]?.name || "Soft Skills"}</span>
                    </a>

                    <a
                      href={certTrack.items[3]?.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                      onMouseLeave={() => dispatch(setCursorVariant("default"))}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-rose-500/20 border border-white/15 hover:border-rose-400/40 text-xs text-slate-200 hover:text-white transition-all duration-200 shadow-sm"
                      title="View Verified Python & DSA Credential"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span>{certTrack.items[3]?.name || "Data Structures & Python"}</span>
                      <ExternalLinkIcon className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>

          {/* Bottom Subtle Cybernetic Grid / Perspective Floor */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 left-0 right-0 h-28 opacity-25"
            style={{
              backgroundImage: `radial-gradient(ellipse at bottom, rgba(56, 189, 248, 0.25), transparent 70%), repeating-linear-gradient(60deg, rgba(56, 189, 248, 0.15) 0, rgba(56, 189, 248, 0.15) 1px, transparent 0, transparent 30px), repeating-linear-gradient(-60deg, rgba(56, 189, 248, 0.15) 0, rgba(56, 189, 248, 0.15) 1px, transparent 0, transparent 30px)`,
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
