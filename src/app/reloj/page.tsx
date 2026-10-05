"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  Maximize2,
  Minimize2,
  Clock,
  Heart,
  MessageCircle,
} from "lucide-react";

const PRESETS = [
  { minutes: 5, label: "5 min", desc: "Pausa activa o reto relámpago", color: "border-emerald-300 bg-emerald-50 text-emerald-950" },
  { minutes: 10, label: "10 min", desc: "Ruleta o misión rápida en la sala", color: "border-sky-300 bg-sky-50 text-sky-950" },
  { minutes: 15, label: "15 min", desc: "Tiempo de pantalla recomendado", color: "border-amber-300 bg-amber-50 text-amber-950" },
  { minutes: 20, label: "20 min", desc: "Laboratorio creativo en equipo", color: "border-purple-300 bg-purple-50 text-purple-950" },
  { minutes: 30, label: "30 min", desc: "Gran proyecto en familia", color: "border-rose-300 bg-rose-50 text-rose-950" },
];

const REFLECTION_QUESTIONS = [
  "¿Qué fue lo más divertido o gracioso que nos pasó jugando hoy?",
  "¿En qué momento nos equivocamos y cómo lo pudimos arreglar juntos?",
  "Si le enseñaras este juego a tu mejor amigo o a tu abuela, ¿qué le dirías primero?",
  "¿Qué superpoder de programador usamos hoy: paciencia, creatividad o dividir en pasos pequeños?",
  "¿Qué descubriste hoy que antes no sabías?",
  "¿Cuál fue el momento '¡Eureka!' o tu parte favorita de la sesión?",
  "¿Qué regla o instrucción inventarías tú para hacer el juego aún más divertido?",
  "¿Qué parte del reto te pareció más difícil al principio?",
];

/**
 * Generates a peaceful harmonic singing bowl chime using Web Audio API
 */
function playGentleChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    // Harmonic frequencies for a warm chime
    const freqs = [528, 660, 792, 1056];

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15 / (idx + 1), now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5 + idx * 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 4);
    });
  } catch (err) {
    console.warn("Audio chime unsupported:", err);
  }
}

export default function RelojDeLaSalaPage() {
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [totalSeconds, setTotalSeconds] = useState(15 * 60);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [finished, setFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setFinished(true);
            if (soundEnabled) {
              playGentleChime();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, soundEnabled]);

  const selectPreset = (mins: number) => {
    setIsRunning(false);
    setSelectedMinutes(mins);
    setTotalSeconds(mins * 60);
    setSecondsLeft(mins * 60);
    setFinished(false);
  };

  const handleToggle = () => {
    if (finished) {
      setSecondsLeft(totalSeconds);
      setFinished(false);
      setIsRunning(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
    setFinished(false);
  };

  const addMinute = (delta: number) => {
    setSecondsLeft((prev) => {
      const next = Math.max(60, Math.min(3600, prev + delta * 60));
      setTotalSeconds(next);
      return next;
    });
    setFinished(false);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % REFLECTION_QUESTIONS.length);
  };

  // Progress calculations
  const progressFraction = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const minutesDisplay = Math.floor(secondsLeft / 60);
  const secondsDisplay = secondsLeft % 60;
  const formattedTime = `${String(minutesDisplay).padStart(2, "0")}:${String(secondsDisplay).padStart(2, "0")}`;

  // SVG circular disk parameters
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressFraction);

  // Color changes from green -> amber -> soft orange as time runs out
  const diskColor =
    progressFraction > 0.5
      ? "text-emerald-500"
      : progressFraction > 0.2
      ? "text-amber-500"
      : "text-rose-500";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          Herramienta para la Sala y el Hogar
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          El Reloj de la Sala
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Un temporizador visual tranquilo (estilo Montessori) para cuidar los tiempos de juego, regular el uso de pantallas y cerrar cada sesión con una conversación en familia.
        </p>
      </div>

      {/* Main Visual Clock Card */}
      <div className="wood-card p-6 sm:p-10 bg-white border-2 border-amber-300 shadow-lg rounded-3xl flex flex-col items-center space-y-8 relative overflow-hidden">
        
        {/* Sound toggle in corner */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? "bg-amber-50 border-amber-300 text-amber-900"
                : "bg-slate-50 border-slate-200 text-slate-400"
            }`}
            title={soundEnabled ? "Campana activada al terminar" : "Silencio"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? "Campana activa" : "Silencio"}</span>
          </button>
        </div>

        {/* Visual Disk Progress */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
            {/* Background Track */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              className="text-amber-100/80 stroke-current"
              strokeWidth="20"
              fill="transparent"
            />
            {/* Animated Time Disk */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              className={`${diskColor} stroke-current transition-all duration-500 ease-linear`}
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Readout & Boty status */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-3xl sm:text-4xl">
              {finished ? "🎉" : isRunning ? "🤖" : "⏳"}
            </span>
            <div className="font-fun text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
              {formattedTime}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {finished
                ? "¡Tiempo cumplido!"
                : isRunning
                ? "Tiempo en curso"
                : "En pausa"}
            </span>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => addMinute(-1)}
            disabled={isRunning || secondsLeft <= 60}
            className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 text-xs font-bold disabled:opacity-40"
          >
            -1 min
          </button>

          <button
            onClick={handleToggle}
            className={`wood-btn px-7 py-3 text-sm sm:text-base font-bold flex items-center gap-2 shadow-md transition-all ${
              isRunning
                ? "bg-amber-400 hover:bg-amber-500 text-amber-950 scale-102"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pausar</span>
              </>
            ) : finished ? (
              <>
                <RotateCcw className="w-5 h-5" />
                <span>Reiniciar tiempo</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Comenzar</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 text-xs font-bold"
            title="Reiniciar a tiempo original"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => addMinute(1)}
            disabled={isRunning || secondsLeft >= 3600}
            className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 text-xs font-bold disabled:opacity-40"
          >
            +1 min
          </button>
        </div>

        {/* Presets Grid */}
        <div className="w-full pt-4 border-t border-amber-200/80 space-y-2">
          <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-wider">
            Tiempos recomendados para la familia:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {PRESETS.map((p) => {
              const isSelected = selectedMinutes === p.minutes;
              return (
                <button
                  key={p.minutes}
                  onClick={() => selectPreset(p.minutes)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all ${
                    isSelected
                      ? `${p.color} ring-2 ring-amber-400 shadow-sm font-bold scale-102`
                      : "bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-amber-50/50"
                  }`}
                >
                  <div className="font-fun text-sm sm:text-base font-extrabold">
                    {p.label}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                    {p.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Reflection Card (Shown on finish or available anytime) */}
      <div className={`wood-card p-6 sm:p-8 border-2 transition-all rounded-3xl space-y-4 ${
        finished
          ? "bg-amber-100/90 border-amber-400 ring-4 ring-amber-300/40 shadow-xl animate-in zoom-in-95 duration-300"
          : "bg-amber-50/50 border-amber-200 shadow-xs"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                Tarjeta de Conversación Familiar
              </h3>
              <p className="text-[11px] text-slate-500">
                {finished
                  ? "¡El tiempo terminó! Cierren la sesión haciéndose esta pregunta juntos:"
                  : "Una pregunta reflexiva para dialogar antes o después de jugar:"}
              </p>
            </div>
          </div>

          <button
            onClick={nextQuestion}
            className="wood-btn bg-white hover:bg-amber-100 text-slate-800 border border-amber-300 text-xs px-3 py-1.5 font-bold shadow-2xs self-start sm:self-auto shrink-0"
          >
            🎲 Otra pregunta
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-white/90 rounded-2xl border border-amber-200 text-center space-y-2">
          <p className="font-fun text-base sm:text-xl font-bold text-amber-950 leading-snug">
            «{REFLECTION_QUESTIONS[currentQuestionIndex]}»
          </p>
          <p className="text-xs text-slate-500">
            Escuchen la respuesta del niño sin juzgar ni calificar. Lo valioso es la reflexión.
          </p>
        </div>
      </div>

      {/* Suggested next steps */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          href="/ruleta"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs w-full sm:w-auto text-center"
        >
          🎡 Jugar en la Ruleta Familiar
        </Link>
        <Link
          href="/misiones"
          className="wood-btn bg-white hover:bg-slate-100 text-slate-800 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs border border-slate-300 w-full sm:w-auto text-center"
        >
          🗺️ Ir a las 84 Misiones
        </Link>
      </div>

    </div>
  );
}
