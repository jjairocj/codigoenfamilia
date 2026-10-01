content = '''"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  ArrowUp, ArrowDown,
} from "lucide-react";

export interface MinigameProps {
  code: string;
  onWin: () => void;
  completed: boolean;
}

export function SemillasGame({ code, onWin, completed }: MinigameProps) {
  // S01: Robot Humano
  const [s01Commands, setS01Commands] = useState<string[]>([]);
  const [s01Pos, setS01Pos] = useState<{ x: number; y: number; dir: number }>({ x: 0, y: 0, dir: 1 });
  const [s01Running, setS01Running] = useState(false);

  // S02: Receta de la Arepa
  const s02Correct = [
    "Mezclar harina de maíz, agua y sal en un tazón",
    "Amasar con las manos hasta que quede suave",
    "Formar bolitas y aplanarlas con cariño",
    "Asar en la sartén caliente hasta dorar"
  ];
  const [s02Steps, setS02Steps] = useState<string[]>([
    "Asar en la sartén caliente hasta dorar",
    "Mezclar harina de maíz, agua y sal en un tazón",
    "Formar bolitas y aplanarlas con cariño",
    "Amasar con las manos hasta que quede suave"
  ]);

  // S03: Mapa del Tesoro
  const [s03Found, setS03Found] = useState<Record<number, boolean>>({});

  // S04: Encuentra el bicho
  const [s04Solved, setS04Solved] = useState(false);

  // S05: Repite conmigo
  const [s05Sequence, setS05Sequence] = useState<string[]>([]);
  const s05Target = ["👏", "🦶", "👏", "🦶"];

  // S06: Mi primer personaje
  const [s06Color, setS06Color] = useState("bg-amber-400");
  const [s06Hat, setS06Hat] = useState("👑");
  const [s06Face, setS06Face] = useState("😊");

  // S07: Camina, salta y gira
  const [s07X, setS07X] = useState(0);
  const [s07Jump, setS07Jump] = useState(false);
  const [s07Spin, setS07Spin] = useState(false);

  // S08: Cuando toco al gato
  const [s08Pats, setS08Pats] = useState(0);

  // S09: Otra vez y otra vez (Bucle)
  const [s09Count, setS09Count] = useState(3);
  const [s09Playing, setS09Playing] = useState(false);
  const [s09CurrentStep, setS09CurrentStep] = useState(0);

  // S10: Dos amigos conversan
  const [s10Step, setS10Step] = useState(0);

  // S11: Mi cuento animado
  const [s11Scene, setS11Scene] = useState(0);
  const [s11Explored, setS11Explored] = useState<Record<number, boolean>>({ 0: true });

  // S12: Sí o No (Condicionales)
  const [s12Answers, setS12Answers] = useState<Record<number, boolean>>({});

  // S13: Ceros y Unos (Pixel Art 4x4)
  const [s13Grid, setS13Grid] = useState<number[]>([
    0, 1, 1, 0,
    1, 1, 1, 1,
    0, 1, 1, 0,
    0, 0, 0, 0
  ]);
  const s13Target = [
    0, 1, 1, 0,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 1, 1, 0
  ];

  // S14: La carrera
  const [s14Pos, setS14Pos] = useState(0);

  // S15: Seguros en Internet
  const [s15Index, setS15Index] = useState(0);
  const s15Questions = [
    { text: "Tu nombre completo y dirección de casa", private: true },
    { text: "Tu película animada o dibujo favorito", private: false },
    { text: "La contraseña secreta del computador", private: true },
    { text: "Un dibujo de un perro que hiciste", private: false }
  ];

  // S16: Gran Estreno
  const [s16Launches, setS16Launches] = useState(0);

  const triggerWin = () => {
    sound.chime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onWin();
  };

  const runS01 = async () => {
    if (s01Running || s01Commands.length === 0) return;
    setS01Running(true);
    let curX = 0;
    let curY = 0;
    let curDir = 1;
    setS01Pos({ x: 0, y: 0, dir: 1 });

    for (const cmd of s01Commands) {
      await new Promise((r) => setTimeout(r, 450));
      sound.click();
      if (cmd === "AV") {
        if (curDir === 0 && curY > 0) curY--;
        if (curDir === 1 && curX < 3) curX++;
        if (curDir === 2 && curY < 3) curY++;
        if (curDir === 3 && curX > 0) curX--;
      } else if (cmd === "GD") {
        curDir = (curDir + 1) % 4;
      } else if (cmd === "GI") {
        curDir = (curDir + 3) % 4;
      }
      setS01Pos({ x: curX, y: curY, dir: curDir });
    }
    setS01Running(false);
    if (curX === 2 && curY === 2) {
      triggerWin();
    }
  };

  return (
    <div className="space-y-4">
      {/* S01: El robot humano */}
      {code === "S01" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Programa a Boty para que llegue a la batería 🔋 en la casilla (2, 2).
          </p>
          <div className="grid grid-cols-4 gap-2 w-56 mx-auto bg-amber-50 p-2 rounded-2xl border-2 border-amber-200">
            {Array.from({ length: 16 }).map((_, i) => {
              const x = i % 4;
              const y = Math.floor(i / 4);
              const isBoty = s01Pos.x === x && s01Pos.y === y;
              const isTarget = x === 2 && y === 2;
              return (
                <div
                  key={i}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold transition-all border ${
                    isBoty
                      ? "bg-amber-400 border-amber-500 scale-105 shadow-sm"
                      : isTarget
                      ? "bg-emerald-100 border-emerald-300 animate-pulse"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {isBoty ? "🤖" : isTarget ? "🔋" : ""}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                setS01Commands([...s01Commands, "AV"]);
              }}
              disabled={s01Running}
              className="wood-btn text-xs px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-300 font-bold"
            >
              ⬆️ Avanzar
            </button>
            <button
              onClick={() => {
                sound.click();
                setS01Commands([...s01Commands, "GD"]);
              }}
              disabled={s01Running}
              className="wood-btn text-xs px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-indigo-300 font-bold"
            >
              ↪️ Girar Der
            </button>
            <button
              onClick={() => {
                sound.click();
                setS01Commands([...s01Commands, "GI"]);
              }}
              disabled={s01Running}
              className="wood-btn text-xs px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-indigo-300 font-bold"
            >
              ↩️ Girar Izq
            </button>
            <button
              onClick={() => {
                sound.click();
                setS01Commands([]);
                setS01Pos({ x: 0, y: 0, dir: 1 });
              }}
              disabled={s01Running}
              className="wood-btn text-xs px-3 py-1.5 bg-slate-100 text-slate-700 border-slate-300"
            >
              Borrar
            </button>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs min-h-[42px]">
            <span className="font-bold text-slate-500">Comandos:</span>
            <div className="flex gap-1 overflow-x-auto">
              {s01Commands.map((c, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">
                  {c}
                </span>
              ))}
              {s01Commands.length === 0 && <span className="text-slate-400 italic">Sin instrucciones</span>}
            </div>
            <button
              onClick={runS01}
              disabled={s01Running || s01Commands.length === 0}
              className="wood-btn text-xs px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
            >
              ▶️ Ejecutar
            </button>
          </div>
        </div>
      )}

      {/* S02: La receta de la arepa */}
      {code === "S02" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Ordena los pasos del algoritmo culinario usando las flechas hasta tener la receta perfecta:
          </p>
          <div className="space-y-2">
            {s02Steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-medium text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-950 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
                <div className="flex gap-1">
                  {idx > 0 && (
                    <button
                      onClick={() => {
                        sound.click();
                        const next = [...s02Steps];
                        const temp = next[idx - 1];
                        next[idx - 1] = next[idx];
                        next[idx] = temp;
                        setS02Steps(next);
                      }}
                      className="p-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-700"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {idx < s02Steps.length - 1 && (
                    <button
                      onClick={() => {
                        sound.click();
                        const next = [...s02Steps];
                        const temp = next[idx + 1];
                        next[idx + 1] = next[idx];
                        next[idx] = temp;
                        setS02Steps(next);
                      }}
                      className="p-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-700"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const isMatch = s02Steps.every((s, i) => s === s02Correct[i]);
              if (isMatch) {
                triggerWin();
              } else {
                sound.bump();
                alert("¡Casi! Recuerda: primero mezclar, luego amasar, luego formar y al final asar.");
              }
            }}
            className="w-full wood-btn py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            🍳 Probar Algoritmo de la Arepa
          </button>
        </div>
      )}

      {/* S03: Mapa del tesoro */}
      {code === "S03" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Explora las casillas de la isla para encontrar las 2 monedas 🪙 y el cofre del tesoro 💎:
          </p>
          <div className="grid grid-cols-3 gap-2 w-64 mx-auto">
            {Array.from({ length: 9 }).map((_, i) => {
              const isOpen = !!s03Found[i];
              const isTreasure = i === 4;
              const isCoin = i === 1 || i === 7;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (isOpen) return;
                    sound.click();
                    const next = { ...s03Found, [i]: true };
                    setS03Found(next);
                    if (next[1] && next[4] && next[7]) {
                      triggerWin();
                    }
                  }}
                  className={`h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all border-2 ${
                    isOpen
                      ? isTreasure
                        ? "bg-amber-300 border-amber-500 animate-bounce"
                        : isCoin
                        ? "bg-yellow-100 border-yellow-400"
                        : "bg-slate-100 border-slate-300 opacity-60"
                      : "bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-800"
                  }`}
                >
                  {isOpen ? (isTreasure ? "💎" : isCoin ? "🪙" : "🌿") : "❓"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* S04: ¡Encontré el bicho! */}
      {code === "S04" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            ¡Hay un error (bug) en las instrucciones para lavarse los dientes! Toca el paso equivocado para atraparlo:
          </p>
          <div className="space-y-2">
            {[
              { text: "1. Poner pasta dental en el cepillo", bug: false },
              { text: "2. Cepillar en círculos con cuidado", bug: false },
              { text: "3. Ponerse una media en la cabeza 🐛", bug: true },
              { text: "4. Enjuagarse la boca con agua limpia", bug: false }
            ].map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (step.bug) {
                    setS04Solved(true);
                    triggerWin();
                  } else {
                    sound.bump();
                  }
                }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-colors ${
                  step.bug && s04Solved
                    ? "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold"
                    : "bg-white hover:bg-amber-50 border-slate-200 text-slate-800"
                }`}
              >
                {step.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* S05: Repite conmigo */}
      {code === "S05" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Continúa el patrón rítmico: Palmada 👏 - Zapateo 🦶 - Palmada 👏 - Zapateo 🦶.
          </p>
          <div className="flex justify-center gap-2 p-3 bg-white rounded-xl border border-amber-200 min-h-[50px] items-center">
            {s05Sequence.map((item, idx) => (
              <span key={idx} className="text-2xl animate-in zoom-in-50">
                {item}
              </span>
            ))}
            {s05Sequence.length === 0 && <span className="text-xs text-slate-400">Toca los botones abajo...</span>}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.click();
                const next = [...s05Sequence, "👏"];
                setS05Sequence(next);
                if (next.length === 4 && next.every((v, i) => v === s05Target[i])) {
                  triggerWin();
                } else if (next.length >= 4) {
                  sound.bump();
                  setS05Sequence([]);
                }
              }}
              className="wood-btn px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs"
            >
              👏 Palmada
            </button>
            <button
              onClick={() => {
                sound.click();
                const next = [...s05Sequence, "🦶"];
                setS05Sequence(next);
                if (next.length === 4 && next.every((v, i) => v === s05Target[i])) {
                  triggerWin();
                } else if (next.length >= 4) {
                  sound.bump();
                  setS05Sequence([]);
                }
              }}
              className="wood-btn px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs"
            >
              🦶 Zapateo
            </button>
            <button
              onClick={() => {
                sound.click();
                setS05Sequence([]);
              }}
              className="wood-btn px-3 py-2 bg-slate-100 text-slate-700 text-xs"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}

      {/* S06: Mi primer personaje */}
      {code === "S06" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Personaliza a tu héroe digital eligiendo color, sombrero y emoción:
          </p>
          <div className="flex justify-center">
            <div className={`w-24 h-24 rounded-3xl ${s06Color} border-4 border-white shadow-md flex flex-col items-center justify-center transition-all`}>
              <span className="text-xl">{s06Hat}</span>
              <span className="text-3xl">{s06Face}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-500 text-[10px]">Color</span>
              <div className="flex justify-center gap-1">
                {["bg-amber-400", "bg-sky-400", "bg-emerald-400", "bg-purple-400"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { sound.click(); setS06Color(c); }}
                    className={`w-6 h-6 rounded-full ${c} border-2 border-white shadow-xs`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-500 text-[10px]">Sombrero</span>
              <div className="flex justify-center gap-1">
                {["👑", "🎩", "🧢", "🚀"].map((h) => (
                  <button
                    key={h}
                    onClick={() => { sound.click(); setS06Hat(h); }}
                    className="p-1 text-sm bg-white rounded-lg border border-slate-200"
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-500 text-[10px]">Emoción</span>
              <div className="flex justify-center gap-1">
                {["😊", "😎", "🥳", "🤖"].map((f) => (
                  <button
                    key={f}
                    onClick={() => { sound.click(); setS06Face(f); }}
                    className="p-1 text-sm bg-white rounded-lg border border-slate-200"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={triggerWin}
            className="w-full wood-btn py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            ✨ ¡Guardar Personaje y Darle Vida!
          </button>
        </div>
      )}

      {/* S07: Camina, salta y gira */}
      {code === "S07" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Haz avanzar al personaje con pasos, saltos y giros hasta cruzar la meta 🏁:
          </p>
          <div className="relative h-20 bg-emerald-50 rounded-2xl border-2 border-emerald-200 flex items-center px-4 overflow-hidden">
            <div className="absolute right-4 text-2xl">🏁</div>
            <div
              style={{
                transform: `translateX(${s07X}px) translateY(${s07Jump ? -24 : 0}px) rotate(${s07Spin ? 360 : 0}deg)`
              }}
              className="text-3xl transition-all duration-300"
            >
              🤖
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                const nextX = Math.min(s07X + 35, 180);
                setS07X(nextX);
                if (nextX >= 160) triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold"
            >
              🚶 Caminar (+35px)
            </button>
            <button
              onClick={() => {
                sound.click();
                setS07Jump(true);
                setTimeout(() => setS07Jump(false), 300);
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold"
            >
              🦘 Saltar
            </button>
            <button
              onClick={() => {
                sound.click();
                setS07Spin(true);
                setTimeout(() => setS07Spin(false), 400);
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold"
            >
              🔄 Girar 360°
            </button>
          </div>
        </div>
      )}

      {/* S08: Cuando toco al gato */}
      {code === "S08" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            El gato está esperando un evento de clic. Tócalo 3 veces para despertarlo y escuchar su ronroneo:
          </p>
          <div className="py-2">
            <button
              onClick={() => {
                sound.chime();
                const next = s08Pats + 1;
                setS08Pats(next);
                if (next >= 3) triggerWin();
              }}
              className="w-24 h-24 mx-auto rounded-full bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 flex flex-col items-center justify-center text-4xl shadow-sm active:scale-95 transition-all"
            >
              🐱
            </button>
          </div>
          <div className="text-xs font-bold text-amber-900">
            Caricias: {s08Pats} de 3 {s08Pats >= 3 ? "¡Miau! ¡Completado! ⭐" : ""}
          </div>
        </div>
      )}

      {/* S09: Otra vez y otra vez */}
      {code === "S09" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Configura el bucle para repetir la acción varias veces automáticamente:
          </p>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center space-y-3">
            <div className="text-3xl transition-transform">
              {s09Playing ? (s09CurrentStep % 2 === 0 ? "🕺" : "💃") : "🤖"}
            </div>
            <div className="flex items-center justify-center gap-3 text-xs font-bold text-slate-700">
              <span>Repetir:</span>
              <button
                onClick={() => { sound.click(); setS09Count(Math.max(2, s09Count - 1)); }}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold"
              >
                -
              </button>
              <span className="text-sm text-amber-900 font-fun px-2">{s09Count} veces</span>
              <button
                onClick={() => { sound.click(); setS09Count(Math.min(6, s09Count + 1)); }}
                className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={async () => {
              if (s09Playing) return;
              setS09Playing(true);
              for (let i = 1; i <= s09Count; i++) {
                setS09CurrentStep(i);
                sound.click();
                await new Promise((r) => setTimeout(r, 350));
              }
              setS09Playing(false);
              triggerWin();
            }}
            disabled={s09Playing}
            className="w-full wood-btn py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            ▶️ Ejecutar Bucle ({s09Count} repeticiones)
          </button>
        </div>
      )}

      {/* S10: Dos amigos conversan */}
      {code === "S10" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Sigue la conversación entre Boty y el Gato tocando para enviar el siguiente mensaje:
          </p>
          <div className="space-y-2 p-3 bg-white rounded-2xl border border-amber-200">
            <div className={`p-2 rounded-xl text-xs ${s10Step >= 1 ? "bg-sky-100 text-sky-900" : "opacity-30 bg-slate-50"}`}>
              🤖 Boty: <strong>¡Hola amigo! ¿Quieres programar conmigo?</strong>
            </div>
            <div className={`p-2 rounded-xl text-xs text-right ${s10Step >= 2 ? "bg-amber-100 text-amber-900" : "opacity-30 bg-slate-50"}`}>
              🐱 Gato: <strong>¡Sí, me encanta resolver acertijos en familia!</strong>
            </div>
            <div className={`p-2 rounded-xl text-xs ${s10Step >= 3 ? "bg-emerald-100 text-emerald-900" : "opacity-30 bg-slate-50"}`}>
              🤖 Boty: <strong>¡Genial! ¡Manos a la obra! ⭐</strong>
            </div>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = s10Step + 1;
              setS10Step(next);
              if (next >= 3) triggerWin();
            }}
            className="w-full wood-btn py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            💬 Enviar Siguiente Mensaje ({Math.min(s10Step + 1, 3)}/3)
          </button>
        </div>
      )}

      {/* S11: Mi cuento animado */}
      {code === "S11" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Cambia los escenarios de tu cuento interactivo y explora los 3 lugares:
          </p>
          <div
            className="h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-3 text-center transition-all bg-gradient-to-r shadow-xs text-white"
            style={{
              backgroundImage:
                s11Scene === 0
                  ? "linear-gradient(to right, #059669, #10b981)"
                  : s11Scene === 1
                  ? "linear-gradient(to right, #1e1b4b, #312e81)"
                  : "linear-gradient(to right, #0284c7, #06b6d4)"
            }}
          >
            <div className="text-3xl mb-1">{s11Scene === 0 ? "🌲 🦊 🦉" : s11Scene === 1 ? "🚀 🪐 🌟" : "🐠 🐙 🌊"}</div>
            <div className="text-xs font-bold">
              {s11Scene === 0 ? "Escena 1: El Bosque Encantado" : s11Scene === 1 ? "Escena 2: Viaje al Espacio Profundo" : "Escena 3: Arrecife Submarino"}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {["🌲 Bosque", "🚀 Espacio", "🌊 Océano"].map((name, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.click();
                  setS11Scene(idx);
                  const nextExplored = { ...s11Explored, [idx]: true };
                  setS11Explored(nextExplored);
                  if (Object.keys(nextExplored).length >= 3) triggerWin();
                }}
                className={`wood-btn text-xs px-3 py-1.5 font-bold ${
                  s11Scene === idx ? "bg-amber-300 text-amber-950 border-amber-400" : "bg-white text-slate-700"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* S12: Sí o no (Condicionales) */}
      {code === "S12" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Responde los acertijos con la decisión correcta (SI / SINO):
          </p>
          <div className="space-y-2">
            {[
              { q: "Si afuera está lloviendo 🌧️...", ok: "Llevar paraguas ☂️", wrong: "Llevar helado 🍦" },
              { q: "Si hace un sol radiante ☀️...", ok: "Ponerse protector solar 🧴", wrong: "Ponerse chaqueta de nieve 🧥" }
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800">{item.q}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sound.click();
                      const next = { ...s12Answers, [idx]: true };
                      setS12Answers(next);
                      if (next[0] && next[1]) triggerWin();
                    }}
                    className={`flex-1 p-1.5 rounded-lg border text-[11px] font-bold ${
                      s12Answers[idx] ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    {item.ok}
                  </button>
                  <button
                    onClick={() => sound.bump()}
                    className="flex-1 p-1.5 rounded-lg border bg-slate-50 text-slate-500 text-[11px]"
                  >
                    {item.wrong}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* S13: Ceros y unos */}
      {code === "S13" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Activa los píxeles (1 = naranja, 0 = blanco) para completar el corazón digital:
          </p>
          <div className="grid grid-cols-4 gap-1.5 w-44 mx-auto p-2 bg-amber-50 rounded-2xl border border-amber-200">
            {s13Grid.map((val, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.click();
                  const next = [...s13Grid];
                  next[idx] = next[idx] === 1 ? 0 : 1;
                  setS13Grid(next);
                  if (next.every((v, i) => v === s13Target[i])) {
                    triggerWin();
                  }
                }}
                className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all border ${
                  val === 1 ? "bg-amber-500 text-white border-amber-600" : "bg-white text-slate-400 border-slate-200"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          <div className="text-center text-[11px] text-slate-500">
            Toca las celdas para cambiar entre 0 y 1.
          </div>
        </div>
      )}

      {/* S14: La carrera */}
      {code === "S14" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Toca rápido el botón ¡Avanzar! para que tu liebre gane la carrera:
          </p>
          <div className="h-16 bg-amber-50 rounded-2xl border border-amber-200 relative flex items-center px-3 overflow-hidden">
            <div className="absolute right-3 text-xl">🏁</div>
            <div
              style={{ transform: `translateX(${s14Pos}px)` }}
              className="text-2xl transition-all duration-150"
            >
              🐰
            </div>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = s14Pos + 25;
              setS14Pos(next);
              if (next >= 160) triggerWin();
            }}
            className="w-full wood-btn py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            ⚡ ¡Avanzar Rápido!
          </button>
        </div>
      )}

      {/* S15: Seguros en internet */}
      {code === "S15" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Clasifica la información: ¿Es privada o se puede compartir de forma segura?
          </p>
          {s15Index < s15Questions.length ? (
            <div className="p-3 bg-white rounded-2xl border border-amber-200 text-center space-y-3">
              <div className="text-xs font-bold text-slate-500">Dato {s15Index + 1} de {s15Questions.length}</div>
              <div className="text-sm font-bold text-slate-800">
                "{s15Questions[s15Index].text}"
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    const isPriv = s15Questions[s15Index].private;
                    if (isPriv) {
                      sound.click();
                    } else {
                      sound.bump();
                    }
                    const nextIdx = s15Index + 1;
                    setS15Index(nextIdx);
                    if (nextIdx >= s15Questions.length) triggerWin();
                  }}
                  className="wood-btn text-xs px-3 py-1.5 bg-rose-100 text-rose-900 border-rose-300 font-bold"
                >
                  🔒 Guardar Privado
                </button>
                <button
                  onClick={() => {
                    const isPriv = s15Questions[s15Index].private;
                    if (!isPriv) {
                      sound.click();
                    } else {
                      sound.bump();
                    }
                    const nextIdx = s15Index + 1;
                    setS15Index(nextIdx);
                    if (nextIdx >= s15Questions.length) triggerWin();
                  }}
                  className="wood-btn text-xs px-3 py-1.5 bg-emerald-100 text-emerald-900 border-emerald-300 font-bold"
                >
                  🌐 Seguro Compartir
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs font-bold text-emerald-900">
              ¡Excelente! Sabes proteger tu privacidad digital ⭐
            </div>
          )}
        </div>
      )}

      {/* S16: Gran estreno */}
      {code === "S16" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            ¡Has llegado al final de Semillas! Lanza fuegos artificiales para celebrar el gran estreno:
          </p>
          <button
            onClick={() => {
              sound.stamp();
              confetti({
                particleCount: 80,
                spread: 90,
                origin: { y: 0.6 }
              });
              const next = s16Launches + 1;
              setS16Launches(next);
              if (next >= 2) triggerWin();
            }}
            className="wood-btn text-sm px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold shadow-md"
          >
            🎆 ¡Lanzar Cohetes de Celebración! ({s16Launches})
          </button>
        </div>
      )}
    </div>
  );
}
'''

with open('src/components/minigames/SemillasGames.tsx', 'w') as f:
    f.write(content)

print('SemillasGames.tsx created successfully!')
