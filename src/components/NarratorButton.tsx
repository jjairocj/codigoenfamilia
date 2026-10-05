"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Pause, Play, Square, Sparkles } from "lucide-react";

interface NarratorButtonProps {
  title?: string;
  text: string;
  intro?: string;
  compact?: boolean;
  className?: string;
}

/**
 * Cleans markdown formatting, links, emojis and technical symbols
 * so speech synthesis reads naturally in Spanish for children.
 */
function cleanTextForSpeech(raw: string): string {
  if (!raw) return "";
  return raw
    // Remove markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove bold/italics **text** or *text*
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    // Remove inline code
    .replace(/`([^`]+)`/g, "$1")
    // Remove markdown headings ##, ###
    .replace(/^#+\s+/gm, "")
    // Replace bullet points with pauses
    .replace(/^-\s+/gm, ". ")
    // Replace numbered lists with natural words
    .replace(/^(\d+)\.\s+/gm, "Paso $1: ")
    // Remove quotes
    .replace(/^>\s*/gm, "")
    // Replace common emojis with empty or pause
    .replace(/[🤖🌱🧭🔬🚀💡🖨️🎡🧩📟🐍⭐🎯🎉✅❌📌🧵📐✂️📦🔍👀]/g, " ")
    // Normalize multiple spaces and dots
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/\.+/g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

export default function NarratorButton({
  title,
  text,
  intro,
  compact = false,
  className = "",
}: NarratorButtonProps) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Look for Spanish voices, prioritizing Latin America/Colombia
        const esVoices = voices.filter((v) => v.lang.startsWith("es"));
        const bestVoice =
          esVoices.find((v) => v.lang.includes("CO") || v.lang.includes("419")) ||
          esVoices.find((v) => v.lang.includes("MX")) ||
          esVoices.find((v) => v.lang.includes("ES")) ||
          esVoices[0] ||
          null;
        setSelectedVoice(bestVoice);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  const handlePlay = () => {
    if (!supported || typeof window === "undefined") return;

    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      setSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    const clean = cleanTextForSpeech(text);
    const fullText = [
      intro || (title ? `¡Hola! Vamos a escuchar: ${title}.` : "¡Hola! Escuchemos juntos esta misión:"),
      clean,
      "¡Mucho éxito con este reto!",
    ].join(" ");

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = selectedVoice?.lang || "es-ES";
    if (selectedVoice) utterance.voice = selectedVoice;

    // Friendly, clear cadence for kids
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      setSpeaking(false);
      setPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setPaused(true);
      setSpeaking(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
    }
  };

  // always show button

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {!speaking && !paused ? (
          <button
            onClick={handlePlay}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition-colors shadow-2xs"
            title="Escuchar con Boty (Modo Narrador)"
            aria-label="Escuchar en voz alta"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            <span>Escuchar</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1 bg-amber-200/90 border border-amber-400 rounded-full px-2 py-0.5">
            {speaking ? (
              <button
                onClick={handlePause}
                className="p-1 text-amber-950 hover:text-amber-800"
                title="Pausar lectura"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="p-1 text-amber-950 hover:text-amber-800"
                title="Reanudar"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            )}
            <button
              onClick={handleStop}
              className="p-1 text-rose-700 hover:text-rose-900"
              title="Detener"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-amber-50/90 border-2 border-amber-200/90 shadow-xs transition-all ${
        speaking ? "ring-2 ring-amber-400 bg-amber-100/80" : ""
      } ${className}`}
    >
      {!speaking && !paused ? (
        <button
          onClick={handlePlay}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs sm:text-sm shadow-2xs transition-transform active:scale-95"
          aria-label="Escuchar con Boty"
        >
          <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-xs">
            🤖
          </div>
          <Volume2 className="w-4 h-4 text-amber-900" />
          <span>Escuchar con Boty</span>
        </button>
      ) : (
        <div className="flex items-center gap-2 px-2 py-1">
          {/* Animated sound wave bars */}
          <div className="flex items-center gap-0.5 h-4">
            <span className={`w-1 bg-amber-600 rounded-full transition-all ${speaking ? "animate-bounce h-3.5" : "h-1.5"}`} />
            <span className={`w-1 bg-amber-700 rounded-full transition-all ${speaking ? "animate-bounce h-4 delay-75" : "h-2"}`} />
            <span className={`w-1 bg-amber-500 rounded-full transition-all ${speaking ? "animate-bounce h-3 delay-150" : "h-1"}`} />
          </div>

          <span className="text-xs font-bold text-amber-900 hidden sm:inline">
            {speaking ? "Boty está leyendo..." : "Pausado"}
          </span>

          <div className="flex items-center gap-1 ml-1">
            {speaking ? (
              <button
                onClick={handlePause}
                className="wood-btn bg-amber-300 hover:bg-amber-400 text-amber-950 text-xs px-2.5 py-1 font-bold flex items-center gap-1 shadow-2xs"
                title="Pausar lectura"
              >
                <Pause className="w-3 h-3 fill-current" />
                <span>Pausa</span>
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-2.5 py-1 font-bold flex items-center gap-1 shadow-2xs"
                title="Reanudar"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Seguir</span>
              </button>
            )}

            <button
              onClick={handleStop}
              className="wood-btn bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-800 text-xs px-2.5 py-1 font-bold flex items-center gap-1 shadow-2xs"
              title="Detener lectura"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Parar</span>
            </button>
          </div>
        </div>
      )}
      <span className="text-[10px] font-semibold text-amber-800/80 pr-1 hidden md:inline">
        Ideal para los más pequeños 🌱
      </span>
    </div>
  );
}
