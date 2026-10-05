import React from "react";

/**
 * High-fidelity Vector SVG Components for GSAP-powered educational animations.
 * Eliminates crude text emojis, delivering professional, tactile, and Montessori-aligned visuals.
 */

// 1. EL ROBOT BOTY (Vector Character)
export function BotySvg({
  className = "w-10 h-10",
  eyeMood = "happy", // "happy" | "blink" | "surprised"
  isWalking = false,
}: {
  className?: string;
  eyeMood?: "happy" | "blink" | "surprised";
  isWalking?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform ${isWalking ? "animate-pulse" : ""}`}
    >
      <defs>
        <linearGradient id="botyWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="botyChestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <radialGradient id="botyAntennaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
        <filter id="botyShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Shadow Base */}
      <ellipse cx="50" cy="92" rx="30" ry="6" fill="#0f172a" fillOpacity="0.18" />

      {/* Treads / Feet */}
      <rect x="24" y="80" width="16" height="12" rx="4" fill="#334155" />
      <rect x="60" y="80" width="16" height="12" rx="4" fill="#334155" />
      <line x1="26" y1="86" x2="38" y2="86" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="86" x2="74" y2="86" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

      {/* Body */}
      <rect x="28" y="44" width="44" height="40" rx="10" fill="url(#botyWoodGrad)" filter="url(#botyShadow)" />
      
      {/* Chest Screen (Wooden/Cream Screen) */}
      <rect x="36" y="52" width="28" height="24" rx="6" fill="url(#botyChestGrad)" stroke="#d97706" strokeWidth="1.5" />
      {/* Heart / Activity Heartbeat Pulse on Chest */}
      <path
        d="M40 64h4l3-6 4 10 3-4h6"
        stroke="#e11d48"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arms */}
      <rect x="18" y="52" width="8" height="22" rx="4" fill="#0284c7" />
      <circle cx="22" cy="74" r="5" fill="#f59e0b" />
      <rect x="74" y="52" width="8" height="22" rx="4" fill="#0284c7" />
      <circle cx="78" cy="74" r="5" fill="#f59e0b" />

      {/* Antenna */}
      <line x1="50" y1="18" x2="50" y2="28" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="14" r="6" fill="url(#botyAntennaGlow)" />
      <circle cx="50" cy="14" r="9" stroke="#facc15" strokeWidth="1.5" opacity="0.6" />

      {/* Head */}
      <rect x="22" y="22" width="56" height="30" rx="12" fill="url(#botyWoodGrad)" filter="url(#botyShadow)" />
      
      {/* Visor Screen (Dark Slate) */}
      <rect x="30" y="27" width="40" height="20" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

      {/* Visor Eyes */}
      {eyeMood === "happy" && (
        <>
          <path d="M38 38c0-3 3-5 5-5s5 2 5 5" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52 38c0-3 3-5 5-5s5 2 5 5" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {eyeMood === "blink" && (
        <>
          <line x1="38" y1="37" x2="48" y2="37" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="37" x2="62" y2="37" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {eyeMood === "surprised" && (
        <>
          <circle cx="43" cy="37" r="3.5" fill="#38bdf8" />
          <circle cx="57" cy="37" r="3.5" fill="#38bdf8" />
        </>
      )}

      {/* Cheek glow */}
      <circle cx="33" cy="42" r="2" fill="#f43f5e" opacity="0.7" />
      <circle cx="67" cy="42" r="2" fill="#f43f5e" opacity="0.7" />
    </svg>
  );
}

// 2. ESTRELLA DORADA VECTORIAL (Collectible Star)
export function StarTokenSvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <radialGradient id="starShine" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon
        points="50,5 64,36 98,38 72,62 80,95 50,77 20,95 28,62 2,38 36,36"
        fill="url(#starGrad)"
        stroke="#a16207"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon
        points="50,15 60,38 84,40 65,57 71,80 50,67 29,80 35,57 16,40 40,38"
        fill="url(#starShine)"
      />
    </svg>
  );
}

// 3. RULETA DE RETOS VECTORIAL (Smooth Geometric SVG Wheel)
export function VectorRouletteWheel({
  rotationDegree = 0,
  className = "w-44 h-44",
}: {
  rotationDegree?: number;
  className?: string;
}) {
  const sectors = [
    { label: "Robot", color: "#10b981", textColor: "#ffffff" },
    { label: "Baile", color: "#ec4899", textColor: "#ffffff" },
    { label: "Arepa", color: "#f59e0b", textColor: "#1e293b" },
    { label: "Bicho", color: "#8b5cf6", textColor: "#ffffff" },
    { label: "Lana", color: "#06b6d4", textColor: "#1e293b" },
    { label: "Binario", color: "#3b82f6", textColor: "#ffffff" },
    { label: "Cuento", color: "#f97316", textColor: "#ffffff" },
    { label: "Cifrado", color: "#14b8a6", textColor: "#ffffff" },
  ];

  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      {/* Outer Wooden Rim */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        style={{
          transform: `rotate(${rotationDegree}deg)`,
          transition: "transform 0.05s linear",
        }}
      >
        <defs>
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#78350f" />
            <stop offset="95%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
        </defs>

        {/* Base Wheel Rim */}
        <circle cx="100" cy="100" r="98" fill="url(#rimGrad)" />

        {/* 8 Sectors with Math Geometry */}
        {sectors.map((sec, i) => {
          const angle = (360 / sectors.length) * i;
          const rad = (angle * Math.PI) / 180;
          const nextRad = (((angle + 45) * Math.PI) / 180);
          const r = 88;
          const x1 = 100 + r * Math.cos(rad);
          const y1 = 100 + r * Math.sin(rad);
          const x2 = 100 + r * Math.cos(nextRad);
          const y2 = 100 + r * Math.sin(nextRad);

          // Path arc for pie slice
          const d = `M100,100 L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;

          // Mid angle for text label
          const midAngle = angle + 22.5;

          return (
            <g key={i}>
              <path d={d} fill={sec.color} stroke="#ffffff" strokeWidth="1.5" />
              {/* Outer Brass Peg */}
              <circle
                cx={100 + 92 * Math.cos(rad)}
                cy={100 + 92 * Math.sin(rad)}
                r="2.5"
                fill="#fde047"
                stroke="#854d0e"
                strokeWidth="0.8"
              />
              {/* Label text positioned radially */}
              <text
                x="100"
                y="35"
                transform={`rotate(${midAngle + 90}, 100, 100)`}
                textAnchor="middle"
                fill={sec.textColor}
                fontSize="8.5"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {sec.label}
              </text>
            </g>
          );
        })}

        {/* Center Wooden Hub */}
        <circle cx="100" cy="100" r="22" fill="#78350f" stroke="#fde047" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="14" fill="#b45309" />
        <circle cx="100" cy="100" r="5" fill="#fef3c7" />
      </svg>

      {/* Top Fixed Needle Pointer */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
        <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
          <path
            d="M12 30L3 8C2 5 4 2 7 2H17C20 2 22 5 21 8L12 30Z"
            fill="#e11d48"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx="12" cy="8" r="3.5" fill="#fef08a" />
        </svg>
      </div>
    </div>
  );
}

// 4. RED DE HILO (SVG Network Topology & Flowing Packets)
export function VectorNetworkTopology({
  step = 0,
  className = "w-full max-w-lg h-44",
}: {
  step?: number;
  className?: string;
}) {
  // Packet position calculation along bezier curve
  // Step 0: at Sender (x: 40, y: 70)
  // Step 1: traveling Sender -> Router (x: 120, y: 35)
  // Step 2: at Router -> Receiver (x: 200, y: 55)
  // Step 3: at Receiver (x: 260, y: 70)
  const packetPos =
    step === 0
      ? { x: 50, y: 75, text: "Paquete #1: [H-O]" }
      : step === 1
      ? { x: 135, y: 40, text: "Enrutando IP..." }
      : step === 2
      ? { x: 220, y: 50, text: "Paquete #1: [L-A]" }
      : { x: 255, y: 75, text: "¡Mensaje Ensamblado! ✓" };

  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg viewBox="0 0 320 130" className="w-full h-full">
        <defs>
          <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="packetGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Network Cables (Curved Bezier Lines) */}
        <path
          d="M50 75 Q100 20 150 45 T250 75"
          fill="none"
          stroke="#334155"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M50 75 Q100 20 150 45 T250 75"
          fill="none"
          stroke="url(#cableGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
          className="animate-[dash_1.5s_linear_infinite]"
        />

        {/* Direct Bypass Cable */}
        <path
          d="M50 75 Q150 115 250 75"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        {/* 1. SENDER NODE (Dispositivo Emisor / Niña) */}
        <g transform="translate(20, 45)">
          <circle cx="30" cy="30" r="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          {/* Laptop icon */}
          <rect x="18" y="18" width="24" height="15" rx="2" fill="#38bdf8" />
          <rect x="20" y="20" width="20" height="11" fill="#0f172a" />
          <polygon points="14,35 46,35 44,38 16,38" fill="#94a3b8" />
          <text x="30" y="65" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontWeight="bold">
            Emisor
          </text>
        </g>

        {/* 2. ROUTER NODE (Enrutador / Papá) */}
        <g transform="translate(125, 10)">
          <circle cx="25" cy="25" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Router box with antennas */}
          <line x1="16" y1="12" x2="16" y2="19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="12" x2="34" y2="19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <rect x="14" y="19" width="22" height="12" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
          <circle cx="19" cy="25" r="1.5" fill="#10b981" />
          <circle cx="25" cy="25" r="1.5" fill="#f59e0b" />
          <circle cx="31" cy="25" r="1.5" fill="#38bdf8" />
          <text x="25" y="48" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">
            Enrutador IP
          </text>
        </g>

        {/* 3. RECEIVER NODE (Dispositivo Receptor / Hermano) */}
        <g transform="translate(225, 45)">
          <circle cx="25" cy="30" r="24" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
          {/* Tablet / Screen */}
          <rect x="16" y="18" width="18" height="24" rx="3" fill="#10b981" />
          <rect x="18" y="20" width="14" height="20" fill="#0f172a" />
          <circle cx="25" cy="40" r="1" fill="#ffffff" />
          <text x="25" y="65" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="bold">
            Receptor
          </text>
        </g>

        {/* TRAVELING PACKET (Visual Data Envelope) */}
        <g
          transform={`translate(${packetPos.x}, ${packetPos.y})`}
          style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          filter="url(#packetGlow)"
        >
          <rect x="-35" y="-12" width="70" height="22" rx="11" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <text x="0" y="2" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">
            {packetPos.text}
          </text>
        </g>
      </svg>
    </div>
  );
}

// 5. BALANZA VECTORIAL DE DOS PLATOS (Sorting Scale)
export function VectorBalanceScale({
  angle = 0, // -15 (left heavy), 0 (balanced), 15 (right heavy)
  className = "w-44 h-36",
}: {
  angle?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 160 120" className={className}>
      {/* Central Post */}
      <rect x="76" y="30" width="8" height="75" rx="3" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <path d="M60 105 L100 105 L94 95 L66 95 Z" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      <circle cx="80" cy="30" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

      {/* Tilting Beam */}
      <g
        transform={`rotate(${angle}, 80, 30)`}
        style={{ transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <rect x="15" y="27" width="130" height="6" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
        
        {/* Left Pan Chains & Tray */}
        <line x1="25" y1="33" x2="15" y2="70" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="25" y1="33" x2="35" y2="70" stroke="#94a3b8" strokeWidth="1.2" />
        <path d="M10 70 Q25 78 40 70 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />

        {/* Right Pan Chains & Tray */}
        <line x1="135" y1="33" x2="125" y2="70" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="135" y1="33" x2="145" y2="70" stroke="#94a3b8" strokeWidth="1.2" />
        <path d="M120 70 Q135 78 150 70 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// -------------------------------------------------------------
// 6. VECTOR FRUITS (Clasificador de Frutas / Machine Learning)
// -------------------------------------------------------------
export function VectorAppleSvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <defs>
        <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
      </defs>
      <path d="M24 14 Q27 6 32 8" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 11 Q33 7 34 13 Q27 15 25 11 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
      <path
        d="M24 16 C18 13 10 16 10 26 C10 37 18 43 24 43 C30 43 38 37 38 26 C38 16 30 13 24 16 Z"
        fill="url(#appleGrad)"
        stroke="#7f1d1d"
        strokeWidth="1.5"
      />
      <ellipse cx="17" cy="23" rx="3.5" ry="6" transform="rotate(-25 17 23)" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}

export function VectorStrawberrySvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <defs>
        <radialGradient id="strawGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
      </defs>
      <path
        d="M14 17 C11 25 18 39 24 44 C30 39 37 25 34 17 C32 13 16 13 14 17 Z"
        fill="url(#strawGrad)"
        stroke="#881337"
        strokeWidth="1.5"
      />
      {[
        [20, 22], [28, 22], [17, 28], [24, 28], [31, 28], [21, 34], [27, 34], [24, 39]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#fef08a" opacity="0.9" />
      ))}
      <path d="M24 13 L24 8" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 14 Q20 8 13 13 Q19 16 23 15 Q24 9 24 14 Q25 9 25 14 Q29 16 35 13 Q28 8 24 14 Z" fill="#16a34a" />
    </svg>
  );
}

export function VectorCherrySvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <defs>
        <radialGradient id="cherryGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="60%" stopColor="#be123c" />
          <stop offset="100%" stopColor="#4c0519" />
        </radialGradient>
      </defs>
      <path d="M27 9 Q23 18 16 29" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 9 Q28 19 32 30" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 9 Q35 7 37 13 Q31 13 27 9 Z" fill="#22c55e" />
      <circle cx="16" cy="32" r="9" fill="url(#cherryGrad)" stroke="#4c0519" strokeWidth="1.5" />
      <circle cx="13" cy="29" r="2.5" fill="#ffffff" opacity="0.4" />
      <circle cx="33" cy="33" r="9" fill="url(#cherryGrad)" stroke="#4c0519" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2.5" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

export function VectorBananaSvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <defs>
        <linearGradient id="bananaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <path
        d="M10 33 C15 39 30 40 40 22 C34 26 23 27 15 21 C12 25 10 30 10 33 Z"
        fill="url(#bananaGrad)"
        stroke="#854d0e"
        strokeWidth="1.5"
      />
      <path d="M12 32 C20 36 31 34 38 23" fill="none" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="38" y="19" width="3" height="4" rx="1" transform="rotate(-30 38 19)" fill="#78350f" />
      <circle cx="10" cy="33" r="1.5" fill="#78350f" />
    </svg>
  );
}

export function VectorLemonSvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <defs>
        <radialGradient id="lemonGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
      </defs>
      <path
        d="M10 24 C10 16 17 12 26 12 C36 12 40 18 42 24 C40 30 36 36 26 36 C17 36 10 32 10 24 Z"
        transform="rotate(-25 26 24)"
        fill="url(#lemonGrad)"
        stroke="#854d0e"
        strokeWidth="1.5"
      />
      <ellipse cx="23" cy="21" rx="4" ry="2" transform="rotate(-25 23 21)" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

// -------------------------------------------------------------
// 7. LABERINTO EN EL PISO (Avatar, Obstáculo y Meta)
// -------------------------------------------------------------
export function VectorChildExplorerSvg({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <ellipse cx="20" cy="37" rx="10" ry="2.5" fill="#042f2e" opacity="0.3" />
      <rect x="13" y="22" width="14" height="13" rx="4" fill="#0d9488" stroke="#115e59" strokeWidth="1.2" />
      <path d="M15 22 Q20 25 25 22" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="14" r="8" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.2" />
      <path d="M12 13 Q20 5 28 13 Q27 8 20 8 Q13 8 12 13 Z" fill="#78350f" />
      <path d="M15 10 Q22 7 29 11" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="17.5" cy="14" r="1" fill="#1e293b" />
      <circle cx="22.5" cy="14" r="1" fill="#1e293b" />
      <path d="M18.5 17 Q20 18.5 21.5 17" fill="none" stroke="#c2410c" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function VectorCushionSvg({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <rect x="6" y="8" width="28" height="24" rx="8" fill="#e11d48" stroke="#9f1239" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2.5" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
      <path d="M10 12 Q20 20 10 28" fill="none" stroke="#be123c" strokeWidth="1" opacity="0.6" />
      <path d="M30 12 Q20 20 30 28" fill="none" stroke="#be123c" strokeWidth="1" opacity="0.6" />
      <path d="M12 10 Q20 20 28 10" fill="none" stroke="#be123c" strokeWidth="1" opacity="0.6" />
      <path d="M12 30 Q20 20 28 30" fill="none" stroke="#be123c" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function VectorGoalFlagSvg({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <line x1="12" y1="6" x2="12" y2="35" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="6" r="2.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
      <g>
        <path d="M13 8 L29 8 L27 21 L13 21 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <rect x="13" y="8" width="5" height="4" fill="#ffffff" />
        <rect x="23" y="8" width="5" height="4" fill="#ffffff" />
        <rect x="18" y="12" width="5" height="4" fill="#ffffff" />
        <rect x="13" y="16" width="5" height="5" fill="#ffffff" />
        <rect x="23" y="16" width="4" height="5" fill="#ffffff" />
      </g>
      <ellipse cx="12" cy="35" rx="5" ry="2" fill="#64748b" />
    </svg>
  );
}

// -------------------------------------------------------------
// 8. VECTOR ROULETTE CENTER HUB (Compass Brass Medallion)
// -------------------------------------------------------------
export function VectorRouletteCenterHub({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className}>
      <defs>
        <radialGradient id="brassHub" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <radialGradient id="hubJewel" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#164e63" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="27" fill="url(#brassHub)" stroke="#451a03" strokeWidth="2" />
      <circle cx="30" cy="30" r="21" fill="#fffbeb" stroke="#b45309" strokeWidth="1.5" />
      <path
        d="M30 13 L33 26 L47 30 L33 34 L30 47 L27 34 L13 30 L27 26 Z"
        fill="#f59e0b"
        stroke="#92400e"
        strokeWidth="1"
      />
      <circle cx="30" cy="30" r="6" fill="url(#hubJewel)" stroke="#0e7490" strokeWidth="1" />
      <circle cx="28" cy="28" r="1.5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

// -------------------------------------------------------------
// 9. VECTOR MICRO:BIT BOARD (Simulador de Hardware 5x5 LED)
// -------------------------------------------------------------
export interface VectorMicrobitBoardProps {
  grid?: number[][];
  onToggleLed?: (row: number, col: number) => void;
  pressedButton?: "A" | "B" | "AB" | null;
  onPressButtonA?: () => void;
  onPressButtonB?: () => void;
  displayText?: string;
  className?: string;
  interactive?: boolean;
}

export function VectorMicrobitBoard({
  grid = [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  onToggleLed,
  pressedButton = null,
  onPressButtonA,
  onPressButtonB,
  displayText,
  className = "w-full max-w-md h-auto",
  interactive = true,
}: VectorMicrobitBoardProps) {
  return (
    <svg viewBox="0 0 400 310" className={className} style={{ userSelect: "none" }}>
      <defs>
        {/* LED Glow filter */}
        <filter id="ledRedGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Copper Edge Pad Gradient */}
        <linearGradient id="goldPad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Tactile Button Surround Gradient */}
        <radialGradient id="btnMetalRing" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="60%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
      </defs>

      {/* PCB Drop Shadow */}
      <rect x="18" y="18" width="364" height="276" rx="26" fill="#09090b" opacity="0.4" />

      {/* PCB Board Outline (Matte Dark Solder Mask) */}
      <rect
        x="15"
        y="15"
        width="370"
        height="280"
        rx="24"
        fill="#18181b"
        stroke="#27272a"
        strokeWidth="3"
      />

      {/* Subtle PCB Trace Tracks */}
      <g stroke="#27272a" strokeWidth="1.2" fill="none" opacity="0.6">
        <path d="M40 50 L100 50 L120 70" />
        <path d="M360 50 L300 50 L280 70" />
        <path d="M70 210 L70 240 L100 270" />
        <path d="M330 210 L330 240 L300 270" />
      </g>

      {/* Corner Mounting Holes with Copper Annular Rings */}
      {[
        [36, 36],
        [364, 36],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="13" fill="none" stroke="url(#goldPad)" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="10" fill="#09090b" />
        </g>
      ))}

      {/* Top Silkscreen and Logo */}
      <text
        x="200"
        y="42"
        textAnchor="middle"
        fill="#f8fafc"
        fontSize="13"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        letterSpacing="2"
      >
        BBC micro:bit
      </text>

      {/* System Power LED */}
      <circle cx="340" cy="55" r="3" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
      <text x="330" y="58" textAnchor="end" fill="#22c55e" fontSize="7" fontFamily="monospace" fontWeight="bold">
        PWR
      </text>

      {/* Microphone Logo & Indicator */}
      <circle cx="200" cy="58" r="4.5" fill="none" stroke="url(#goldPad)" strokeWidth="1.5" />
      <circle cx="200" cy="58" r="2" fill="#ef4444" opacity="0.8" />

      {/* 5x5 LED Matrix Dark Screen Bezel */}
      <rect
        x="130"
        y="75"
        width="140"
        height="140"
        rx="14"
        fill="#09090b"
        stroke="#27272a"
        strokeWidth="2"
      />

      {/* Display text overlay if present */}
      {displayText ? (
        <text
          x="200"
          y="160"
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="48"
          fontWeight="900"
          fontFamily="monospace"
        >
          {displayText}
        </text>
      ) : (
        /* 25 Individual LEDs */
        grid.map((row, r) =>
          row.map((val, c) => {
            const cx = 150 + c * 25;
            const cy = 95 + r * 25;
            const isLit = val === 1;

            return (
              <g
                key={`${r}-${c}`}
                onClick={() => interactive && onToggleLed?.(r, c)}
                style={{ cursor: interactive ? "pointer" : "default" }}
              >
                {/* SMD LED Package Border */}
                <rect
                  x={cx - 9}
                  y={cy - 9}
                  width="18"
                  height="18"
                  rx="3.5"
                  fill={isLit ? "#3f0a0a" : "#141416"}
                  stroke={isLit ? "#7f1d1d" : "#222226"}
                  strokeWidth="1"
                />

                {/* LED Emissive Core */}
                {isLit ? (
                  <>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="6.5"
                      fill="#ef4444"
                      filter="url(#ledRedGlow)"
                    />
                    <circle cx={cx} cy={cy} r="3" fill="#fecaca" />
                  </>
                ) : (
                  <circle cx={cx} cy={cy} r="3.5" fill="#2d1214" opacity="0.6" />
                )}
              </g>
            );
          })
        )
      )}

      {/* Tactile Button A */}
      <g
        onClick={onPressButtonA}
        style={{ cursor: interactive ? "pointer" : "default" }}
        transform={pressedButton === "A" || pressedButton === "AB" ? "translate(0, 2)" : ""}
      >
        <circle cx="70" cy="145" r="26" fill="url(#btnMetalRing)" stroke="#1e293b" strokeWidth="2" />
        <circle
          cx="70"
          cy="145"
          r="19"
          fill={pressedButton === "A" || pressedButton === "AB" ? "#f59e0b" : "#0f172a"}
          stroke={pressedButton === "A" || pressedButton === "AB" ? "#d97706" : "#334155"}
          strokeWidth="2"
        />
        <text
          x="70"
          y="152"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="18"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          A
        </text>
      </g>
      <text x="70" y="186" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
        BOTÓN A
      </text>

      {/* Tactile Button B */}
      <g
        onClick={onPressButtonB}
        style={{ cursor: interactive ? "pointer" : "default" }}
        transform={pressedButton === "B" || pressedButton === "AB" ? "translate(0, 2)" : ""}
      >
        <circle cx="330" cy="145" r="26" fill="url(#btnMetalRing)" stroke="#1e293b" strokeWidth="2" />
        <circle
          cx="330"
          cy="145"
          r="19"
          fill={pressedButton === "B" || pressedButton === "AB" ? "#f59e0b" : "#0f172a"}
          stroke={pressedButton === "B" || pressedButton === "AB" ? "#d97706" : "#334155"}
          strokeWidth="2"
        />
        <text
          x="330"
          y="152"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="18"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          B
        </text>
      </g>
      <text x="330" y="186" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
        BOTÓN B
      </text>

      {/* Bottom Edge Connector (Gold Teeth Pins) */}
      <rect x="25" y="245" width="350" height="42" fill="#09090b" rx="4" />

      {/* 5 Main Alligator Clip Pads (P0, P1, P2, 3V, GND) */}
      {[
        { x: 50, label: "0" },
        { x: 120, label: "1" },
        { x: 190, label: "2" },
        { x: 275, label: "3V" },
        { x: 345, label: "GND" },
      ].map((pad, i) => (
        <g key={i}>
          {/* Copper Pad Strip */}
          <rect
            x={pad.x - 16}
            y="247"
            width="32"
            height="38"
            rx="5"
            fill="url(#goldPad)"
            stroke="#92400e"
            strokeWidth="1"
          />
          {/* Drilled Hole for Alligator Clip */}
          <circle cx={pad.x} cy="264" r="7" fill="#09090b" stroke="#78350f" strokeWidth="1" />
          {/* Label */}
          <text
            x={pad.x}
            y="240"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {pad.label}
          </text>
        </g>
      ))}

      {/* Interleaved Micro Pins */}
      {Array.from({ length: 24 }).map((_, i) => {
        // Skip positions occupied by large pads
        const px = 75 + i * 11;
        if (
          (px >= 34 && px <= 66) ||
          (px >= 104 && px <= 136) ||
          (px >= 174 && px <= 206) ||
          (px >= 259 && px <= 291) ||
          (px >= 329 && px <= 361)
        ) {
          return null;
        }
        return (
          <rect
            key={i}
            x={px}
            y="250"
            width="4.5"
            height="33"
            rx="1.5"
            fill="url(#goldPad)"
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}

// -------------------------------------------------------------
// 10. VECTOR SCRATCH CAT & GREEN FLAG (Visual Programming)
// -------------------------------------------------------------
export function VectorScratchCatSvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id="catOrange" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>

      {/* Left Ear */}
      <path d="M12 28 L16 8 L32 20 Z" fill="url(#catOrange)" stroke="#9a3412" strokeWidth="1.5" />
      <path d="M16 24 L19 12 L28 20 Z" fill="#ffffff" />

      {/* Right Ear */}
      <path d="M52 28 L48 8 L32 20 Z" fill="url(#catOrange)" stroke="#9a3412" strokeWidth="1.5" />
      <path d="M48 24 L45 12 L36 20 Z" fill="#ffffff" />

      {/* Head */}
      <circle cx="32" cy="34" r="22" fill="url(#catOrange)" stroke="#9a3412" strokeWidth="1.5" />

      {/* White Muzzle */}
      <ellipse cx="32" cy="42" rx="14" ry="10" fill="#ffffff" />

      {/* Eyes */}
      <ellipse cx="23" cy="31" rx="4.5" ry="6" fill="#ffffff" stroke="#9a3412" strokeWidth="1" />
      <circle cx="24" cy="31" r="3" fill="#16a34a" />
      <circle cx="25" cy="30" r="1.2" fill="#000000" />

      <ellipse cx="41" cy="31" rx="4.5" ry="6" fill="#ffffff" stroke="#9a3412" strokeWidth="1" />
      <circle cx="40" cy="31" r="3" fill="#16a34a" />
      <circle cx="39" cy="30" r="1.2" fill="#000000" />

      {/* Nose */}
      <polygon points="32,38 29,35 35,35" fill="#0f172a" />

      {/* Smile */}
      <path d="M28 42 Q32 45 36 42" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="8" y1="36" x2="20" y2="38" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="42" x2="20" y2="41" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />

      <line x1="56" y1="36" x2="44" y2="38" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="56" y1="42" x2="44" y2="41" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function VectorGreenFlagSvg({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <line x1="7" y1="4" x2="7" y2="28" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="7" cy="4" r="2.5" fill="#f59e0b" />
      <path
        d="M7 6 Q16 3 24 7 Q18 12 25 17 L7 17 Z"
        fill="#22c55e"
        stroke="#15803d"
        strokeWidth="1.2"
      />
    </svg>
  );
}
