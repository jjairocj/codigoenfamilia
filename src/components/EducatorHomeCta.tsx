"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  GraduationCap,
  Download,
  Scissors,
  Clock,
  Target,
  ClipboardCheck,
} from "lucide-react";
import { MONTESSORI_EASINGS, prefersReducedMotion } from "@/lib/montessoriMotion";

export default function EducatorHomeCta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Gentle breathing float on badge icon
      gsap.to(".educator-badge-icon", {
        y: -3,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: MONTESSORI_EASINGS.floating,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6 sm:my-10" ref={containerRef}>
      <div
        className="p-6 sm:p-10 lg:p-12 border-2 border-indigo-200 shadow-md relative overflow-hidden rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #f0fdfa 50%, #fef3c7 100%)",
        }}
      >
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          
          {/* Header Row */}
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xs">
              <span className="educator-badge-icon inline-block text-sm">🏫</span>
              <span>Para Docentes, Colegios y Líderes de Talleres</span>
            </div>

            <h2 className="font-fun text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              ¿Enseñas en un Aula, Biblioteca o Taller Escolar?
            </h2>

            <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-medium">
              Lleva el pensamiento computacional a tus estudiantes sin necesidad de un computador por niño ni conexión permanente a internet. El <strong className="text-indigo-900 font-bold underline decoration-indigo-300 underline-offset-2">Kit del Educador</strong> te entrega herramientas pedagógicas listas para aplicar con el enfoque activo y reflexivo de María Montessori y Seymour Papert.
            </p>
          </div>

          {/* 4 Pillars Grid: Crisp White Wooden Cards with Full Opacity and Vibrant Colors */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 1: Desenchufado */}
            <div className="p-5 rounded-2xl bg-white border-2 border-teal-200 shadow-xs hover:border-teal-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl border border-teal-300 shadow-2xs">
                  ✂️
                </div>
                <h3 className="font-fun text-base font-bold text-slate-900">
                  100% Desenchufado
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Dinámicas en el patio con cinta, tarjetas impresas y bloques manipulativos. Cero costo en hardware ni pantallas obligatorias.
                </p>
              </div>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 w-fit">
                Patio & piso
              </span>
            </div>

            {/* Pillar 2: 45 Min */}
            <div className="p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl border border-amber-300 shadow-2xs">
                  ⏱️
                </div>
                <h3 className="font-fun text-base font-bold text-slate-900">
                  Estructura de 45 Min
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Plan de clase probado: 5 min de apertura sensorial, 25 min de reto en parejas, 10 min de diálogo y 5 min de síntesis.
                </p>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 w-fit">
                Plan listo
              </span>
            </div>

            {/* Pillar 3: CSTA & MEN */}
            <div className="p-5 rounded-2xl bg-white border-2 border-sky-200 shadow-xs hover:border-sky-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl border border-sky-300 shadow-2xs">
                  🎯
                </div>
                <h3 className="font-fun text-base font-bold text-slate-900">
                  CSTA K-12 & MEN
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Alineación curricular con estándares internacionales y orientaciones de tecnología e informática del MEN Colombia.
                </p>
              </div>
              <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 w-fit">
                Curricular
              </span>
            </div>

            {/* Pillar 4: Rúbricas Formativas */}
            <div className="p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-xs hover:border-purple-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center text-xl border border-purple-300 shadow-2xs">
                  📋
                </div>
                <h3 className="font-fun text-base font-bold text-slate-900">
                  Rúbricas Formativas
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Evaluación cualitativa por observación directa en 3 dimensiones sin exámenes de memoria que generen ansiedad.
                </p>
              </div>
              <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 w-fit">
                Observación
              </span>
            </div>

          </div>

          {/* Action Buttons & Family Bridge Quote */}
          <div className="pt-3 flex flex-col lg:flex-row items-center justify-between gap-5 border-t border-indigo-200/80">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <Link
                href="/educadores"
                className="wood-btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto transition-transform hover:scale-[1.02]"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Explorar el Kit del Educador ➔</span>
              </Link>
              <Link
                href="/descargas"
                className="wood-btn bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 px-5 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto shadow-xs"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Descargar Materiales de Aula (PDF)</span>
              </Link>
            </div>

            <div className="text-xs sm:text-sm text-indigo-950 font-semibold bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-indigo-200 shadow-2xs text-center lg:text-right max-w-md">
              🤝 «El puente perfecto entre la escuela y el hogar: cuando un niño supera un reto en clase, se lleva la curiosidad para resolver misiones con su familia el fin de semana.»
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
