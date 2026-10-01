import PythonPlayground from "@/components/PythonPlayground";
import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Consola de Código Python para Niños y Familias | Código en Familia",
  description:
    "Escribe y ejecuta tus primeras líneas de código en Python real desde el navegador con recetas interactivas, cuentas regresivas y variables divertidas.",
};

export default function PythonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Terminal className="w-4 h-4 text-emerald-600" />
          Programación en Texto Real
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          Patio de Juegos Python Familiar
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Sin instalaciones complicadas ni configuraciones técnicas. Escribe tu código, cambia los valores y observa cómo tu computadora cobra vida en la terminal.
        </p>
      </div>

      {/* Playground */}
      <PythonPlayground />

      {/* Link to missions */}
      <div className="wood-card p-6 bg-emerald-50/60 border-2 border-emerald-200 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-fun text-base font-bold text-slate-800">
            ¿Listos para proyectos completos en Python?
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Las misiones del Nivel Creadores (C01 a C24) guían paso a paso la creación de aventuras de texto, cifrados y bots.
          </p>
        </div>
        <Link
          href="/misiones?nivel=creadores"
          className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 shrink-0"
        >
          Ver Misiones Creadores <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
