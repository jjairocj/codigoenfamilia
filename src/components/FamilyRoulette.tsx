"use client";

import { VectorRouletteCenterHub, VectorRouletteWheel } from "@/components/vector/MontessoriVectorGraphics";
import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Sparkles, Dices, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

const CHALLENGES = [
  {
    title: "🤖 El Robot Ciego",
    desc: "Un adulto se venda los ojos. El niño(a) debe guiarlo hasta el sofá usando solo órdenes verbales de computadora: «Avanza 3 pasos», «Gira 90 grados a la derecha».",
    tag: "Secuencia & Orientación",
    color: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    title: "💃 El Bucle de Baile",
    desc: "Inventen una coreografía de 3 pasos sencillos (aplauso, salto, giro). El niño decide cuántas veces se repite el bucle (ej. 4 veces) y todos lo bailan sin equivocarse.",
    tag: "Bucles & Repeticiones",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    title: "🥣 El Algoritmo del Cereal",
    desc: "El niño(a) escribe o dicta la receta exacta para servir un vaso de agua o cereal. El adulto debe actuar como una computadora literal: si el niño olvida decir «destapar la caja», ¡el adulto intenta echar cereal con la caja cerrada!",
    tag: "Pensamiento Algorítmico",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    title: "🐛 La Caza del Bug",
    desc: "El adulto hace una actividad cotidiana cometiendo un error intencional y absurdo (ponerse los zapatos antes de las medias). El niño debe gritar «¡BUG!» y explicar cómo depurar el error.",
    tag: "Depuración & Lógica",
    color: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    title: "🔦 El Telégrafo Binario",
    desc: "Con una linterna o un interruptor de luz, apagado es 0 y encendido es 1. Creen un código simple de 2 dígitos (ej: 00 = sí, 01 = no, 11 = te quiero) y envíense mensajes secretos.",
    tag: "Código Binario",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    title: "🎨 Pixel Art a Ciegas",
    desc: "En una hoja cuadriculada, el adulto dibuja una figura simple sin que el niño la vea. Luego le da solo las coordenadas fila/columna para pintar. Al final comparan si el dibujo coincide.",
    tag: "Coordenadas & Datos",
    color: "bg-teal-100 text-teal-800 border-teal-200",
  },
];

export default function FamilyRoulette() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<typeof CHALLENGES[0] | null>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sound.playWoodClick();

    const extraSpins = 1080 + Math.floor(Math.random() * 360);
    const newRotation = rotation + extraSpins;
    setRotation(newRotation);

    setTimeout(() => {
      const idx = Math.floor(Math.random() * CHALLENGES.length);
      setSelectedChallenge(CHALLENGES[idx]);
      sound.playStampFanfare();
      setIsSpinning(false);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#86efac", "#fde047", "#bae6fd", "#fed7aa"],
        });
      } catch {}
    }, 3200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center max-w-4xl mx-auto">
      
      {/* Ruleta */}
      <div className="md:col-span-6 flex flex-col items-center">
        <div className="relative w-56 h-56 min-[400px]:w-64 min-[400px]:h-64 sm:w-72 sm:h-72">
          {/* Puntero */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] min-[400px]:border-l-[14px] border-l-transparent border-r-[12px] min-[400px]:border-r-[14px] border-r-transparent border-t-[20px] min-[400px]:border-t-[24px] border-t-amber-500 drop-shadow-md" />

          {/* Rueda */}
          <div
            className="w-full h-full rounded-full border-6 min-[400px]:border-8 border-amber-200 shadow-xl transition-transform duration-[3200ms] ease-out flex items-center justify-center relative overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: "conic-gradient(#bae6fd 0deg 60deg, #dcfce7 60deg 120deg, #fef08a 120deg 180deg, #fed7aa 180deg 240deg, #e9d5ff 240deg 300deg, #fbcfe8 300deg 360deg)",
            }}
          >
            <div className="w-14 h-14 min-[400px]:w-16 min-[400px]:h-16 rounded-full shadow-lg flex items-center justify-center z-10">
              <VectorRouletteCenterHub className="w-full h-full" />
            </div>
          </div>
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className="mt-5 sm:mt-6 wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-6 sm:px-8 py-3.5 shadow-sm text-xs sm:text-sm w-full sm:w-auto"
        >
          <Dices className="w-5 h-5 text-amber-950" />
          {isSpinning ? "Girando la ruleta..." : "¡Girar Ruleta Familiar!"}
        </button>
      </div>

      {/* Tarjeta del Reto */}
      <div className="md:col-span-6 w-full">
        <div className="wood-card p-5 sm:p-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Reto Familiar del Día
            </span>
            {selectedChallenge && (
              <button
                onClick={spin}
                disabled={isSpinning}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Otro reto
              </button>
            )}
          </div>

          {selectedChallenge ? (
            <div className="space-y-3 sm:space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800">
                  {selectedChallenge.title}
                </h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${selectedChallenge.color}`}>
                  {selectedChallenge.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-amber-50/60 p-3.5 sm:p-4 rounded-2xl border border-amber-200/50">
                {selectedChallenge.desc}
              </p>
              <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <span>💡 Objetivo:</span>
                <span>Aprender jugando con el cuerpo, sin pantallas.</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 text-slate-400">
              <div className="w-16 h-16 mx-auto mb-2 sm:mb-3 opacity-90 flex items-center justify-center">
                <VectorRouletteWheel className="w-16 h-16" />
              </div>
              <h4 className="font-fun text-sm sm:text-base font-bold text-slate-700 mb-1">
                ¿Qué reto jugaremos hoy?
              </h4>
              <p className="text-xs max-w-xs mx-auto">
                Toca el botón para que la ruleta elija una dinámica divertida para hacer en la sala o cocina.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}