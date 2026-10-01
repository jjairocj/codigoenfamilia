"use client";

import React, { useState, useMemo } from "react";
import conceptsData from "@/data/concepts.json";
import { BookOpen, Search, Sparkles, HeartHandshake, Compass, Home, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface Concept {
  id: string;
  title: string;
  description: string;
  body: string;
}

export default function ConceptosPage() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredConcepts = useMemo(() => {
    if (!search.trim()) return conceptsData;
    const q = search.toLowerCase();
    return conceptsData.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
          <BookOpen className="w-4 h-4 text-teal-600" />
          Glosario de Pensamiento Computacional
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          29 Conceptos Clave Explicados para Niños
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Sin tecnicismos aburridos ni fórmulas difíciles. Cada concepto tiene una analogía con la vida diaria (recetas, juguetes, semáforos) y una guía especial para adultos.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar concepto (ej: bucle, variable, bug, algoritmo)..."
          className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
        />
      </div>

      {/* Concepts List / Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredConcepts.map((concept) => {
          const isExpanded = expandedId === concept.id;
          return (
            <div
              key={concept.id}
              className={`wood-card p-6 border-2 transition-all ${
                isExpanded ? "border-teal-400 bg-teal-50/20" : "border-slate-200 hover:border-teal-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-fun text-lg font-bold text-slate-800">
                    {concept.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {concept.description}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-teal-600 hover:bg-teal-50 shrink-0"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Collapsed snippet or full markdown body */}
              {isExpanded ? (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in">
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed bg-white/80 p-4 rounded-2xl border border-slate-200 max-h-80 overflow-y-auto">
                    {concept.body}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Link
                      href="/misiones"
                      className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                    >
                      <Compass className="w-3.5 h-3.5" /> Ver misiones donde se aplica
                    </Link>
                    <button
                      onClick={() => setExpandedId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setExpandedId(concept.id)}
                  className="mt-4 text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  Leer explicación completa ➔
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
