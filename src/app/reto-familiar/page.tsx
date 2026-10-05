"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Shuffle,
  Trophy,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  RotateCcw,
  Play,
  Footprints,
  Smartphone,
  Star,
  PartyPopper,
} from "lucide-react";

interface FamilyChallenge {
  id: string;
  title: string;
  category: "Corporal" | "Cocina y Hogar" | "Cuentos y Lógica" | "Seguridad y Redes";
  level: "semillas" | "exploradores" | "inventores" | "creadores" | "todos";
  levelLabel: string;
  icon: string;
  concept: string;
  mission: string;
  instructions: string[];
  dadAdvice: string;
}

const CHALLENGES: FamilyChallenge[] = [
  {
    id: "rf-01",
    title: "El Robot Papá con Batería Baja",
    category: "Corporal",
    level: "semillas",
    levelLabel: "Semillas (4–6 años)",
    icon: "🔋",
    concept: "Secuencias y Comandos Exactos",
    mission: "Papá o mamá se convierten en un robot cuya batería solo le permite dar 3 pasos por cada instrucción del niño.",
    instructions: [
      "El adulto se para tieso como un robot y dice: 'Batería al 10%. Esperando código'.",
      "El niño debe guiar al adulto desde la sala hasta la cocina dándole solo órdenes de 1 a 3 pasos (ej: 'Avanza 2 pasos', 'Gira hacia la ventana').",
      "Si el niño dice una orden ambigua como 'Camina hasta allá', el robot hace un sonido de error: '¡Bip bop! Comando no entendido'.",
    ],
    dadAdvice: "Permite que el niño descubra que las órdenes deben ser precisas para que la máquina entienda.",
  },
  {
    id: "rf-02",
    title: "El Algoritmo del Sándwich a Ciegas",
    category: "Cocina y Hogar",
    level: "exploradores",
    levelLabel: "Exploradores (7–9 años)",
    icon: "🥪",
    concept: "Algoritmos y Errores (Bugs)",
    mission: "El adulto tiene los ojos vendados o cerrados y solo puede preparar una merienda siguiendo exactamente lo que el niño diga.",
    instructions: [
      "Pongan sobre la mesa pan, queso o mermelada y una cuchara.",
      "El niño da las órdenes en voz alta paso a paso.",
      "Regla de oro cómica: el adulto debe interpretar las órdenes de forma totalmente literal (si el niño dice 'Pon mantequilla en el pan', pon el frasco entero encima si no dijo 'Abre el frasco con la mano').",
      "Ríanse juntos de los 'bugs' y corrijan el algoritmo hasta que el sándwich quede listo.",
    ],
    dadAdvice: "Es la mejor demostración vivencial de que las computadoras no tienen sentido común, solo siguen código.",
  },
  {
    id: "rf-03",
    title: "El Laberinto de Cojines con Condicionales (IF / ELSE)",
    category: "Corporal",
    level: "todos",
    levelLabel: "Para Todas las Edades",
    icon: "🛋️",
    concept: "Condicionales (Si pasa esto, haz aquello)",
    mission: "Creen una pista de obstáculos en el suelo de la sala con cojines, sillas y bufandas.",
    instructions: [
      "Pongan 2 tipos de objetos en el suelo: cojines (azules o suaves) y libros/cajas (rojos o duros).",
      "Establezcan una regla condicional antes de empezar: SI pisas un cojín -> Das un salto y dices '¡Bip!'. SI encuentras un libro -> Debes girar 90 grados a la derecha.",
      "El niño o el adulto deben cruzar la sala siguiendo la regla sin equivocarse.",
    ],
    dadAdvice: "Es la base del razonamiento lógico que usan los autos autónomos para frenar ante un semáforo rojo.",
  },
  {
    id: "rf-04",
    title: "El Mensaje Secreto en la Nevera",
    category: "Cuentos y Lógica",
    level: "inventores",
    levelLabel: "Inventores (10–12 años)",
    icon: "🧊",
    concept: "Código Binario (0 y 1)",
    mission: "Escriban una palabra secreta de 3 letras en la nevera o en una hoja usando solo dos símbolos.",
    instructions: [
      "Elijan dos objetos caseros: monedas cara/cruz, imanes rojos/azules o frijoles blancos/negros.",
      "Definan que Blanco = 0 y Negro = 1.",
      "Usen el taller de código binario de la plataforma para codificar una letra (ej: 'HOLA') y dejen el mensaje para que el otro lo descifre antes de la cena.",
    ],
    dadAdvice: "Conecta la matemática escolar con cómo las pantallas y teléfonos guardan fotos y mensajes reales.",
  },
  {
    id: "rf-05",
    title: "El Baile del Bucle Repetitivo (Loop)",
    category: "Corporal",
    level: "semillas",
    levelLabel: "Semillas (4–6 años)",
    icon: "🕺",
    concept: "Bucles y Repetición (Loops)",
    mission: "Inventen una coreografía corta de 3 pasos y creen un 'Bucle por 4'.",
    instructions: [
      "Paso 1: Aplauso. Paso 2: Tocar rodillas. Paso 3: Vuelta completa.",
      "En vez de decir 12 instrucciones largas, el programador dice: '¡Repetir 4 veces!'.",
      "Pongan música alegre y hagan el bucle juntos sin perder el ritmo.",
    ],
    dadAdvice: "Ayuda a entender que un bucle ahorra código y evita escribir lo mismo cien veces.",
  },
  {
    id: "rf-06",
    title: "El Cuento con Decisiones Ramificadas",
    category: "Cuentos y Lógica",
    level: "exploradores",
    levelLabel: "Exploradores (7–9 años)",
    icon: "📖",
    concept: "Estructuras de Decisión y Árboles",
    mission: "Antes de dormir, inventen un cuento interactivo donde el oyente decide qué pasa.",
    instructions: [
      "El narrador empieza: 'Un gato astronauta llegó a un planeta con dos puertas: una dorada y una plateada'.",
      "SI el niño elige la dorada -> El gato encuentra peces de chocolate.",
      "SI elige la plateada -> El gato descubre un robot que habla al revés.",
      "Creen al menos 3 ramas de decisiones hasta llegar a un final inesperado.",
    ],
    dadAdvice: "Así se programan los videojuegos de rol y las inteligencias artificiales de diálogo.",
  },
];

export default function RetoFamiliarPage() {
  const [activeTab, setActiveTab] = useState<"generador" | "creador">("generador");
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Creator state (Grid 5x5: 0=empty, 1=player, 2=goal, 3=trap)
  const [grid, setGrid] = useState<number[][]>([
    [1, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 3, 0, 0, 2],
    [0, 0, 0, 0, 0],
  ]);
  const [paletteTool, setPaletteTool] = useState<number>(3); // 2=goal, 3=trap
  const [dadModeActive, setDadModeActive] = useState(false);
  const [dadProgram, setDadProgram] = useState<string[]>([]);
  const [botPos, setBotPos] = useState({ r: 0, c: 0, dir: 1 }); // dir: 0=up, 1=right, 2=down, 3=left
  const [executing, setExecuting] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  // Load completed count from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("retos_familiares_completados");
      if (saved) setCompletedCount(parseInt(saved, 10));
    }
  }, []);

  const filteredChallenges = CHALLENGES.filter(
    (c) => selectedFilter === "todos" || c.level === selectedFilter
  );

  const currentChallenge = filteredChallenges[currentChallengeIndex % filteredChallenges.length] || CHALLENGES[0];

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prev) => (prev + 1) % filteredChallenges.length);
  };

  const handleComplete = () => {
    const nextCount = completedCount + 1;
    setCompletedCount(nextCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("retos_familiares_completados", String(nextCount));
    }
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  // Creator grid handlers
  const handleCellClick = (r: number, c: number) => {
    if (dadModeActive) return;
    if (r === 0 && c === 0) return; // starting pos
    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === r && cIdx === c) {
          return cell === paletteTool ? 0 : paletteTool;
        }
        // if placing goal, remove other goals
        if (paletteTool === 2 && cell === 2) {
          return 0;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const startDadMode = () => {
    setDadModeActive(true);
    setDadProgram([]);
    setBotPos({ r: 0, c: 0, dir: 1 });
    setGameResult(null);
  };

  const resetCreator = () => {
    setDadModeActive(false);
    setDadProgram([]);
    setBotPos({ r: 0, c: 0, dir: 1 });
    setGameResult(null);
  };

  const addCommand = (cmd: string) => {
    if (dadProgram.length < 12 && !executing) {
      setDadProgram([...dadProgram, cmd]);
    }
  };

  const executeDadProgram = async () => {
    if (executing || dadProgram.length === 0) return;
    setExecuting(true);
    setGameResult(null);

    let curR = 0;
    let curC = 0;
    let curDir = 1; // 0=up, 1=right, 2=down, 3=left

    for (const cmd of dadProgram) {
      await new Promise((res) => setTimeout(res, 600));

      if (cmd === "forward") {
        if (curDir === 0 && curR > 0) curR--;
        else if (curDir === 1 && curC < 4) curC++;
        else if (curDir === 2 && curR < 4) curR++;
        else if (curDir === 3 && curC > 0) curC--;
      } else if (cmd === "left") {
        curDir = (curDir + 3) % 4;
      } else if (cmd === "right") {
        curDir = (curDir + 1) % 4;
      }

      setBotPos({ r: curR, c: curC, dir: curDir });

      // Check trap
      if (grid[curR][curC] === 3) {
        setGameResult("lose");
        setExecuting(false);
        return;
      }
      // Check goal
      if (grid[curR][curC] === 2) {
        setGameResult("win");
        setExecuting(false);
        return;
      }
    }

    // Finished without reaching goal
    setGameResult(grid[curR][curC] === 2 ? "win" : "lose");
    setExecuting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-300">
          <Users className="w-3.5 h-3.5 text-purple-700" />
          Conexión Familiar · Sin Presión
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Retos en Familia
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          Desafíos lúdicos para jugar en la sala, divertirse con errores y diseñar laberintos donde los niños se convierten en los evaluadores y los papás en los programadores.
        </p>

        {/* Challenge counter badge */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100/90 text-amber-950 text-xs font-bold border border-amber-300 shadow-2xs">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Retos cumplidos juntos: <strong>{completedCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-md mx-auto w-full px-2">
        <button
          onClick={() => setActiveTab("generador")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-fun text-xs sm:text-sm font-bold text-center transition-all shadow-xs ${
            activeTab === "generador"
              ? "bg-amber-400 text-amber-950 border-2 border-amber-500 scale-102"
              : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
          }`}
        >
          🎲 Ruleta de Retos Caseros
        </button>
        <button
          onClick={() => setActiveTab("creador")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-fun text-xs sm:text-sm font-bold text-center transition-all shadow-xs ${
            activeTab === "creador"
              ? "bg-purple-500 text-white border-2 border-purple-600 scale-102"
              : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
          }`}
        >
          📱 Reta a tus Papás (5x5)
        </button>
      </div>

      {/* TAB 1: GENERADOR DE RETOS CASEROS */}
      {activeTab === "generador" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Level Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-slate-500 font-semibold mr-1">Filtrar por edad:</span>
            {[
              { id: "todos", label: "Todos los retos" },
              { id: "semillas", label: "🌱 Semillas (4-6)" },
              { id: "exploradores", label: "🧭 Exploradores (7-9)" },
              { id: "inventores", label: "🔬 Inventores (10-12)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedFilter(f.id);
                  setCurrentChallengeIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedFilter === f.id
                    ? "bg-amber-500 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-amber-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Active Challenge Card */}
          <div className="wood-card p-6 sm:p-9 bg-white border-2 border-amber-300 shadow-md rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-amber-100 rounded-2xl border border-amber-200">
                  {currentChallenge.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      {currentChallenge.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {currentChallenge.levelLabel}
                    </span>
                  </div>
                  <h2 className="font-fun text-xl sm:text-2xl font-extrabold text-slate-800 mt-1">
                    {currentChallenge.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={handleNextChallenge}
                className="wood-btn bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs px-3.5 py-2 font-bold flex items-center gap-1.5 self-start sm:self-auto border border-amber-300 shadow-2xs shrink-0"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-700" />
                <span>Sacar otro reto</span>
              </button>
            </div>

            {/* Mission goal */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-amber-950 block mb-1">🎯 Objetivo del reto:</strong>
              {currentChallenge.mission}
            </div>

            {/* Step-by-step instructions */}
            <div className="space-y-3">
              <h4 className="font-fun text-sm font-bold text-slate-800">
                Instrucciones para la sala:
              </h4>
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {currentChallenge.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Dad/Mom Pedagogical Advice */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              💡 <strong>La gran idea de computación:</strong> {currentChallenge.concept}. {currentChallenge.dadAdvice}
            </div>

            {/* Complete button & Celebration */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-100">
              <button
                onClick={handleComplete}
                className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-6 py-3 flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Reto Cumplido en Familia! ⭐</span>
              </button>

              {showCelebration && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 animate-in zoom-in-95">
                  <PartyPopper className="w-4 h-4 text-emerald-600" />
                  <span>¡Felicitaciones! Sumaron un reto a su historia familiar 🎉</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: RETA A TUS PAPÁS (5x5 GRID) */}
      {activeTab === "creador" && (
        <div className="wood-card p-6 sm:p-8 bg-white border-2 border-purple-300 shadow-lg rounded-3xl space-y-6 animate-in fade-in duration-200">
          
          {!dadModeActive ? (
            // Phase 1: Child designs the maze
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-100">
                <div>
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    Paso 1: El Niño es el Diseñador
                  </span>
                  <h3 className="font-fun text-xl font-bold text-slate-800">
                    Diseña el laberinto para tus papás
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Herramienta:</span>
                  <button
                    onClick={() => setPaletteTool(2)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                      paletteTool === 2 ? "bg-amber-300 border-amber-500 text-amber-950 font-bold" : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    ⭐ Meta
                  </button>
                  <button
                    onClick={() => setPaletteTool(3)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                      paletteTool === 3 ? "bg-rose-200 border-rose-400 text-rose-950 font-bold" : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    🌋 Trampa
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Toca cualquier casilla para poner trampas o cambiar la meta. Cuando termines, presiona el botón para pasarle el celular a papá o mamá.
              </p>

              {/* 5x5 Grid Editor */}
              <div className="flex justify-center p-3 bg-purple-50/50 rounded-2xl border border-purple-200">
                <div className="grid grid-cols-5 gap-2 w-72 h-72 sm:w-80 sm:h-80">
                  {grid.map((row, r) =>
                    row.map((cell, c) => (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`rounded-xl border-2 flex items-center justify-center text-2xl transition-transform active:scale-95 ${
                          r === 0 && c === 0
                            ? "bg-amber-100 border-amber-400"
                            : cell === 2
                            ? "bg-amber-200 border-amber-500"
                            : cell === 3
                            ? "bg-rose-200 border-rose-400 shadow-2xs"
                            : "bg-white border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {r === 0 && c === 0 ? "🤖" : cell === 2 ? "⭐" : cell === 3 ? "🌋" : ""}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={startDadMode}
                  className="wood-btn bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 flex items-center gap-2 shadow-md animate-pulse"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>¡Listo! Pasarle el celular a papá o mamá ➔</span>
                </button>
              </div>
            </div>
          ) : (
            // Phase 2: Adult solves the maze
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-start gap-3">
                <span className="text-3xl">👨‍👧</span>
                <div className="space-y-1">
                  <h4 className="font-fun text-sm sm:text-base font-bold text-purple-950">
                    ¡Turno del Adulto! ¿Podrás resolver este laberinto?
                  </h4>
                  <p className="text-xs text-purple-900 leading-relaxed">
                    Tu hijo preparó este desafío. Programa a Boty con las flechas para llegar a la ⭐ sin tocar las trampas 🌋.
                  </p>
                </div>
              </div>

              {/* 5x5 Grid Live Play */}
              <div className="flex justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-5 gap-2 w-72 h-72 sm:w-80 sm:h-80">
                  {grid.map((row, r) =>
                    row.map((cell, c) => {
                      const isBotHere = botPos.r === r && botPos.c === c;
                      const botArrow = ["⬆️", "➡️", "⬇️", "⬅️"][botPos.dir];
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                            isBotHere
                              ? "bg-amber-300 border-amber-600 shadow-md scale-105"
                              : cell === 2
                              ? "bg-amber-200 border-amber-500"
                              : cell === 3
                              ? "bg-rose-200 border-rose-400"
                              : "bg-white border-slate-200"
                          }`}
                        >
                          {isBotHere ? (
                            <span title={`Boty mirando ${botArrow}`}>🤖</span>
                          ) : cell === 2 ? (
                            "⭐"
                          ) : cell === 3 ? (
                            "🌋"
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Dad's Program queue */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center gap-2 overflow-x-auto min-h-[48px]">
                <span className="text-xs font-bold text-amber-900 shrink-0">Tu código:</span>
                {dadProgram.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Agrega pasos con los botones de abajo...</span>
                ) : (
                  dadProgram.map((cmd, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold shrink-0">
                      {cmd === "forward" ? "⬆️ Paso" : cmd === "left" ? "⬅️ Gira" : "➡️ Gira"}
                    </span>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => addCommand("forward")}
                  disabled={executing}
                  className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2"
                >
                  ⬆️ Avanzar
                </button>
                <button
                  onClick={() => addCommand("left")}
                  disabled={executing}
                  className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2"
                >
                  ⬅️ Girar Izq
                </button>
                <button
                  onClick={() => addCommand("right")}
                  disabled={executing}
                  className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2"
                >
                  ➡️ Girar Der
                </button>
                <button
                  onClick={() => setDadProgram([])}
                  disabled={executing || dadProgram.length === 0}
                  className="wood-btn bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold text-xs px-3 py-2"
                  title="Borrar código"
                >
                  Borrar
                </button>
              </div>

              {/* Execute / Reset Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={executeDadProgram}
                  disabled={executing || dadProgram.length === 0}
                  className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-2.5 flex items-center gap-2 shadow-md disabled:opacity-40"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{executing ? "Ejecutando..." : "Ejecutar Programa"}</span>
                </button>
                <button
                  onClick={resetCreator}
                  className="wood-btn bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs px-4 py-2.5 font-bold"
                >
                  Nuevo Laberinto
                </button>
              </div>

              {/* Result banner */}
              {gameResult === "win" && (
                <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-400 text-center space-y-1 animate-in zoom-in-95">
                  <div className="text-2xl">🎉⭐</div>
                  <h4 className="font-fun text-base font-bold text-emerald-950">
                    ¡Misión Cumplida, Papá / Mamá!
                  </h4>
                  <p className="text-xs text-emerald-900">
                    Lograste superar el laberinto programado por tu hijo(a). ¡Choquen esos cinco! ✋
                  </p>
                </div>
              )}

              {gameResult === "lose" && (
                <div className="p-4 bg-rose-100 rounded-2xl border-2 border-rose-400 text-center space-y-1 animate-in zoom-in-95">
                  <div className="text-2xl">🐞🌋</div>
                  <h4 className="font-fun text-base font-bold text-rose-950">
                    ¡Caíste en la trampa del niño!
                  </h4>
                  <p className="text-xs text-rose-900">
                    No te preocupes: los mejores ingenieros cometen 'bugs'. Borra el código e intenta una nueva ruta.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* Suggested next steps */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          href="/reloj"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs w-full sm:w-auto text-center"
        >
          ⏳ Abrir el Reloj de la Sala
        </Link>
        <Link
          href="/robot"
          className="wood-btn bg-white hover:bg-slate-100 text-slate-800 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs border border-slate-300 w-full sm:w-auto text-center"
        >
          🤖 Ir al Simulador Boty
        </Link>
      </div>

    </div>
  );
}
