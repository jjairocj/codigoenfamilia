"use client";

import React, { useState } from "react";
import { usePassport } from "@/context/PassportContext";
import missionsData from "@/data/missions.json";
import { Download } from "lucide-react";
import Link from "next/link";

const LEVELS = [
  { id: "semillas", label: "🌱 Semillas", age: "4–6 años", total: 16 },
  { id: "exploradores", label: "🧭 Exploradores", age: "7–9 años", total: 24 },
  { id: "inventores", label: "🔬 Inventores", age: "10–12 años", total: 24 },
  { id: "creadores", label: "🚀 Creadores", age: "13–15 años", total: 20 },
];

export default function PassportTracker() {
  const { user, stamps, toggleStamp, getLevelProgress } = usePassport();
  const [selectedLevel, setSelectedLevel] = useState("semillas");

  const progress = getLevelProgress(selectedLevel);
  const missionsForLevel = (missionsData as Array<{ id: string; code: string; level: string; title: string }>).filter(
    (m) => m.level === selectedLevel
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Selector de Nivel */}
      <div className="wood-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800">
              Pasaporte de Exploración Familiar
            </h3>
            <p className="text-xs text-slate-500">
              {user
                ? `Familia: ${user.familyName} · Niño(a): ${user.child?.alias}`
                : "Modo Invitado (guardado privado en tu navegador)"}
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Total:</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-fun font-bold text-xs sm:text-sm">
              ⭐ {stamps.length} / 84 sellos
            </span>
          </div>
        </div>

        {/* Nivel Tabs (2x2 on Mobile, 4 in row on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {LEVELS.map((lvl) => {
            const lvlProg = getLevelProgress(lvl.id);
            const active = selectedLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  active
                    ? "bg-amber-100/80 border-amber-400 shadow-2xs scale-102"
                    : "bg-white border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <div className="font-fun font-bold text-xs sm:text-sm text-slate-800">
                  {lvl.label}
                </div>
                <div className="text-[10px] text-slate-500">{lvl.age}</div>
                <div className="mt-1.5 text-[11px] sm:text-xs font-bold text-amber-900">
                  {lvlProg.completed}/{lvl.total} ⭐ ({lvlProg.pct}%)
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Barra de Crecimiento */}
      <div className="wood-card p-4 sm:p-8 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🌱</span>
            <h4 className="font-fun text-sm sm:text-base font-bold text-slate-800">
              Crecimiento en {selectedLevel.toUpperCase()}
            </h4>
          </div>
          <span className="font-fun text-xs sm:text-sm font-bold text-amber-900">
            {progress.completed} de {progress.total} ({progress.pct}%)
          </span>
        </div>

        {/* Barra estilo cuentas */}
        <div className="h-4 sm:h-5 bg-amber-100/60 rounded-full p-1 border border-amber-200 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progress.pct}%` }}
          />
        </div>

        {/* Mensaje de Logro y Diploma */}
        {progress.pct === 100 ? (
          <div className="mt-5 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl">🏆</span>
              <div>
                <h5 className="font-fun font-bold text-sm sm:text-base">¡Nivel Completado al 100%!</h5>
                <p className="text-xs text-emerald-800">Has demostrado constancia y autonomía en todas las misiones.</p>
              </div>
            </div>
            <a
              href={`/downloads/certificado-${selectedLevel}.pdf`}
              download
              className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4 py-2.5 shrink-0 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Descargar Diploma PDF
            </a>
          </div>
        ) : (
          <p className="text-xs text-slate-500 mt-2.5 text-center">
            Completa todas las misiones del nivel para desbloquear el diploma oficial en PDF.
          </p>
        )}
      </div>

      {/* Matriz de Sellos / Estampillas (4 columns on mobile so nothing breaks!) */}
      <div className="wood-card p-4 sm:p-8">
        <h4 className="font-fun text-base sm:text-lg font-bold text-slate-800 mb-1">
          Estampillas de Misiones
        </h4>
        <p className="text-xs text-slate-500 mb-4 sm:mb-6">
          Toca cualquier estampilla para marcarla como cumplida o visita la misión para ver sus pasos.
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
          {missionsForLevel.map((m) => {
            const done = stamps.includes(m.code.toUpperCase());
            return (
              <button
                key={m.code}
                onClick={() => toggleStamp(m.code)}
                className={`p-2 sm:p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  done
                    ? "bg-amber-300/80 border-amber-400 text-amber-950 shadow-xs scale-102"
                    : "bg-amber-50/40 border-dashed border-amber-200 text-slate-400 hover:bg-amber-100/50 hover:text-amber-800"
                }`}
              >
                <span className="text-xl sm:text-2xl mb-0.5">{done ? "⭐" : "⚪"}</span>
                <span className="font-fun font-bold text-xs sm:text-xs">{m.code}</span>
                <span className="text-[9px] sm:text-[10px] truncate max-w-full leading-tight opacity-75 mt-0.5 hidden min-[360px]:block">
                  {m.title.replace(/^[A-Z0-9]+ · /, "")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
