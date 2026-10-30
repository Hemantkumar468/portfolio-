import { useState } from "react";
import Reveal from "./Reveal.tsx";
import Tilt from "./Tilt.tsx";
import { resumeData } from "../data/resume.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";

// ============================================================================
// Clean SVG Icons matching reference UI
// ============================================================================
function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function EnterpriseDomainIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function DeliverablesRocketIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a14.92 14.92 0 01-2.58 5.84"
      />
    </svg>
  );
}

function RosetteGearIcon({ className = "w-4 h-4 text-violet-600 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <circle cx="12" cy="12" r="3" strokeWidth={2} />
    </svg>
  );
}

// ============================================================================
// Main Experience Component: Spick and Span Light Glassmorphism
// ============================================================================
export default function Experience() {
  const dispatch = useAppDispatch();
  const exp = resumeData.experience[0];
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  const modulesList = [
    { title: "CRM Module 1", desc: "Customer Relationship Management with pipeline & lead tracking." },
    { title: "HRMS Module 2", desc: "Human Resource Management with attendance & leave records." },
    { title: "Delegation & Checklist Module 3", desc: "Operational task assignments and checklist engine." },
    { title: "EMS Module 4", desc: "Employee Management System with organizational structuring." },
    { title: "PMS Module 5", desc: "Project Management System for milestones and team deliverables." },
  ];

  return (
    <section aria-label="Professional Experience & Internships" className="relative py-4 max-w-6xl mx-auto">
      {/* ===================================================================== */}
      {/* TOP HEADER: Clean Title & Left Timeline Wrapper                       */}
      {/* ===================================================================== */}
      <Reveal delay={0.1}>
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight">
            Professional Experience
          </h1>
        </div>
      </Reveal>

      {/* Main Content with Left Timeline Rail */}
      <div className="relative flex items-stretch">
        {/* Left Vertical Timeline Rail (Hidden on small mobile) */}
        <div aria-hidden="true" className="hidden sm:flex flex-col items-center mr-4 sm:mr-6 shrink-0 relative pt-3">
          {/* Continuous vertical connection line */}
          <div className="absolute top-5 bottom-10 w-[2px] bg-slate-200" />

          {/* Node 1: Top stats level */}
          <div className="relative z-10 w-4 h-4 rounded-full bg-violet-600 border-4 border-violet-100 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />

          {/* Node 2: Professional Background level */}
          <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-violet-400 border-2 border-white shadow-xs mt-24" />

          {/* Node 3: Project Portfolio level */}
          <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-violet-400 border-2 border-white shadow-xs mt-44" />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">
          {/* ================================================================= */}
          {/* 1. TOP CARD: 3-Column Glass Capsule Stats                         */}
          {/* ================================================================= */}
          <Reveal delay={0.15}>
            <Tilt>
              <div
                onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                onMouseLeave={() => dispatch(setCursorVariant("default"))}
                className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:border-violet-200 hover:shadow-[0_8px_30px_rgba(139,92,246,0.06)]"
              >
                {/* 1. Total Industry Experience */}
                <div className="p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600 shadow-xs">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      Total Industry Experience
                    </h2>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                      1 Year &amp; 2 Months
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5 leading-tight">
                      (calculated time from Sep 2026 to the present)
                    </div>
                  </div>
                </div>

                {/* 2. Domain Expertise */}
                <div className="p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-xs">
                    <EnterpriseDomainIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      Domain Expertise
                    </h2>
                    <div className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 leading-snug">
                      Enterprise ERP Systems, Modular Architectures
                    </div>
                  </div>
                </div>

                {/* 3. Key Project Deliverables */}
                <div className="p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600 shadow-xs">
                    <DeliverablesRocketIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                      Key Project Deliverables
                    </h2>
                    <div className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 leading-snug">
                      Shipped 5 Core ERP Modules, Optimized Page Performance
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>

          {/* ================================================================= */}
          {/* 2. PROFESSIONAL BACKGROUND CARD                                   */}
          {/* ================================================================= */}
          <Reveal delay={0.2}>
            <Tilt>
              <div
                onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                onMouseLeave={() => dispatch(setCursorVariant("default"))}
                className="rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-violet-200 hover:shadow-[0_8px_30px_rgba(139,92,246,0.06)]"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Professional Background
                </h3>
                <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-slate-700 font-normal">
                  A highly motivated and results-driven Frontend Developer with hands-on experience in enterprise-level
                  software engineering. Specializing in building and maintaining responsive React.js components across key pages.
                  Expert in optimizing page performance, reducing load times, and debugging existing ERP codebases. Proven ability
                  to ship new features as part of a collaborative team, actively participating in code reviews and incorporating feedback
                  to ensure high code quality and seamless delivery.
                </p>
              </div>
            </Tilt>
          </Reveal>

          {/* ================================================================= */}
          {/* 3. PROJECT PORTFOLIO SECTION                                      */}
          {/* ================================================================= */}
          <div>
            <Reveal delay={0.25}>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-3">
                Project Portfolio
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              {/* ------------------------------------------------------------- */}
              {/* Card 1: Enterprise Suite - ERP Module Development             */}
              {/* ------------------------------------------------------------- */}
              <Reveal delay={0.3}>
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-violet-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.08)] group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-1">
                        Project 1: ERP Modules Built &amp; Maintained (5)
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5">
                        Enterprise Suite - ERP Module Development
                      </h4>

                      {/* 5 ERP Modules List */}
                      <ul className="space-y-2.5">
                        {modulesList.map((m, idx) => (
                          <li
                            key={idx}
                            onMouseEnter={() => setHoveredModule(idx)}
                            onMouseLeave={() => setHoveredModule(null)}
                            className={`flex items-center gap-2.5 text-xs sm:text-[13px] font-medium transition-colors cursor-default ${
                              hoveredModule === idx ? "text-violet-900 font-semibold" : "text-slate-700"
                            }`}
                          >
                            <RosetteGearIcon className="w-4 h-4 text-violet-600 shrink-0 group-hover:rotate-45 transition-transform" />
                            <span>{m.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Tilt>
              </Reveal>

              {/* ------------------------------------------------------------- */}
              {/* Card 2: CRM - Customer Relationship Management                */}
              {/* ------------------------------------------------------------- */}
              <Reveal delay={0.35}>
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-violet-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.08)]"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-1">
                        Project 2: CRM - Customer Relationship Management
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5">
                        Customer Relationship Management System
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        Managed customer leads, pipelines, and interaction histories. Improved component reusability and shipped to Staging.
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span>Status:</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Shipped to Staging
                      </span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>

              {/* ------------------------------------------------------------- */}
              {/* Card 3: Performance Optimization Initiative                   */}
              {/* ------------------------------------------------------------- */}
              <Reveal delay={0.4}>
                <Tilt className="h-full">
                  <div
                    onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                    onMouseLeave={() => dispatch(setCursorVariant("default"))}
                    className="h-full rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-violet-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.08)]"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-1">
                        Project 3: Performance Optimization Initiative
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5">
                        Page Load Performance &amp; Optimization
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        Led page performance improvements, reducing load times by 15%. Debugged critical issues in the legacy ERP codebase.
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-100 text-xs font-mono font-medium">
                        React.js
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-mono font-medium">
                        -15% Load Time
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 text-xs font-mono font-medium">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
