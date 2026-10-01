import RobotSimulator from "@/components/RobotSimulator";
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

        {/* Related Missions */}
        <div className="bg-white border-2 border-slate-200/80 p-5 sm:p-6 rounded-3xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <h3 className="font-fun text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-600" />
              Misiones Relacionadas en la Vida Real
            </h3>
            <p className="text-xs text-slate-600">
              Este simulador digital se complementa con estas misiones desconectadas de alfombra y papel:
            </p>
            <div className="space-y-2">
              <Link
                href="/misiones?nivel=semillas"
                className="block p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                🌱 <strong>S01 · El robot humano:</strong> Sé el robot de tu hijo en la sala.
              </Link>
              <Link
                href="/misiones?nivel=semillas"
                className="block p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                🗺️ <strong>S03 · El mapa del tesoro:</strong> Dibuja la cuadrícula con tiza o cinta.
              </Link>
            </div>
          </div>

          <Link
            href="/misiones"
            className="wood-btn bg-slate-800 text-white text-xs py-2.5 px-4 font-bold inline-flex items-center gap-2 self-start mt-2"
          >
            Explorar todas las misiones <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
