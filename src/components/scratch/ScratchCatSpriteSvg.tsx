import React from "react";

interface ScratchCatSpriteSvgProps {
  className?: string;
  costume?: "costume1" | "costume2";
  isTalking?: boolean;
  isBlinking?: boolean;
}

export function ScratchCatSpriteSvg({
  className = "w-24 h-24",
  costume = "costume1",
  isTalking = false,
  isBlinking = false,
}: ScratchCatSpriteSvgProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none drop-shadow-md`}
    >
      <defs>
        <radialGradient id="scratchCatBodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="65%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id="scratchCatCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fca5a5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* TAIL (S-Curve pointing gracefully upward) */}
      <path
        d="M 60 64 C 74 64, 88 56, 86 38 C 84 30, 75 30, 76 38 C 77 48, 68 58, 56 60 Z"
        fill="url(#scratchCatBodyGrad)"
        stroke="#9a3412"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* LEGS & PAWS according to Costume */}
      {costume === "costume1" ? (
        <g id="costume1-legs">
          {/* Back Left Foot */}
          <path
            d="M 33 72 C 30 76, 28 82, 33 85 C 37 87, 41 85, 40 78 Z"
            fill="url(#scratchCatBodyGrad)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          <ellipse cx="34" cy="83" rx="3.5" ry="2" fill="#ffffff" />

          {/* Front Left Paw */}
          <path
            d="M 40 70 C 39 78, 41 86, 45 86 C 48 86, 49 80, 48 70 Z"
            fill="url(#scratchCatBodyGrad)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          <ellipse cx="44" cy="84" rx="3" ry="2" fill="#ffffff" />

          {/* Front Right Paw */}
          <path
            d="M 50 68 C 50 76, 52 84, 57 84 C 61 84, 61 78, 58 68 Z"
            fill="url(#scratchCatBodyGrad)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          <ellipse cx="55" cy="82" rx="3" ry="2" fill="#ffffff" />

          {/* Back Right Leg */}
          <path
            d="M 58 62 C 68 64, 71 74, 68 81 C 65 83, 61 81, 59 74 Z"
            fill="url(#scratchCatBodyGrad)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          <ellipse cx="66" cy="79" rx="3" ry="2" fill="#ffffff" />
        </g>
      ) : (
        <g id="costume2-legs">
          {/* Stride / Running Pose */}
          <path
            d="M 36 68 C 28 72, 22 78, 25 83 C 28 86, 34 84, 38 76 Z"
            fill="url(#scratchCatBodyGrad)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          <ellipse cx="26" cy="81" rx="3" ry="2" fill="#ffffff" />

          <path
            d="M 52 68 C 58 74, 68 79, 73 80 C 76 80, 77 75, 70 72 Z"
            fill="url(#scratchCatBodyGrad)"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
          <ellipse cx="72" cy="78" rx="3" ry="2" fill="#ffffff" />
        </g>
      )}

      {/* TORSO */}
      <path
        d="M 36 46 C 30 54, 30 72, 42 75 C 55 75, 62 68, 58 50 Z"
        fill="url(#scratchCatBodyGrad)"
        stroke="#9a3412"
        strokeWidth="1.5"
      />

      {/* WHITE CHEST BIB */}
      <ellipse cx="44" cy="57" rx="8" ry="11" fill="#ffffff" />

      {/* HEAD */}
      {/* Left Ear */}
      <path
        d="M 27 28 L 22 9 L 39 19 Z"
        fill="url(#scratchCatBodyGrad)"
        stroke="#9a3412"
        strokeWidth="1.5"
      />
      <polygon points="26,24 24,13 36,19" fill="#ffffff" />

      {/* Right Ear */}
      <path
        d="M 55 20 L 70 9 L 65 28 Z"
        fill="url(#scratchCatBodyGrad)"
        stroke="#9a3412"
        strokeWidth="1.5"
      />
      <polygon points="57,20 66,13 63,24" fill="#ffffff" />

      {/* Main Head Circle */}
      <circle
        cx="46"
        cy="34"
        r="21"
        fill="url(#scratchCatBodyGrad)"
        stroke="#9a3412"
        strokeWidth="1.5"
      />

      {/* Cute Cheeks */}
      <circle cx="32" cy="38" r="4.5" fill="url(#scratchCatCheek)" />
      <circle cx="60" cy="38" r="4.5" fill="url(#scratchCatCheek)" />

      {/* White Muzzle */}
      <ellipse cx="46" cy="42" rx="13" ry="8.5" fill="#ffffff" />

      {/* Whiskers Left */}
      <line x1="21" y1="38" x2="33" y2="40" stroke="#9a3412" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="21" y1="44" x2="33" y2="43" stroke="#9a3412" strokeWidth="1.4" strokeLinecap="round" />

      {/* Whiskers Right */}
      <line x1="59" y1="40" x2="71" y2="38" stroke="#9a3412" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="59" y1="43" x2="71" y2="44" stroke="#9a3412" strokeWidth="1.4" strokeLinecap="round" />

      {/* Nose */}
      <polygon points="46,39 43,36 49,36" fill="#0f172a" />

      {/* Mouth (smiling or talking) */}
      {isTalking ? (
        <path
          d="M 42 41 Q 46 47 50 41 Z"
          fill="#e11d48"
          stroke="#0f172a"
          strokeWidth="1.2"
        />
      ) : (
        <path
          d="M 41 41 Q 44 44 46 41 Q 48 44 51 41"
          fill="none"
          stroke="#0f172a"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}

      {/* Eyes */}
      {isBlinking ? (
        <g stroke="#9a3412" strokeWidth="2" strokeLinecap="round">
          <line x1="33" y1="31" x2="41" y2="31" />
          <line x1="51" y1="31" x2="59" y2="31" />
        </g>
      ) : (
        <g id="cat-eyes">
          {/* Left Eye */}
          <ellipse cx="37" cy="30" rx="4.5" ry="6" fill="#ffffff" stroke="#9a3412" strokeWidth="1" />
          <circle cx="38" cy="30" r="3" fill="#16a34a" />
          <circle cx="39" cy="29" r="1.3" fill="#0f172a" />
          <circle cx="37.5" cy="28.5" r="0.8" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="55" cy="30" rx="4.5" ry="6" fill="#ffffff" stroke="#9a3412" strokeWidth="1" />
          <circle cx="54" cy="30" r="3" fill="#16a34a" />
          <circle cx="53" cy="29" r="1.3" fill="#0f172a" />
          <circle cx="54.5" cy="28.5" r="0.8" fill="#ffffff" />
        </g>
      )}
    </svg>
  );
}
