"use client";

import {
  VectorNetworkTopology,
  VectorBalanceScale,
  VectorAppleSvg,
  VectorStrawberrySvg,
  VectorCherrySvg,
  VectorBananaSvg,
  VectorLemonSvg,
  VectorChildExplorerSvg,
  VectorCushionSvg,
  VectorGoalFlagSvg,
  BotySvg,
} from "@/components/vector/MontessoriVectorGraphics";
import React, { useState, useEffect, useRef } from "react";
import { montessoriStageTransition, montessoriSuccessPulse, montessoriIdleFloat } from "@/lib/montessoriMotion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Scissors,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Eye,
  Palette,
  KeyRound,
  Scale,
  Share2,
} from "lucide-react";

interface Props {
  activityId: string;
}

export default function UnpluggedActivityAnimation({ activityId }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // GSAP step transition and idle icon animation
  useEffect(() => {
    if (stageRef.current) {
      montessoriStageTransition(stageRef.current);
      if (step === 3) {
        montessoriSuccessPulse(stageRef.current);
      }
    }
  }, [step]);

  useEffect(() => {
    if (iconRef.current) {
      const anim = montessoriIdleFloat(iconRef.current, { y: -3, duration: 2.2 });
      return () => {
        anim?.kill();
      };
    }
  }, []);

  // Auto-advance animation steps every 2.8s
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, activityId]);

  const restart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="wood-card overflow-hidden border-2 border-emerald-300 shadow-md bg-white rounded-3xl my-6">
      
      {/* Top Bar with Controls */}
      <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200">
        <div className="flex items-center gap-3">
          <div ref={iconRef} className="w-10 h-10 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center text-xl shadow-xs shrink-0">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider bg-emerald-200/80 px-2 py-0.5 rounded-full">
                Demostración Visual
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Paso a Paso
              </span>
            </div>
            <h3 className="font-fun text-sm sm:text-base font-bold text-slate-800">
              ¿Cómo jugar en la sala? Guía animada
            </h3>
          </div>
        </div>

        {/* Play/Pause & Replay Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 border border-slate-200"
            title={isPlaying ? "Pausar animación" : "Reanudar animación"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span className="hidden sm:inline">{isPlaying ? "Pausar" : "Reanudar"}</span>
          </button>
          <button
            onClick={restart}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 border border-slate-200"
            title="Repetir animación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Animation Stage */}
      <div className="p-4 sm:p-6 space-y-4">
        <div ref={stageRef} className="relative rounded-2xl border-2 border-slate-800 bg-slate-950 p-4 sm:p-8 min-h-[260px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
          
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* 1. ADIVINA EN POCAS PREGUNTAS (Búsqueda Binaria) */}
          {activityId === "adivina-en-pocas-preguntas" && (
            <div className="w-full max-w-lg flex flex-col items-center gap-4 z-10">
              <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Rango del 1 al 100 · Número Secreto: <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-md font-mono">73</span>
                </div>
                
                {/* Visual Number Line */}
                <div className="relative h-10 bg-slate-800 rounded-xl overflow-hidden flex items-center border border-slate-700">
                  <div
                    className={`h-full bg-rose-500/40 border-r-2 border-rose-400 flex items-center justify-center text-[10px] font-bold text-rose-200 transition-all duration-700 ${
                      step >= 1 ? "w-1/2" : "w-0 opacity-0"
                    }`}
                  >
                    {step >= 1 && "❌ 1 a 50 descartados"}
                  </div>
                  <div
                    className={`h-full bg-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-200 transition-all duration-700 ${
                      step === 0 ? "w-full" : step === 1 ? "w-1/2" : "w-1/4"
                    }`}
                  >
                    {step < 2 ? "51 a 100" : "51 a 75"}
                  </div>
                  <div
                    className={`h-full bg-rose-500/40 border-l-2 border-rose-400 flex items-center justify-center text-[10px] font-bold text-rose-200 transition-all duration-700 ${
                      step >= 2 ? "w-1/4" : "w-0 opacity-0"
                    }`}
                  >
                    {step >= 2 && "❌ 76 a 100"}
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1 px-1">
                  <span>1</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <BotySvg eyeMood={step < 3 ? "happy" : "blink"} className="w-8 h-8 shrink-0" />
                <div className="text-xs">
                  <div className="text-amber-300 font-bold">
                    {step === 0 && "Paso 1: El adulto piensa el número 73 en secreto."}
                    {step === 1 && "Paso 2: ¿Es mayor que 50? — ¡Sí! Descartamos la mitad (1 al 50)."}
                    {step === 2 && "Paso 3: ¿Es mayor que 75? — ¡No! Descartamos del 76 al 100."}
                    {step === 3 && "Paso 4: ¡Eureka! Adivinado en solo 6 preguntas dividiendo por la mitad."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Búsqueda Binaria: nunca necesitas más de 7 preguntas para adivinar entre 100 números.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. EL CLASIFICADOR DE FRUTAS (Machine Learning) */}
          {activityId === "clasificador-de-frutas" && (
            <div className="w-full max-w-lg flex flex-col items-center gap-4 z-10">
              <div className="grid grid-cols-2 gap-4 w-full">
                
                {/* Canasta Sí */}
                <div className="bg-emerald-950/60 border-2 border-emerald-500/60 rounded-2xl p-3 flex flex-col items-center justify-between min-h-[110px]">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    ✅ Frutas con Regla &quot;SÍ&quot;
                  </span>
                  <div className="flex items-center gap-2.5 py-1">
                    <div className="animate-bounce"><VectorAppleSvg className="w-9 h-9 drop-shadow-md" /></div>
                    <div className="animate-bounce delay-100"><VectorStrawberrySvg className="w-8 h-8 drop-shadow-md" /></div>
                    {step >= 2 && <div className="animate-pulse"><VectorCherrySvg className="w-8 h-8 drop-shadow-md" /></div>}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {step < 2 ? "Ejemplos: Manzana, Fresa" : "¡Cereza añadida con éxito!"}
                  </span>
                </div>

                {/* Canasta No */}
                <div className="bg-rose-950/60 border-2 border-rose-500/60 rounded-2xl p-3 flex flex-col items-center justify-between min-h-[110px]">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                    ❌ Frutas con Regla &quot;NO&quot;
                  </span>
                  <div className="flex items-center gap-2.5 py-1">
                    <VectorBananaSvg className="w-9 h-9 drop-shadow-md" />
                    <VectorLemonSvg className="w-8 h-8 drop-shadow-md" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono">
                    Plátano, Limón
                  </span>
                </div>
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <BotySvg eyeMood={step < 3 ? "happy" : "surprised"} className="w-8 h-8 shrink-0" />
                <div className="text-xs">
                  <div className="text-emerald-300 font-bold">
                    {step === 0 && "Paso 1: El adulto muestra 4 frutas y dice cuáles «SÍ» y cuáles «NO»."}
                    {step === 1 && "Paso 2: El niño descubre el patrón: «¡La regla secreta es que son ROJAS!»"}
                    {step === 2 && "Paso 3: Probamos una nueva fruta: Cereza 🍒. ¿SÍ o NO? ¡El niño acierta!"}
                    {step === 3 && "Paso 4: ¡Así aprende la IA! No memoriza frutas, aprende reglas de ejemplos."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Árboles de Decisión y Machine Learning aplicados en la cocina.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. DIBUJO POR NÚMEROS (Píxeles & RLE) */}
          {activityId === "dibujo-por-numeros" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              {/* 8x8 Mini Grid */}
              <div className="grid grid-cols-8 gap-1 p-2 bg-slate-900 rounded-2xl border border-slate-700">
                {[
                  0, 1, 1, 0, 0, 1, 1, 0,
                  1, 1, 1, 1, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1,
                  0, 1, 1, 1, 1, 1, 1, 0,
                  0, 0, 1, 1, 1, 1, 0, 0,
                  0, 0, 0, 1, 1, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                ].map((pixel, i) => {
                  const row = Math.floor(i / 8);
                  const isPainted = pixel === 1 && row <= (step === 0 ? 1 : step === 1 ? 3 : 5);
                  return (
                    <div
                      key={i}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md transition-all duration-300 flex items-center justify-center text-[10px] ${
                        isPainted
                          ? "bg-rose-500 shadow-xs shadow-rose-500/50 scale-95"
                          : "bg-slate-800 border border-slate-700/60"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300 shrink-0"><Palette className="w-5 h-5" /></div>
                <div className="text-xs">
                  <div className="text-rose-300 font-bold">
                    {step === 0 && "Paso 1: El adulto dicta: «Fila 1: 1 blanco, 2 negros, 2 blancos, 2 negros, 1 blanco»"}
                    {step === 1 && "Paso 2: El niño rellena los cuadros con lápiz siguiendo los números."}
                    {step === 2 && "Paso 3: Fila a fila, la cuadrícula cobra forma sin mirar la imagen."}
                    {step === 3 && "Paso 4: ¡Aparece un corazón en píxeles! Así comprimen fotos los computadores."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Compresión Run-Length Encoding (RLE) y píxeles en pantalla.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. EL TRUCO DE MAGIA DE LAS CARTAS (Bit de Paridad) */}
          {activityId === "el-truco-de-magia" && (
            <div className="w-full max-w-sm flex flex-col items-center gap-3 z-10">
              {/* 4x4 Grid (3x3 + parity row/col) */}
              <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-900 rounded-2xl border border-slate-700">
                {[
                  "♠", "♥", "♥", "♠", // Par: 2 negras
                  "♥", "♠", "♠", "♥", // Par: 2 negras
                  "♠", "♥", "♠", "♥", // Par: 2 negras
                  "♥", "♠", "♥", "♠", // Parity row
                ].map((suit, i) => {
                  const row = Math.floor(i / 4);
                  const col = i % 4;
                  const isFlipped = i === 5 && step >= 2; // Flipping row 1, col 1
                  const isParityBorder = row === 3 || col === 3;

                  return (
                    <div
                      key={i}
                      className={`w-9 h-11 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 border ${
                        isFlipped
                          ? "bg-amber-400 text-slate-950 border-amber-300 animate-pulse scale-105"
                          : isParityBorder
                          ? "bg-indigo-900/60 text-indigo-300 border-indigo-500/50"
                          : "bg-white text-slate-900 border-slate-300"
                      }`}
                    >
                      {isFlipped ? "♥" : suit}
                    </div>
                  );
                })}
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0"><Eye className="w-5 h-5" /></div>
                <div className="text-xs">
                  <div className="text-indigo-300 font-bold">
                    {step === 0 && "Paso 1: Colocan cartas y el adulto añade una fila y columna para que cada fila sea PAR."}
                    {step === 1 && "Paso 2: El adulto se da la vuelta y el niño voltea 1 carta secreta."}
                    {step === 2 && "Paso 3: ¡Una fila y una columna ahora suman IMPAR! La intersección delata la carta."}
                    {step === 3 && "Paso 4: ¡El mago señala la carta exacta! Así detecta errores tu WiFi y disco duro."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Bits de paridad bidimensional: detección de errores en telecomunicaciones.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. LABERINTO EN EL PISO (Bucles & Secuencias) */}
          {activityId === "laberinto-en-el-piso" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              {/* Floor grid */}
              <div className="grid grid-cols-5 gap-1.5 p-2 bg-amber-950/80 rounded-2xl border border-amber-700">
                {Array.from({ length: 15 }).map((_, i) => {
                  const x = i % 5;
                  const y = Math.floor(i / 5);
                  const isChild =
                    (step === 0 && x === 0 && y === 1) ||
                    (step === 1 && x === 1 && y === 1) ||
                    (step >= 2 && x === 3 && y === 1);
                  const isCushion = x === 2 && y === 0;
                  const isGoal = x === 4 && y === 1;

                  return (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-500 border ${
                        isChild
                          ? "bg-emerald-400 text-slate-900 scale-105 shadow-md shadow-emerald-400/50"
                          : isCushion
                          ? "bg-rose-800 text-rose-200 border-rose-600"
                          : isGoal
                          ? "bg-amber-400/30 text-amber-300 border-amber-400 animate-pulse"
                          : "bg-amber-900/40 border-amber-800/40 text-slate-600"
                      }`}
                    >
                      {isChild ? <VectorChildExplorerSvg className="w-7 h-7" /> : isCushion ? <VectorCushionSvg className="w-7 h-7" /> : isGoal ? <VectorGoalFlagSvg className="w-7 h-7" /> : ""}
                    </div>
                  );
                })}
              </div>

              {/* Code cards on floor */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="bg-amber-400 text-slate-900 px-2.5 py-1 rounded-lg font-bold border border-amber-300">
                  Repite 3x: [Avanzar ➡️]
                </span>
                <span className="bg-sky-400 text-slate-900 px-2.5 py-1 rounded-lg font-bold border border-sky-300">
                  [Girar ⬆️]
                </span>
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0"><VectorChildExplorerSvg className="w-6 h-6" /></div>
                <div className="text-xs">
                  <div className="text-amber-300 font-bold">
                    {step === 0 && "Paso 1: Trazan con cinta el laberinto en el piso con cojines de obstáculos."}
                    {step === 1 && "Paso 2: En lugar de 3 tarjetas de avanzar, usan una tarjeta «Repite 3x»."}
                    {step === 2 && "Paso 3: El niño camina como robot obedeciendo solo las tarjetas del suelo."}
                    {step === 3 && "Paso 4: ¡Llega a la meta! Han aprendido la esencia de los bucles de código."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Pensamiento cinestésico: programar con el cuerpo entero en la sala.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. MENSAJES SECRETOS (Criptografía César) */}
          {activityId === "mensajes-secretos" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              {/* Circular Cipher Ring Simulation */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Texto Original</span>
                  <div className="flex gap-1 font-mono text-base font-bold bg-slate-800 text-white p-2 rounded-xl border border-slate-700">
                    <span>H</span>
                    <span>O</span>
                    <span>L</span>
                    <span>A</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-amber-300 font-bold bg-amber-950 px-2 py-0.5 rounded-full border border-amber-600">
                    Clave: +3
                  </span>
                  <ArrowRight className="w-5 h-5 text-amber-400 my-1 animate-pulse" />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase font-bold text-purple-300">Texto Cifrado</span>
                  <div className="flex gap-1 font-mono text-base font-bold bg-purple-950 text-purple-200 p-2 rounded-xl border border-purple-500 shadow-md">
                    <span>{step >= 1 ? "K" : "?"}</span>
                    <span>{step >= 1 ? "R" : "?"}</span>
                    <span>{step >= 1 ? "O" : "?"}</span>
                    <span>{step >= 1 ? "D" : "?"}</span>
                  </div>
                </div>
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0"><KeyRound className="w-5 h-5" /></div>
                <div className="text-xs">
                  <div className="text-purple-300 font-bold">
                    {step === 0 && "Paso 1: Escriben el abecedario y eligen un número secreto (ejemplo: 3)."}
                    {step === 1 && "Paso 2: Ruedan 3 letras adelante: H se vuelve K, O se vuelve R. «HOLA» es «KROD»."}
                    {step === 2 && "Paso 3: Le pasan el papel al receptor. ¡Nadie más puede leerlo en el camino!"}
                    {step === 3 && "Paso 4: El receptor resta 3 posiciones y recupera la palabra original."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Criptografía: el Cifrado César usado desde la antigua Roma hasta las apps seguras de hoy.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. ORDENAR CON LA BALANZA (Algoritmos de Ordenamiento) */}
          {activityId === "ordenar-con-la-balanza" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              <VectorBalanceScale angle={step === 1 ? -12 : step === 2 ? 12 : 0} className="w-44 h-28" />

              {/* Sorted list below */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Liviano</span>
                <span>➔</span>
                <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Medio</span>
                <span>➔</span>
                <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />Pesado</span>
              </div>

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0"><Scale className="w-5 h-5" /></div>
                <div className="text-xs">
                  <div className="text-amber-300 font-bold">
                    {step === 0 && "Paso 1: Llenan 4 vasos con agua o arroz en cantidades distintas (sin etiquetas)."}
                    {step === 1 && "Paso 2: La regla de oro: solo se pueden comparar DOS vasos a la vez en la balanza."}
                    {step === 2 && "Paso 3: Intercambian posiciones buscando cuál es el más liviano de todos."}
                    {step === 3 && "Paso 4: ¡Quedan ordenados en pocas comparaciones! Es el algoritmo de selección."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Algoritmos de Ordenamiento (Selection Sort y QuickSort) explicados con física táctil.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. LA RED DE HILO (Redes & Paquetes IP) */}
          {activityId === "red-de-hilo" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10 text-center">
              <VectorNetworkTopology step={step} className="w-full max-w-md h-36" />

              {/* Dialogue Box */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0"><Share2 className="w-5 h-5" /></div>
                <div className="text-xs text-left">
                  <div className="text-teal-300 font-bold">
                    {step === 0 && "Paso 1: Todos sostienen un ovillo de lana desenrollado formando una red en la sala."}
                    {step === 1 && "Paso 2: Escriben un mensaje y lo cortan en 3 papelitos numerados («paquetes»)."}
                    {step === 2 && "Paso 3: Cada papelito se desliza por el hilo pasando de mano en mano hasta el destino."}
                    {step === 3 && "Paso 4: El receptor los ordena 1, 2, 3 y lee el mensaje. ¡Así funciona Internet!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Arquitectura de Redes, Routers y Protocolo de Paquetes IP sin necesidad de pantallas.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-950 block">Materiales simples</span>
              <span className="text-emerald-800 text-[11px]">Lana, vasos, cartas o frutas</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-950 block">100% Desconectado</span>
              <span className="text-amber-800 text-[11px]">Para jugar en el piso o mesa</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-teal-50/60 border border-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-teal-950 block">Concepto real</span>
              <span className="text-teal-800 text-[11px]">Algoritmos, redes e IA</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
