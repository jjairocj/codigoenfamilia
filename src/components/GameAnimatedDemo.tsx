"use client";

import {
  BotySvg,
  StarTokenSvg,
  VectorRouletteWheel,
  VectorScratchCatSvg,
  VectorGreenFlagSvg,
} from "@/components/vector/MontessoriVectorGraphics";
import MicrobitBoardSvg from "./microbit/MicrobitBoardSvg";
import { MICROBIT_ICONS } from "./microbit/microbitFont5x5";
import React, { useState, useEffect, useRef } from "react";
import { montessoriStageTransition, montessoriSuccessPulse, montessoriIdleFloat } from "@/lib/montessoriMotion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Bot,
  Dices,
  Binary,
  Terminal,
  Cpu,
  Scissors,
  CheckCircle2,
  Puzzle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export type GameType =
  | "robot"
  | "ruleta"
  | "binario"
  | "scratch"
  | "microbit"
  | "python"
  | "desenchufado";

interface Props {
  initialGame?: GameType;
  showSelector?: boolean;
  defaultExpanded?: boolean;
}

const GAME_METADATA: Record<
  GameType,
  { title: string; subtitle: string; icon: string; themeColor: string }
> = {
  robot: {
    title: "El Robot Boty (5x5)",
    subtitle: "Cómo construir secuencias de comandos y ejecutar el algoritmo",
    icon: "🤖",
    themeColor: "emerald",
  },
  ruleta: {
    title: "Ruleta Familiar",
    subtitle: "Cómo girar y jugar retos rápidos de 10 minutos en la sala",
    icon: "🎡",
    themeColor: "purple",
  },
  binario: {
    title: "Taller Binario 8-Bits",
    subtitle: "Cómo encender interruptores para sumar potencias y formar letras",
    icon: "💡",
    themeColor: "cyan",
  },
  scratch: {
    title: "Laboratorio Scratch",
    subtitle: "Cómo encajar bloques de colores para dar vida a personajes",
    icon: "🧩",
    themeColor: "rose",
  },
  microbit: {
    title: "Simulador Micro:bit",
    subtitle: "Cómo pulsar botones físicos para iluminar la pantalla LED 5x5",
    icon: "📟",
    themeColor: "indigo",
  },
  python: {
    title: "Laboratorio Python",
    subtitle: "Cómo escribir recetas en texto y ver los resultados en la consola",
    icon: "🐍",
    themeColor: "amber",
  },
  desenchufado: {
    title: "Actividades Sin Pantalla",
    subtitle: "Cómo jugar con lana, vasos y tarjetas en el piso de la casa",
    icon: "✂️",
    themeColor: "teal",
  },
};

export default function GameAnimatedDemo({
  initialGame = "robot",
  showSelector = false,
  defaultExpanded = true,
}: Props) {
  const [activeGame, setActiveGame] = useState<GameType>(initialGame);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // GSAP stage transition on step or activeGame change
  useEffect(() => {
    if (stageRef.current) {
      montessoriStageTransition(stageRef.current);
      if (step === 3) {
        montessoriSuccessPulse(stageRef.current);
      }
    }
  }, [step, activeGame]);

  useEffect(() => {
    if (iconRef.current) {
      const anim = montessoriIdleFloat(iconRef.current, { y: -3, duration: 2.2 });
      return () => {
        anim?.kill();
      };
    }
  }, [activeGame]);

  // Auto-advance animation steps
  useEffect(() => {
    if (!isPlaying || !isExpanded) return;

    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2400);

    return () => clearInterval(timer);
  }, [isPlaying, isExpanded, activeGame]);

  const restart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const meta = GAME_METADATA[activeGame];

  return (
    <div className="wood-card overflow-hidden border-2 border-amber-300 shadow-md bg-white">
      {/* Top Banner / Toggle Bar */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div ref={iconRef} className="w-10 h-10 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-2xl shadow-xs shrink-0">
            {meta.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-200/80 px-2 py-0.5 rounded-full">
                Animación Paso a Paso
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                En Vivo
              </span>
            </div>
            <h3 className="font-fun text-sm sm:text-base font-bold text-slate-800">
              ¿Cómo funciona? {meta.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isExpanded && (
            <>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="wood-btn bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 border border-slate-200"
                title={isPlaying ? "Pausar animación" : "Reproducir animación"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="hidden sm:inline">{isPlaying ? "Pausar" : "Reanudar"}</span>
              </button>
              <button
                onClick={restart}
                className="wood-btn bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 border border-slate-200"
                title="Repetir animación desde el inicio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Repetir</span>
              </button>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="wood-btn bg-amber-300 hover:bg-amber-400 text-amber-950 px-3 py-1.5 text-xs font-bold flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <span>Ocultar guía</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Ver demostración animada</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Optional Game Selector Tabs */}
          {showSelector && (
            <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
              {(Object.keys(GAME_METADATA) as GameType[]).map((key) => {
                const gm = GAME_METADATA[key];
                const isActive = activeGame === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveGame(key);
                      setStep(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <span>{gm.icon}</span>
                    <span>{gm.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Interactive Animation Canvas */}
          <div ref={stageRef} className="relative rounded-2xl border-2 border-slate-200 bg-slate-900 p-4 sm:p-8 min-h-[260px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Animation 1: Robot Boty */}
            {activeGame === "robot" && (
              <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
                <div className="grid grid-cols-5 gap-1.5 p-2 bg-amber-950/80 rounded-2xl border border-amber-600/40 shadow-xl">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const x = i % 5;
                    const y = Math.floor(i / 5);
                    
                    // Boty position across steps
                    // Step 0: (2, 4) - Start
                    // Step 1: (2, 4) - Adding commands
                    // Step 2: (2, 3) - Walking forward
                    // Step 3: (2, 2) - Star reached!
                    const isRobot =
                      step === 0 && x === 2 && y === 4
                        ? true
                        : step === 1 && x === 2 && y === 4
                        ? true
                        : step === 2 && x === 2 && y === 3
                        ? true
                        : step === 3 && x === 2 && y === 2;

                    const isStar = x === 2 && y === 2 && step < 3;
                    const isCollected = x === 2 && y === 2 && step === 3;

                    return (
                      <div
                        key={i}
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-500 ${
                          isRobot
                            ? "bg-emerald-400 text-slate-900 scale-105 shadow-md shadow-emerald-400/50"
                            : isStar
                            ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse"
                            : isCollected
                            ? "bg-amber-400 text-slate-900 scale-110"
                            : "bg-amber-900/40 border border-amber-800/30 text-slate-600"
                        }`}
                      >
                        {isRobot ? (
                          <BotySvg className="w-7 h-7 sm:w-8 sm:h-8" eyeMood={step === 3 ? "happy" : "surprised"} isWalking={step === 2} />
                        ) : isStar ? (
                          <StarTokenSvg className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
                        ) : isCollected ? (
                          <div className="flex items-center justify-center animate-bounce">
                            <StarTokenSvg className="w-7 h-7 sm:w-8 sm:h-8" />
                          </div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-700/40" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Steps Timeline Indicator */}
                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center text-[11px]">
                      {step + 1}
                    </span>
                    <span className="font-medium text-emerald-300">
                      {step === 0 && "1. Añade bloques: Avanzar ⬆️, Avanzar ⬆️"}
                      {step === 1 && "2. Pulsa el botón verde «¡Ejecutar Algoritmo!»"}
                      {step === 2 && "3. Boty sigue cada orden con precisión"}
                      {step === 3 && "4. ¡Meta cumplida! Recogió la estrella dorada ⭐"}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">Paso {step + 1}/4</div>
                </div>
              </div>
            )}

            {/* Animation 2: Ruleta Familiar */}
            {activeGame === "ruleta" && (
              <div className="w-full max-w-sm flex flex-col items-center gap-4 z-10 text-center">
                <VectorRouletteWheel
                  rotationDegree={
                    step === 0 ? 0 : step === 1 ? 720 : step === 2 ? 1080 : 1440
                  }
                  className="w-40 h-40 sm:w-48 sm:h-48"
                />

                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 text-xs">
                  <span className="font-bold text-purple-300 block text-sm">
                    {step < 2 ? "Gira la ruleta física en familia..." : "¡Reto asignado: El Robot Ciego! 🤖"}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    {step < 2
                      ? "Un toque suave hace girar la aguja para elegir una actividad desconectada."
                      : "Un adulto se venda los ojos y el niño lo guía con comandos verbales por la sala."}
                  </p>
                </div>
              </div>
            )}

            {/* Animation 3: Taller Binario */}
            {activeGame === "binario" && (
              <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[128, 64, 32, 16, 8, 4, 2, 1].map((val, idx) => {
                    // Activate 64 and 1 on step >= 2
                    const isActive = (val === 64 || val === 1) && step >= 1;
                    return (
                      <div key={val} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-7 h-10 sm:w-10 sm:h-14 rounded-xl border-2 flex flex-col justify-between p-1 transition-all duration-300 ${
                            isActive
                              ? "bg-amber-400 border-amber-300 shadow-lg shadow-amber-400/50 -translate-y-1"
                              : "bg-slate-800 border-slate-700"
                          }`}
                        >
                          <div
                            className={`w-full h-3 rounded-md transition-colors ${
                              isActive ? "bg-amber-200" : "bg-slate-700"
                            }`}
                          />
                          <span
                            className={`text-center font-mono font-bold text-xs ${
                              isActive ? "text-slate-900" : "text-slate-500"
                            }`}
                          >
                            {isActive ? "1" : "0"}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 flex items-center justify-between text-xs text-slate-200">
                  <div className="space-y-0.5">
                    <div className="text-cyan-300 font-bold">
                      {step === 0 && "1. Todos los bits apagados (00000000 = 0)"}
                      {step === 1 && "2. Encendemos el bit 64 y el bit 1 (01000001)"}
                      {step >= 2 && "3. Suma: 64 + 1 = 65 ➔ ¡Letra 'A' en Código ASCII!"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Las computadoras escriben textos completos solo encendiendo bombillas.
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono text-lg font-bold flex items-center justify-center border border-cyan-500/30">
                    {step >= 2 ? "A" : "0"}
                  </div>
                </div>
              </div>
            )}

            {/* Animation 4: Scratch */}
            {activeGame === "scratch" && (
              <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
                <div className="w-full space-y-1.5 font-mono text-xs">
                  <div className="bg-amber-500 text-amber-950 font-bold px-3 py-2 rounded-t-xl rounded-b-md shadow-md border-l-4 border-amber-700 flex items-center gap-2">
                    <VectorGreenFlagSvg className="w-4 h-4 shrink-0" />
                    <span>al presionar bandera verde</span>
                  </div>
                  <div
                    className={`bg-sky-500 text-white font-bold px-3 py-2 rounded-md shadow-md border-l-4 border-sky-700 flex items-center gap-2 transition-all duration-500 ${
                      step >= 1 ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-50"
                    }`}
                  >
                    <span>➡️</span>
                    <span>mover (10) pasos</span>
                  </div>
                  <div
                    className={`bg-purple-500 text-white font-bold px-3 py-2 rounded-md shadow-md border-l-4 border-purple-700 flex items-center gap-2 transition-all duration-500 ${
                      step >= 2 ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-50"
                    }`}
                  >
                    <span>💬</span>
                    <span>decir [¡Hola Familia!] por (2) segundos</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="animate-bounce shrink-0">
                      <VectorScratchCatSvg className="w-8 h-8" />
                    </div>
                    <span className="text-rose-300 font-medium">
                      {step < 2 ? "Encaja los bloques como piezas de LEGO" : "¡El gatito camina y saluda en pantalla!"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Animation 5: Micro:bit */}
            {activeGame === "microbit" && (
              <div className="w-full max-w-sm flex flex-col items-center gap-4 z-10">
                <div className="w-56 drop-shadow-xl">
                  <MicrobitBoardSvg
                    grid={step >= 1 ? MICROBIT_ICONS.HEART : MICROBIT_ICONS.HEART_SMALL}
                    pressedButton={step >= 1 ? "A" : null}
                    interactive={false}
                  />
                </div>

                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 text-xs text-indigo-300 text-center">
                  {step === 0 && "1. Placa en reposo · Pulsa el botón [A]"}
                  {step >= 1 && "2. ¡El botón [A] envía la señal y dibuja un corazón latiendo!"}
                </div>
              </div>
            )}

            {/* Animation 6: Python */}
            {activeGame === "python" && (
              <div className="w-full max-w-md flex flex-col items-center gap-3 z-10 font-mono text-xs">
                <div className="w-full bg-slate-950 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
                  <div className="bg-slate-800 px-3 py-2 flex items-center gap-1.5 border-b border-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-400 ml-2">receta_familiar.py</span>
                  </div>
                  <div className="p-3 space-y-1.5 text-slate-200">
                    <div className="text-amber-400"># Mi primer programa en Python</div>
                    <div>
                      <span className="text-purple-400">nombre</span> ={" "}
                      <span className="text-emerald-400">&quot;Boty&quot;</span>
                    </div>
                    <div>
                      <span className="text-sky-400">print</span>(
                      <span className="text-emerald-400">&quot;¡Hola, &quot;</span> +{" "}
                      <span className="text-purple-400">nombre</span> +{" "}
                      <span className="text-emerald-400">&quot;!&quot;</span>)
                    </div>
                  </div>
                  <div className="bg-slate-900/90 p-3 border-t border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                      Consola de Salida:
                    </div>
                    <div className="text-emerald-400 font-bold">
                      {step >= 1 ? "> ¡Hola, Boty! 🤖" : "> ... esperando ejecución"}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 text-xs text-amber-300 text-center">
                  {step === 0 && "1. Escribes las instrucciones en lenguaje claro"}
                  {step >= 1 && "2. Pulsas «Ejecutar» y el computador obedece al instante sin errores"}
                </div>
              </div>
            )}

            {/* Animation 7: Desenchufado */}
            {activeGame === "desenchufado" && (
              <div className="w-full max-w-md flex flex-col items-center gap-4 z-10 text-center">
                <div className="flex items-center justify-center gap-4 sm:gap-6 py-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">👧</span>
                    <span className="text-[10px] font-bold text-amber-300">Emisor</span>
                  </div>
                  <div className="relative w-20 sm:w-28 h-1 bg-amber-400/60 flex items-center justify-center">
                    <span
                      className={`text-xl transition-all duration-700 ${
                        step === 0
                          ? "-translate-x-8"
                          : step === 1
                          ? "translate-x-0 scale-125"
                          : "translate-x-8"
                      }`}
                    >
                      💌
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">🧑‍🦱</span>
                    <span className="text-[10px] font-bold text-teal-300">Receptor</span>
                  </div>
                </div>

                <div className="w-full bg-slate-800/90 rounded-xl p-3 border border-slate-700 text-xs text-teal-300">
                  <span className="font-bold block text-sm">La Red de Hilo: Paquetes en el Aire 🧶</span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Con un ovillo de lana en la sala, los niños aprenden cómo viaja un mensaje por Internet sin cables virtuales.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Key Learning Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Paso a paso</span>
                <span className="text-slate-600 text-[11px]">Sin prisa ni frustración</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Aprender del error</span>
                <span className="text-slate-600 text-[11px]">El fallo es solo depuración</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Juego compartido</span>
                <span className="text-slate-600 text-[11px]">Un adulto y un niño juntos</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
