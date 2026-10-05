import Link from "next/link";
import unpluggedData from "@/data/unplugged.json";
import GameAnimatedDemo from "@/components/GameAnimatedDemo";
import { Dices, ArrowRight, HeartHandshake, Scissors } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actividades Desenchufadas (Sin Pantalla) | Código en Familia",
  description: "8 actividades corporales y con materiales de casa para aprender algoritmos, criptografía, redes y código binario en el piso de la sala.",
};

const ICONS: Record<string, string> = {
  "adivina-en-pocas-preguntas": "🤔",
  "clasificador-de-frutas": "🍎",
  "dibujo-por-numeros": "🎨",
  "el-truco-de-magia": "🎩",
  "laberinto-en-el-piso": "🧶",
  "mensajes-secretos": "🔐",
  "ordenar-con-la-balanza": "⚖️",
  "red-de-hilo": "🕸️",
};

const TAGS: Record<string, { ages: string; time: string; tag: string }> = {
  "adivina-en-pocas-preguntas": { ages: "7+ años", time: "20 min", tag: "Búsqueda Binaria" },
  "clasificador-de-frutas": { ages: "5–9 años", time: "25 min", tag: "Árboles de Decisión" },
  "dibujo-por-numeros": { ages: "7–12 años", time: "30 min", tag: "Píxeles & Gráficos" },
  "el-truco-de-magia": { ages: "8–13 años", time: "20 min", tag: "Detección de Errores" },
  "laberinto-en-el-piso": { ages: "4–8 años", time: "30 min", tag: "Bucles & Secuencias" },
  "mensajes-secretos": { ages: "9+ años", time: "25 min", tag: "Criptografía" },
  "ordenar-con-la-balanza": { ages: "8+ años", time: "25 min", tag: "Algoritmos de Ordenamiento" },
  "red-de-hilo": { ages: "8+ años", time: "30 min", tag: "Redes & Paquetes IP" },
};

export default function DesenchufadoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Scissors className="w-4 h-4 text-emerald-700" />
          Pedagogía Desenchufada · 100% Sin Pantallas
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          Actividades en el Piso de la Sala
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          La computación no empezó con los computadores, sino con las ideas. Estas 8 dinámicas usan lana, cartas, papel o frutas para experimentar conceptos profundos de ingeniería jugando en familia.
        </p>
      </div>

      {/* Animated Demo Guide with Tabs */}
      <GameAnimatedDemo initialGame="desenchufado" showSelector={true} defaultExpanded={false} />

      {/* Banner to Roulette */}
      <div className="wood-card bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-100 border-2 border-purple-200 p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shadow-md">
            🎲
          </div>
          <div>
            <h3 className="font-fun text-base sm:text-lg font-bold text-purple-950">
              ¿Tienen poco tiempo hoy?
            </h3>
            <p className="text-xs sm:text-sm text-purple-800">
              Gira la <strong>Ruleta Familiar de Retos</strong> para desafíos rápidos de 10 minutos.
            </p>
          </div>
        </div>
        <Link
          href="/ruleta"
          className="wood-btn bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md hover:scale-102 transition-transform whitespace-nowrap"
        >
          <Dices className="w-4 h-4" />
          Abrir la Ruleta ➔
        </Link>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unpluggedData.map((act) => {
          const meta = TAGS[act.id] || { ages: "Familiar", time: "25 min", tag: "Lógica" };
          const icon = ICONS[act.id] || "✋";

          return (
            <div
              key={act.id}
              className="wood-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all bg-white border-2 border-amber-200/80 shadow-md group rounded-3xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-4xl p-2.5 rounded-2xl bg-amber-50 border border-amber-200/60 shadow-2xs group-hover:scale-110 transition-transform">
                    {icon}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100/80 text-amber-900 border border-amber-300">
                    {meta.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-fun text-lg sm:text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {act.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium pt-1">
                  <span>⏱️ {meta.time}</span>
                  <span>·</span>
                  <span>👶 {meta.ages}</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800">Ver instrucciones</span>
                <Link
                  href={`/desenchufado/${act.id}`}
                  className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 px-4 py-2 text-xs font-bold shadow-2xs"
                >
                  Jugar reto <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Materials Download Box */}
      <div className="wood-card bg-amber-50/70 p-6 sm:p-8 border-2 border-amber-300 rounded-3xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-fun text-lg sm:text-xl font-bold text-amber-950 flex items-center justify-center sm:justify-start gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-700" />
            Descarga las tarjetas para imprimir y recortar
          </h3>
          <p className="text-xs sm:text-sm text-amber-900 max-w-xl leading-relaxed">
            Todas estas actividades cuentan con flechas, cartas binarias y fichas listas para imprimir gratis en tamaño carta.
          </p>
        </div>
        <Link
          href="/descargas"
          className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md hover:scale-102 transition-transform whitespace-nowrap"
        >
          Ir a Descargas PDF ➔
        </Link>
      </div>

    </div>
  );
}
