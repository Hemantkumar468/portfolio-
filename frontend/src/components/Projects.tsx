import SectionTitle from "./SectionTitle.tsx";
import Reveal from "./Reveal.tsx";
import Tilt from "./Tilt.tsx";
import { resumeData } from "../data/resume.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";

export default function Projects() {
  const dispatch = useAppDispatch();
  const { projects } = resumeData;

  return (
    <section aria-label="Featured Projects & Full Stack Applications" className="relative py-4">
      <SectionTitle
        title="Production Work &"
        highlight="Flagship Systems"
        subtitle="Real-world enterprise ERP platforms and web applications built with the MERN stack and modern animations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, idx) => (
          <Reveal key={project.title} delay={0.1 * idx}>
            <Tilt
              maxTilt={6}
              spotlightColor="rgba(124, 58, 237, 0.1)"
              className="glass-panel rounded-3xl p-5 sm:p-7 h-full flex flex-col justify-between border border-white/90 hover:border-violet-300 transition-colors shadow-lg"
            >
              <div>
                {/* Project Screenshot Preview Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 group shadow-sm mb-4">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-mono font-bold text-violet-900 bg-white/90 border border-white/80 px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-md">
                      {project.period}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase text-white bg-slate-900/75 border border-white/20 px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-md">
                      Project #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono font-bold text-violet-700 mt-1 mb-3.5">
                  {project.subtitle}
                </p>

                {/* Highlights verbatim from resume */}
                <div className="space-y-2.5 mb-5">
                  {project.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold text-[10px]">
                        ▹
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 text-[11px] font-mono text-slate-700 shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Action Links */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-all duration-200 hover:border-violet-400 hover:text-violet-700 shadow-xs"
                >
                  <svg className="h-4 w-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>Source Code</span>
                </a>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                  onMouseLeave={() => dispatch(setCursorVariant("default"))}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/20 transition-all duration-200 hover:scale-[1.03]"
                >
                  <span>Live Demo</span>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
