"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import missionsData from "@/data/missions.json";
import MissionCard from "@/components/MissionCard";
import { usePassport } from "@/context/PassportContext";
import { Search, Compass, Hand, Smartphone, Laptop, Filter } from "lucide-react";

function MissionsContent() {
  const searchParams = useSearchParams();
  const initialLevel = searchParams.get("nivel") || "todos";

  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel);
  const [selectedMode, setSelectedMode] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { stamps } = usePassport();

  const filteredMissions = useMemo(() => {
    return missionsData.filter((m) => {
      // Level filter
      if (selectedLevel !== "todos" && m.level !== selectedLevel) {
        return false;
      }

      // Mode filter
      if (selectedMode === "sin-pantalla") {
        const isNoScreen = m.tags.some((t) => t.includes("sin-pantalla") || t.includes("desenchufado"));
        if (!isNoScreen) return false;
      } else if (selectedMode === "celular") {
        const isMobile = m.tags.some((t) => t.includes("celular") || t.includes("scratchjr"));
        if (!isMobile) return false;
      } else if (selectedMode === "computador") {
        const isComputer = m.tags.some((t) => t.includes("computador") || t.includes("scratch") || t.includes("python"));
        if (!isComputer) return false;
      }

      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchCode = m.code.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchTags = m.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchCode && !matchDesc && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedLevel, selectedMode, searchQuery]);

  const levelStats = useMemo(() => {
    return {
      semillas: missionsData.filter((m) => m.level === "semillas").length,
      exploradores: missionsData.filter((m) => m.level === "exploradores").length,
      inventores: missionsData.filter((m) => m.level === "inventores").length,
      creadores: missionsData.filter((m) => m.level === "creadores").length,
    };
  }, []);

  const completionPercent = Math.round((stamps.length / missionsData.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* Header & Global Progress */}
      <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-sky-100 rounded-3xl p-5 sm:p-8 border-2 border-amber-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 text-center md:text-left w-full md:w-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-800 text-[11px] sm:text-xs font-bold shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              Catálogo de Misiones Guiadas
            </div>
            <h1 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-800 break-words">
              Las 84 Misiones de Código en Familia
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Selecciona una misión según la edad, el dispositivo o el concepto que deseen explorar hoy. ¡Cada reto completado es un sello para el pasaporte!
            </p>
          </div>

          {/* Progress pill */}
          <div className="bg-white/95 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-amber-300 shadow-sm text-center w-full sm:w-auto min-w-[200px] shrink-0">
            <div className="text-2xl sm:text-3xl font-extrabold font-fun text-amber-600">
              {stamps.length} <span className="text-sm sm:text-base text-slate-400 font-normal">/ 84</span>
            </div>
            <div className="text-xs font-bold text-slate-700 mt-0.5">
              Sellos Conseguidos ({completionPercent}%)
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="wood-card p-4 sm:p-5 space-y-4">
        
        {/* Level Tabs (Smooth Horizontal Swipe on Mobile) */}
        <div>
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pb-1.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
            <button
              onClick={() => setSelectedLevel("todos")}
              className={`wood-btn text-xs py-2 px-3 shrink-0 ${
                selectedLevel === "todos"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Todos ({missionsData.length})
            </button>
            <button
              onClick={() => setSelectedLevel("semillas")}
              className={`wood-btn text-xs py-2 px-3 shrink-0 ${
                selectedLevel === "semillas"
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200"
              }`}
            >
              🌱 Semillas (4-6 a) · {levelStats.semillas}
            </button>
            <button
              onClick={() => setSelectedLevel("exploradores")}
              className={`wood-btn text-xs py-2 px-3 shrink-0 ${
                selectedLevel === "exploradores"
                  ? "bg-sky-500 text-white"
                  : "bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200"
              }`}
            >
              🧭 Exploradores (7-9 a) · {levelStats.exploradores}
            </button>
            <button
              onClick={() => setSelectedLevel("inventores")}
              className={`wood-btn text-xs py-2 px-3 shrink-0 ${
                selectedLevel === "inventores"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200"
              }`}
            >
              🔬 Inventores (10-12 a) · {levelStats.inventores}
            </button>
            <button
              onClick={() => setSelectedLevel("creadores")}
              className={`wood-btn text-xs py-2 px-3 shrink-0 ${
                selectedLevel === "creadores"
                  ? "bg-amber-500 text-white"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
              }`}
            >
              🚀 Creadores (13-15 a) · {levelStats.creadores}
            </button>
          </div>
        </div>

        {/* Second Row: Mode Pills & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          {/* Mode Pills (Horizontal Swipe on Mobile) */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-1.5 pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Modo:
            </span>
            <button
              onClick={() => setSelectedMode("todos")}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                selectedMode === "todos"
                  ? "bg-slate-700 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              Cualquiera
            </button>
            <button
              onClick={() => setSelectedMode("sin-pantalla")}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold shrink-0 flex items-center gap-1 transition-colors ${
                selectedMode === "sin-pantalla"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
              }`}
            >
              <Hand className="w-3 h-3" /> Sin pantalla
            </button>
            <button
              onClick={() => setSelectedMode("celular")}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold shrink-0 flex items-center gap-1 transition-colors ${
                selectedMode === "celular"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-50 hover:bg-sky-100 text-sky-800"
              }`}
            >
              <Smartphone className="w-3 h-3" /> Celular
            </button>
            <button
              onClick={() => setSelectedMode("computador")}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold shrink-0 flex items-center gap-1 transition-colors ${
                selectedMode === "computador"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-50 hover:bg-purple-100 text-purple-800"
              }`}
            >
              <Laptop className="w-3 h-3" /> Computador
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código o nombre..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

        </div>

      </div>

      {/* Missions Grid */}
      {filteredMissions.length === 0 ? (
        <div className="wood-card p-8 sm:p-12 text-center space-y-3 bg-white">
          <div className="text-4xl">🔍</div>
          <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800">
            No encontramos misiones con esos filtros
          </h3>
          <p className="text-xs text-slate-500">
            Intenta cambiar los filtros o el término de búsqueda.
          </p>
          <button
            onClick={() => {
              setSelectedLevel("todos");
              setSelectedMode("todos");
              setSearchQuery("");
            }}
            className="wood-btn bg-amber-400 text-amber-950 text-xs px-4 py-2 font-bold mt-2"
          >
            Ver todas las 84 misiones
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}

    </div>
  );
}

export default function MissionsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-fun text-slate-400">Cargando misiones...</div>}>
      <MissionsContent />
    </Suspense>
  );
}
