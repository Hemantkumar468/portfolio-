import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useAppDispatch } from "../store/hooks.ts";
import { setCursorVariant } from "../store/uiSlice.ts";

export interface NavItem {
  to: string;
  label: string;
  shortLabel?: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    to: "/",
    label: "Home",
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    to: "/about",
    label: "About",
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    to: "/skills",
    label: "Skills",
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    to: "/experience",
    label: "Experience",
    shortLabel: "Exp",
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    to: "/projects",
    label: "Projects",
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const dispatch = useAppDispatch();

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-slate-200/90 bg-white/92 px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-2xl shadow-[0_-8px_25px_rgba(79,70,229,0.08)]"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onMouseEnter={() => dispatch(setCursorVariant("hover"))}
            onMouseLeave={() => dispatch(setCursorVariant("default"))}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center rounded-xl px-2 py-1 transition-all ${
                isActive
                  ? "text-violet-700 font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeBottomTab"
                    className="absolute inset-0 rounded-xl bg-violet-500/10 -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <div className="relative">
                  {item.icon(isActive)}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_#0284c7]" />
                  )}
                </div>
                <span className="mt-0.5 text-[10px] font-mono leading-none tracking-tight">
                  {item.shortLabel || item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
