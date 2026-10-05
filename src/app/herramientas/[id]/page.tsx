import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOLS_DATA } from "@/data/tools";
import {
  Download,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return TOOLS_DATA.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = TOOLS_DATA.find((t) => t.id === id);
  if (!tool) return { title: "Herramienta no encontrada | Código en Familia" };

  return {
    title: `${tool.name} | Guía de Instalación y Uso | Código en Familia`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { id } = await params;
  const tool = TOOLS_DATA.find((t) => t.id === id);

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/herramientas"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Todas las Herramientas
        </Link>
      </div>

      {/* Header Card */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
            Nivel Recomendado: {tool.targetLevel} ({tool.recommendedAges})
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {tool.cost}
          </span>
        </div>

        <h1 className="font-fun text-3xl sm:text-4xl font-extrabold text-slate-800">
          {tool.name}
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-600">
          {tool.tagline}
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
          {tool.description}
        </p>
      </div>

      {/* Why We Use It & Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="wood-card p-6 bg-amber-50/60 border-2 border-amber-200 space-y-3">
          <h3 className="font-fun text-base font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            ¿Por qué la usamos en Código en Familia?
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            {tool.whyWeUseIt}
          </p>
        </div>

        <div className="rounded-3xl p-6 sm:p-7 bg-[#0f172a] text-white border-2 border-slate-700 shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden">
          <div className="space-y-2.5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/40 shadow-xs">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              PRÁCTICA INMEDIATA
            </div>
            <h4 className="font-fun text-xl font-extrabold text-white tracking-wide">
              ¿Quieres probar sin instalar nada?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hemos integrado simuladores interactivos directamente en la web para que experimentes la programación y la robótica desde cualquier pantalla sin instalaciones.
            </p>
          </div>

          {tool.internalSimulator && (
            <Link
              href={tool.internalSimulator.path}
              className="wood-btn bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs sm:text-sm font-bold py-3 px-5 text-center flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all relative z-10"
            >
              <Laptop className="w-4 h-4" />
              {tool.internalSimulator.label}
            </Link>
          )}
        </div>
      </div>

      {/* Download Links & Requirements */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-fun text-xl font-bold text-slate-800">
            ¿Dónde conseguirla o descargarla?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Enlaces directos a las tiendas oficiales y sitios web verificados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tool.platforms.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-center justify-between gap-3 group"
            >
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-amber-950">
                  {p.platform}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {p.label}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0" />
            </a>
          ))}
        </div>

        {/* Requirements */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Requisitos recomendados:
          </span>
          {tool.requirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Missions */}
      {tool.sampleMissions && tool.sampleMissions.length > 0 && (
        <div className="wood-card p-6 bg-white border-2 border-slate-200 space-y-4">
          <h3 className="font-fun text-lg font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Misiones guiadas donde se utiliza {tool.name}:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.sampleMissions.map((m, idx) => (
              <Link
                key={idx}
                href={m.path}
                className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between gap-2"
              >
                <div className="text-xs">
                  <span className="font-mono font-bold text-indigo-700 mr-2">[{m.code}]</span>
                  <span className="font-medium text-slate-800">{m.title}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
