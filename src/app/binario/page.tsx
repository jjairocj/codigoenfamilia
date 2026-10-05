import BinaryWorkshop from "@/components/BinaryWorkshop";
import GameAnimatedDemo from "@/components/GameAnimatedDemo";
import type { Metadata } from "next";
import Link from "next/link";
import { Binary, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Taller Binario Interactivo: Ceros, Unos y Mensajes Secretos | Código en Familia",
  description:
    "Aprende cómo las computadoras piensan con ceros y unos. Enciende interruptores de bits, forma números decimales y traduce mensajes secretos a binario.",
};

export default function BinarioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold border border-indigo-300">
          <Binary className="w-4 h-4 text-indigo-600" />
          Lenguaje de las Máquinas
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          Taller de Ceros y Unos (Código Binario)
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Las computadoras no tienen ojos ni oídos: solo tienen pequeños interruptores que pueden estar apagados (0) o encendidos (1). ¡Aprende a sumar con bits y descifra mensajes secretos!
        </p>
      </div>

      {/* Animated Demo Guide */}
      <GameAnimatedDemo initialGame="binario" defaultExpanded={false} />

      {/* Workshop */}
      <BinaryWorkshop />

      {/* Link to missions */}
      <div className="wood-card p-6 bg-indigo-50/60 border-2 border-indigo-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-fun text-base font-bold text-slate-800">
            ¿Quieres practicar más con actividades desconectadas?
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Revisa la Misión S13 (Ceros y unos) o E16 (Arte en píxeles) para dibujar con cuadrículas impresas en casa.
          </p>
        </div>
        <Link
          href="/misiones/s13-ceros-y-unos"
          className="wood-btn bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold py-2.5 px-4 shrink-0"
        >
          Ver Misión S13 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
