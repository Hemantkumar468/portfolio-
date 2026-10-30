import { NavLink, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const dispatch = useAppDispatch();

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
      {/* Top Edge Spring Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 origin-left z-50 shadow-[0_0_10px_rgba(124,58,237,0.4)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 flex h-16 items-center justify-between rounded-2xl border border-white/80 bg-white/85 px-4 md:px-6 backdrop-blur-xl shadow-lg shadow-indigo-500/5">
          {/* Brand Logo */}
          <Link
            to="/"
            onMouseEnter={() => dispatch(setCursorVariant("hover"))}
            onMouseLeave={() => dispatch(setCursorVariant("default"))}
            className="group flex items-center transition-transform duration-300 hover:scale-105"
            aria-label="Hemant Kushwaha Portfolio Home"
          >
            <img
              src="/logo.png"
              alt="Hemant Kushwaha Logo"
              className="h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation Pill (`md:` and up) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 rounded-xl border border-slate-200/60 bg-slate-100/60 p-1.5"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onMouseEnter={() => dispatch(setCursorVariant("hover"))}
                onMouseLeave={() => dispatch(setCursorVariant("default"))}
                className={({ isActive }) =>
                  `relative rounded-lg px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-violet-900 font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeDesktopNavTab"
                        className="absolute inset-0 rounded-lg bg-white shadow-sm border border-violet-200/80"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action / CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              onMouseEnter={() => dispatch(setCursorVariant("hover"))}
              onMouseLeave={() => dispatch(setCursorVariant("default"))}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-600/10 via-cyan-500/10 to-pink-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-800 shadow-sm shadow-violet-500/10 transition-all duration-300 hover:border-violet-500 hover:bg-violet-600 hover:text-white hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Hire Me</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
