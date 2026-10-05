"use client";

import NarratorButton from "@/components/NarratorButton";

import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { montessoriTactileBounce, montessoriSuccessPulse, montessoriStaggerEntrance, prefersReducedMotion } from "@/lib/montessoriMotion";
import Link from "next/link";
import { usePassport } from "@/context/PassportContext";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import MissionMinigame from "./MissionMinigame";
import {
  Star,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Clock,
  Laptop,
  Smartphone,
  Hand,
  HeartHandshake,
  CheckSquare,
  Square,
  Sparkles,
  HelpCircle,
  Award,
  AlertCircle,
  MessageCircle,
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

const LEVEL_INFO: Record<
  string,
  { label: string; age: string; color: string; badge: string }
> = {
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

/**
 * Rich FormattedText component
 * Replaces **bold**, *italic*, `code`, and [links](url) with styled React elements.
 */
function FormattedText({ text }: { text: string }) {
  if (!text) return null;

  // Split text by markdown tokens: **bold**, `code`, [link](url)
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={index}
              className="font-bold text-slate-900 bg-amber-100/60 px-1 py-0.5 rounded"
            >
              <FormattedText text={part.slice(2, -2)} />
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="italic text-slate-800">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 font-mono text-xs border border-amber-200"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, linkText, linkUrl] = linkMatch;
          const isInternal = linkUrl.startsWith("/");
          return isInternal ? (
            <Link
              key={index}
              href={linkUrl}
              className="text-amber-800 font-bold underline underline-offset-2 hover:text-amber-950 transition-colors inline-flex items-center gap-0.5"
            >
              <FormattedText text={linkText} />
            </Link>
          ) : (
            <a
              key={index}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 font-bold underline underline-offset-2 hover:text-amber-950 transition-colors inline-flex items-center gap-0.5"
            >
              <FormattedText text={linkText} />
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

/**
 * Parses markdown body into clean dictionary of sections
 */
function parseMissionBody(body: string) {
  if (!body) return {};
  // Strip top quote and H1 if present
  let clean = body
    .replace(/^>\s*🎯[^\n]+\n+(?:\{[^\}]+\}\n+)?/m, "")
    .replace(/^#\s+[^\n]+\n+/m, "")
    .replace(/\n---\n+>\s*👩‍👧\s*\*\*Para el adulto\*\*[\s\S]*$/, "")
    .replace(/⬅️\s*\[Volver al nivel[^\]]+\]\([^)]+\)/g, "")
    .replace(/\{(\.is-[a-z]+)\}/g, "")
    .trim();

  const sections: Record<string, string> = {};
  let currentKey = "intro";
  const buffer: string[] = [];

  for (const line of clean.split("\n")) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (buffer.length > 0) {
        sections[currentKey] = buffer.join("\n").trim();
        buffer.length = 0;
      }
      currentKey = match[1].trim();
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    sections[currentKey] = buffer.join("\n").trim();
  }

  return sections;
}

/**
 * Parses adult box markdown into structured pedagogical entries
 */
function parseAdultBox(text?: string) {
  if (!text) return null;
  const clean = text
    .replace(/^>\s*/gm, "")
    .replace(/\{[^\}]+\}/g, "")
    .replace(/⬅️\s*\[Volver al nivel[^\]]+\]\([^)]+\)/g, "")
    .replace(/^#+.*$/gm, "")
    .trim();

  const entries: { title: string; content: string }[] = [];
  const regex = /\*\*([^*]+)\:\*\*\s*([\s\S]*?)(?=(\*\*[^*]+\:\*\*|$))/g;
  let match;

  while ((match = regex.exec(clean)) !== null) {
    const title = match[1].trim();
    const content = match[2].trim();
    if (title && content) {
      entries.push({ title, content });
    }
  }

  return entries.length > 0 ? entries : null;
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
  const lvl = LEVEL_INFO[mission.level] || LEVEL_INFO.semillas;

  const missionContainerRef = useRef<HTMLDivElement>(null);

  // Interactive Step Completion Tracker
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Interactive Checklist State for Materials
  const [checkedMaterials, setCheckedMaterials] = useState<Record<number, boolean>>({});

  // Montessori GSAP Entrance Stagger
  useEffect(() => {
    if (prefersReducedMotion() || !missionContainerRef.current) return;
    const ctx = gsap.context(() => {
      montessoriStaggerEntrance(".mission-task-card", {
        stagger: 0.06,
        yOffset: 16,
        duration: 0.55,
      });
    }, missionContainerRef);
    return () => ctx.revert();
  }, [mission.id]);

  const toggleStep = (stepNumber: number, e: React.MouseEvent<HTMLButtonElement>) => {
    sound.click();
    const nextState = !completedSteps[stepNumber];
    montessoriTactileBounce(e.currentTarget);
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: nextState,
    }));

    // If all steps now marked, soft celebratory pulse
    if (nextState && stepsList.length > 0) {
      const allDone = stepsList.every((s) => (s.number === stepNumber ? true : !!completedSteps[s.number]));
      if (allDone) {
        sound.chime();
        montessoriSuccessPulse(missionContainerRef.current);
      }
    }
  };

  const toggleMaterial = (index: number, e?: React.MouseEvent<HTMLElement>) => {
    sound.click();
    if (e?.currentTarget) {
      montessoriTactileBounce(e.currentTarget);
    }
    setCheckedMaterials((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isNoScreen = mission.tags.some(
    (t) => t.includes("sin-pantalla") || t.includes("desenchufado")
  );
  const isMobile = mission.tags.some(
    (t) => t.includes("celular") || t.includes("scratchjr")
  );
  const isComputer = mission.tags.some(
    (t) =>
      t.includes("computador") || t.includes("scratch") || t.includes("python")
  );

  const isMicrobitMission =
    mission.id.startsWith("i17") ||
    mission.id.startsWith("i18") ||
    mission.id.startsWith("i19") ||
    mission.id.startsWith("i20") ||
    mission.body.toLowerCase().includes("micro:bit");

  const isScratchMission =
    mission.level === "exploradores" ||
    mission.id.startsWith("e") ||
    (mission.id.startsWith("i") && ["i01", "i02", "i03", "i04", "i05", "i06"].includes(mission.id)) ||
    mission.body.toLowerCase().includes("scratch.mit.edu");

  const sections = useMemo(() => parseMissionBody(mission.body), [mission.body]);
  const adultEntries = useMemo(() => parseAdultBox(mission.adultBox), [mission.adultBox]);

  const handleStampClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    sound.stamp();
    if (e?.currentTarget) {
      montessoriTactileBounce(e.currentTarget);
    }
    toggleStamp(mission.code);
    if (missionContainerRef.current && !done) {
      montessoriSuccessPulse(missionContainerRef.current);
    }
    if (!done) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#10b981", "#38bdf8", "#ec4899"],
      });
    }
  };

  // Extract materials list from sections
  const materialsList = useMemo(() => {
    const raw = sections["🧰 Qué necesitas"] || "";
    return raw
      .split("\n")
      .map((l) => l.replace(/^[-*•]\s*/, "").trim())
      .filter((l) => l.length > 0);
  }, [sections]);

  // Extract steps from sections
  const stepsList = useMemo(() => {
    const raw = sections["👣 Paso a paso"] || "";
    const steps: { number: number; text: string }[] = [];
    const lines = raw.split("\n");
    let currentStep: { number: number; text: string } | null = null;

    for (const line of lines) {
      const stepMatch = line.match(/^(\d+)\.\s*(.+)$/);
      if (stepMatch) {
        if (currentStep) steps.push(currentStep);
        currentStep = {
          number: parseInt(stepMatch[1], 10),
          text: stepMatch[2].trim(),
        };
      } else if (currentStep && line.trim()) {
        currentStep.text += " " + line.trim();
      }
    }
    if (currentStep) steps.push(currentStep);
    return steps;
  }, [sections]);

  return (
    <div ref={missionContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto pb-1 no-scrollbar">
        <Link href="/" className="hover:text-amber-800 transition-colors shrink-0">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/misiones" className="hover:text-amber-800 transition-colors shrink-0">
          Misiones
        </Link>
        <span>/</span>
        <Link
          href={`/misiones?nivel=${mission.level}`}
          className="hover:text-amber-800 transition-colors shrink-0 capitalize"
        >
          {lvl.label}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-bold shrink-0">{mission.code}</span>
      </nav>

      {/* Hero Header Card */}
      <div
        className={`wood-card p-5 sm:p-8 bg-gradient-to-br ${lvl.color} border-2 shadow-sm`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-3 flex-1">
            {/* Badges Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-fun text-xs font-bold px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 shadow-2xs">
                Misión {mission.code}
              </span>
              <span
                className={`font-fun text-xs font-bold px-3 py-1 rounded-full border ${lvl.badge}`}
              >
                Nivel {lvl.label} ({lvl.age})
              </span>

              {isNoScreen && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center gap-1">
                  <Hand className="w-3.5 h-3.5" /> Sin pantalla
                </span>
              )}
              {isMobile && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-200 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" /> En Celular
                </span>
              )}
              {isComputer && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5" /> Computador
                </span>
              )}

              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-full border border-slate-200/60">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> 20–30 min
              </span>
            </div>

            {/* Clean Title */}
            <h1 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {mission.title.replace(/^[A-Z0-9]+ · /, "")}
            </h1>
            <p className="text-xs sm:text-base text-slate-700 leading-relaxed max-w-3xl font-medium">
              {mission.description}
            </p>

            <div className="pt-1">
              <NarratorButton
                title={mission.title.replace(/^[A-Z0-9]+ · /, "")}
                text={`${mission.description}. ${sections["🗺️ Tu misión"] || ""}. ${sections["💡 La gran idea"] || ""}`}
              />
            </div>
          </div>

          {/* Stamp Action Button */}
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={(e) => handleStampClick(e)}
              className={`w-full md:w-auto wood-btn px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                done
                  ? "bg-amber-300 hover:bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-102"
                  : "bg-white hover:bg-amber-50 text-slate-800 border-amber-300 shadow-sm"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${
                  done ? "bg-amber-400" : "bg-amber-100"
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    done ? "fill-amber-950 text-amber-950" : "text-amber-600"
                  }`}
                />
              </div>
              <div className="text-left">
                <div className="font-fun text-xs sm:text-sm font-bold">
                  {done ? "¡Misión Cumplida!" : "Completar Misión"}
                </div>
                <div className="text-[10px] opacity-80">
                  {done
                    ? "Sello estampado en tu Pasaporte"
                    : "Toca aquí para ganar tu sello ⭐"}
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid: Left child/family journey | Right adult guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: Clean Visual Mission Sections */}
        <div className="lg:col-span-7 space-y-6">

          {/* Interactive Tool Banner for micro:bit */}
          {isMicrobitMission && (
            <div className="wood-card p-4 sm:p-5 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-amber-500/10 border-2 border-emerald-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  🎛️
                </div>
                <div>
                  <div className="font-fun text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                    Simulador Virtual micro:bit v2
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      En Vivo
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Prueba la matriz LED 5×5, botones A y B, y sonido directamente aquí sin instalar nada.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto shrink-0">
                <Link
                  href="/microbit"
                  className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2 px-3.5 flex items-center justify-center gap-1.5 shadow-sm flex-1 sm:flex-none"
                >
                  <span>▶️</span> Abrir Simulador
                </Link>
                <Link
                  href="/herramientas/microbit"
                  className="wood-btn bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-2 px-3 border-slate-300 flex items-center justify-center gap-1 flex-1 sm:flex-none"
                >
                  <span>📖</span> Guía
                </Link>
              </div>
            </div>
          )}

          {/* Interactive Tool Banner for Scratch */}
          {isScratchMission && (
            <div className="wood-card p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-2 border-amber-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  🐱
                </div>
                <div>
                  <div className="font-fun text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                    Laboratorio Scratch 3.0
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-400">
                      Interactúa
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Encaja bloques como Lego, haz saltar al gatito y prueba la bandera verde en nuestro simulador.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto shrink-0">
                <Link
                  href="/scratch"
                  className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs py-2 px-3.5 flex items-center justify-center gap-1.5 shadow-sm flex-1 sm:flex-none"
                >
                  <span>🚩</span> Abrir Laboratorio
                </Link>
                <Link
                  href="/herramientas/scratch"
                  className="wood-btn bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-2 px-3 border-slate-300 flex items-center justify-center gap-1 flex-1 sm:flex-none"
                >
                  <span>📖</span> Guía
                </Link>
              </div>
            </div>
          )}

          {/* 1. TU MISIÓN */}
          {sections["🗺️ Tu misión"] && (
            <div className="wood-card p-5 sm:p-7 bg-white border-2 border-amber-200/70 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
                <span className="text-2xl">🗺️</span>
                <h2 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                  Tu Misión de Hoy
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                {sections["🗺️ Tu misión"].split("\n\n").map((para, i) => (
                  <p key={i}>
                    <FormattedText text={para} />
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 2. QUÉ NECESITAS (Interactive Checklist) */}
          {materialsList.length > 0 && (
            <div className="wood-card p-5 sm:p-7 bg-white border-2 border-sky-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-sky-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧰</span>
                  <h2 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                    Qué Necesitas en Casa
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                  Checklist interactivo
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Revisa los materiales juntos y marca las casillas a medida que los tengan listos:
              </p>
              <div className="space-y-2 pt-1">
                {materialsList.map((item, idx) => {
                  const isChecked = !!checkedMaterials[idx];
                  return (
                    <div
                      key={idx}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest("a") || target.closest("button")) return;
                        toggleMaterial(idx, e);
                      }}
                      className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50/70 border-emerald-300 text-slate-800"
                          : "bg-slate-50/60 hover:bg-sky-50/50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMaterial(idx, e);
                        }}
                        aria-label={isChecked ? "Desmarcar material" : "Marcar material listo"}
                        className="focus:outline-hidden shrink-0"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <span
                        className={`text-xs sm:text-sm leading-snug flex-1 ${
                          isChecked ? "line-through text-slate-400 font-medium" : "font-medium"
                        }`}
                      >
                        <FormattedText text={item} />
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Descargables y Materiales recomendados */}
              <div className="pt-3 border-t border-sky-100 flex flex-wrap gap-2 text-xs">
                <a
                  href={`/downloads/pasaporte-${mission.level}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wood-btn text-[11px] px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300 font-bold flex items-center gap-1.5"
                >
                  <span>📘</span> Pasaporte ({lvl.label})
                </a>
                <a
                  href="/downloads/materiales-sin-pantalla.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wood-btn text-[11px] px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 font-bold flex items-center gap-1.5"
                >
                  <span>✂️</span> Recortables y Fichas (PDF)
                </a>
                <Link
                  href="/descargas"
                  className="wood-btn text-[11px] px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-bold flex items-center gap-1.5"
                >
                  <span>🖨️</span> Ver los 12 PDFs
                </Link>
              </div>
            </div>
          )}

          {/* 3. PASO A PASO (Numbered Cards) */}
          {stepsList.length > 0 ? (
            <div className="mission-task-card wood-card p-5 sm:p-7 bg-white border-2 border-amber-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
                <span className="text-2xl">👣</span>
                <h2 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                  Paso a Paso en Familia
                </h2>
              </div>
              <div className="space-y-3 pt-1">
                {stepsList.map((step) => {
                  const isStepDone = !!completedSteps[step.number];
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={(e) => toggleStep(step.number, e)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isStepDone
                          ? "bg-emerald-50/80 border-emerald-300 shadow-2xs"
                          : "bg-amber-50/40 hover:bg-amber-100/60 border-amber-200/70"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-fun font-bold flex items-center justify-center shrink-0 text-xs sm:text-sm shadow-2xs transition-colors ${
                          isStepDone
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-400 text-amber-950"
                        }`}
                      >
                        {isStepDone ? <CheckCircle2 className="w-4 h-4 text-white" /> : step.number}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium pt-0.5 flex-1">
                        <span className={isStepDone ? "line-through text-slate-400" : ""}>
                          <FormattedText text={step.text} />
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 shrink-0 self-center hidden sm:inline">
                        {isStepDone ? "¡Completado! ✓" : "Toca para marcar"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            sections["👣 Paso a paso"] && (
              <div className="wood-card p-5 sm:p-7 bg-white border-2 border-amber-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
                  <span className="text-2xl">👣</span>
                  <h2 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                    Paso a Paso en Familia
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                  <FormattedText text={sections["👣 Paso a paso"]} />
                </div>
              </div>
            )
          )}

          {/* MINIJUEGO INTERACTIVO DE LA MISIÓN */}
          <MissionMinigame mission={mission} />

          {/* 4. RETO EXTRA (Golden Bonus Box) */}
          {sections["🏆 Reto extra"] && (
            <div className="mission-task-card wood-card p-5 sm:p-6 bg-gradient-to-br from-amber-50 to-yellow-100/50 border-2 border-amber-300 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 pb-1 border-b border-amber-200">
                <Award className="w-5 h-5 text-amber-700" />
                <h3 className="font-fun text-sm sm:text-base font-bold text-amber-950">
                  🏆 Reto Extra de Exploración
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                <FormattedText text={sections["🏆 Reto extra"]} />
              </div>
            </div>
          )}

          {/* 5. SI ALGO NO FUNCIONA (Debugging / Depuración) */}
          {sections["🐞 Si algo no funciona"] && (
            <div className="mission-task-card wood-card p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 pb-1 border-b border-emerald-200">
                <AlertCircle className="w-5 h-5 text-emerald-700" />
                <h3 className="font-fun text-sm sm:text-base font-bold text-emerald-950">
                  🐞 Si algo no funciona (¡Hora de depurar!)
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                <FormattedText text={sections["🐞 Si algo no funciona"]} />
              </div>
            </div>
          )}

          {/* 6. MUÉSTRASELO A TU ADULTO */}
          {sections["💬 Muéstraselo a tu adulto"] && (
            <div className="mission-task-card wood-card p-5 sm:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 pb-1 border-b border-purple-200">
                <MessageCircle className="w-5 h-5 text-purple-700" />
                <h3 className="font-fun text-sm sm:text-base font-bold text-purple-950">
                  💬 Muéstraselo a tu Familia
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
                <FormattedText text={sections["💬 Muéstraselo a tu adulto"]} />
              </div>
            </div>
          )}

          {/* Bottom Stamp Button Reminder */}
          <div className="wood-card p-4 sm:p-5 bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2
                className={`w-5 h-5 ${done ? "text-emerald-500" : "text-slate-300"}`}
              />
              <span>
                {done
                  ? "¡Esta misión ya está completada en tu pasaporte!"
                  : "¿Terminaron la misión? Estampa tu sello para avanzar."}
              </span>
            </div>
            <button
              onClick={handleStampClick}
              className={`wood-btn text-xs py-2.5 px-5 w-full sm:w-auto font-bold ${
                done
                  ? "bg-slate-100 text-slate-600 border-slate-300"
                  : "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-xs"
              }`}
            >
              <Star
                className={`w-4 h-4 ${done ? "fill-slate-600" : "fill-amber-950"}`}
              />
              {done ? "Desmarcar Sello" : "¡Marcar Sello Cumplido!"}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Dedicated Pedagogical Adult Companion Guide */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="wood-card p-5 sm:p-7 bg-amber-50/90 border-2 border-amber-300 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-amber-200">
              <HeartHandshake className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <h3 className="font-fun text-sm sm:text-base font-bold text-amber-950">
                  Guía para el Adulto Acompañante
                </h3>
                <p className="text-[11px] text-amber-800">
                  Tu rol es guiar con preguntas, no dar la respuesta.
                </p>
              </div>
            </div>

            {adultEntries && adultEntries.length > 0 ? (
              <div className="space-y-4">
                {adultEntries.map((entry, idx) => {
                  let icon = "💡";
                  let badgeBg = "bg-amber-100 text-amber-900 border-amber-300";

                  if (entry.title.includes("Objetivo")) {
                    icon = "🎯";
                    badgeBg = "bg-emerald-100 text-emerald-900 border-emerald-300";
                  } else if (entry.title.includes("Antes de empezar")) {
                    icon = "📋";
                    badgeBg = "bg-sky-100 text-sky-900 border-sky-300";
                  } else if (entry.title.includes("Preguntas")) {
                    icon = "❓";
                    badgeBg = "bg-purple-100 text-purple-900 border-purple-300";
                  } else if (entry.title.includes("atasca")) {
                    icon = "🤝";
                    badgeBg = "bg-rose-100 text-rose-900 border-rose-300";
                  } else if (entry.title.includes("Sello")) {
                    icon = "⭐";
                    badgeBg = "bg-amber-200 text-amber-950 border-amber-400";
                  } else if (entry.title.includes("Conceptos")) {
                    icon = "🧠";
                    badgeBg = "bg-indigo-100 text-indigo-900 border-indigo-300";
                  }

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/80 space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center gap-1.5 font-fun text-xs font-bold text-slate-800">
                        <span className="text-sm">{icon}</span>
                        <span className="capitalize">{entry.title}</span>
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed font-medium">
                        <FormattedText text={entry.content} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-amber-950 leading-relaxed whitespace-pre-line">
                Acompaña al niño observando su proceso con serenidad. Haz preguntas
                en lugar de darle la respuesta directa («¿Qué crees que pasará si
                cambiamos esta orden?»). El error es una pista valiosa para aprender
                a depurar.
              </p>
            )}
          </div>

          {/* Navigation between missions */}
          <div className="wood-card p-5 bg-white border-2 border-slate-200 space-y-3">
            <h4 className="font-fun text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Navegación del Programa
            </h4>

            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-2.5 pt-1">
              {prevMission ? (
                <Link
                  href={`/misiones/${prevMission.id}`}
                  className="flex-1 p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-left transition-colors group"
                >
                  <div className="text-[10px] text-slate-400 group-hover:text-amber-800 flex items-center gap-1 font-bold">
                    <ArrowLeft className="w-3 h-3" /> Misión Anterior
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
                  className="flex-1 p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200 text-left sm:text-right transition-colors group"
                >
                  <div className="text-[10px] text-amber-800 flex items-center sm:justify-end gap-1 font-bold">
                    Siguiente Misión <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="font-fun text-xs font-bold text-amber-950 truncate mt-0.5">
                    {nextMission.code} · {nextMission.title.replace(/^[A-Z0-9]+ · /, "")}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/pasaporte"
                  className="flex-1 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-center sm:text-right transition-colors"
                >
                  <div className="text-[10px] text-emerald-800 font-bold">
                    ¡Fin del Nivel! 🏆
                  </div>
                  <div className="font-fun text-xs font-bold text-emerald-950 truncate mt-0.5">
                    Ver mi Pasaporte
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
