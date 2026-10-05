"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import gsap from "gsap";
import {
  Play, RotateCcw, Sparkles, Plus, Trash2, Cpu, CheckCircle2,
  Terminal, Code, Award, Check, Radio, Compass, Bell, Shield
} from "lucide-react";

export interface MinigameProps {
  code: string;
  onWin: () => void;
  completed: boolean;
}

// -------------------------------------------------------------
// I08: Turtle Graphics Interactive SVG Canvas
// -------------------------------------------------------------
function I08TurtleCanvas({ onWin, completed }: { onWin: () => void; completed: boolean }) {
  const [turtle, setTurtle] = useState({ x: 150, y: 90, angle: 0 });
  const [lines, setLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const [steps, setSteps] = useState(0);

  const forward = (dist: number = 40) => {
    sound.click();
    const rad = (turtle.angle * Math.PI) / 180;
    const nx = Math.max(15, Math.min(285, turtle.x + Math.cos(rad) * dist));
    const ny = Math.max(15, Math.min(165, turtle.y + Math.sin(rad) * dist));

    setLines((prev) => [...prev, { x1: turtle.x, y1: turtle.y, x2: nx, y2: ny }]);
    setTurtle((prev) => ({ ...prev, x: nx, y: ny }));

    const nextSteps = steps + 1;
    setSteps(nextSteps);
    if (nextSteps >= 4) {
      sound.chime();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onWin();
    }
  };

  const turn = (deg: number) => {
    sound.click();
    setTurtle((prev) => ({ ...prev, angle: (prev.angle + deg) % 360 }));
  };

  const reset = () => {
    sound.click();
    setTurtle({ x: 150, y: 90, angle: 0 });
    setLines([]);
    setSteps(0);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs px-1">
        <span className="font-bold text-slate-700">🐢 Lienzo de Dibujo con Turtle</span>
        <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Trazos: {steps}/4
        </span>
      </div>

      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 bg-slate-900 shadow-inner">
        <svg viewBox="0 0 300 180" className="w-full h-40">
          <defs>
            <pattern id="turtleGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="300" height="180" fill="#0f172a" />
          <rect width="300" height="180" fill="url(#turtleGrid)" />

          {/* Drawn Lines */}
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}

          {/* Turtle Icon */}
          <g
            transform={`translate(${turtle.x}, ${turtle.y}) rotate(${turtle.angle})`}
            style={{ transition: "transform 0.25s ease-out" }}
          >
            <circle r="12" fill="#059669" stroke="#6ee7b7" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="12" fill="white">
              🐢
            </text>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex gap-2">
          <button
            onClick={() => forward(40)}
            className="wood-btn px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            t.forward(40) ➡️
          </button>
          <button
            onClick={() => turn(90)}
            className="wood-btn px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            t.right(90°) 🔄
          </button>
        </div>
        <button
          onClick={reset}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-xl"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Main Inventores Game Component
// -------------------------------------------------------------
export function InventoresGame({ code, onWin, completed }: MinigameProps) {
  const triggerWin = () => {
    sound.chime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onWin();
  };

  // I01: Clones
  const [i01Clones, setI01Clones] = useState<number[]>([]);

  // I02: Listas
  const [i02Items, setI02Items] = useState<string[]>(["Poción de vida 🧪"]);
  const [i02Input, setI02Input] = useState("");

  // I03: Bloques con parámetros
  const [i03Sides, setI03Sides] = useState(4);

  // I04: Gravedad y saltos
  const [i04Jumping, setI04Jumping] = useState(false);

  // I05: Niveles de juego
  const [i05Level, setI05Level] = useState(1);

  // I06: Juego de plataformas
  const [i06Plat, setI06Plat] = useState(1);

  // I07: De bloques a texto
  const [i07Matched, setI07Matched] = useState(false);

  // I09: Repetir con for
  const [i09Step, setI09Step] = useState(0);

  // I10: Variables e input
  const [i10Base, setI10Base] = useState(5);
  const [i10Height, setI10Height] = useState(4);

  // I11: Decisiones con if
  const [i11Temp, setI11Temp] = useState(20);

  // I12: Adivina el número
  const [i12Secret] = useState(14);
  const [i12Guess, setI12Guess] = useState("");
  const [i12Hint, setI12Hint] = useState("");

  // I13: Funciones con def
  const [i13Val, setI13Val] = useState(3);

  // I14: Listas en Python
  const [i14Slice, setI14Slice] = useState(false);

  // I15: Leer errores
  const [i15Fixed, setI15Fixed] = useState(false);

  // I16: Aventura de texto
  const [i16Choice, setI16Choice] = useState<string | null>(null);

  // I17: Mi primera placa
  const [i17Icon, setI17Icon] = useState("❤️");

  // I18: Botones y luces
  const [i18BtnA, setI18BtnA] = useState(false);

  // I19: Sensores
  const [i19Light, setI19Light] = useState(128);

  // I20: Radio
  const [i20Msg, setI20Msg] = useState("");

  // I21: Dado electrónico
  const [i21Dice, setI21Dice] = useState(6);

  // I22: Podómetro
  const [i22Steps, setI22Steps] = useState(0);

  // I23: Brújula
  const [i23Heading, setI23Heading] = useState(0);

  // I24: Proyecto final
  const [i24Badge, setI24Badge] = useState(false);

  return (
    <div className="space-y-4">
      {/* I01: Clones */}
      {code === "I01" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Crea 4 clones usando el bloque de Scratch <code>crear clon de [mí mismo]</code>:
          </p>
          <div className="flex justify-center gap-2 h-16 items-center bg-purple-50 rounded-2xl border border-purple-200">
            <span className="text-3xl">👾</span>
            {i01Clones.map((_, i) => (
              <span key={i} className="text-2xl animate-in zoom-in duration-300">
                👾
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = [...i01Clones, Date.now()];
              setI01Clones(next);
              if (next.length >= 4) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs"
          >
            ✨ Crear Clon ({i01Clones.length}/4)
          </button>
        </div>
      )}

      {/* I02: Listas */}
      {code === "I02" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Administra tu inventario de objetos agregando ítems a la lista:
          </p>
          <div className="space-y-1 bg-white p-2.5 rounded-2xl border border-amber-200">
            {i02Items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-1.5 bg-amber-50 rounded-xl">
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={i02Input}
              onChange={(e) => setI02Input(e.target.value)}
              placeholder="Nuevo objeto (ej: Llave dorada 🗝️)..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300"
            />
            <button
              onClick={() => {
                if (!i02Input.trim()) return;
                sound.click();
                const next = [...i02Items, i02Input];
                setI02Items(next);
                setI02Input("");
                if (next.length >= 3) triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      {/* I03: Bloques con parámetros */}
      {code === "I03" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Llama a la función <code>dibujar_poligono(lados={i03Sides})</code>:
          </p>
          <div className="w-20 h-20 mx-auto bg-white border border-amber-200 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xs">
            {i03Sides === 3 ? "🔺" : i03Sides === 4 ? "🔲" : i03Sides === 5 ? "⬟" : "🛑"}
          </div>
          <div className="flex justify-center gap-2">
            {[3, 4, 5, 6].map((l) => (
              <button
                key={l}
                onClick={() => {
                  sound.click();
                  setI03Sides(l);
                  if (l === 6) triggerWin();
                }}
                className={`wood-btn text-xs px-3 py-1.5 font-bold ${
                  i03Sides === l ? "bg-amber-400 text-amber-950" : "bg-white text-slate-700"
                }`}
              >
                {l} lados
              </button>
            ))}
          </div>
        </div>
      )}

      {/* I04: Gravedad y saltos */}
      {code === "I04" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Aplica física de gravedad con aceleración hacia abajo:
          </p>
          <div className="h-24 bg-emerald-50 rounded-2xl border flex items-end justify-center pb-2">
            <div className={`text-4xl transition-all duration-500 ${i04Jumping ? "-translate-y-12" : ""}`}>
              🤖
            </div>
          </div>
          <button
            onClick={() => {
              sound.click();
              setI04Jumping(true);
              setTimeout(() => {
                setI04Jumping(false);
                triggerWin();
              }, 500);
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            🦘 Aplicar Impulso y Gravedad
          </button>
        </div>
      )}

      {/* I05: Niveles de juego */}
      {code === "I05" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Supera los retos para avanzar de nivel 1 al 3:
          </p>
          <div className="text-sm font-bold text-slate-800 bg-sky-100 p-2 rounded-xl">
            Nivel Actual: {i05Level} de 3
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i05Level + 1;
              setI05Level(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
          >
            ⚡ Superar Nivel y Avanzar
          </button>
        </div>
      )}

      {/* I06: Juego de plataformas */}
      {code === "I06" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Salta de plataforma en plataforma hasta alcanzar la llave dorada 🗝️:
          </p>
          <div className="h-20 bg-slate-100 rounded-2xl flex items-center justify-around">
            <span className={i06Plat === 1 ? "text-3xl" : "text-xl opacity-30"}>🟫</span>
            <span className={i06Plat === 2 ? "text-3xl" : "text-xl opacity-30"}>🟫</span>
            <span className={i06Plat === 3 ? "text-3xl" : "text-xl opacity-30"}>🗝️</span>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i06Plat + 1;
              setI06Plat(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            🦘 Saltar a Siguiente Plataforma ({i06Plat}/3)
          </button>
        </div>
      )}

      {/* I07: De bloques a texto (Scratch a Python) */}
      {code === "I07" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            ¿Cuál es la sintaxis correcta en Python para el bloque de Scratch <code>repetir (5)</code>?
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                sound.chime();
                setI07Matched(true);
                triggerWin();
              }}
              className="w-full p-3 rounded-2xl border-2 border-emerald-400 bg-emerald-50 text-xs font-mono font-bold text-emerald-950 text-left hover:bg-emerald-100 transition-all flex items-center justify-between"
            >
              <span>for i in range(5):</span>
              <span className="text-emerald-600 font-sans text-xs">⭐ ¡Correcto!</span>
            </button>
            <button
              onClick={() => sound.bump()}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-600 text-left hover:bg-slate-50"
            >
              repeat 5 times()
            </button>
            <button
              onClick={() => sound.bump()}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-600 text-left hover:bg-slate-50"
            >
              loop(5) =&gt; {}
            </button>
          </div>
        </div>
      )}

      {/* I08: La tortuga (Turtle Canvas) */}
      {code === "I08" && (
        <I08TurtleCanvas onWin={triggerWin} completed={completed} />
      )}

      {/* I09: Repetir con for */}
      {code === "I09" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Avanza paso a paso el bucle: <code>for i in range(4): robot.avanzar()</code>
          </p>
          <div className="p-3 bg-slate-950 rounded-2xl text-emerald-400 font-mono text-xs border border-slate-800 flex items-center justify-around">
            {[0, 1, 2, 3].map((step) => (
              <span
                key={step}
                className={`p-1.5 rounded-lg ${
                  i09Step === step ? "bg-emerald-500 text-white font-bold animate-pulse" : "text-slate-500"
                }`}
              >
                paso {step}
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = (i09Step + 1) % 4;
              setI09Step(next);
              if (next === 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            ⏭️ Siguiente Iteración ({i09Step + 1}/4)
          </button>
        </div>
      )}

      {/* I10: Variables e input */}
      {code === "I10" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Calcula el área del rectángulo: <code>area = base * altura</code>
          </p>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-mono font-bold text-amber-950">
            base = {i10Base} | altura = {i10Height} → area = {i10Base * i10Height}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                setI10Base(i10Base + 1);
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-white font-bold"
            >
              base +1
            </button>
            <button
              onClick={() => {
                sound.click();
                setI10Height(i10Height + 1);
                triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-emerald-500 text-white font-bold"
            >
              altura +1
            </button>
          </div>
        </div>
      )}

      {/* I11: Decisiones con if */}
      {code === "I11" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Evalúa la condición: <code>if temp &gt; 25: "☀️ Calor" else: "❄️ Fresco"</code>
          </p>
          <div className="text-sm font-bold text-slate-800 bg-sky-100 p-2.5 rounded-2xl border border-sky-200">
            Temperatura: {i11Temp}°C → {i11Temp > 25 ? "☀️ Hace Calor (usa ropa ligera)" : "❄️ Está Fresco (usa saco)"}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                setI11Temp(30);
                triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              Fijar en 30°C (☀️ Calor)
            </button>
            <button
              onClick={() => {
                sound.click();
                setI11Temp(12);
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-sky-200 text-sky-950 font-bold"
            >
              Fijar en 12°C (❄️ Fresco)
            </button>
          </div>
        </div>
      )}

      {/* I12: Adivina el número */}
      {code === "I12" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Adivina el número secreto entre 1 y 20:
          </p>
          {i12Hint && (
            <div className="text-xs font-bold text-amber-900 bg-amber-100 p-2 rounded-xl border border-amber-300">
              {i12Hint}
            </div>
          )}
          <div className="flex gap-2 max-w-xs mx-auto">
            <input
              type="number"
              value={i12Guess}
              onChange={(e) => setI12Guess(e.target.value)}
              placeholder="Número (ej: 14)..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300"
            />
            <button
              onClick={() => {
                const val = parseInt(i12Guess, 10);
                if (val === i12Secret) {
                  sound.chime();
                  setI12Hint("¡Correcto! ¡Adivinaste el número secreto! ⭐");
                  triggerWin();
                } else if (val < i12Secret) {
                  sound.bump();
                  setI12Hint("¡Más alto 🔼!");
                } else {
                  sound.bump();
                  setI12Hint("¡Más bajo 🔽!");
                }
              }}
              className="wood-btn text-xs px-4 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              Probar
            </button>
          </div>
        </div>
      )}

      {/* I13: Funciones con def */}
      {code === "I13" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Llama a la función: <code>def duplicar(x): return x * 2</code>
          </p>
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs font-mono text-purple-950 font-bold">
            duplicar({i13Val}) → Resultado: {i13Val * 2}
          </div>
          <button
            onClick={() => {
              sound.click();
              setI13Val(i13Val + 2);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-purple-600 text-white font-bold text-xs"
          >
            ⚡ Probar con Nuevo Argumento ({i13Val + 2})
          </button>
        </div>
      )}

      {/* I14: Listas en Python */}
      {code === "I14" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Aplica un slice: <code>frutas[1:3]</code> sobre <code>["🍎", "🍌", "🍇", "🍊"]</code>
          </p>
          <div className="p-3 bg-white rounded-2xl border border-amber-200 text-xs font-mono">
            {i14Slice ? "Resultado del slice: ['🍌', '🍇'] ⭐" : "['🍎', '🍌', '🍇', '🍊']"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setI14Slice(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            ✂️ Cortar Rebanada [1:3]
          </button>
        </div>
      )}

      {/* I15: Leer errores */}
      {code === "I15" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Corrige el <code>SyntaxError</code> añadiendo los dos puntos faltantes:
          </p>
          <div className="p-3 bg-slate-900 rounded-2xl font-mono text-xs border border-slate-800">
            <div className={i15Fixed ? "text-emerald-400" : "text-rose-400"}>
              if puntos &gt; 10{i15Fixed ? ":" : " ⚠️ (Falta dos puntos)"}
            </div>
            <div className="text-slate-300 ml-4">print("¡Nuevo récord!")</div>
          </div>
          <button
            onClick={() => {
              sound.chime();
              setI15Fixed(true);
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            🐛 Corregir Error de Sintaxis
          </button>
        </div>
      )}

      {/* I16: Aventura de texto */}
      {code === "I16" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Toma una decisión en la historia de rol por consola:
          </p>
          <div className="p-3 bg-slate-950 rounded-2xl font-mono text-xs text-emerald-400 border border-slate-800">
            &gt; Estás frente a dos caminos místicos.<br />
            {i16Choice && (
              <div className="text-amber-300 mt-2">
                &gt; Elegiste: {i16Choice} → ¡Encontraste un cofre mágico! 💎
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                sound.chime();
                setI16Choice("🌲 El bosque antiguo");
                triggerWin();
              }}
              className="flex-1 wood-btn py-2 bg-emerald-600 text-white font-bold text-xs"
            >
              🌲 El Bosque Antiguo
            </button>
            <button
              onClick={() => {
                sound.chime();
                setI16Choice("🏰 El castillo de piedra");
                triggerWin();
              }}
              className="flex-1 wood-btn py-2 bg-indigo-600 text-white font-bold text-xs"
            >
              🏰 El Castillo de Piedra
            </button>
          </div>
        </div>
      )}

      {/* I17: Mi primera placa */}
      {code === "I17" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Dibuja un icono en la matriz 5×5 LED del micro:bit:
          </p>
          <div className="w-16 h-16 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center text-3xl border border-slate-800">
            {i17Icon}
          </div>
          <div className="flex justify-center gap-2">
            {["❤️", "⭐", "😊"].map((ic) => (
              <button
                key={ic}
                onClick={() => {
                  sound.click();
                  setI17Icon(ic);
                  triggerWin();
                }}
                className="wood-btn text-base px-3 py-1.5 bg-slate-100"
              >
                {ic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* I18: Botones y luces */}
      {code === "I18" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Presiona el Botón A para cambiar el patrón de LEDs:
          </p>
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-mono text-amber-300">
            {i18BtnA ? "Botón A presionado → Patrón: 🟩🟩🟩🟩🟩" : "En espera del Botón A"}
          </div>
          <button
            onClick={() => {
              sound.click();
              setI18BtnA(true);
              triggerWin();
            }}
            className="wood-btn px-5 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            🔘 Presionar Botón A
          </button>
        </div>
      )}

      {/* I19: Sensores del entorno */}
      {code === "I19" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Ajusta el sensor de nivel de luz ambiental:
          </p>
          <div className="text-sm font-bold text-slate-800 bg-amber-50 p-2 rounded-xl">
            Luz: {i19Light} / 255 → {i19Light > 120 ? "☀️ Día" : "🌙 Noche"}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                setI19Light(200);
                triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              Simular Sol (200)
            </button>
            <button
              onClick={() => {
                sound.click();
                setI19Light(40);
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-slate-800 text-white font-bold"
            >
              Simular Noche (40)
            </button>
          </div>
        </div>
      )}

      {/* I20: Radio y comunicación */}
      {code === "I20" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Envía un paquete de radio entre dos placas micro:bit:
          </p>
          <div className="p-2.5 bg-slate-900 rounded-xl text-xs font-mono text-cyan-400">
            {i20Msg ? `Radio RX: "${i20Msg}" ⭐` : "En espera de paquete por radio..."}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setI20Msg("HOLA_FAMILIA");
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-cyan-600 text-white font-bold text-xs"
          >
            📡 Enviar Mensaje por Radio
          </button>
        </div>
      )}

      {/* I21: Dado electrónico */}
      {code === "I21" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Sacude la placa para generar un número aleatorio del 1 al 6:
          </p>
          <div className="text-3xl font-extrabold text-amber-950 bg-amber-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border border-amber-300">
            {i21Dice}
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = Math.floor(Math.random() * 6) + 1;
              setI21Dice(next);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            🎲 Sacudir Placa (Shake)
          </button>
        </div>
      )}

      {/* I22: Podómetro */}
      {code === "I22" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Cuenta pasos detectando aceleración en el eje Z:
          </p>
          <div className="text-xl font-bold font-mono text-emerald-900 bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200">
            👟 Pasos: {i22Steps} / 5
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i22Steps + 1;
              setI22Steps(next);
              if (next >= 5) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            🚶 Simular Paso (+1)
          </button>
        </div>
      )}

      {/* I23: Brújula */}
      {code === "I23" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Calibra el magnetómetro para encontrar el Norte magnético:
          </p>
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-slate-700 bg-slate-900 flex items-center justify-center text-xl text-white">
            🧭
          </div>
          <button
            onClick={() => {
              sound.chime();
              setI23Heading(0);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-indigo-600 text-white font-bold text-xs"
          >
            🧭 Apuntar al Norte (0°)
          </button>
        </div>
      )}

      {/* I24: Proyecto final de Inventores */}
      {code === "I24" && (
        <div className="space-y-3 text-center">
          <div className="text-4xl animate-bounce">🏆</div>
          <h4 className="font-fun text-base font-bold text-slate-800">
            ¡Felicitaciones por graduarte del Nivel Inventores!
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Dominaste la transición de bloques a Python, la robótica con micro:bit y el pensamiento computacional.
          </p>
          <button
            onClick={() => {
              sound.chime();
              confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
              triggerWin();
            }}
            className="wood-btn px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs shadow-md"
          >
            ⭐ Sellar Pasaporte de Inventor/a
          </button>
        </div>
      )}
    </div>
  );
}
