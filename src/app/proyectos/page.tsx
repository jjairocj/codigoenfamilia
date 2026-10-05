import Link from "next/link";
import projectsData from "@/data/projects.json";
import { Lightbulb, ArrowRight, Sparkles, FolderGit2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos en Familia: Crea tus Propias Creaciones | Código en Familia",
  description: "8 proyectos integrales para crear en familia: cuentos interactivos, estaciones del clima, juegos de mesa digitales y mascotas virtuales.",
};

const ICONS: Record<string, string> = {
  "cuento-interactivo": "📚",
  "estacion-del-clima": "🌦️",
  "juego-de-mesa-digital": "🎲",
  "mascota-virtual": "🐶",
  "pagina-de-la-familia": "🏡",
  "quiz-familiar": "❓",
  "recetario-digital": "🍲",
  "tarjeta-animada": "🎂",
};

export default function ProyectosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Lightbulb className="w-4 h-4 text-amber-700" />
          Proyectos Abiertos para Crear Juntos
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          Proyectos en Familia
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ideas guiadas para construir algo real en casa: cuentos animados, videojuegos, estaciones del clima o sitios web familiares.
        </p>
      </div>

      {/* Grid of 8 Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectsData.map((proj) => {
          const icon = ICONS[proj.id] || "💡";
          return (
            <Link
              key={proj.id}
              href={`/proyectos/${proj.id}`}
              className="wood-card p-6 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 border-2 border-amber-200/90 hover:border-amber-400 hover:shadow-xl bg-gradient-to-b from-white to-amber-50/30"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 border border-amber-300/80 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <div>
                  <h3 className="font-fun text-lg font-bold text-slate-800 group-hover:text-amber-800 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Ver guía paso a paso</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA to Missions */}
      <div className="wood-card p-6 sm:p-8 bg-gradient-to-r from-amber-50 to-orange-50/50 border-2 border-amber-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-2xl">🧭</span>
            <h3 className="font-fun text-lg font-bold text-slate-800">
              ¿Quieres aprender las habilidades paso a paso primero?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Explora las 84 misiones graduadas desde los 4 años hasta los 15 años para dominar bloques, sensores, lógica y código.
          </p>
        </div>
        <Link
          href="/misiones"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-6 py-3 text-xs sm:text-sm shrink-0"
        >
          Explorar las 84 Misiones <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
