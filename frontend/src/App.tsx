import { Suspense, lazy, useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { store } from "./store/index.ts";
import { useAppDispatch } from "./store/hooks.ts";
import { setScrollProgress, setActiveSection } from "./store/uiSlice.ts";
import Navbar from "./components/Navbar.tsx";
import BottomNav from "./components/BottomNav.tsx";
import Cursor from "./components/Cursor.tsx";

import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import SkillsPage from "./pages/SkillsPage.tsx";
import ExperiencePage from "./pages/ExperiencePage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

// Lazy-load Three.js 3D scene (Rolldown / Vite 8 code splitting)
const Scene = lazy(() => import("./three/Scene.tsx"));

const APP_ROUTES = [
  { path: "/", id: "home" },
  { path: "/about", id: "about" },
  { path: "/skills", id: "skills" },
  { path: "/experience", id: "experience" },
  { path: "/projects", id: "projects" },
  { path: "/contact", id: "contact" },
];

function AppContent() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Route drives the 3D scene keyframes
  useEffect(() => {
    const routeIndex = APP_ROUTES.findIndex(
      (r) => r.path === location.pathname
    );
    const validIndex = routeIndex >= 0 ? routeIndex : 0;
    const progress = validIndex / (APP_ROUTES.length - 1);

    dispatch(setScrollProgress(progress));
    dispatch(setActiveSection(APP_ROUTES[validIndex]?.id || "home"));
  }, [location.pathname, dispatch]);

  return (
    <div className="relative min-h-screen bg-[#f4f5ff] text-slate-900 font-sans selection:bg-violet-500/20 selection:text-violet-900">
      {/* Fixed Fullscreen 3D Background */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 bg-[#f4f5ff]"
          />
        }
      >
        <Scene />
      </Suspense>

      {/* Custom Glowing Cursor for Desktop / Fine Pointers */}
      <Cursor />

      {/* Top Navbar: Desktop Pill + Mobile Header */}
      <Navbar />

      {/* Page Routing with AnimatePresence PageShell transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* Mobile-First Bottom Tab Bar (thumb-reach friendly on < md) */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
