"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Play, RotateCcw, Sparkles } from "lucide-react";

interface Block {
  id: string;
  label: string;
  type: "motion" | "looks" | "sound" | "event";
  icon: string;
}

const PALETTE: Block[] = [
  { id: "MOVE", label: "Avanzar 10 pasos", type: "motion", icon: "➡️" },
  { id: "JUMP", label: "Saltar", type: "motion", icon: "⬆️" },
  { id: "SPIN", label: "Girar 360°", type: "motion", icon: "🔄" },
  { id: "SAY_HELLO", label: "Decir «¡Hola!»", type: "looks", icon: "💬" },
  { id: "SAY_CODE", label: "Decir «¡Programar!»", type: "looks", icon: "💻" },
  { id: "CHIME", label: "Tocar Campana", type: "sound", icon: "🔔" },
];

export default function ScratchSandbox() {
  const [script, setScript] = useState<string[]>(["MOVE", "JUMP", "SAY_HELLO"]);
  const [spriteX, setSpriteX] = useState(40);
  const [spriteY, setSpriteY] = useState(50);
  const [spriteRot, setSpriteRot] = useState(0);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const addBlock = (id: string) => {
    if (isRunning) return;
    sound.playWoodClick();
    setScript([...script, id]);
  };

  const removeBlock = (idx: number) => {
    if (isRunning) return;
    sound.playWoodClick();
    setScript(script.filter((_, i) => i !== idx));
  };

  const resetSprite = () => {
    setSpriteX(40);
    setSpriteY(50);
    setSpriteRot(0);
    setBubbleText(null);
    setActiveStep(null);
    setIsRunning(false);
  };

  const runScript = async () => {
    if (isRunning || script.length === 0) return;
    setIsRunning(true);
    resetSprite();
    await new Promise((r) => setTimeout(r, 200));

    for (let i = 0; i < script.length; i++) {
      setActiveStep(i);
      const bId = script[i];

      if (bId === "MOVE") {
        setSpriteX((prev) => Math.min(80, prev + 18));
        sound.playWoodClick();
      } else if (bId === "JUMP") {
        setSpriteY(25);
        sound.playWoodClick();
        await new Promise((r) => setTimeout(r, 200));
        setSpriteY(50);
      } else if (bId === "SPIN") {
        setSpriteRot((prev) => prev + 360);
        sound.playWoodClick();
      } else if (bId === "SAY_HELLO") {
        setBubbleText("¡Hola, Familia! 🌟");
        sound.playStarChime();
        await new Promise((r) => setTimeout(r, 700));
      } else if (bId === "SAY_CODE") {
        setBubbleText("¡Me gusta programar! 💻");
        sound.playStarChime();
        await new Promise((r) => setTimeout(r, 700));
      } else if (bId === "CHIME") {
        sound.playStarChime();
      }

      await new Promise((r) => setTimeout(r, 380));
    }

    setActiveStep(null);
    setIsRunning(false);
  };

  const getBlockMeta = (id: string) => PALETTE.find((b) => b.id === id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* 1. Paleta de Bloques */}
      <div className="lg:col-span-4 wood-card p-4 sm:p-6 order-2 lg:order-1">
        <h4 className="font-fun text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-rose-500" /> 1. Bloques Visuales
        </h4>
        <p className="text-xs text-slate-500 mb-3">
          Toca cualquier bloque para colocarlo en tu programa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
          {PALETTE.map((b) => (
            <button
              key={b.id}
              onClick={() => addBlock(b.id)}
              disabled={isRunning}
              className={`w-full wood-btn py-2 px-3 text-xs justify-start shadow-xs transition-transform ${
                b.type === "motion"
                  ? "bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300"
                  : b.type === "looks"
                  ? "bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-300"
                  : "bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300"
              }`}
            >
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Área de Trabajo del Programa */}
      <div className="lg:col-span-4 wood-card p-4 sm:p-6 order-3 lg:order-2">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-fun text-xs sm:text-sm font-bold text-slate-800">
            2. Tu Programa ({script.length})
          </h4>
          <button
            onClick={() => setScript([])}
            disabled={isRunning}
            className="text-xs text-rose-500 hover:underline"
          >
            Limpiar todo
          </button>
        </div>

        <div className="min-h-40 max-h-56 overflow-y-auto p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200/50 space-y-1.5">
          {script.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              👈 Toca los bloques para armar tu secuencia
            </div>
          ) : (
            script.map((bId, idx) => {
              const meta = getBlockMeta(bId);
              if (!meta) return null;
              return (
                <div
                  key={idx}
                  onClick={() => removeBlock(idx)}
                  className={`p-2 rounded-xl border text-xs font-fun font-bold flex items-center justify-between cursor-pointer transition-all ${
                    activeStep === idx
                      ? "ring-2 ring-emerald-400 scale-102 shadow-md bg-white border-emerald-400"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">✖</span>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={runScript}
            disabled={isRunning || script.length === 0}
            className="flex-1 wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold py-2.5 text-xs sm:text-sm"
          >
            <Play className="w-4 h-4 fill-emerald-950" />
            {isRunning ? "Ejecutando..." : "Bandera Verde 🚩"}
          </button>
          <button
            onClick={resetSprite}
            title="Reiniciar personaje"
            className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300 px-3 py-2.5 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Escenario Animado (Prominent on Mobile) */}
      <div className="lg:col-span-4 wood-card p-4 sm:p-6 flex flex-col items-center order-1 lg:order-3">
        <h4 className="font-fun text-xs sm:text-sm font-bold text-slate-800 mb-2 w-full text-left">
          3. Escenario Animado
        </h4>

        <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-100 border-2 border-amber-200/80 relative overflow-hidden shadow-inner flex items-center justify-center">
          
          <div className="absolute top-2 left-3 text-xl opacity-60">☁️</div>
          <div className="absolute top-5 right-4 text-lg opacity-60">☁️</div>

          {bubbleText && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-800 px-2.5 py-1 rounded-xl text-xs font-bold font-fun shadow-md animate-in fade-in zoom-in">
              {bubbleText}
            </div>
          )}

          <div
            onClick={() => {
              sound.playStarChime();
              setSpriteY(25);
              setTimeout(() => setSpriteY(50), 200);
            }}
            className="text-4xl sm:text-5xl absolute transition-all duration-300 cursor-pointer drop-shadow-md select-none"
            style={{
              left: `${spriteX}%`,
              top: `${spriteY}%`,
              transform: `translate(-50%, -50%) rotate(${spriteRot}deg)`,
            }}
          >
            🐱
          </div>

          <div className="absolute bottom-2 text-[10px] text-emerald-800 font-semibold bg-emerald-200/60 px-2 py-0.5 rounded-md">
            Pasto / Suelo
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-2 text-center">
          Toca al gatito para hacerlo saltar o pulsa la bandera verde.
        </p>
      </div>

    </div>
  );
}
