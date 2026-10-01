"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Play, RotateCcw, Sparkles, Plus, Trash2, Cpu, CheckCircle2
} from "lucide-react";

export interface MinigameProps {
  code: string;
  onWin: () => void;
  completed: boolean;
}

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

  // I08: La tortuga
  const [i08Angle, setI08Angle] = useState(0);

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
  const [i18Count, setI18Count] = useState(0);

  // I19: Sensores
  const [i19SensorVal, setI19SensorVal] = useState(25);

  // I20: Juego con la placa
  const [i20Roll, setI20Roll] = useState<string | null>(null);

  // I21: ¿Cómo funciona internet?
  const [i21Packets, setI21Packets] = useState<number>(0);

  // I22: ¿Qué es la IA?
  const [i22Trained, setI22Trained] = useState<number>(0);

  // I23: Contraseñas y privacidad
  const [i23Pass, setI23Pass] = useState("");

  // I24: Proyecto final de Inventores
  const [i24Activated, setI24Activated] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {/* I01: Clones */}
      {code === "I01" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Crea clones dinámicos del personaje en pantalla hasta tener 4 clones:
          </p>
          <div className="flex justify-center gap-2 h-16 items-center bg-purple-50 rounded-xl p-2">
            <span className="text-2xl font-bold">🐱</span>
            {i01Clones.map((id) => (
              <span key={id} className="text-xl animate-in zoom-in-50">
                🐱
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
            Administra tu inventario de objetos agregando al menos 2 ítems a la lista:
          </p>
          <div className="space-y-1 bg-white p-2.5 rounded-xl border border-amber-200">
            {i02Items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-1 bg-amber-50 rounded">
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
          <div className="w-24 h-24 mx-auto bg-white border border-amber-200 rounded-2xl flex items-center justify-center text-2xl font-bold">
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
            Máquina de estados: supera el reto para pasar de nivel 1 al 3:
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

      {/* I07: De bloques a texto */}
      {code === "I07" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            ¿Cuál es el equivalente en Python del bloque Scratch <code>repetir (5)</code>?
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                sound.chime();
                setI07Matched(true);
                triggerWin();
              }}
              className="w-full p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-xs font-mono font-bold text-emerald-900 text-left"
            >
              for i in range(5):
            </button>
            <button
              onClick={() => sound.bump()}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-700 text-left"
            >
              repeat 5 times()
            </button>
          </div>
        </div>
      )}

      {/* I08: La tortuga */}
      {code === "I08" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Gira la tortuga con <code>t.left(60)</code> para completar un hexágono:
          </p>
          <div className="w-20 h-20 mx-auto bg-amber-50 rounded-full border border-amber-200 flex items-center justify-center text-3xl">
            <span style={{ transform: `rotate(${i08Angle}deg)` }} className="transition-transform">
              🐢
            </span>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i08Angle + 60;
              setI08Angle(next);
              if (next >= 360) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            🔄 Girar Tortuga (+60°)
          </button>
        </div>
      )}

      {/* I09: Repetir con for */}
      {code === "I09" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Depura paso a paso el bucle: <code>for i in range(4): print(i)</code>
          </p>
          <div className="p-2.5 bg-slate-900 rounded-xl text-emerald-400 font-mono text-xs">
            Valor de i: {i09Step} (Paso {i09Step + 1} de 4)
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i09Step + 1;
              setI09Step(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            ⏭️ Siguiente Iteración
          </button>
        </div>
      )}

      {/* I10: Variables e input */}
      {code === "I10" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Calcula el área del rectángulo: <code>area = base * altura</code>
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono font-bold text-amber-900">
            base = {i10Base} | altura = {i10Height} → area = {i10Base * i10Height}
          </div>
          <button
            onClick={() => {
              sound.click();
              setI10Base(i10Base + 1);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            🧮 Recalcular Variables
          </button>
        </div>
      )}

      {/* I11: Decisiones con if */}
      {code === "I11" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Evalúa la condición: <code>if temp &gt; 25: "Calor" else: "Fresco"</code>
          </p>
          <div className="text-sm font-bold text-slate-800 bg-sky-100 p-2 rounded-xl">
            Temperatura: {i11Temp}°C → {i11Temp > 25 ? "☀️ Hace Calor" : "❄️ Está Fresco"}
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
              Fijar en 30°C (Calor)
            </button>
            <button
              onClick={() => {
                sound.click();
                setI11Temp(12);
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-sky-200 text-sky-950"
            >
              Fijar en 12°C (Fresco)
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
            <div className="text-xs font-bold text-amber-900 bg-amber-100 p-2 rounded-xl">
              {i12Hint}
            </div>
          )}
          <div className="flex gap-2 max-w-xs mx-auto">
            <input
              type="number"
              value={i12Guess}
              onChange={(e) => setI12Guess(e.target.value)}
              placeholder="Número..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300"
            />
            <button
              onClick={() => {
                const val = parseInt(i12Guess, 10);
                if (val === i12Secret) {
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
            Ejecuta la función: <code>def duplicar(x): return x * 2</code>
          </p>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-mono text-purple-900 font-bold">
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
            ⚡ Probar con Nuevo Argumento
          </button>
        </div>
      )}

      {/* I14: Listas en Python */}
      {code === "I14" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Aplica un slice: <code>frutas[1:3]</code> sobre <code>["🍎", "🍌", "🍇", "🍊"]</code>
          </p>
          <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs font-mono">
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
            ✂️ Ejecutar Slice frutas[1:3]
          </button>
        </div>
      )}

      {/* I15: Leer errores */}
      {code === "I15" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Encuentra la línea que tiene un SyntaxError (falta dos puntos):
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                sound.chime();
                setI15Fixed(true);
                triggerWin();
              }}
              className="w-full p-2.5 rounded-xl border border-rose-300 bg-rose-50 text-xs font-mono text-rose-900 text-left font-bold"
            >
              🐛 if edad &gt;= 18 (¡Falta el ':' al final!)
            </button>
            <button
              onClick={() => sound.bump()}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-700 text-left"
            >
              print("Bienvenido")
            </button>
          </div>
        </div>
      )}

      {/* I16: Aventura de texto */}
      {code === "I16" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Estás frente a dos puertas misteriosas en el castillo:
          </p>
          {i16Choice ? (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
              {i16Choice} ⭐
            </div>
          ) : (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  sound.chime();
                  setI16Choice("🚪 Puerta Dorada: ¡Encontraste la biblioteca mágica de código!");
                  triggerWin();
                }}
                className="wood-btn text-xs px-3 py-2 bg-amber-300 text-amber-950 font-bold"
              >
                🚪 Puerta Dorada
              </button>
              <button
                onClick={() => {
                  sound.chime();
                  setI16Choice("🚪 Puerta Plateada: ¡Encontraste el laboratorio de robótica!");
                  triggerWin();
                }}
                className="wood-btn text-xs px-3 py-2 bg-slate-200 text-slate-900 font-bold"
              >
                🚪 Puerta Plateada
              </button>
            </div>
          )}
        </div>
      )}

      {/* I17: Mi primera placa */}
      {code === "I17" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Simula la pantalla LED 5x5 de la placa Micro:bit:
          </p>
          <div className="w-20 h-20 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-slate-700">
            {i17Icon}
          </div>
          <div className="flex justify-center gap-2">
            {["❤️", "😊", "⭐"].map((ic) => (
              <button
                key={ic}
                onClick={() => {
                  sound.click();
                  setI17Icon(ic);
                  if (ic === "⭐") triggerWin();
                }}
                className="p-2 bg-white rounded-xl border text-xl"
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
            Usa el Botón A para sumar hasta llegar a 3:
          </p>
          <div className="text-2xl font-bold font-mono text-indigo-900 bg-indigo-50 p-2 rounded-xl inline-block">
            Contador: {i18Count} / 3
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.click();
                const next = i18Count + 1;
                setI18Count(next);
                if (next >= 3) triggerWin();
              }}
              className="wood-btn px-4 py-2 bg-indigo-600 text-white font-bold text-xs"
            >
              Botón A (+1)
            </button>
            <button
              onClick={() => {
                sound.click();
                setI18Count(Math.max(0, i18Count - 1));
              }}
              className="wood-btn px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Botón B (-1)
            </button>
          </div>
        </div>
      )}

      {/* I19: Sensores */}
      {code === "I19" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Ajusta el sensor de temperatura hasta superar los 30°C:
          </p>
          <div className="text-sm font-bold text-slate-800 bg-amber-50 p-2 rounded-xl">
            Sensor: {i19SensorVal}°C {i19SensorVal >= 30 ? "🔥 ¡Alerta de calor!" : "🌡️ Normal"}
          </div>
          <input
            type="range"
            min="15"
            max="40"
            value={i19SensorVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setI19SensorVal(val);
              if (val >= 32) triggerWin();
            }}
            className="w-48 mx-auto"
          />
        </div>
      )}

      {/* I20: Juego con la placa */}
      {code === "I20" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Agita la placa para jugar Piedra, Papel o Tijera:
          </p>
          <div className="text-4xl h-14 flex items-center justify-center">
            {i20Roll || "📟"}
          </div>
          <button
            onClick={() => {
              sound.click();
              const choices = ["✊ Piedra", "✋ Papel", "✌️ Tijera"];
              const pick = choices[Math.floor(Math.random() * choices.length)];
              setI20Roll(pick);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            🎲 ¡Agitar Placa!
          </button>
        </div>
      )}

      {/* I21: ¿Cómo funciona internet? */}
      {code === "I21" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Envía 3 paquetes de datos a través de los routers de la red:
          </p>
          <div className="flex justify-center gap-3 items-center text-xs font-bold text-slate-700">
            <span>💻 Emisor</span>
            <span>➡️ 🌐 Router ➡️</span>
            <span>🖥️ Servidor</span>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i21Packets + 1;
              setI21Packets(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-sky-500 text-white font-bold text-xs"
          >
            📦 Enviar Paquete IP ({i21Packets}/3)
          </button>
        </div>
      )}

      {/* I22: ¿Qué es la IA? */}
      {code === "I22" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Entrena el modelo clasificando 3 ejemplos:
          </p>
          <div className="text-xs font-bold text-indigo-900 bg-indigo-50 p-2 rounded-xl">
            Ejemplos de entrenamiento: {i22Trained} / 3
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = i22Trained + 1;
              setI22Trained(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-indigo-600 text-white font-bold text-xs"
          >
            🧠 Entrenar Red Neuronal con Dato
          </button>
        </div>
      )}

      {/* I23: Contraseñas y privacidad */}
      {code === "I23" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Escribe una contraseña segura (al menos 8 caracteres con símbolos):
          </p>
          <input
            type="text"
            value={i23Pass}
            onChange={(e) => {
              const val = e.target.value;
              setI23Pass(val);
              if (val.length >= 8 && /[!@#$%^&*0-9]/.test(val)) {
                triggerWin();
              }
            }}
            placeholder="Ej: Clave#2026!"
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 w-48 mx-auto block"
          />
          <div className="text-[11px] text-slate-500">
            {i23Pass.length >= 8 && /[!@#$%^&*0-9]/.test(i23Pass)
              ? "✅ ¡Contraseña Fuerte!"
              : "Ingresa 8+ letras y un número o símbolo"}
          </div>
        </div>
      )}

      {/* I24: Proyecto final de Inventores */}
      {code === "I24" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            ¡Proyecto final de Inventores! Activa los tres subsistemas:
          </p>
          <div className="flex justify-center gap-2">
            {["Sensores", "Lógica", "Conexión"].map((sys) => (
              <button
                key={sys}
                onClick={() => {
                  sound.click();
                  const next = { ...i24Activated, [sys]: true };
                  setI24Activated(next);
                  if (Object.keys(next).length >= 3) triggerWin();
                }}
                className={`wood-btn text-xs px-3 py-1.5 font-bold ${
                  i24Activated[sys] ? "bg-emerald-500 text-white" : "bg-white text-slate-700"
                }`}
              >
                {sys} {i24Activated[sys] ? "✅" : "⚪"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
