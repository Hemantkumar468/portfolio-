// ============================================================================
// 1. Gears / Cogs 3D Icon (ERP Modules Built)
// ============================================================================
export function Gears3DIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gearMetal1" cx="35%" cy="35%" r="65%">
          <stop stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#cbd5e1" />
          <stop offset="0.7" stopColor="#64748b" />
          <stop offset="1" stopColor="#334155" />
        </radialGradient>
        <radialGradient id="gearMetal2" cx="35%" cy="35%" r="65%">
          <stop stopColor="#93c5fd" />
          <stop offset="0.4" stopColor="#3b82f6" />
          <stop offset="0.8" stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#0f172a" />
        </radialGradient>
        <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Background Smaller Blue Gear */}
      <g transform="translate(56, 32) scale(0.65)" filter="url(#gearGlow)">
        <circle cx="25" cy="25" r="22" fill="url(#gearMetal2)" />
        <circle cx="25" cy="25" r="8" fill="#0b1329" />
        {/* Teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="21"
            y="-2"
            width="8"
            height="8"
            rx="2"
            transform={`rotate(${angle} 25 25)`}
            fill="url(#gearMetal2)"
          />
        ))}
      </g>
      {/* Foreground Main Silver Gear */}
      <g transform="translate(14, 26) scale(0.85)" filter="url(#gearGlow)">
        <circle cx="30" cy="30" r="26" fill="url(#gearMetal1)" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="30" cy="30" r="10" fill="#080e1e" stroke="#94a3b8" strokeWidth="1.5" />
        {/* Teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <rect
            key={angle}
            x="25.5"
            y="-4"
            width="9"
            height="10"
            rx="2.5"
            transform={`rotate(${angle} 30 30)`}
            fill="url(#gearMetal1)"
            stroke="#cbd5e1"
            strokeWidth="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

// ============================================================================
// 2. Diploma / Certificate Scroll 3D Icon (Industry Certifications)
// ============================================================================
export function CertificateScroll3DIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrollPaper" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="scrollCurl" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
        <filter id="scrollGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#60a5fa" floodOpacity="0.4" />
        </filter>
      </defs>
      <g transform="translate(18, 16)" filter="url(#scrollGlow)">
        {/* Main Sheet */}
        <path
          d="M12 6 C12 6 52 2 56 6 C60 10 58 56 54 62 C50 68 8 66 8 66 C8 66 12 18 12 6 Z"
          fill="url(#scrollPaper)"
          stroke="#f1f5f9"
          strokeWidth="1.5"
        />
        {/* Top Roll Curl */}
        <ellipse cx="32" cy="7" rx="22" ry="5.5" fill="url(#scrollPaper)" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="12" cy="7" rx="3.5" ry="5.5" fill="url(#scrollCurl)" />
        {/* Bottom Roll Curl */}
        <path d="M6 64 C6 60 12 58 18 60 C24 62 26 68 22 72 C18 75 8 74 6 64 Z" fill="url(#scrollPaper)" />
        {/* Text Lines */}
        <line x1="22" y1="24" x2="48" y2="24" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="32" x2="48" y2="32" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="40" x2="42" y2="40" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Blue Wax Seal */}
        <circle cx="35" cy="50" r="7" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
        <circle cx="35" cy="50" r="3.5" fill="#60a5fa" />
      </g>
    </svg>
  );
}

// ============================================================================
// 3. Cloud Database Servers 3D Icon (Core MERN Projects)
// ============================================================================
export function CloudDatabase3DIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGrad" x1="20" y1="10" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <filter id="cloudGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.45" />
        </filter>
      </defs>
      {/* 3D Fluffy Cloud */}
      <g filter="url(#cloudGlow)">
        <path
          d="M32 58 C24 58 16 52 16 42 C16 33 23 27 30 27 C31 20 38 14 48 14 C58 14 66 21 68 28 C74 28 82 34 82 43 C82 52 74 58 66 58 Z"
          fill="url(#cloudGrad)"
          stroke="#f8fafc"
          strokeWidth="1.5"
        />
        {/* Database Rack Servers Stacked in Front */}
        <g transform="translate(36, 32)">
          {/* Server Unit 1 */}
          <rect x="0" y="0" width="28" height="9" rx="2.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="6" cy="4.5" r="1.5" fill="#22c55e" />
          <circle cx="11" cy="4.5" r="1.5" fill="#38bdf8" />
          <line x1="16" y1="4.5" x2="24" y2="4.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          {/* Server Unit 2 */}
          <rect x="0" y="11" width="28" height="9" rx="2.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="6" cy="15.5" r="1.5" fill="#22c55e" />
          <circle cx="11" cy="15.5" r="1.5" fill="#facc15" />
          <line x1="16" y1="15.5" x2="24" y2="15.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          {/* Server Unit 3 */}
          <rect x="0" y="22" width="28" height="9" rx="2.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="6" cy="26.5" r="1.5" fill="#22c55e" />
          <circle cx="11" cy="26.5" r="1.5" fill="#ec4899" />
          <line x1="16" y1="26.5" x2="24" y2="26.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        {/* Orbiting Satellite Data Dots */}
        <circle cx="24" cy="22" r="2.5" fill="#38bdf8" />
        <circle cx="76" cy="22" r="2.5" fill="#f43f5e" />
      </g>
    </svg>
  );
}

// ============================================================================
// 4. Target Bullseye 3D Icon (Modern & Responsive UX)
// ============================================================================
export function TargetBullseye3DIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="targetOuter" cx="40%" cy="40%" r="60%">
          <stop stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#64748b" />
        </radialGradient>
        <filter id="targetGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.4" />
        </filter>
      </defs>
      <g transform="translate(15, 15)" filter="url(#targetGlow)">
        {/* Outer Ring */}
        <circle cx="35" cy="35" r="32" stroke="url(#targetOuter)" strokeWidth="6" fill="#0b1329" />
        {/* Middle Ring */}
        <circle cx="35" cy="35" r="20" stroke="#38bdf8" strokeWidth="4.5" fill="none" />
        {/* Inner Bullseye Core */}
        <circle cx="35" cy="35" r="9" fill="#f43f5e" />
        <circle cx="35" cy="35" r="4.5" fill="#ffffff" />
        {/* 3D Arrow Shaft hitting center */}
        <line x1="58" y1="12" x2="38" y2="32" stroke="#e2e8f0" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M54 8 L64 8 L64 18" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* User Avatar Glyph inside */}
        <g transform="translate(29, 29) scale(0.6)">
          <circle cx="10" cy="5" r="4" fill="#ffffff" />
          <path d="M3 17 C3 13 7 11 10 11 C13 11 17 13 17 17 Z" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}

// ============================================================================
// 5. Enterprise Skyscrapers 3D Icon (ERP & Enterprise Engineering)
// ============================================================================
export function EnterpriseBuildings3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bldgTower1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="bldgTower2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#93c5fd" />
          <stop offset="0.6" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <filter id="bldgGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.4" />
        </filter>
      </defs>
      <g transform="translate(14, 12)" filter="url(#bldgGlow)">
        {/* Isometric Base Pedestal */}
        <path d="M36 72 L72 54 L36 36 L0 54 Z" fill="#091428" stroke="#38bdf8" strokeWidth="1" />
        <path d="M0 54 L36 72 L36 76 L0 58 Z" fill="#040a17" />
        <path d="M36 72 L72 54 L72 58 L36 76 Z" fill="#071120" />

        {/* Central High-Rise Tower */}
        <g transform="translate(24, 10)">
          {/* Top Roof */}
          <path d="M12 0 L24 6 L12 12 L0 6 Z" fill="#e2e8f0" stroke="#f8fafc" strokeWidth="0.8" />
          {/* Left Wall */}
          <path d="M0 6 L12 12 L12 44 L0 38 Z" fill="url(#bldgTower1)" />
          {/* Right Wall */}
          <path d="M12 12 L24 6 L24 38 L12 44 Z" fill="url(#bldgTower2)" />
          {/* Windows Dots */}
          {[16, 22, 28, 34].map((y) => (
            <g key={y}>
              <line x1="3" y1={y} x2="9" y2={y + 3} stroke="#38bdf8" strokeWidth="1.2" />
              <line x1="15" y1={y + 3} x2="21" y2={y} stroke="#67e8f9" strokeWidth="1.2" />
            </g>
          ))}
        </g>

        {/* Left Secondary Tower */}
        <g transform="translate(10, 24)">
          <path d="M10 0 L20 5 L10 10 L0 5 Z" fill="#cbd5e1" />
          <path d="M0 5 L10 10 L10 32 L0 27 Z" fill="url(#bldgTower1)" />
          <path d="M10 10 L20 5 L20 27 L10 32 Z" fill="url(#bldgTower2)" />
        </g>

        {/* Floating Mini Document Badge */}
        <g transform="translate(-4, 38)">
          <rect x="0" y="0" width="16" height="20" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <line x1="4" y1="5" x2="12" y2="5" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="4" y1="9" x2="12" y2="9" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="4" y1="13" x2="9" y2="13" stroke="#94a3b8" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}

// ============================================================================
// 6. Security Shield & Chip 3D Icon (API & Backend Security)
// ============================================================================
export function SecurityShield3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldPlateGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#60a5fa" />
          <stop offset="0.5" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.45" />
        </filter>
      </defs>
      <g transform="translate(14, 12)" filter="url(#shieldGlow)">
        {/* Isometric Pedestal */}
        <path d="M36 72 L72 54 L36 36 L0 54 Z" fill="#091428" stroke="#38bdf8" strokeWidth="1" />
        <path d="M0 54 L36 72 L36 76 L0 58 Z" fill="#040a17" />
        <path d="M36 72 L72 54 L72 58 L36 76 Z" fill="#071120" />

        {/* 3D Security Shield Standing on Pedestal */}
        <g transform="translate(20, 12)">
          <path
            d="M16 0 L32 6 C32 24 24 36 16 42 C8 36 0 24 0 6 Z"
            fill="url(#shieldPlateGrad)"
            stroke="#93c5fd"
            strokeWidth="1.5"
          />
          {/* Inner Crest Sheen */}
          <path d="M16 4 L28 9 C28 22 21 32 16 37 Z" fill="#3b82f6" opacity="0.4" />
          {/* Glowing Checkmark */}
          <path
            d="M9 18 L14 23 L23 14"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating Code/Chip Badge in foreground */}
        <g transform="translate(-4, 38)">
          <rect x="0" y="0" width="18" height="18" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
          <circle cx="9" cy="9" r="4" fill="#7c3aed" />
          <circle cx="9" cy="9" r="2" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}

// ============================================================================
// 7. Space Rocket Launch 3D Icon (High-Performance Frontend)
// ============================================================================
export function SpaceRocket3DIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="rocketWings" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f43f5e" />
          <stop offset="1" stopColor="#be123c" />
        </linearGradient>
        <filter id="rocketGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.45" />
        </filter>
      </defs>
      <g transform="translate(14, 12)" filter="url(#rocketGlow)">
        {/* Neon Launchpad Ring on Base */}
        <ellipse cx="36" cy="62" rx="26" ry="12" fill="#0a1224" stroke="#ec4899" strokeWidth="1.5" />
        <ellipse cx="36" cy="62" rx="16" ry="7" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* 3D Rocket blasting off at ~45° */}
        <g transform="translate(24, 10) rotate(-25 15 25)">
          {/* Thruster exhaust flames */}
          <path
            d="M10 38 C10 46 15 54 15 54 C15 54 20 46 20 38 Z"
            fill="#facc15"
            style={{ filter: "drop-shadow(0 0 6px #f97316)" }}
          />
          <path d="M12 38 C12 44 15 48 15 48 C15 48 18 44 18 38 Z" fill="#ffffff" />
          {/* Wings */}
          <path d="M4 28 L0 38 L10 35 Z" fill="url(#rocketWings)" />
          <path d="M26 28 L30 38 L20 35 Z" fill="url(#rocketWings)" />
          {/* Fuselage / Rocket Body */}
          <path
            d="M15 0 C8 10 7 24 7 36 L23 36 C23 24 22 10 15 0 Z"
            fill="url(#rocketBody)"
            stroke="#f8fafc"
            strokeWidth="1.2"
          />
          {/* Porthole Window */}
          <circle cx="15" cy="18" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="14" cy="17" r="1.5" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}

// ============================================================================
// 8. COPA Rosette / Medal Ribbon Seal (Education Card)
// ============================================================================
export function CopaMedalSealIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sealCenter" cx="35%" cy="35%" r="65%">
          <stop stopColor="#38bdf8" />
          <stop offset="0.6" stopColor="#0284c7" />
          <stop offset="1" stopColor="#082f49" />
        </radialGradient>
        <filter id="sealGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#sealGlow)">
        {/* Rosette Pleated Teeth */}
        <g transform="translate(50, 42)">
          {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((angle) => (
            <rect
              key={angle}
              x="-4"
              y="-28"
              width="8"
              height="8"
              rx="2"
              transform={`rotate(${angle})`}
              fill="#0ea5e9"
              opacity="0.8"
            />
          ))}
          {/* Central Medallion Circle */}
          <circle cx="0" cy="0" r="23" fill="url(#sealCenter)" stroke="#7dd3fc" strokeWidth="2" />
          {/* Inner Dashed Ring */}
          <circle cx="0" cy="0" r="18" fill="none" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 2" />
          {/* "COPA" Typography */}
          <text
            x="0"
            y="5"
            fill="#ffffff"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="11.5"
            letterSpacing="0.8"
            textAnchor="middle"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }}
          >
            COPA
          </text>
        </g>
        {/* Hanging Ribbons */}
        <path d="M42 62 L36 84 L46 78 L52 84 L48 62 Z" fill="#0369a1" opacity="0.9" />
        <path d="M58 62 L52 84 L58 78 L68 84 L64 62 Z" fill="#0284c7" opacity="0.9" />
      </g>
    </svg>
  );
}

