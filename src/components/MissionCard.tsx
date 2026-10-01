"use client";

import React from "react";
import Link from "next/link";
import { usePassport } from "@/context/PassportContext";
import { Star, Laptop, Smartphone, Hand, ArrowRight } from "lucide-react";

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

export default function MissionCard({ mission }: { mission: Mission }) {
  const { isCompleted, toggleStamp } = usePassport();
  const done = isCompleted(mission.code);

  const isNoScreen = mission.tags.some((t) => t.includes("sin-pantalla") || t.includes("desenchufado"));
  const isMobile = mission.tags.some((t) => t.includes("celular") || t.includes("scratchjr"));
  const isComputer = mission.tags.some((t) => t.includes("computador") || t.includes("scratch") || t.includes("python"));

  return (
    <div
      className={`wood-card p-5 transition-all flex flex-col justify-between ${
        done
          ? "border-amber-400/80 bg-amber-50/40"
          : "hover:border-amber-300 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        
        {/* Left info & Star button */}
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleStamp(mission.code);
            }}
            title={done ? "Sello obtenido (haz clic para desmarcar)" : "Marcar como cumplida"}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-transform active:scale-90 shrink-0 ${
              done
                ? "bg-amber-300 text-amber-950 border-2 border-amber-400 shadow-xs"
                : "bg-slate-100 text-slate-300 hover:text-amber-400 hover:bg-amber-50 border-2 border-slate-200"
            }`}
          >
            <Star className={`w-5 h-5 ${done ? "fill-amber-950 text-amber-950" : ""}`} />
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-bold font-fun px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800">
                {mission.code}
              </span>

              {isNoScreen && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 flex items-center gap-1 border border-emerald-200">
                  <Hand className="w-3 h-3" /> Sin pantalla
                </span>
              )}
              {isMobile && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 flex items-center gap-1 border border-sky-200">
                  <Smartphone className="w-3 h-3" /> Celular
                </span>
              )}
              {isComputer && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 flex items-center gap-1 border border-purple-200">
                  <Laptop className="w-3 h-3" /> Computador
                </span>
              )}
            </div>

            <Link href={`/misiones/${mission.id}`} className="block group">
              <h3 className="font-fun text-base font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                {mission.title}
              </h3>
            </Link>
            <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
              {mission.description}
            </p>
          </div>
        </div>

      </div>

      {/* Action Footer: Link to dedicated page */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400">
          {done ? "✅ Sello conseguido" : "Pendiente por explorar"}
        </span>

        <Link
          href={`/misiones/${mission.id}`}
          className="wood-btn bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs py-1.5 px-3 font-bold"
        >
          <span>Abrir Misión Completa</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
