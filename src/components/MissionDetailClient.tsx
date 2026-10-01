"use client";

import React from "react";
import Link from "next/link";
import { usePassport } from "@/context/PassportContext";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Star,
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Hand,
  Smartphone,
  Laptop,
  CheckCircle2,
  Award,
} from "lucide-react";

interface Mission {
  id: string;
  code: string;
  level: string;
  title: string;
  description: string;
  tags: string[];
  body: string;
  adultBox?: string;
}

const LEVEL_INFO: Record<string, { label: string; age: string; color: string; badge: string }> = {
  semillas: {
    label: "Semillas",
    age: "4–6 años",
    color: "from-emerald-100 to-teal-50 border-emerald-300",
    badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  exploradores: {
    label: "Exploradores",
    age: "7–9 años",
    color: "from-sky-100 to-indigo-50 border-sky-300",
    badge: "bg-sky-100 text-sky-900 border-sky-300",
  },
  inventores: {
    label: "Inventores",
    age: "10–12 años",
    color: "from-purple-100 to-pink-50 border-purple-300",
    badge: "bg-purple-100 text-purple-900 border-purple-300",
  },
  creadores: {
    label: "Creadores",
    age: "13–15 años",
    color: "from-amber-100 to-orange-50 border-amber-300",
    badge: "bg-amber-100 text-amber-900 border-amber-300",
  },
};

// Clean raw Wiki.js markdown tags
function cleanMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/\{(\.is-[a-z]+)\}/g, "")
    .replace(/^>\s*/gm, "")
    .replace(/---\s*/g, "")
    .replace(/⬅️\s*\[Volver al nivel[^\]]+\]\([^)]+\)/g, "")
    .trim();
}

export default function MissionDetailClient({
  mission,
  prevMission,
  nextMission,
}: {
  mission: Mission;
  prevMission: Mission | null;
  nextMission: Mission | null;
}) {
  const { isCompleted, toggleStamp } = usePassport();
  const done = isCompleted(mission.code);

  const levelMeta = LEVEL_INFO[mission.level] || LEVEL_INFO.semillas;
  const isNoScreen = mission.tags.some((t) => t.includes("sin-pantalla") || t.includes("desenchufado"));
  const isMobile = mission.tags.some((t) => t.includes("celular") || t.includes("scratchjr"));
  const isComputer = mission.tags.some((t) => t.includes("computador") || t.includes("scratch") || t.includes("python"));

  const cleanedBody = cleanMarkdown(mission.body);
  const cleanedAdultBox = cleanMarkdown(mission.adultBox || "");

  const handleStampClick = () => {
    if (!done) {
      sound.playStampFanfare();
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#86efac", "#fde047", "#7dd3fc", "#d8b4fe"],
        });
      } catch {}
    } else {
      sound.playWoodClick();
    }
    toggleStamp(mission.code);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* Top Breadcrumb & Back */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 text-slate-500">
          <Link href="/misiones" className="hover:text-amber-800 font-semibold flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Misiones
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-700 capitalize">
            Nivel {levelMeta.label}
          </span>
          <span>/</span>
          <span className="text-amber-700 font-bold">{mission.code}</span>
        </div>

        <Link
          href="/pasaporte"
          className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold flex items-center gap-1.5 shadow-2xs hover:bg-amber-200 transition-colors shrink-0"
        >
          <Award className="w-3.5 h-3.5 text-amber-700" />
          <span>Ver mi Pasaporte</span>
        </Link>
      </div>

      {/* Main Mission Hero Card */}
      <div className={`wood-card p-5 sm:p-8 bg-gradient-to-r ${levelMeta.color} border-2`}>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 flex-1">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-fun text-xs sm:text-sm font-extrabold px-3 py-1 rounded-xl bg-white text-slate-800 border border-slate-200 shadow-2xs">
                Misión {mission.code}
              </span>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${levelMeta.badge}`}>
                Nivel {levelMeta.label} ({levelMeta.age})
              </span>

              {isNoScreen && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                  <Hand className="w-3.5 h-3.5" /> Sin pantalla
                </span>
              )}
              {isMobile && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" /> Celular
                </span>
              )}
              {isComputer && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5" /> Computador
                </span>
              )}
            </div>

            <h1 className="font-fun text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 break-words">
              {mission.title}
            </h1>
            <p className="text-xs sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              {mission.description}
            </p>
          </div>

          {/* Big Interactive Stamp Action Button (Full width on mobile) */}
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={handleStampClick}
              className={`w-full md:w-auto wood-btn px-5 py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                done
                  ? "bg-amber-300 hover:bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-102"
                  : "bg-white hover:bg-amber-50 text-slate-800 border-amber-300 shadow-sm"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${done ? "bg-amber-400" : "bg-amber-100"}`}>
                <Star className={`w-5 h-5 ${done ? "fill-amber-950 text-amber-950" : "text-amber-600"}`} />
              </div>
              <div className="text-left">
                <div className="font-fun text-xs sm:text-sm font-bold">
                  {done ? "¡Misión Cumplida!" : "Completar Misión"}
                </div>
                <div className="text-[10px] opacity-80">
                  {done ? "Sello estampado en tu Pasaporte" : "Toca aquí para ganar tu sello ⭐"}
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Grid Layout: Main Mission Content + Adult Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Mission Content for Child & Family (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="wood-card p-4 sm:p-7 bg-white border-2 border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="text-xl">🗺️</span>
              <h2 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                Guía Paso a Paso para la Familia
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed space-y-3">
              {cleanedBody}
            </div>

            {/* Bottom Stamp reminder */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className={`w-4 h-4 ${done ? "text-emerald-500" : "text-slate-300"}`} />
                <span>Estado: {done ? "Estampada en tu pasaporte" : "Aún sin estampar"}</span>
              </div>
              <button
                onClick={handleStampClick}
                className={`wood-btn text-xs py-2 px-4 w-full sm:w-auto ${
                  done
                    ? "bg-slate-100 text-slate-600 border-slate-300"
                    : "bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold"
                }`}
              >
                <Star className={`w-4 h-4 ${done ? "fill-slate-600" : "fill-amber-950"}`} />
                {done ? "Desmarcar Sello" : "¡Marcar Sello Cumplido!"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Adult Box & Next Steps (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Adult Guide Box */}
          <div className="wood-card p-4 sm:p-6 bg-amber-50/80 border-2 border-amber-300 space-y-2.5">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
              <HeartHandshake className="w-5 h-5 text-amber-700" />
              <h3 className="font-fun text-xs sm:text-sm font-bold text-amber-950">
                👩‍👧 Para el Adulto Acompañante
              </h3>
            </div>
            
            <p className="text-xs text-amber-950 leading-relaxed whitespace-pre-line">
              {cleanedAdultBox || "Acompaña al niño observando su proceso con serenidad. Haz preguntas en lugar de darle la respuesta directa («¿Qué crees que pasará si cambiamos esta orden?»). El error es una pista valiosa para aprender a depurar."}
            </p>
          </div>

          {/* Navigation between missions */}
          <div className="wood-card p-4 sm:p-6 bg-white border-2 border-slate-200 space-y-3">
            <h4 className="font-fun text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Navegación del Programa
            </h4>

            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-2.5 pt-1">
              {prevMission ? (
                <Link
                  href={`/misiones/${prevMission.id}`}
                  className="flex-1 p-2.5 sm:p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-left transition-colors group"
                >
                  <div className="text-[10px] text-slate-400 group-hover:text-amber-800 flex items-center gap-1 font-bold">
                    <ArrowLeft className="w-3 h-3" /> Anterior
                  </div>
                  <div className="font-fun text-xs font-bold text-slate-700 truncate mt-0.5">
                    {prevMission.code} · {prevMission.title.replace(/^[A-Z0-9]+ · /, "")}
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block flex-1" />
              )}

              {nextMission ? (
                <Link
                  href={`/misiones/${nextMission.id}`}
                  className="flex-1 p-2.5 sm:p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200 text-left sm:text-right transition-colors group"
                >
                  <div className="text-[10px] text-amber-800 flex items-center sm:justify-end gap-1 font-bold">
                    Siguiente <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="font-fun text-xs font-bold text-amber-950 truncate mt-0.5">
                    {nextMission.code} · {nextMission.title.replace(/^[A-Z0-9]+ · /, "")}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/pasaporte"
                  className="flex-1 p-2.5 sm:p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-center sm:text-right transition-colors"
                >
                  <div className="text-[10px] text-emerald-800 font-bold">
                    ¡Fin del Nivel! 🏆
                  </div>
                  <div className="font-fun text-xs font-bold text-emerald-950 truncate mt-0.5">
                    Ir al Pasaporte
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Quick link to simulators */}
          <div className="wood-card p-4 sm:p-5 bg-gradient-to-br from-sky-50 to-emerald-50 border-2 border-sky-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="font-fun text-xs font-bold text-slate-800">
                  ¿Practicar con el Robot?
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500">
                  Prueba el simulador de cuadrícula 5x5
                </div>
              </div>
            </div>
            <Link
              href="/robot"
              className="wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 text-xs py-2 px-3 shrink-0"
            >
              Jugar ➔
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
