// ============================================================================
// ExperienceCyberVisuals.tsx
// Handcrafted 3D Isometric SVG Graphics & Cybernetic Visuals for Experience Page
// ============================================================================

// ============================================================================
// 1. Isometric 3D Cube Helper
// ============================================================================
export function IsoCube({
  cx,
  cy,
  size = 28,
  label,
  color = "#38bdf8",
  textColor = "#ffffff",
  isActive = false,
  onClick,
}: {
  cx: number;
  cy: number;
  size?: number;
  label: string;
  color?: string;
  textColor?: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const w = size;
  const h = size * 0.58;

  // Isometric vertices
  // Top face: top, right, bottom, left
  const tTop = `${cx},${cy - h}`;
  const tRight = `${cx + w},${cy - h * 0.5}`;
  const tBottom = `${cx},${cy}`;
  const tLeft = `${cx - w},${cy - h * 0.5}`;

  // Left face: tLeft, tBottom, bBottom, bLeft
  const bBottom = `${cx},${cy + h}`;
  const bLeft = `${cx - w},${cy + h * 0.5}`;

  // Right face: tBottom, tRight, bRight, bBottom
  const bRight = `${cx + w},${cy + h * 0.5}`;

  return (
    <g
      className="cursor-pointer transition-transform duration-300 hover:scale-110"
      onClick={onClick}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Cube Outer Glow Filter */}
      <defs>
        <filter id={`cubeGlow-${label}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={color} floodOpacity={isActive ? "0.8" : "0.45"} />
        </filter>
      </defs>

      <g filter={`url(#cubeGlow-${label})`}>
        {/* Top Face */}
        <polygon
          points={`${tTop} ${tRight} ${tBottom} ${tLeft}`}
          fill={isActive ? "#0284c7" : "#0f172a"}
          stroke={color}
          strokeWidth="1.2"
          opacity="0.9"
        />

        {/* Left Face */}
        <polygon
          points={`${tLeft} ${tBottom} ${bBottom} ${bLeft}`}
          fill={isActive ? "#0369a1" : "#080e1e"}
          stroke={color}
          strokeWidth="1.2"
          opacity="0.95"
        />

        {/* Right Face */}
        <polygon
          points={`${tBottom} ${tRight} ${bRight} ${bBottom}`}
          fill={isActive ? "#075985" : "#040814"}
          stroke={color}
          strokeWidth="1.2"
          opacity="0.95"
        />

        {/* Specular Edge Highlights */}
        <line x1={cx - w} y1={cy - h * 0.5} x2={cx} y2={cy} stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
        <line x1={cx} y1={cy - h} x2={cx} y2={cy} stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
        <line x1={cx} y1={cy} x2={cx} y2={cy + h} stroke={color} strokeWidth="1" opacity="0.8" />

        {/* Internal Core Light */}
        <circle cx={cx} cy={cy} r="3" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />

        {/* Label Badge on Front */}
        <text
          x={cx}
          y={cy + h * 0.45}
          fill={textColor}
          fontSize="9.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          letterSpacing="0.5"
          textAnchor="middle"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.9))" }}
        >
          {label}
        </text>
      </g>
    </g>
  );
}

// ============================================================================
// 2. Left Module: Enterprise Suite (ERP Module Development)
// ============================================================================
export function ErpSuiteVisual({
  activeModule,
  onSelectModule,
}: {
  activeModule?: string;
  onSelectModule?: (name: string) => void;
}) {
  return (
    <div className="relative w-full h-[260px] sm:h-[290px] flex items-center justify-center">
      <svg viewBox="0 0 340 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="busLaserGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#a855f7" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <radialGradient id="clusterCenterGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="1" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center Fusion Glow */}
        <circle cx="170" cy="130" r="70" fill="url(#clusterCenterGlow)" />

        {/* Glowing Circuit Bus Lines Connecting Cubes */}
        {/* Top (HRMS) to Left (Integration/EMS) */}
        <line x1="170" y1="65" x2="85" y2="130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        {/* Top (HRMS) to Right (Delegation) */}
        <line x1="170" y1="65" x2="255" y2="130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        {/* Left (Integration) to Bottom (PMS) */}
        <line x1="85" y1="130" x2="170" y2="195" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        {/* Right (Delegation) to Bottom (PMS) */}
        <line x1="255" y1="130" x2="170" y2="195" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

        {/* Cross Diagonals */}
        <line x1="85" y1="130" x2="255" y2="130" stroke="#f59e0b" strokeWidth="2.5" opacity="0.75" />
        <line x1="170" y1="65" x2="170" y2="195" stroke="#a855f7" strokeWidth="2" opacity="0.6" />

        {/* Center Golden Core Orb */}
        <circle cx="170" cy="130" r="14" fill="#0b172d" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="170" cy="130" r="7" fill="#f59e0b" style={{ filter: "drop-shadow(0 0 8px #f59e0b)" }} />

        {/* Live Data Packets (Pulsing Circles) */}
        <circle cx="127" cy="97" r="3" fill="#38bdf8" className="animate-ping" opacity="0.8" />
        <circle cx="212" cy="97" r="3" fill="#a855f7" className="animate-ping" opacity="0.8" />
        <circle cx="127" cy="162" r="3" fill="#f59e0b" className="animate-ping" opacity="0.8" />
        <circle cx="212" cy="162" r="3" fill="#22c55e" className="animate-ping" opacity="0.8" />

        {/* 4 Isometric Cubes */}
        {/* Top: HRMS */}
        <IsoCube
          cx={170}
          cy={65}
          size={27}
          label="HRMS"
          color="#38bdf8"
          isActive={activeModule === "HRMS"}
          onClick={() => onSelectModule && onSelectModule("HRMS")}
        />

        {/* Left: Integration / EMS */}
        <IsoCube
          cx={85}
          cy={130}
          size={27}
          label="Integration"
          color="#c084fc"
          isActive={activeModule === "Integration" || activeModule === "EMS"}
          onClick={() => onSelectModule && onSelectModule("EMS")}
        />

        {/* Right: Delegation */}
        <IsoCube
          cx={255}
          cy={130}
          size={27}
          label="Delegation"
          color="#38bdf8"
          isActive={activeModule === "Delegation"}
          onClick={() => onSelectModule && onSelectModule("Delegation")}
        />

        {/* Bottom: PMS */}
        <IsoCube
          cx={170}
          cy={195}
          size={27}
          label="PMS"
          color="#a855f7"
          isActive={activeModule === "PMS"}
          onClick={() => onSelectModule && onSelectModule("PMS")}
        />

        {/* Floating Mini Tech Badges around Constellation */}
        {/* React Atom Badge */}
        <g transform="translate(24, 75)" className="animate-bounce" style={{ animationDuration: "4s" }}>
          <circle cx="14" cy="14" r="14" fill="#08142b" stroke="#38bdf8" strokeWidth="1" />
          <ellipse cx="14" cy="14" rx="8" ry="3" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <ellipse cx="14" cy="14" rx="8" ry="3" fill="none" stroke="#38bdf8" strokeWidth="1" transform="rotate(60 14 14)" />
          <ellipse cx="14" cy="14" rx="8" ry="3" fill="none" stroke="#38bdf8" strokeWidth="1" transform="rotate(120 14 14)" />
          <circle cx="14" cy="14" r="1.5" fill="#38bdf8" />
        </g>

        {/* Redux Toolkit Badge */}
        <g transform="translate(22, 160)" className="animate-bounce" style={{ animationDuration: "5s" }}>
          <circle cx="14" cy="14" r="14" fill="#120c24" stroke="#c084fc" strokeWidth="1" />
          <circle cx="10" cy="14" r="4.5" fill="none" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="18" cy="14" r="4.5" fill="none" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="14" cy="10" r="4.5" fill="none" stroke="#c084fc" strokeWidth="1.2" />
        </g>

        {/* Gear / Automation Badge */}
        <g transform="translate(285, 175)" className="animate-spin" style={{ animationDuration: "14s" }}>
          <circle cx="12" cy="12" r="11" fill="#181126" stroke="#f43f5e" strokeWidth="1" />
          <circle cx="12" cy="12" r="4" fill="#f43f5e" />
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// 3. Center Module: CRM Crystal Globe (Customer Relationship Management)
// ============================================================================
export function CrmCyberSphereVisual({
  isActive = false,
  onClick,
}: {
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full h-[260px] sm:h-[290px] flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 ${
        isActive ? "scale-105" : ""
      }`}
    >
      <svg viewBox="0 0 320 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sphereCoreGrad" cx="38%" cy="32%" r="68%">
            <stop stopColor="#e0f2fe" />
            <stop offset="0.25" stopColor="#38bdf8" />
            <stop offset="0.65" stopColor="#0369a1" />
            <stop offset="1" stopColor="#041836" />
          </radialGradient>
          <radialGradient id="sphereOuterAura" cx="50%" cy="50%" r="50%">
            <stop stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="0.7" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="sphereGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#38bdf8" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Ambient Outer Halo */}
        <circle cx="160" cy="115" r="95" fill="url(#sphereOuterAura)" />

        {/* Orbiting Equatorial Rings */}
        <g transform="translate(160, 115) rotate(-22)">
          {/* Main Outer Ring */}
          <ellipse cx="0" cy="0" rx="92" ry="32" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.8" />
          {/* Orbiting Satellite Bead 1 */}
          <circle cx="82" cy="12" r="5.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 6px #f59e0b)" }} />
          {/* Orbiting Satellite Bead 2 */}
          <circle cx="-75" cy="-14" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.2" style={{ filter: "drop-shadow(0 0 5px #a855f7)" }} />
          {/* Orbiting Satellite Bead 3 */}
          <circle cx="15" cy="-30" r="3.5" fill="#22c55e" stroke="#ffffff" strokeWidth="1" style={{ filter: "drop-shadow(0 0 4px #22c55e)" }} />
        </g>

        {/* Secondary Vertical Ring */}
        <g transform="translate(160, 115) rotate(65)">
          <ellipse cx="0" cy="0" rx="84" ry="24" fill="none" stroke="#60a5fa" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 4" />
        </g>

        {/* Main 3D Crystal Cyber Sphere */}
        <g filter="url(#sphereGlow)">
          <circle cx="160" cy="115" r="58" fill="url(#sphereCoreGrad)" stroke="#bae6fd" strokeWidth="1.5" />

          {/* Latitude / Longitude Holographic Lines */}
          <ellipse cx="160" cy="115" rx="56" ry="18" fill="none" stroke="#e0f2fe" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="160" cy="115" rx="56" ry="36" fill="none" stroke="#e0f2fe" strokeWidth="0.8" opacity="0.4" />
          <ellipse cx="160" cy="115" rx="22" ry="56" fill="none" stroke="#e0f2fe" strokeWidth="0.8" opacity="0.5" />

          {/* Specular Light Reflection (Top-Left) */}
          <ellipse cx="140" cy="85" rx="20" ry="10" fill="#ffffff" opacity="0.45" transform="rotate(-30 140 85)" />
          <circle cx="132" cy="80" r="3.5" fill="#ffffff" opacity="0.85" />

          {/* Internal Glowing Core */}
          <circle cx="160" cy="115" r="8" fill="#ffffff" style={{ filter: "drop-shadow(0 0 10px #ffffff)" }} />
        </g>

        {/* Floating Tech Chips around Center */}
        {/* Node.js Badge */}
        <g transform="translate(56, 130)">
          <rect x="0" y="0" width="22" height="22" rx="6" fill="#0b1712" stroke="#22c55e" strokeWidth="1" />
          <path d="M11 4 L18 8 L18 16 L11 20 L4 16 L4 8 Z" fill="#22c55e" opacity="0.8" />
        </g>

        {/* Docker Badge */}
        <g transform="translate(245, 140)">
          <rect x="0" y="0" width="22" height="22" rx="6" fill="#091b2c" stroke="#38bdf8" strokeWidth="1" />
          <rect x="5" y="7" width="3" height="3" fill="#38bdf8" />
          <rect x="9" y="7" width="3" height="3" fill="#38bdf8" />
          <rect x="13" y="7" width="3" height="3" fill="#38bdf8" />
          <path d="M4 12 C4 15 8 16 14 16 C18 16 19 14 19 12 Z" fill="#38bdf8" />
        </g>
      </svg>

      {/* Floating Center Overlay Details */}
      <div className="absolute top-[80px] sm:top-[90px] text-center pointer-events-none px-4">
        <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Customer Relationship
        </h4>
        <div className="text-xs sm:text-[13px] font-bold text-cyan-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Management System
        </div>
        <div className="text-[11px] font-mono text-cyan-300/90 mt-0.5">
          (Center Module)
        </div>

        {/* Green "✓ Shipped to Staging" Status Pill */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/60 shadow-[0_0_12px_rgba(34,197,94,0.4)] backdrop-blur-md">
          <span className="text-emerald-400 font-bold text-xs">✓</span>
          <span className="text-emerald-300 font-mono text-[11px] font-semibold tracking-wide">
            Shipped to Staging
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. Right Module: Holographic Performance & Optimization HUD
// ============================================================================
export function PerformanceGlassHUDVisual({
  isActive = false,
  onClick,
}: {
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full h-[260px] sm:h-[290px] flex items-center justify-center cursor-pointer group transition-transform duration-300 ${
        isActive ? "scale-105" : ""
      }`}
    >
      <svg viewBox="0 0 340 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hudPlateGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#0f172a" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#09182d" stopOpacity="0.75" />
            <stop offset="1" stopColor="#040b17" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="chartLineCyan" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>
          <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Curved Isometric Glass HUD Panel Base */}
        <g filter="url(#hudGlow)" transform="translate(18, 30)">
          {/* Main Curved Screen */}
          <path
            d="M8 8 C60 0 240 0 292 8 C302 30 302 150 292 172 C240 180 60 180 8 172 C-2 150 -2 30 8 8 Z"
            fill="url(#hudPlateGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          {/* Internal Grid Lines */}
          {[40, 75, 110, 145].map((y) => (
            <line key={y} x1="25" y1={y} x2="275" y2={y} stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
          ))}
          {[70, 120, 170, 220].map((x) => (
            <line key={x} x1={x} y1="25" x2={x} y2="155" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.2" />
          ))}

          {/* Area Fill Under Primary Curve */}
          <path
            d="M35 140 C65 130 95 65 130 115 C165 155 200 45 240 85 C255 100 270 50 275 45 L275 150 L35 150 Z"
            fill="url(#chartAreaGrad)"
          />

          {/* Golden Secondary Curve (Load Time Reduction) */}
          <path
            d="M35 80 C70 110 110 135 150 140 C190 145 230 120 275 135"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 2"
            opacity="0.85"
            style={{ filter: "drop-shadow(0 0 5px #f59e0b)" }}
          />

          {/* Main Glowing Performance Curve (Throughput & 60fps) */}
          <path
            d="M35 140 C65 130 95 65 130 115 C165 155 200 45 240 85 C255 100 270 50 275 45"
            fill="none"
            stroke="url(#chartLineCyan)"
            strokeWidth="3.2"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 8px #38bdf8)" }}
          />

          {/* Data Highlight Points with Halos */}
          <g transform="translate(95, 65)">
            <circle cx="0" cy="0" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="9" fill="none" stroke="#38bdf8" strokeWidth="1" className="animate-ping" opacity="0.6" />
          </g>

          <g transform="translate(200, 45)">
            <circle cx="0" cy="0" r="5.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping" opacity="0.7" />
          </g>

          <g transform="translate(275, 45)">
            <circle cx="0" cy="0" r="5" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* Telemetry Metric Callouts */}
          <g transform="translate(35, 20)">
            <rect x="0" y="0" width="62" height="18" rx="4" fill="#041224" stroke="#38bdf8" strokeWidth="0.8" />
            <text x="31" y="12" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              60 FPS
            </text>
          </g>

          <g transform="translate(205, 20)">
            <rect x="0" y="0" width="70" height="18" rx="4" fill="#041224" stroke="#22c55e" strokeWidth="0.8" />
            <text x="35" y="12" fill="#22c55e" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              -42% Load
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// 5. Undulating Fiber-Optic Laser Wave Paths Connecting All Modules
// ============================================================================
export function FiberOpticStreamConduits() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full opacity-65">
        <defs>
          <linearGradient id="fiberGoldCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="fiberCyanAmber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ec4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Laser Wave 1 */}
        <path
          d="M 50 150 C 220 90, 420 220, 600 150 C 780 80, 980 210, 1150 150"
          fill="none"
          stroke="url(#fiberGoldCyan)"
          strokeWidth="3.5"
          style={{ filter: "drop-shadow(0 0 10px #38bdf8)" }}
        />

        {/* Laser Wave 2 */}
        <path
          d="M 50 165 C 240 230, 440 90, 600 160 C 760 230, 960 90, 1150 165"
          fill="none"
          stroke="url(#fiberCyanAmber)"
          strokeWidth="2.5"
          strokeDasharray="12 6"
          style={{ filter: "drop-shadow(0 0 8px #f59e0b)" }}
        />

        {/* Laser Wave 3 (High speed dashed) */}
        <path
          d="M 100 140 C 300 130, 500 170, 600 145 C 700 120, 900 180, 1100 140"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 6. Top 3 Capsule Cards (Total Experience, Domain, Key Deliverables)
// ============================================================================
export function CapsuleCard({
  icon,
  title,
  subtitle,
  finePrint,
  accentColor = "cyan",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  finePrint?: string;
  accentColor?: "cyan" | "purple" | "rose";
}) {
  const borderClass =
    accentColor === "cyan"
      ? "hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(56,189,248,0.25)]"
      : accentColor === "purple"
      ? "hover:border-purple-400/60 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]"
      : "hover:border-rose-400/60 hover:shadow-[0_0_24px_rgba(244,63,94,0.25)]";

  return (
    <div
      className={`relative flex items-center gap-3.5 sm:gap-4 rounded-2xl bg-gradient-to-r from-slate-900/75 via-indigo-950/60 to-slate-900/80 p-3.5 sm:p-4 backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 ${borderClass} group`}
    >
      {/* Icon Capsule */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/15 shadow-inner group-hover:scale-105 transition-transform">
        {icon}
      </div>

      {/* Text Info */}
      <div className="min-w-0 flex-1">
        <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
          {title}
        </h4>
        <div className="text-xs sm:text-[13px] font-semibold text-slate-200 mt-0.5 leading-snug">
          {subtitle}
        </div>
        {finePrint && (
          <div className="text-[10.5px] font-mono text-slate-400/90 mt-0.5 truncate">
            {finePrint}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 7. Handcrafted 3D Icons for Capsule Cards
// ============================================================================
export function Calendar3DGlyph({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="28" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <path d="M6 16 H34" stroke="#38bdf8" strokeWidth="1.2" />
      <circle cx="12" cy="6" r="2" fill="#38bdf8" />
      <circle cx="28" cy="6" r="2" fill="#38bdf8" />
      {/* Mini Clock on Corner */}
      <circle cx="26" cy="26" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
      <path d="M26 23 V26 H28.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function DomainOffice3DGlyph({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 34 V12 L22 6 V34 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
      <path d="M22 14 L30 18 V34 H22 Z" fill="#0f172a" stroke="#c084fc" strokeWidth="1.2" />
      {/* Windows */}
      <rect x="15" y="12" width="3" height="3" fill="#38bdf8" />
      <rect x="15" y="18" width="3" height="3" fill="#38bdf8" />
      <rect x="15" y="24" width="3" height="3" fill="#38bdf8" />
      <rect x="25" y="22" width="2.5" height="2.5" fill="#a855f7" />
      <rect x="25" y="27" width="2.5" height="2.5" fill="#a855f7" />
    </svg>
  );
}

export function RocketDeliverables3DGlyph({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 6 C14 14 13 24 13 30 L27 30 C27 24 26 14 20 6 Z"
        fill="#0f172a"
        stroke="#f43f5e"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="18" r="3" fill="#38bdf8" />
      <path d="M11 26 L7 32 L13 30 Z" fill="#f43f5e" />
      <path d="M29 26 L33 32 L27 30 Z" fill="#f43f5e" />
      <path d="M17 30 C17 35 20 38 20 38 C20 38 23 35 23 30 Z" fill="#f59e0b" />
    </svg>
  );
}
