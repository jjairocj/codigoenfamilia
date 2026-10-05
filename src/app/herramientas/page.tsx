import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS_DATA } from "@/data/tools";
import {
  Wrench,
  Download,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Herramientas Gratuitas de Programación para Niños | Código en Familia",
  description:
    "Guía completa de instalación y uso de ScratchJr, Scratch, micro:bit, Python y Code.org. 100% gratuitas, seguras y diseñadas para aprender en familia.",
};

export default function HerramientasHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          100% Gratuitas · Sin Publicidad · Seguras para Niños
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          Herramientas y Software Educativo
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          En <strong>Código en Familia</strong> nunca tendrás que pagar por software ni suscripciones. Todas las herramientas que recomendamos fueron creadas por universidades prestigiosas (como el MIT o Tufts) y fundaciones educativas internacionales para aprender jugando.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {TOOLS_DATA.map((tool) => (
          <div
            key={tool.id}
            className="wood-card p-6 sm:p-7 bg-white border-2 border-slate-200 hover:border-amber-300 transition-all shadow-sm flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              {/* Category & Ages */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                  Nivel {tool.targetLevel} · {tool.recommendedAges}
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
                  {tool.cost}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-fun text-2xl font-bold text-slate-800">
                  {tool.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {tool.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {tool.description}
              </p>

              {/* Requirements preview */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Dispositivos compatibles:
                </span>
                {tool.requirements.slice(0, 2).map((req, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions & Links */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href={`/herramientas/${tool.id}`}
                className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold py-2.5 px-4 w-full sm:w-auto text-center"
              >
                Ver Guía y Descargas <ArrowRight className="w-4 h-4" />
              </Link>

              {tool.internalSimulator && (
                <Link
                  href={tool.internalSimulator.path}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1.5 py-1"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  {tool.internalSimulator.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Parent Advice Note */}
      <div className="wood-card p-6 bg-amber-50/70 border-2 border-amber-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 text-xl font-bold shadow-sm">
          💡
        </div>
        <div className="space-y-1">
          <h4 className="font-fun text-base font-bold text-slate-800">
            Consejo para Familias: No necesitas instalar todo a la vez
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Comiencen por el nivel de su hijo: si tiene entre 4 y 6 años, solo necesitarán ScratchJr o las actividades sin pantalla. A medida que crezcan y avancen de nivel, la plataforma les irá guiando paso a paso para abrir la siguiente herramienta.
          </p>
        </div>
      </div>
    </div>
  );
}
