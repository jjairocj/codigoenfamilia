"use client";

import React, { useState, useMemo } from "react";
import conceptsData from "@/data/concepts.json";
import missionsData from "@/data/missions.json";
import { BookOpen, Search, Compass, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Concept {
  id: string;
  title: string;
  description: string;
  body: string;
}

export default function ConceptosPage() {
  const [search, setSearch] = useState("");

  // Map of concept id to mission count
  const missionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of conceptsData) {
      const related = missionsData.filter((m) => {
        const tagMatch = m.tags.some(
          (t) => t.includes(c.id) || t.replace("concepto-", "") === c.id
        );
        const bodyMatch =
          m.body.toLowerCase().includes(`/conceptos/${c.id}`) ||
          (m.adultBox && m.adultBox.toLowerCase().includes(`/conceptos/${c.id}`));
        return tagMatch || bodyMatch;
      });
      counts[c.id] = related.length;
    }
    return counts;
  }, []);

  const filteredConcepts = useMemo(() => {
    if (!search.trim()) return conceptsData;
    const q = search.toLowerCase();
    return conceptsData.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
          <BookOpen className="w-4 h-4 text-teal-700" />
          Glosario de Pensamiento Computacional
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          29 Conceptos Clave Explicados para Niños
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
          Sin tecnicismos aburridos ni fórmulas difíciles. Cada concepto incluye analogías de la vida diaria (recetas, juguetes, semáforos), progresión por edades y misiones prácticas.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar concepto (ej: bucle, variable, algoritmo, condicional)..."
          className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
        />
      </div>

      {/* Concepts Grid: Clean cards navigating to dedicated pages */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredConcepts.map((concept) => {
          const count = missionCounts[concept.id] || 0;
          return (
            <Link
              key={concept.id}
              href={`/conceptos/${concept.id}`}
              className="wood-card p-5 sm:p-6 border-2 border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between group bg-white"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    Concepto
                  </span>
                  {count > 0 && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {count} misiones
                    </span>
                  )}
                </div>

                <h2 className="font-fun text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {concept.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
                  {concept.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Explorar concepto didáctico</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-teal-600" />
              </div>
            </Link>
          );
        })}
      </div>

      {filteredConcepts.length === 0 && (
        <div className="text-center py-12 text-slate-500 space-y-2">
          <p className="text-sm font-bold">No se encontraron conceptos para &quot;{search}&quot;</p>
          <button
            onClick={() => setSearch("")}
            className="text-xs text-teal-600 font-bold hover:underline"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

    </div>
  );
}
