import ScratchSandbox from "@/components/ScratchSandbox";
import GameAnimatedDemo from "@/components/GameAnimatedDemo";
import { Sparkles, HeartHandshake, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Laboratorio Scratch & Bloques Visuales | Código en Familia",
  description: "Aprende a programar apilando bloques visuales como piezas de Lego. Haz que el gatito camine, salte, gire y hable con sonido y animación.",
};

export default function ScratchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10 overflow-x-hidden">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300">
          <Sparkles className="w-4 h-4 text-rose-600" />
          Programación Visual por Bloques
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 break-words">
          Laboratorio Scratch
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Programar no es memorizar códigos crípticos: es encajar ideas como bloques de madera. Diseña tu secuencia y mira cobrar vida al personaje al presionar la bandera verde.
        </p>
      </div>

      {/* Animated Demo Guide */}
      <GameAnimatedDemo initialGame="scratch" defaultExpanded={false} />

      {/* Main Sandbox */}
      <ScratchSandbox />

      {/* Learning resources */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 pt-2">
        
        <div className="bg-amber-50/80 border-2 border-amber-200/80 p-5 sm:p-6 rounded-3xl space-y-2.5">
          <h3 className="font-fun text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-700" />
            👩‍👧 Qué observar mientras juegan:
          </h3>
          <p className="text-xs text-amber-900 leading-relaxed">
            Nota cómo el niño experimenta con la causa y el efecto. Cuando presiona «Girar», el gatito rota 360 grados.
          </p>
          <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
            <li>¿Qué pasa si ponemos dos bloques de hablar seguidos?</li>
            <li>¿Podemos hacer que camine y luego salte?</li>
            <li>En Scratch real (MIT), los bloques tienen formas que solo encajan si son compatibles (control de error mecánico).</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-slate-200 p-5 sm:p-6 rounded-3xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-fun text-sm sm:text-base font-bold text-slate-800">
              ¿Listos para proyectos más grandes?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scratch es una plataforma gratuita creada por el MIT Media Lab para crear historias interactivas, juegos y animaciones con millones de niños en el mundo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href="https://scratch.mit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold py-2.5 px-4 text-center"
            >
              Abrir Scratch MIT Oficial <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/misiones?nivel=exploradores"
              className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 border-slate-300 text-center"
            >
              Ver Misiones con Scratch
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
