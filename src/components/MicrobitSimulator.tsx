"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Sparkles, Play, RotateCcw, Volume2, Info } from "lucide-react";

// 5x5 LED Matrix patterns
const PRESETS: Record<string, number[][]> = {
  corazon: [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  sonrisa: [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  estrella: [
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  flecha: [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  marcianito: [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0],
  ],
  vacio: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

export default function MicrobitSimulator() {
  const [grid, setGrid] = useState<number[][]>(PRESETS.corazon);
  const [activePreset, setActivePreset] = useState<string>("corazon");
  const [displayText, setDisplayText] = useState<string>("");
  const [pressedBtn, setPressedBtn] = useState<"A" | "B" | "AB" | null>(null);

  const toggleLed = (r: number, c: number) => {
    sound.click();
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = next[r][c] === 1 ? 0 : 1;
      return next;
    });
    setActivePreset("custom");
  };

  const loadPreset = (name: string) => {
    sound.chime();
    setGrid(PRESETS[name]);
    setActivePreset(name);
    setDisplayText("");
  };

  const handleButtonA = () => {
    sound.click();
    setPressedBtn("A");
    setTimeout(() => setPressedBtn(null), 300);
    loadPreset("corazon");
  };

  const handleButtonB = () => {
    sound.click();
    setPressedBtn("B");
    setTimeout(() => setPressedBtn(null), 300);
    loadPreset("sonrisa");
  };

  const handleButtonAB = () => {
    sound.stamp();
    setPressedBtn("AB");
    setTimeout(() => setPressedBtn(null), 300);
    // Random dice 1 to 6
    const dice = Math.floor(Math.random() * 6) + 1;
    setDisplayText(`🎲 ${dice}`);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Board Showcase */}
      <div className="flex flex-col items-center justify-center">
        
        {/* Physical Microbit Outer Frame */}
        <div className="relative w-72 sm:w-88 h-56 sm:h-64 bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-slate-700 flex flex-col justify-between select-none">
          
          {/* Top Gold Edge Connectors Indicator */}
          <div className="flex justify-between items-center px-4">
            <span className="text-[10px] font-mono font-bold text-amber-400/80 tracking-widest">
              MICRO:BIT v2
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400">ENCENDIDO</span>
            </div>
          </div>

          {/* Center: Button A + 5x5 LED Grid + Button B */}
          <div className="flex items-center justify-between px-1 sm:px-2">
            
            {/* Button A */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleButtonA}
                className={`w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-md active:scale-95 transition-all ${
                  pressedBtn === "A" ? "bg-amber-500 border-amber-300 scale-95" : "hover:border-amber-400"
                }`}
              >
                A
              </button>
              <span className="text-[9px] font-mono text-slate-400">Corazón</span>
            </div>

            {/* 5x5 LED Grid */}
            <div className="p-3 bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-inner">
              {displayText ? (
                <div className="w-32 sm:w-36 h-32 sm:h-36 flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono animate-bounce">
                  {displayText}
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {grid.map((row, r) =>
                    row.map((val, c) => (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => toggleLed(r, c)}
                        aria-label={`LED fila ${r+1}, columna ${c+1}`}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md transition-all ${
                          val === 1
                            ? "bg-red-500 shadow-[0_0_10px_#ef4444] scale-105"
                            : "bg-slate-800/80 hover:bg-slate-700/80"
                        }`}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Button B */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleButtonB}
                className={`w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-md active:scale-95 transition-all ${
                  pressedBtn === "B" ? "bg-amber-500 border-amber-300 scale-95" : "hover:border-amber-400"
                }`}
              >
                B
              </button>
              <span className="text-[9px] font-mono text-slate-400">Sonrisa</span>
            </div>

          </div>

          {/* Bottom Edge Pins */}
          <div className="flex items-center justify-between px-2 pt-1 border-t border-slate-800">
            <button
              onClick={handleButtonAB}
              className="text-[10px] font-mono text-amber-400 bg-slate-800/90 hover:bg-slate-700 px-3 py-1 rounded-md border border-amber-500/40"
            >
              Presionar A + B (Lanzar Dado 🎲)
            </button>
            <div className="flex gap-1">
              {[0, 1, 2, "3V", "GND"].map((pin, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono font-bold"
                >
                  {pin}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Control Presets Bar */}
      <div className="wood-card p-5 bg-white border-2 border-slate-200 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-fun text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Diseños y Figuras Predefinidas:
          </span>
          <button
            onClick={() => loadPreset("vacio")}
            className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpiar Matriz
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "corazon", label: "❤️ Corazón", icon: "❤️" },
            { id: "sonrisa", label: "😊 Carita Feliz", icon: "😊" },
            { id: "estrella", label: "⭐ Estrella", icon: "⭐" },
            { id: "marcianito", label: "👾 Marcianito", icon: "👾" },
            { id: "flecha", label: "⬆️ Flecha Norte", icon: "⬆️" },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activePreset === preset.id
                  ? "bg-amber-100 text-amber-950 border-amber-400 shadow-2xs"
                  : "bg-slate-50 hover:bg-amber-50/50 text-slate-700 border-slate-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Didactic Guide Box */}
      <div className="wood-card p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50/50 border-2 border-amber-200 space-y-2.5">
        <h3 className="font-fun text-base font-bold text-slate-800 flex items-center gap-2">
          <span>💡 ¿Cómo Funciona una Matriz de 5×5 LEDs?</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          En la vida real, una placa Micro:bit tiene 25 bombillos LED rojos ordenados en 5 filas y 5 columnas. Cada bombillo se enciende con una coordenada matemática `(X, Y)` o mediante una lista de ceros y unos. Los niños pueden tocar cualquier bombillo en pantalla para diseñar sus propios emojis, letras o señales luminosas.
        </p>
      </div>
    </div>
  );
}
