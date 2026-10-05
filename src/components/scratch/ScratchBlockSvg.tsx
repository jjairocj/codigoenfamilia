import React from "react";

export type ScratchCategory =
  | "motion"
  | "looks"
  | "sound"
  | "events"
  | "control"
  | "sensing"
  | "operators"
  | "variables";

export interface ScratchBlockDef {
  id: string;
  category: ScratchCategory;
  shape: "hat" | "stack" | "cap" | "c-block";
  template: string; // e.g. "mover {steps} pasos" or "al hacer clic en 🚩"
  defaultArgs: Record<string, string | number>;
  icon?: string;
}

export const SCRATCH_COLORS: Record<
  ScratchCategory,
  { bg: string; border: string; text: string; iconBg: string }
> = {
  motion: { bg: "#4C97FF", border: "#3373CC", text: "#FFFFFF", iconBg: "#3373CC" },
  looks: { bg: "#9966FF", border: "#774DCB", text: "#FFFFFF", iconBg: "#774DCB" },
  sound: { bg: "#CF63CF", border: "#B545B5", text: "#FFFFFF", iconBg: "#B545B5" },
  events: { bg: "#FFBF00", border: "#D49B00", text: "#573800", iconBg: "#D49B00" },
  control: { bg: "#FFAB19", border: "#CF8814", text: "#FFFFFF", iconBg: "#CF8814" },
  sensing: { bg: "#5CB1D6", border: "#3F8EA8", text: "#FFFFFF", iconBg: "#3F8EA8" },
  operators: { bg: "#59C059", border: "#389438", text: "#FFFFFF", iconBg: "#389438" },
  variables: { bg: "#FF8C1A", border: "#DB6E00", text: "#FFFFFF", iconBg: "#DB6E00" },
};

/**
 * Generates exact Scratch 3.0 SVG jigsaw puzzle path.
 * Notch at x=12..28 (indented down 3.5px)
 * Tab at bottom x=12..28 (protruding down 3.5px)
 */
export function getScratchSvgPath(
  width: number,
  height: number,
  shape: "hat" | "stack" | "cap" | "c-block"
): string {
  const r = 4;
  const tabStart = 14;
  const tabEnd = 30;

  if (shape === "hat") {
    // Curved Hat Top Arch (classic Scratch Event Hat)
    return `
      M 0 16
      C 0 6, 8 0, 24 0
      C 42 0, 58 7, 74 16
      L ${width - r} 16
      Q ${width} 16 ${width} ${16 + r}
      L ${width} ${height - r}
      Q ${width} ${height} ${width - r} ${height}
      L ${tabEnd} ${height}
      L 27 ${height + 4}
      L 17 ${height + 4}
      L ${tabStart} ${height}
      L ${r} ${height}
      Q 0 ${height} 0 ${height - r}
      Z
    `.replace(/\s+/g, " ");
  }

  if (shape === "cap") {
    // Flat bottom, standard top notch
    return `
      M 0 ${r}
      Q 0 0 ${r} 0
      L ${tabStart} 0
      L 17 4
      L 27 4
      L ${tabEnd} 0
      L ${width - r} 0
      Q ${width} 0 ${width} ${r}
      L ${width} ${height - r}
      Q ${width} ${height} ${width - r} ${height}
      L ${r} ${height}
      Q 0 ${height} 0 ${height - r}
      Z
    `.replace(/\s+/g, " ");
  }

  // Standard Stack block (notch on top, tab at bottom)
  return `
    M 0 ${r}
    Q 0 0 ${r} 0
    L ${tabStart} 0
    L 17 4
    L 27 4
    L ${tabEnd} 0
    L ${width - r} 0
    Q ${width} 0 ${width} ${r}
    L ${width} ${height - r}
    Q ${width} ${height} ${width - r} ${height}
    L ${tabEnd} ${height}
    L 27 ${height + 4}
    L 17 ${height + 4}
    L ${tabStart} ${height}
    L ${r} ${height}
    Q 0 ${height} 0 ${height - r}
    Z
  `.replace(/\s+/g, " ");
}

interface ScratchBlockSvgProps {
  category: ScratchCategory;
  shape: "hat" | "stack" | "cap" | "c-block";
  template: string;
  args?: Record<string, string | number>;
  onArgChange?: (key: string, val: string) => void;
  isActive?: boolean;
  isDraggable?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export function ScratchBlockSvg({
  category,
  shape,
  template,
  args = {},
  onArgChange,
  isActive = false,
  onDelete,
  onClick,
  className = "",
  compact = false,
}: ScratchBlockSvgProps) {
  const colors = SCRATCH_COLORS[category];
  const height = shape === "hat" ? 44 : 40;
  const minWidth = compact ? 190 : 230;

  // Tokenize template e.g. "mover {steps} pasos"
  const tokens = template.split(/(\{[^}]+\})/g);

  return (
    <div
      onClick={onClick}
      className={`relative select-none group transition-transform ${className} ${
        isActive ? "z-20 scale-[1.03]" : ""
      }`}
      style={{
        filter: isActive
          ? "drop-shadow(0 0 10px #f59e0b) drop-shadow(0 0 4px #fbbf24)"
          : "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
      }}
    >
      <div className="relative inline-flex items-center">
        {/* SVG Jigsaw Puzzle Outline Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox={`0 0 ${minWidth} ${height + (shape === "cap" ? 0 : 4)}`}
        >
          <path
            d={getScratchSvgPath(minWidth, height, shape)}
            fill={colors.bg}
            stroke={isActive ? "#fbbf24" : colors.border}
            strokeWidth={isActive ? 2.5 : 1.2}
          />
        </svg>

        {/* Block Content (Labels and Interactive Inputs) */}
        <div
          className={`relative flex items-center gap-1.5 px-3.5 z-10 font-bold font-fun text-xs ${
            shape === "hat" ? "pt-3.5 pb-1.5" : "py-2"
          }`}
          style={{
            color: colors.text,
            minHeight: `${height}px`,
            minWidth: `${minWidth}px`,
          }}
        >
          {tokens.map((token, i) => {
            if (token.startsWith("{") && token.endsWith("}")) {
              const key = token.slice(1, -1);
              const val = args[key] ?? "";
              return (
                <span
                  key={i}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center"
                >
                  {onArgChange ? (
                    <input
                      type="text"
                      value={String(val)}
                      onChange={(e) => onArgChange(key, e.target.value)}
                      className="bg-white text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-slate-300 shadow-inner text-center w-14 focus:w-20 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                    />
                  ) : (
                    <span className="bg-white text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-inner border border-slate-300">
                      {String(val)}
                    </span>
                  )}
                </span>
              );
            }
            return <span key={i}>{token}</span>;
          })}

          {/* Delete Action button for workspace stack */}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Quitar bloque"
              className="ml-auto opacity-0 group-hover:opacity-100 text-white/80 hover:text-white bg-black/20 hover:bg-rose-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px] transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
