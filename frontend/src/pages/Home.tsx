import { useEffect } from "react";
import Hero from "../components/Hero.tsx";
import About from "../components/About.tsx";
import Skills from "../components/Skills.tsx";
import Experience from "../components/Experience.tsx";
import Projects from "../components/Projects.tsx";
import Contact from "../components/Contact.tsx";
import { useAppDispatch } from "../store/hooks.ts";
import { setScrollProgress, setActiveSection } from "../store/uiSlice.ts";
import { resumeData } from "../data/resume.ts";

export default function Home() {
  const dispatch = useAppDispatch();

  // Scroll Progress Tracking for Three.js & UI
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      dispatch(setScrollProgress(progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  // IntersectionObserver for active section highlighting in Navbar
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "experience", "projects", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection(entry.target.id));
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dispatch]);

  return (
    <main className="relative z-10 w-full overflow-hidden">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-[#070919]/90 py-12 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-white">
                  {resumeData.personal.name}
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  // Portfolio 2026
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Crafted with React 19, Three.js, Motion, Redux Toolkit & Tailwind v4.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400">
              <a
                href="#hero"
                className="hover:text-cyan-300 transition-colors font-mono"
              >
                Back to Top ↑
              </a>
              <a
                href={resumeData.personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href={resumeData.personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

