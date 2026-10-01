"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import {
  Play,
  RotateCcw,
  Sparkles,
  ArrowUp,
  CornerUpLeft,
  CornerUpRight,
  Star,
  Trash2,
} from "lucide-react";
import confetti from "canvas-confetti";

type Direction = 0 | 1 | 2 | 3; // 0: Up, 1: Right, 2: Down, 3: Left
type Command = "FORWARD" | "TURN_LEFT" | "TURN_RIGHT" | "COLLECT";

interface Level {
  id: number;
  name: string;
  desc: string;
  robot: { x: number; y: number; dir: Direction };
  stars: Array<{ x: number; y: number }>;
  walls: Array<{ x: number; y: number }>;
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: "Misión 1: Mi Primer Paseo",
    desc: "Avanza hacia adelante y pulsa el comando '⭐ Recoger' sobre la estrella.",
    robot: { x: 2, y: 4, dir: 0 },
    stars: [{ x: 2, y: 2 }],
    walls: [],
  },
  {
    id: 2,
    name: "Misión 2: Los Giros de Boty",
    desc: "Gira a la derecha para llegar a la estrella en la esquina.",
    robot: { x: 1, y: 3, dir: 0 },
    stars: [{ x: 3, y: 1 }],
    walls: [{ x: 1, y: 2 }],
  },
  {
    id: 3,
    name: "Misión 3: El Gran Laberinto",
    desc: "Esquiva los troncos de madera y recoge las 2 estrellas.",
    robot: { x: 0, y: 4, dir: 0 },
    stars: [
      { x: 0, y: 1 },
      { x: 4, y: 1 },
    ],
    walls: [
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 2, y: 1 },
    ],
  },
  {
    id: 4,
    name: "Misión 4: Modo Libre en Familia",
    desc: "¡Toca la cuadrícula para inventar tu propio mapa con estrellas y troncos!",
    robot: { x: 2, y: 2, dir: 0 },
    stars: [{ x: 4, y: 0 }],
    walls: [],
  },
];

export default function RobotSimulator() {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel = LEVELS[levelIdx];

  const [robot, setRobot] = useState(currentLevel.robot);
  const [stars, setStars] = useState(currentLevel.stars);
  const [walls, setWalls] = useState(currentLevel.walls);
  const [commands, setCommands] = useState<Command[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    resetBoard(levelIdx);
  }, [levelIdx]);

  const resetBoard = (idx = levelIdx) => {
    const lvl = LEVELS[idx];
    setRobot({ ...lvl.robot });
    setStars([...lvl.stars]);
    setWalls([...lvl.walls]);
    setCommands([]);
    setActiveStep(null);
    setIsRunning(false);
    setVictory(false);
  };

  const addCommand = (cmd: Command) => {
    if (isRunning) return;
    sound.playWoodClick();
    setCommands([...commands, cmd]);
  };

  const removeCommand = (idx: number) => {
    if (isRunning) return;
    sound.playWoodClick();
    setCommands(commands.filter((_, i) => i !== idx));
  };

  const handleCellClick = (x: number, y: number) => {
    if (levelIdx !== 3 || isRunning) return;
    sound.playWoodClick();

    if (robot.x === x && robot.y === y) return;

    const hasStar = stars.some((s) => s.x === x && s.y === y);
    const hasWall = walls.some((w) => w.x === x && w.y === y);

    if (!hasStar && !hasWall) {
      setStars([...stars, { x, y }]);
    } else if (hasStar) {
      setStars(stars.filter((s) => !(s.x === x && s.y === y)));
      setWalls([...walls, { x, y }]);
    } else {
      setWalls(walls.filter((w) => !(w.x === x && w.y === y)));
    }
  };

  const runAlgorithm = async () => {
    if (isRunning || commands.length === 0) return;
    setIsRunning(true);
    setVictory(false);

    let curRobot = { ...currentLevel.robot };
    let curStars = [...currentLevel.stars];
    setRobot(curRobot);
    setStars(curStars);

    await new Promise((r) => setTimeout(r, 200));

    for (let i = 0; i < commands.length; i++) {
      setActiveStep(i);
      const cmd = commands[i];

      if (cmd === "FORWARD") {
        let nextX = curRobot.x;
        let nextY = curRobot.y;
        if (curRobot.dir === 0) nextY -= 1;
        else if (curRobot.dir === 1) nextX += 1;
        else if (curRobot.dir === 2) nextY += 1;
        else if (curRobot.dir === 3) nextX -= 1;

        const isWall = walls.some((w) => w.x === nextX && w.y === nextY);
        const isOut = nextX < 0 || nextX > 4 || nextY < 0 || nextY > 4;

        if (!isWall && !isOut) {
          curRobot = { ...curRobot, x: nextX, y: nextY };
          setRobot(curRobot);
          sound.playWoodClick();
        } else {
          sound.playGentleBump();
        }
      } else if (cmd === "TURN_LEFT") {
        const nextDir = ((curRobot.dir + 3) % 4) as Direction;
        curRobot = { ...curRobot, dir: nextDir };
        setRobot(curRobot);
        sound.playWoodClick();
      } else if (cmd === "TURN_RIGHT") {
        const nextDir = ((curRobot.dir + 1) % 4) as Direction;
        curRobot = { ...curRobot, dir: nextDir };
        setRobot(curRobot);
        sound.playWoodClick();
      } else if (cmd === "COLLECT") {
        const starIdx = curStars.findIndex((s) => s.x === curRobot.x && s.y === curRobot.y);
        if (starIdx !== -1) {
          curStars = curStars.filter((_, idx) => idx !== starIdx);
          setStars(curStars);
          sound.playStarChime();
        } else {
          sound.playGentleBump();
        }
      }

      await new Promise((r) => setTimeout(r, 450));
    }

    setActiveStep(null);
    setIsRunning(false);

    if (curStars.length === 0 && currentLevel.stars.length > 0) {
      setVictory(true);
      sound.playStampFanfare();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#86efac", "#fde047", "#7dd3fc", "#fdba74"],
        });
      } catch {}
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Tablero Cuadrícula 5x5 */}
      <div className="lg:col-span-7 wood-card p-3 sm:p-6 flex flex-col items-center">
        
        {/* Selector de Nivel (Scrollable on mobile) */}
        <div className="w-full flex overflow-x-auto no-scrollbar gap-1.5 pb-2 mb-3 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {LEVELS.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => setLevelIdx(idx)}
              disabled={isRunning}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold font-fun transition-all shrink-0 ${
                levelIdx === idx
                  ? "bg-amber-400 text-amber-950 shadow-xs scale-102"
                  : "bg-amber-50 text-amber-900 hover:bg-amber-100"
              }`}
            >
              {lvl.name}
            </button>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-slate-600 mb-3 text-center font-medium bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200/60 max-w-md w-full">
          {currentLevel.desc}
        </p>

        {/* Tablero Cuadrícula 5x5 (Scales perfectly on mobile from 320px up) */}
        <div className="grid grid-cols-5 gap-1.5 min-[370px]:gap-2 sm:gap-2.5 p-2 min-[370px]:p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-amber-100/70 border-4 border-amber-200 shadow-inner">
          {Array.from({ length: 25 }).map((_, idx) => {
            const x = idx % 5;
            const y = Math.floor(idx / 5);
            const isRobot = robot.x === x && robot.y === y;
            const isStar = stars.some((s) => s.x === x && s.y === y);
            const isWall = walls.some((w) => w.x === x && w.y === y);

            return (
              <div
                key={idx}
                onClick={() => handleCellClick(x, y)}
                className={`w-11 h-11 min-[370px]:w-12 min-[370px]:h-12 min-[420px]:w-14 min-[420px]:h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl transition-all relative select-none ${
                  isWall
                    ? "bg-amber-800/80 border-2 border-amber-900 shadow-inner"
                    : "bg-white border-2 border-amber-200/50 shadow-2xs"
                } ${levelIdx === 3 ? "cursor-pointer hover:bg-amber-50" : ""}`}
              >
                {isWall && <span className="text-base sm:text-xl">🪵</span>}
                {isStar && !isRobot && (
                  <span className="animate-soft-bounce drop-shadow-sm text-lg sm:text-2xl">⭐</span>
                )}
                {isRobot && (
                  <div
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-sky-400 to-emerald-300 border-2 border-white shadow-md flex items-center justify-center text-base sm:text-xl transition-transform duration-300"
                    style={{
                      transform: `rotate(${robot.dir * 90}deg)`,
                    }}
                  >
                    🤖
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contador de Estrellas */}
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-amber-900">
          <span>Estrellas restantes:</span>
          <span className="px-2.5 py-0.5 bg-amber-200 rounded-full">
            {stars.length} ⭐
          </span>
        </div>
      </div>

      {/* Panel de Comandos */}
      <div className="lg:col-span-5 space-y-4 sm:space-y-6">
        
        {/* Botones de Comandos */}
        <div className="wood-card p-4 sm:p-6">
          <h4 className="font-fun text-xs sm:text-sm font-bold text-slate-800 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" /> 1. Elige una instrucción
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => addCommand("FORWARD")}
              disabled={isRunning}
              className="wood-btn bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300 flex-col py-2.5 sm:py-3 text-xs"
            >
              <ArrowUp className="w-5 h-5 text-sky-600 mb-0.5" />
              Avanzar
            </button>
            <button
              onClick={() => addCommand("TURN_LEFT")}
              disabled={isRunning}
              className="wood-btn bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-300 flex-col py-2.5 sm:py-3 text-xs"
            >
              <CornerUpLeft className="w-5 h-5 text-purple-600 mb-0.5" />
              Girar Izq
            </button>
            <button
              onClick={() => addCommand("TURN_RIGHT")}
              disabled={isRunning}
              className="wood-btn bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300 flex-col py-2.5 sm:py-3 text-xs"
            >
              <CornerUpRight className="w-5 h-5 text-rose-600 mb-0.5" />
              Girar Der
            </button>
            <button
              onClick={() => addCommand("COLLECT")}
              disabled={isRunning}
              className="wood-btn bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 flex-col py-2.5 sm:py-3 text-xs"
            >
              <Star className="w-5 h-5 text-amber-600 mb-0.5 fill-amber-500" />
              Recoger
            </button>
          </div>
        </div>

        {/* Secuencia del Algoritmo */}
        <div className="wood-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="font-fun text-xs sm:text-sm font-bold text-slate-800">
              2. Tu Algoritmo ({commands.length} pasos)
            </h4>
            <span className="text-[10px] text-slate-400">Toca para quitar</span>
          </div>

          <div className="min-h-20 max-h-40 overflow-y-auto p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/50 flex flex-wrap gap-1.5 content-start">
            {commands.length === 0 ? (
              <span className="text-xs text-slate-400 m-auto text-center py-4">
                Toca los bloques arriba para armar la secuencia...
              </span>
            ) : (
              commands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => removeCommand(idx)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold font-fun border transition-all ${
                    activeStep === idx
                      ? "bg-amber-400 text-amber-950 scale-105 shadow-sm border-amber-500 ring-2 ring-amber-300"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  {cmd === "FORWARD" && "⬆️ Avanzar"}
                  {cmd === "TURN_LEFT" && "↩️ Girar Izq"}
                  {cmd === "TURN_RIGHT" && "↪️ Girar Der"}
                  {cmd === "COLLECT" && "⭐ Recoger"}
                </button>
              ))
            )}
          </div>

          {/* Acciones */}
          <div className="mt-3 flex gap-2 sm:gap-3">
            <button
              onClick={runAlgorithm}
              disabled={isRunning || commands.length === 0}
              className="flex-1 wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold py-3 shadow-sm text-xs sm:text-sm"
            >
              <Play className="w-4 h-4 fill-emerald-950" />
              {isRunning ? "Ejecutando..." : "¡Ejecutar Algoritmo!"}
            </button>
            <button
              onClick={() => resetBoard()}
              disabled={isRunning}
              title="Reiniciar"
              className="wood-btn bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300 py-3 px-3.5 text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal de Éxito */}
        {victory && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 flex items-center justify-between gap-2 animate-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">🎉</span>
              <div>
                <h5 className="font-fun font-bold text-xs sm:text-sm">¡Misión Cumplida!</h5>
                <p className="text-[11px] text-emerald-800">Boty completó el algoritmo con éxito.</p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = (levelIdx + 1) % LEVELS.length;
                setLevelIdx(next);
                resetBoard(next);
              }}
              className="wood-btn bg-white hover:bg-emerald-50 text-emerald-900 text-xs px-3 py-1.5 border-emerald-300 shrink-0"
            >
              Siguiente ➔
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
