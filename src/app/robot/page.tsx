import RobotSimulator from "@/components/RobotSimulator";
import GameAnimatedDemo from "@/components/GameAnimatedDemo";
import Link from "next/link";
import { Bot, HeartHandshake, Compass, ArrowRight } from "lucide-react";

export const metadata = {
  title: "El Robot Boty — Simulador de Algoritmos para Niños | Código en Familia",
  description: "Aprende qué es un algoritmo y una secuencia programando los movimientos de Boty en una cuadrícula 5x5 con estrellas y obstáculos.",
};

export default function RobotPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Bot className="w-4 h-4 text-emerald-600" />
          Simulador Interactivo de Pensamiento Computacional
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 break-words">
          El Laboratorio de Boty el Robot
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Los robots no adivinan lo que pensamos: solo obedecen secuencias exactas de pasos. Crea un algoritmo con bloques para guiar a Boty hacia las estrellas doradas.
        </p>
      </div>

      {/* Animated Demo Guide */}
      <GameAnimatedDemo initialGame="robot" defaultExpanded={false} />

      {/* Simulator Component */}
      <RobotSimulator />

      {/* Guide for Adults & Related Missions */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 pt-2">
        
        {/* Guide Box */}
        <div className="bg-amber-50/80 border-2 border-amber-200/80 p-5 sm:p-6 rounded-3xl space-y-2.5">
          <h3 className="font-fun text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-700" />
            👩‍👧 Guía para el Adulto Acompañante
          </h3>
          <p className="text-xs text-amber-900 leading-relaxed">
            Permite que el niño presione «¡Ejecutar Algoritmo!» incluso si sabes de antemano que falta un paso. <strong>El error es el mejor maestro.</strong>
          </p>
          <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
            <li>¿Boty giró al lado contrario? Pregúntale: «¿Hacia dónde está mirando Boty ahora?»</li>
            <li>Si choca con un tronco de madera: «¿Qué paso de la lista causó el tropiezo?»</li>
            <li>En el Nivel 4 (Diseña tu mapa): Anímalo a crear un laberinto para que <em>tú</em> lo resuelvas.</li>
          </ul>
        </div>

        {/* Related Missions Box */}
        <div className="bg-emerald-50/70 border-2 border-emerald-200/80 p-5 sm:p-6 rounded-3xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-fun text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              Misiones Relacionadas en el Programa
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Este simulador acompaña las primeras misiones de lógica y secuencias:
            </p>
            <div className="space-y-1.5 pt-1">
              <Link
                href="/misiones/s01-robot-humano"
                className="block text-xs font-semibold text-emerald-900 hover:text-emerald-700 hover:underline"
              >
                🌱 <strong>S01: El Robot Humano</strong> — Jugar primero en el piso de la sala
              </Link>
              <Link
                href="/misiones/s03-mapa-del-tesoro"
                className="block text-xs font-semibold text-emerald-900 hover:text-emerald-700 hover:underline"
              >
                🌱 <strong>S03: El Mapa del Tesoro</strong> — Cuadrículas y coordenadas
              </Link>
              <Link
                href="/misiones/s04-encontre-el-bicho"
                className="block text-xs font-semibold text-emerald-900 hover:text-emerald-700 hover:underline"
              >
                🌱 <strong>S04: ¡Encontré el Bicho!</strong> — Depuración paso a paso
              </Link>
            </div>
          </div>

          <Link
            href="/misiones?nivel=semillas"
            className="inline-flex items-center justify-between text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2 border-t border-emerald-200"
          >
            <span>Ver todas las misiones del Nivel Semillas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
