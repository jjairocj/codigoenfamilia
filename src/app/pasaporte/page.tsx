import PassportTracker from "@/components/PassportTracker";
import { Award, Download, Printer } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pasaporte Digital de Exploración | Código en Familia",
  description: "Registra los sellos de tus 84 misiones completadas. Visualiza tu progreso por nivel y descarga diplomas oficiales en PDF.",
};

export default function PasaportePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Award className="w-4 h-4 text-amber-600" />
          Pasaporte de Crecimiento y Aventura
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 break-words">
          Tu Pasaporte de Misiones
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          El progreso es personal e intrínseco. Cada estrella dorada representa un desafío superado con curiosidad y autonomía en familia.
        </p>
      </div>

      {/* Main Interactive Tracker */}
      <PassportTracker />

      {/* Printable physical passport reminder */}
      <div className="wood-card bg-gradient-to-r from-amber-50 to-sky-50 p-5 sm:p-6 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-fun text-sm sm:text-base font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-2">
            <Printer className="w-4 h-4 text-amber-600" />
            ¿Prefieren sellar en papel físico?
          </h4>
          <p className="text-xs text-slate-600">
            Descarga e imprime los cuadernillos de pasaporte en PDF para usar sellos de tinta o calcomanías reales.
          </p>
        </div>
        <Link
          href="/descargas"
          className="wood-btn bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2.5 shadow-2xs shrink-0 w-full sm:w-auto text-center"
        >
          <Download className="w-4 h-4 text-indigo-600" />
          Ver Pasaportes Imprimibles
        </Link>
      </div>

    </div>
  );
}
