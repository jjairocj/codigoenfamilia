"use client";

import React from "react";

export interface MicrobitBoardSvgProps {
  grid: number[][];
  onToggleLed?: (row: number, col: number) => void;
  pressedButton?: "A" | "B" | "AB" | "LOGO" | null;
  onPressButtonA?: () => void;
  onPressButtonB?: () => void;
  onTouchLogo?: () => void;
  onTouchPin?: (pin: 0 | 1 | 2 | "3V" | "GND") => void;
  touchedPin?: number | string | null;
  isMicActive?: boolean;
  isFlipped?: boolean;
  className?: string;
  interactive?: boolean;
}

export default function MicrobitBoardSvg({
  grid,
  onToggleLed,
  pressedButton = null,
  onPressButtonA,
  onPressButtonB,
  onTouchLogo,
  onTouchPin,
  touchedPin = null,
  isMicActive = false,
  isFlipped = false,
  className = "w-full max-w-lg h-auto",
  interactive = true,
}: MicrobitBoardSvgProps) {
  // If flipped, render the back of the micro:bit v2 (Un-mirrored, physically authentic)
  if (isFlipped) {
    return (
      <svg
        viewBox="0 0 420 330"
        className={className}
        style={{
          userSelect: "none",
          filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.4))",
          transform: "rotateY(180deg)",
        }}
      >
        <defs>
          <linearGradient id="goldTrace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="chipGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* Board Outline with Characteristic Side Notches */}
        <path
          d="M 40 15
             L 380 15
             Q 405 15 405 40
             L 405 90
             Q 393 125 393 165
             Q 393 205 405 240
             L 405 290
             Q 405 315 380 315
             L 40 315
             Q 15 315 15 290
             L 15 240
             Q 27 205 27 165
             Q 27 125 15 90
             L 15 40
             Q 15 15 40 15 Z"
          fill="#121214"
          stroke="#27272a"
          strokeWidth="3"
        />

        {/* Decorative Silkscreen Gold & Gray Tracks */}
        <g stroke="#3f3f46" strokeWidth="1.5" fill="none" opacity="0.7">
          <path d="M 30 50 L 120 50 L 140 70" />
          <path d="M 30 70 L 100 70 L 130 100" />
          <path d="M 390 50 L 320 50 L 300 70" />
          <path d="M 45 250 L 100 250 L 130 220" />
          <path d="M 375 250 L 320 250 L 290 220" />
        </g>

        {/* Corner Mounting Holes */}
        {[
          [36, 36],
          [384, 36],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="14" fill="none" stroke="url(#goldTrace)" strokeWidth="2.5" />
            <circle cx={cx} cy={cy} r="10" fill="#09090b" />
          </g>
        ))}

        {/* 1. BLE & 2.4GHz Radio Antenna (Top Left on physical back) */}
        <path
          d="M 50 20 L 50 35 L 60 35 L 60 20 L 70 20 L 70 35 L 80 35 L 80 20 L 90 20 L 90 35"
          fill="none"
          stroke="url(#goldTrace)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text x="70" y="47" textAnchor="middle" fill="#f59e0b" fontSize="7" fontWeight="bold">
          ANTENA RADIO
        </text>

        {/* 2. Micro-USB Port (Top Center) */}
        <g transform="translate(180, 8)">
          <rect x="0" y="0" width="60" height="32" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <rect x="8" y="8" width="44" height="16" rx="2" fill="#334155" />
          <rect x="16" y="12" width="28" height="8" fill="#1e293b" />
          <text x="30" y="42" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace" fontWeight="bold">
            USB / ENERGÍA
          </text>
        </g>

        {/* 3. Reset Button (Center Right of USB) */}
        <g transform="translate(255, 14)">
          <rect x="0" y="0" width="24" height="24" rx="4" fill="#475569" stroke="#334155" strokeWidth="1" />
          <circle cx="12" cy="12" r="7" fill="#dc2626" />
          <text x="12" y="33" textAnchor="middle" fill="#f87171" fontSize="7" fontWeight="bold">
            RESET
          </text>
        </g>

        {/* 4. JST Battery Connector 3V (Top Right on physical back) */}
        <g transform="translate(295, 12)">
          <rect x="0" y="0" width="36" height="30" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="6" y="6" width="10" height="18" fill="#cbd5e1" />
          <rect x="20" y="6" width="10" height="18" fill="#cbd5e1" />
          <text x="18" y="40" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="bold">
            BATERÍA 3V
          </text>
        </g>

        {/* 5. Motion Sensor (Compass & Accelerometer Chip - Left) */}
        <g transform="translate(65, 120)">
          <rect x="0" y="0" width="45" height="45" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="22" y="20" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">
            BRÚJULA /
          </text>
          <text x="22" y="30" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">
            ACEL
          </text>
          <text x="22" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">
            LSM303
          </text>
        </g>

        {/* 6. Main Processor: Nordic nRF52833 (Center) */}
        <g transform="translate(160, 110)">
          <rect x="0" y="0" width="100" height="100" rx="6" fill="url(#chipGrad)" stroke="#52525b" strokeWidth="2" />
          {/* Pins on 4 sides */}
          {[-4, 98].map((y, yi) => (
            <g key={yi}>
              {Array.from({ length: 9 }).map((_, i) => (
                <rect key={i} x={10 + i * 9} y={y} width="5" height="6" fill="#d4d4d8" />
              ))}
            </g>
          ))}
          <text x="50" y="42" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">
            NORDIC
          </text>
          <text x="50" y="58" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">
            nRF52833
          </text>
          <text x="50" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">
            64MHz · ARM M4
          </text>
          <circle cx="14" cy="14" r="3" fill="#3f3f46" />
        </g>

        {/* 7. Built-in Speaker (Buzzer - Right) */}
        <g transform="translate(285, 115)">
          <circle cx="35" cy="35" r="34" fill="#1e293b" stroke="url(#goldTrace)" strokeWidth="2" />
          <circle cx="35" cy="35" r="26" fill="#0f172a" />
          <circle cx="35" cy="35" r="8" fill="url(#goldTrace)" />
          <circle cx="35" cy="35" r="4" fill="#020617" />
          <text x="35" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">
            ALTAVOZ v2
          </text>
        </g>

        {/* 8. Bottom Edge Pads (Physical backside: GND on left, Pin 0 on right) */}
        <rect x="25" y="265" width="370" height="45" fill="#09090b" rx="4" />
        {[
          { x: 50, label: "GND" },
          { x: 120, label: "3V" },
          { x: 190, label: "2" },
          { x: 290, label: "1" },
          { x: 365, label: "0" },
        ].map((pad, i) => (
          <g key={i}>
            <rect x={pad.x - 18} y="267" width="36" height="42" rx="5" fill="url(#goldTrace)" />
            <circle cx={pad.x} cy="285" r="8" fill="#09090b" />
            <text x={pad.x} y="258" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {pad.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  // Front of BBC micro:bit v2
  return (
    <svg
      viewBox="0 0 420 330"
      className={className}
      style={{ userSelect: "none", filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.35))" }}
    >
      <defs>
        {/* Intense Red Glow for Lit LEDs */}
        <filter id="microbitLedGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gold Pad Metallic Gradient */}
        <linearGradient id="mbGoldPad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Tactile Button Metal Bezel */}
        <radialGradient id="tactileBezel" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="60%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>

        {/* Button Plunger Depth */}
        <radialGradient id="btnPlunger" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="70%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>

      {/* Board Outline with Characteristic Side Notches */}
      <path
        d="M 40 15
           L 380 15
           Q 405 15 405 40
           L 405 90
           Q 393 125 393 165
           Q 393 205 405 240
           L 405 290
           Q 405 315 380 315
           L 40 315
           Q 15 315 15 290
           L 15 240
           Q 27 205 27 165
           Q 27 125 15 90
           L 15 40
           Q 15 15 40 15 Z"
        fill="#121214"
        stroke="#27272a"
        strokeWidth="3"
      />

      {/* Top Silkscreen Waves (micro:bit signature pattern) */}
      <g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.5">
        <path d="M 40 35 Q 90 20 140 35" />
        <path d="M 280 35 Q 330 20 380 35" />
      </g>

      {/* Mounting Corner Holes */}
      {[
        [36, 36],
        [384, 36],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="14" fill="none" stroke="url(#mbGoldPad)" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="10" fill="#09090b" />
        </g>
      ))}

      {/* Gold Capacitive Touch Logo (v2 Feature!) */}
      <g
        onClick={onTouchLogo}
        style={{ cursor: interactive ? "pointer" : "default" }}
        transform="translate(180, 20)"
      >
        <rect
          x="0"
          y="0"
          width="60"
          height="34"
          rx="17"
          fill={pressedButton === "LOGO" ? "#fde047" : "url(#mbGoldPad)"}
          stroke="#78350f"
          strokeWidth="1.5"
          filter={pressedButton === "LOGO" ? "drop-shadow(0 0 8px #f59e0b)" : undefined}
        />
        {/* Micro:bit Two-Eyes Logo Silkscreen */}
        <circle cx="20" cy="17" r="7" fill="#121214" />
        <circle cx="20" cy="17" r="3.5" fill="url(#mbGoldPad)" />
        <circle cx="40" cy="17" r="7" fill="#121214" />
        <circle cx="40" cy="17" r="3.5" fill="url(#mbGoldPad)" />
      </g>
      <text
        x="210"
        y="66"
        textAnchor="middle"
        fill="#f8fafc"
        fontSize="8"
        fontWeight="bold"
        fontFamily="monospace"
        letterSpacing="1"
      >
        TOCA EL LOGO
      </text>

      {/* Microphone Hole & LED Indicator (v2) */}
      <g transform="translate(125, 48)">
        <circle cx="0" cy="0" r="3.5" fill="#020617" stroke="url(#mbGoldPad)" strokeWidth="1" />
        <circle
          cx="12"
          cy="0"
          r="2.5"
          fill={isMicActive ? "#ef4444" : "#450a0a"}
          filter={isMicActive ? "drop-shadow(0 0 4px #ef4444)" : undefined}
        />
        <text x="-8" y="10" fill="#94a3b8" fontSize="6" fontFamily="monospace">
          MIC
        </text>
      </g>

      {/* Power LED Indicator */}
      <g transform="translate(355, 48)">
        <circle cx="0" cy="0" r="3" fill="#22c55e" filter="drop-shadow(0 0 5px #22c55e)" />
        <text x="0" y="10" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="monospace" fontWeight="bold">
          PWR
        </text>
      </g>

      {/* 5x5 LED Display Bezel Screen */}
      <rect
        x="135"
        y="80"
        width="150"
        height="150"
        rx="16"
        fill="#09090b"
        stroke="#27272a"
        strokeWidth="2.5"
      />

      {/* 25 SMD LEDs */}
      {grid.map((row, r) =>
        row.map((val, c) => {
          const cx = 155 + c * 27.5;
          const cy = 100 + r * 27.5;
          const isLit = val === 1;

          return (
            <g
              key={`${r}-${c}`}
              onClick={() => interactive && onToggleLed?.(r, c)}
              style={{ cursor: interactive ? "pointer" : "default" }}
            >
              {/* SMD LED Rectangular Package */}
              <rect
                x={cx - 10}
                y={cy - 10}
                width="20"
                height="20"
                rx="4"
                fill={isLit ? "#450a0a" : "#141416"}
                stroke={isLit ? "#991b1b" : "#27272a"}
                strokeWidth="1"
              />

              {/* Glowing Diode Element */}
              {isLit ? (
                <>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="7.5"
                    fill="#ef4444"
                    filter="url(#microbitLedGlow)"
                  />
                  <circle cx={cx} cy={cy} r="3.5" fill="#fef2f2" />
                </>
              ) : (
                <circle cx={cx} cy={cy} r="4" fill="#2e1013" opacity="0.7" />
              )}
            </g>
          );
        })
      )}

      {/* Physical Tactile Button A (Left) */}
      <g
        onClick={onPressButtonA}
        style={{ cursor: interactive ? "pointer" : "default" }}
        transform={
          pressedButton === "A" || pressedButton === "AB"
            ? "translate(68, 157) scale(0.96)"
            : "translate(68, 155)"
        }
      >
        {/* Metal Bezel Ring */}
        <circle cx="0" cy="0" r="28" fill="url(#tactileBezel)" stroke="#1e293b" strokeWidth="2" />
        {/* Button Plunger */}
        <circle
          cx="0"
          cy="0"
          r="20"
          fill={pressedButton === "A" || pressedButton === "AB" ? "#f59e0b" : "url(#btnPlunger)"}
          stroke={pressedButton === "A" || pressedButton === "AB" ? "#d97706" : "#334155"}
          strokeWidth="2"
        />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="20"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          A
        </text>
      </g>
      <text x="68" y="200" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
        BOTÓN A
      </text>

      {/* Physical Tactile Button B (Right) */}
      <g
        onClick={onPressButtonB}
        style={{ cursor: interactive ? "pointer" : "default" }}
        transform={
          pressedButton === "B" || pressedButton === "AB"
            ? "translate(352, 157) scale(0.96)"
            : "translate(352, 155)"
        }
      >
        <circle cx="0" cy="0" r="28" fill="url(#tactileBezel)" stroke="#1e293b" strokeWidth="2" />
        <circle
          cx="0"
          cy="0"
          r="20"
          fill={pressedButton === "B" || pressedButton === "AB" ? "#f59e0b" : "url(#btnPlunger)"}
          stroke={pressedButton === "B" || pressedButton === "AB" ? "#d97706" : "#334155"}
          strokeWidth="2"
        />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="20"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          B
        </text>
      </g>
      <text x="352" y="200" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
        BOTÓN B
      </text>

      {/* Bottom Gold Edge Connector Strip */}
      <rect x="25" y="260" width="370" height="48" fill="#09090b" rx="4" />

      {/* 5 Main Alligator Clip Pads (P0, P1, P2, 3V, GND) */}
      {[
        { pin: 0 as const, x: 50, label: "0" },
        { pin: 1 as const, x: 120, label: "1" },
        { pin: 2 as const, x: 190, label: "2" },
        { pin: "3V" as const, x: 290, label: "3V" },
        { pin: "GND" as const, x: 365, label: "GND" },
      ].map((pad, i) => {
        const isTouched = touchedPin === pad.pin;
        return (
          <g
            key={i}
            onClick={() => onTouchPin?.(pad.pin)}
            style={{ cursor: interactive ? "pointer" : "default" }}
          >
            {/* Copper Pad Strip */}
            <rect
              x={pad.x - 18}
              y="262"
              width="36"
              height="44"
              rx="5"
              fill={isTouched ? "#fde047" : "url(#mbGoldPad)"}
              stroke={isTouched ? "#ca8a04" : "#92400e"}
              strokeWidth="1.5"
              filter={isTouched ? "drop-shadow(0 0 6px #f59e0b)" : undefined}
            />
            {/* Drilled Hole for Banana / Alligator Clip */}
            <circle cx={pad.x} cy="282" r="8" fill="#09090b" stroke="#78350f" strokeWidth="1" />
            {/* Silkscreen Pin Label */}
            <text
              x={pad.x}
              y="253"
              textAnchor="middle"
              fill="#fef08a"
              fontSize="11"
              fontWeight="900"
              fontFamily="monospace"
            >
              {pad.label}
            </text>
          </g>
        );
      })}

      {/* 20 Interleaved Gold Micro Fingers */}
      {Array.from({ length: 28 }).map((_, i) => {
        const px = 72 + i * 10;
        // Avoid overlapping main alligator pads
        if (
          (px >= 32 && px <= 68) ||
          (px >= 102 && px <= 138) ||
          (px >= 172 && px <= 208) ||
          (px >= 272 && px <= 308) ||
          (px >= 347 && px <= 383)
        ) {
          return null;
        }
        return (
          <rect
            key={i}
            x={px}
            y="265"
            width="4.5"
            height="38"
            rx="1.5"
            fill="url(#mbGoldPad)"
            opacity="0.85"
          />
        );
      })}
    </svg>
  );
}
