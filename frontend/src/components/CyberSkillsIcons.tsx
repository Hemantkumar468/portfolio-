// ============================================================================
// 1. TypeScript 3D Layered Blue Badge
// ============================================================================
export function TypeScriptIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tsTopFace" x1="20" y1="12" x2="80" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93c5fd" />
          <stop offset="0.6" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="tsMainFace" x1="10" y1="20" x2="90" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.4" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tsShadowPlate" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <filter id="tsDropGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* 3D Isometric Under-plate */}
      <rect x="18" y="20" width="70" height="70" rx="18" fill="url(#tsShadowPlate)" filter="url(#tsDropGlow)" />
      {/* 3D Front Plate */}
      <rect x="12" y="14" width="74" height="74" rx="18" fill="url(#tsMainFace)" stroke="#bfdbfe" strokeWidth="1.5" />
      {/* Top Specular Curved Highlight */}
      <path
        d="M 13 32 C 13 21 21 15 32 15 L 68 15 C 79 15 85 21 85 30 C 72 38 40 40 13 32 Z"
        fill="url(#tsTopFace)"
        opacity="0.45"
      />
      {/* Embossed "TS" Bold Text */}
      <g style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))" }}>
        <text
          x="36"
          y="65"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="36"
          textAnchor="middle"
        >
          T
        </text>
        <text
          x="65"
          y="65"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="36"
          textAnchor="middle"
        >
          S
        </text>
      </g>
    </svg>
  );
}

// ============================================================================
// 2. JavaScript (ES6+) 3D Golden Plate with Flame
// ============================================================================
export function JavaScriptIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jsMainGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.3" stopColor="#facc15" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="flameLayer1" x1="0" y1="1" x2="0" y2="0">
          <stop stopColor="#dc2626" />
          <stop offset="0.5" stopColor="#ea580c" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
        <filter id="jsDropGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#eab308" floodOpacity="0.45" />
        </filter>
      </defs>
      {/* 3D Depth Shadow Plate */}
      <rect x="18" y="20" width="70" height="70" rx="18" fill="#713f12" />
      {/* Front Golden Plate */}
      <rect x="12" y="14" width="74" height="74" rx="18" fill="url(#jsMainGrad)" stroke="#fef9c3" strokeWidth="1.5" filter="url(#jsDropGlow)" />
      {/* Bold "JS" Text */}
      <text
        x="36"
        y="62"
        fill="#0f172a"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="36"
        textAnchor="middle"
      >
        J
      </text>
      <text
        x="64"
        y="62"
        fill="#0f172a"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="36"
        textAnchor="middle"
      >
        S
      </text>
      {/* Stylized 3D Fire Flame at Lower Right */}
      <g transform="translate(62, 54)" style={{ filter: "drop-shadow(0 2px 4px rgba(220, 38, 38, 0.6))" }}>
        <path
          d="M12 0 C12 0 16 6 16 11 C16 16.5 11.5 21 6 21 C0.5 21 -1.5 16.5 2 11 C3 9.5 5 8 5 8 C5 8 5.5 12 8 13 C8 13 8 7 12 0 Z"
          fill="url(#flameLayer1)"
        />
        <path
          d="M8 8 C8 8 10 11 10 13 C10 15 8.5 17 6.5 17 C4.5 17 3.5 15 5 13 C6 11.5 8 8 8 8 Z"
          fill="#fef08a"
        />
      </g>
    </svg>
  );
}

// ============================================================================
// 3. Node.js Dark Plate with Neon Emerald Hexagon
// ============================================================================
export function NodeIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nodePlateBg" cx="50%" cy="50%" r="55%">
          <stop stopColor="#14532d" stopOpacity="0.4" />
          <stop offset="1" stopColor="#041a0d" stopOpacity="0.95" />
        </radialGradient>
        <filter id="nodeNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.75" />
        </filter>
      </defs>
      {/* Dark Plate with Emerald Border */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="url(#nodePlateBg)" stroke="#22c55e" strokeWidth="1.5" />
      {/* Glowing Neon Hexagon */}
      <path
        d="M50 24 L76 39 L76 69 L50 84 L24 69 L24 39 Z"
        stroke="#4ade80"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="#052e16"
        fillOpacity="0.5"
        filter="url(#nodeNeonGlow)"
      />
      {/* Node "JS" Typography */}
      <text
        x="50"
        y="62"
        fill="#ffffff"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="24"
        textAnchor="middle"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
      >
        JS
      </text>
    </svg>
  );
}

// ============================================================================
// 4. Express.js Obsidian Plate with Silver Metallic Wordmark
// ============================================================================
export function ExpressIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverPlate" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748b" />
          <stop offset="0.5" stopColor="#334155" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="silverLetters" x1="15" y1="45" x2="85" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#e2e8f0" />
          <stop offset="0.8" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      {/* Dark Plate */}
      <rect x="10" y="14" width="80" height="72" rx="16" fill="#090d16" stroke="url(#silverPlate)" strokeWidth="1.5" />
      <rect x="14" y="18" width="72" height="64" rx="12" fill="#0f172a" fillOpacity="0.85" />
      {/* Specular sheen line */}
      <path d="M14 26 L86 26" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Express Typography */}
      <text
        x="50"
        y="58"
        fill="url(#silverLetters)"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="800"
        fontSize="17.5"
        letterSpacing="-0.5"
        textAnchor="middle"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.85))" }}
      >
        Express
      </text>
    </svg>
  );
}

// ============================================================================
// 5. React.js Glowing Neon Cyan Atomic Emblem
// ============================================================================
export function ReactIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="reactGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#06b6d4" floodOpacity="0.85" />
        </filter>
        <radialGradient id="reactPlateBg" cx="50%" cy="50%" r="55%">
          <stop stopColor="#0e3a4e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#04121a" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      {/* Cyber Plate */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="url(#reactPlateBg)" stroke="#0891b2" strokeWidth="1.5" />
      {/* Core Glowing Dot */}
      <circle cx="50" cy="50" r="7" fill="#67e8f9" filter="url(#reactGlowFilter)" />
      {/* 3 Intersecting Orbital Rings */}
      <ellipse cx="50" cy="50" rx="31" ry="11.5" stroke="#22d3ee" strokeWidth="2.5" fill="none" filter="url(#reactGlowFilter)" />
      <ellipse
        cx="50"
        cy="50"
        rx="31"
        ry="11.5"
        transform="rotate(60 50 50)"
        stroke="#22d3ee"
        strokeWidth="2.5"
        fill="none"
        filter="url(#reactGlowFilter)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="31"
        ry="11.5"
        transform="rotate(120 50 50)"
        stroke="#22d3ee"
        strokeWidth="2.5"
        fill="none"
        filter="url(#reactGlowFilter)"
      />
    </svg>
  );
}

// ============================================================================
// 6. Redux Toolkit Purple Triad / Loop Emblem
// ============================================================================
export function ReduxIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="reduxBlade" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e9d5ff" />
          <stop offset="0.4" stopColor="#c084fc" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="reduxGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#a855f7" floodOpacity="0.8" />
        </filter>
        <radialGradient id="reduxPlateBg" cx="50%" cy="50%" r="55%">
          <stop stopColor="#3b0764" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0f051d" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      {/* Plate */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="url(#reduxPlateBg)" stroke="#9333ea" strokeWidth="1.5" />
      {/* Triad Orbital Blades */}
      <g filter="url(#reduxGlowFilter)" stroke="url(#reduxBlade)" strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M50 23 C60 23 70 32 70 45 C70 55 58 62 46 66 C34 70 26 74 26 82" />
        <path d="M74 72 C74 63 64 56 50 50 C38 45 32 36 32 28 C32 18 42 12 54 12" transform="rotate(120 50 50)" />
        <path d="M28 66 C36 66 46 58 52 48 C58 38 68 28 80 28" transform="rotate(240 50 50)" />
        <circle cx="50" cy="50" r="5" fill="#f3e8ff" stroke="none" />
      </g>
    </svg>
  );
}

// ============================================================================
// 7. Tailwind CSS Cyber Wind Wave Emblem
// ============================================================================
export function TailwindIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="twWaveGrad" x1="15" y1="25" x2="85" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <filter id="twGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#0ea5e9" floodOpacity="0.75" />
        </filter>
        <radialGradient id="twPlateBg" cx="50%" cy="50%" r="55%">
          <stop stopColor="#075985" stopOpacity="0.5" />
          <stop offset="1" stopColor="#031626" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      {/* Plate */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="url(#twPlateBg)" stroke="#0284c7" strokeWidth="1.5" />
      {/* Wind Waves */}
      <g filter="url(#twGlowFilter)" fill="url(#twWaveGrad)">
        <path d="M36 38 C40 32 46 30 52 32 C58 34 60 40 64 42 C67 43 71 42 74 38 C72 44 67 48 61 48 C55 48 52 44 47 42 C44 41 40 42 36 46 C37 42 36 39 36 38 Z" />
        <path d="M26 56 C30 50 36 48 42 50 C48 52 50 58 54 60 C57 61 61 60 64 56 C62 62 57 66 51 66 C45 66 42 62 37 60 C34 59 30 60 26 64 C27 60 26 57 26 56 Z" />
      </g>
    </svg>
  );
}

// ============================================================================
// 8. REST APIs 3D Metallic Network Nodes Emblem
// ============================================================================
export function RestApiIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sphereMetal" cx="35%" cy="35%" r="65%">
          <stop stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#93c5fd" />
          <stop offset="0.7" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1e3a8a" />
        </radialGradient>
        <radialGradient id="sphereCore" cx="35%" cy="35%" r="65%">
          <stop stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#e2e8f0" />
          <stop offset="0.8" stopColor="#64748b" />
          <stop offset="1" stopColor="#1e293b" />
        </radialGradient>
        <filter id="nodeNetGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.55" />
        </filter>
      </defs>
      {/* Plate */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="#081126" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Strut Connectors */}
      <line x1="50" y1="50" x2="30" y2="32" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="70" y2="32" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="25" y2="60" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="75" y2="60" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="50" y2="76" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Satellite Spheres */}
      <circle cx="30" cy="32" r="7.5" fill="url(#sphereMetal)" filter="url(#nodeNetGlow)" />
      <circle cx="70" cy="32" r="7.5" fill="url(#sphereMetal)" filter="url(#nodeNetGlow)" />
      <circle cx="25" cy="60" r="7.5" fill="url(#sphereMetal)" filter="url(#nodeNetGlow)" />
      <circle cx="75" cy="60" r="7.5" fill="url(#sphereMetal)" filter="url(#nodeNetGlow)" />
      <circle cx="50" cy="76" r="7.5" fill="url(#sphereMetal)" filter="url(#nodeNetGlow)" />
      {/* Center Master Node */}
      <circle cx="50" cy="50" r="10.5" fill="url(#sphereCore)" filter="url(#nodeNetGlow)" />
    </svg>
  );
}

// ============================================================================
// 9. JWT Authentication 3D Key + Shield Emblem
// ============================================================================
export function JwtIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldFillGrad" x1="30" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="0.5" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="keyGoldGrad" x1="15" y1="15" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.4" stopColor="#facc15" />
          <stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
        <filter id="keyGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#facc15" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Plate */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="#0b162f" stroke="#2563eb" strokeWidth="1.5" />
      {/* 3D Security Shield (Back) */}
      <g transform="translate(48, 38)">
        <path
          d="M0 0 L24 8 C24 24 16 38 0 44 C-16 38 -24 24 -24 8 Z"
          fill="url(#shieldFillGrad)"
          stroke="#93c5fd"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.55))" }}
        />
        <path d="M0 3 L18 9 C18 22 12 34 0 39 Z" fill="#3b82f6" opacity="0.4" />
      </g>
      {/* 3D Golden Key (Foreground) */}
      <g transform="translate(26, 32) rotate(-35)" filter="url(#keyGlowFilter)">
        <circle cx="10" cy="10" r="9" fill="url(#keyGoldGrad)" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4" fill="#0b162f" />
        <rect x="18" y="8" width="24" height="4.5" rx="1" fill="url(#keyGoldGrad)" />
        <rect x="34" y="12" width="3.5" height="6" rx="1" fill="url(#keyGoldGrad)" />
        <rect x="40" y="12" width="3.5" height="8" rx="1" fill="url(#keyGoldGrad)" />
      </g>
    </svg>
  );
}

// ============================================================================
// 10. Git & GitHub 3D Diamond + Octocat Emblem
// ============================================================================
export function GitGitHubIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gitDiamondGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f87171" />
          <stop offset="0.4" stopColor="#f05032" />
          <stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
        <radialGradient id="ghMedallionGrad" cx="35%" cy="35%" r="65%">
          <stop stopColor="#334155" />
          <stop offset="1" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      {/* Plate */}
      <rect x="12" y="12" width="76" height="76" rx="18" fill="#13141f" stroke="#f97316" strokeWidth="1.5" />
      {/* 1. Git 3D Tilted Diamond (Left) */}
      <g transform="translate(24, 30)">
        <rect
          x="0"
          y="0"
          width="26"
          height="26"
          rx="5"
          transform="rotate(45 13 13)"
          fill="url(#gitDiamondGrad)"
          stroke="#fed7aa"
          strokeWidth="1.2"
          style={{ filter: "drop-shadow(0 3px 6px rgba(240, 80, 50, 0.5))" }}
        />
        {/* Git Branch Lines */}
        <circle cx="9" cy="18" r="2.2" fill="#ffffff" />
        <circle cx="17" cy="8" r="2.2" fill="#ffffff" />
        <circle cx="17" cy="18" r="2.2" fill="#ffffff" />
        <line x1="9" y1="18" x2="17" y2="8" stroke="#ffffff" strokeWidth="1.8" />
        <line x1="17" y1="8" x2="17" y2="18" stroke="#ffffff" strokeWidth="1.8" />
      </g>
      {/* 2. GitHub Octocat Medallion (Right) */}
      <g transform="translate(56, 36)">
        <circle
          cx="16"
          cy="16"
          r="16"
          fill="url(#ghMedallionGrad)"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))" }}
        />
        <path
          d="M16 6 C10.5 6 6 10.5 6 16 C6 20.5 8.8 24.3 12.8 25.6 C13.3 25.7 13.5 25.4 13.5 25.1 C13.5 24.9 13.5 24.2 13.5 23.4 C10.7 24 10.1 22.1 10.1 22.1 C9.7 21 8.9 20.7 8.9 20.7 C8 20.1 9 20.1 9 20.1 C10 20.2 10.6 21.2 10.6 21.2 C11.5 22.7 12.9 22.3 13.5 22 C13.6 21.3 13.8 20.8 14.1 20.5 C11.9 20.3 9.5 19.4 9.5 15.5 C9.5 14.4 9.9 13.5 10.6 12.8 C10.5 12.5 10.1 11.4 10.7 10 C10.7 10 11.6 9.7 13.5 11 C14.3 10.8 15.1 10.7 16 10.7 C16.9 10.7 17.7 10.8 18.5 11 C20.4 9.7 21.3 10 21.3 10 C21.9 11.4 21.5 12.5 21.4 12.8 C22.1 13.5 22.5 14.4 22.5 15.5 C22.5 19.5 20.1 20.3 17.9 20.5 C18.3 20.8 18.6 21.5 18.6 22.5 C18.6 24 18.6 24.9 18.6 25.1 C18.6 25.4 18.8 25.7 19.3 25.6 C23.2 24.3 26 20.5 26 16 C26 10.5 21.5 6 16 6 Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

// Map card ID to corresponding 3D Icon component
export function renderSkillIcon(id: string, className = "w-14 h-14 sm:w-16 sm:h-16 shrink-0") {
  switch (id) {
    case "ts":
      return <TypeScriptIcon className={className} />;
    case "js":
      return <JavaScriptIcon className={className} />;
    case "node":
      return <NodeIcon className={className} />;
    case "express":
      return <ExpressIcon className={className} />;
    case "react":
      return <ReactIcon className={className} />;
    case "redux":
      return <ReduxIcon className={className} />;
    case "tailwind":
      return <TailwindIcon className={className} />;
    case "rest":
      return <RestApiIcon className={className} />;
    case "jwt":
      return <JwtIcon className={className} />;
    case "git":
      return <GitGitHubIcon className={className} />;
    default:
      return null;
  }
}
