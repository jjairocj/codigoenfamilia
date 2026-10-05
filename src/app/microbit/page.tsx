import MicrobitSimulator from "@/components/MicrobitSimulator";
import GameAnimatedDemo from "@/components/GameAnimatedDemo";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, Laptop } from "lucide-react";

export const metadata: Metadata = {
  title: "Simulador de Micro:bit Virtual (Matriz 5x5 LED) | Código en Familia",
  description:
    "Programa y dibuja en una placa micro:bit interactiva con 25 bombillos LED rojos, botones A y B, dado aleatorio y patrones luminosos.",
};

export default function MicrobitPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-900 text-xs font-bold border border-red-300">
          <Sparkles className="w-4 h-4 text-red-600" />
          Laboratorio de Hardware y Robótica
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          Simulador Micro:bit 5×5 LED
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Experimenta con una placa microcontroladora real desde el navegador. Toca los bombillos para dibujar, presiona los botones A y B, o lanza un dado aleatorio.
        </p>
      </div>

      {/* Animated Demo Guide */}
      <GameAnimatedDemo initialGame="microbit" defaultExpanded={false} />

      {/* Simulator Component */}
      <MicrobitSimulator />

      {/* Related Missions */}
      <div className="wood-card p-6 bg-amber-50/60 border-2 border-amber-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-fun text-base font-bold text-slate-800">
            ¿Quieres conectar una placa Micro:bit física?
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Explora las misiones del Nivel Inventores (I17 a I20) para aprender sensores, acelerómetros y música con placas reales.
          </p>
        </div>
        <Link
          href="/misiones?nivel=inventores"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold py-2.5 px-4 shrink-0"
        >
          Ver Misiones I17 a I20 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
