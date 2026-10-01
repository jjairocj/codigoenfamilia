content = '''"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Play, RotateCcw, Sparkles, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Volume2, ShieldCheck, Heart, Flag
} from "lucide-react";

export interface MinigameProps {
  code: string;
  onWin: () => void;
  completed: boolean;
}

export function ExploradoresGame({ code, onWin, completed }: MinigameProps) {
  // Trigger win helper
  const triggerWin = () => {
    sound.chime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onWin();
  };

  // E01: Hola Scratch
  const [e01Said, setE01Said] = useState(false);

  // E02: El gato baila
  const [e02Steps, setE02Steps] = useState<string[]>([]);
  const [e02Dancing, setE02Dancing] = useState(false);

  // E03: Por siempre
  const [e03Running, setE03Running] = useState(false);
  const [e03Pos, setE03Pos] = useState(0);

  // E04: Muévete con flechas
  const [e04Pos, setE04Pos] = useState({ x: 0, y: 0 });
  const [e04Coins, setE04Coins] = useState<Record<string, boolean>>({});

  // E05: Coordenadas
  const [e05X, setE05X] = useState(0);
  const [e05Y, setE05Y] = useState(0);

  // E06: Disfraces
  const [e06Costume, setE06Costume] = useState(1);

  // E07: Si toca...
  const [e07Dist, setE07Dist] = useState(120);

  // E08: Puntaje
  const [e08Score, setE08Score] = useState(0);

  // E09: Al azar
  const [e09Num, setE09Num] = useState<number | null>(null);

  // E10: Mensajes
  const [e10Broadcast, setE10Broadcast] = useState(false);

  // E11: Sonidos y música
  const [e11Notes, setE11Notes] = useState<string[]>([]);

  // E12: Pinta con código
  const [e12Lines, setE12Lines] = useState<number>(0);

  // E13: Preguntar y responder
  const [e13Input, setE13Input] = useState("");
  const [e13Answer, setE13Answer] = useState("");

  // E14: Vidas y fin del juego
  const [e14Lives, setE14Lives] = useState(3);
  const [e14Dodged, setE14Dodged] = useState(0);

  // E15: Enemigos
  const [e15GuardAway, setE15GuardAway] = useState(false);
  const [e15Crossed, setE15Crossed] = useState(false);

  // E16: Arte en píxeles
  const [e16Grid, setE16Grid] = useState<string[]>(Array(16).fill("#ffffff"));
  const [e16Color, setE16Color] = useState("#f59e0b");

  // E17: Mi primer bloque
  const [e17BlockRun, setE17BlockRun] = useState(false);

  // E18: Remix
  const [e18Speed, setE18Speed] = useState(1);
  const [e18Gravity, setE18Gravity] = useState("Media");

  // E19: Ciudadanos digitales
  const [e19Answered, setE19Answered] = useState(false);

  // E20: Mi videojuego
  const [e20Jumps, setE20Jumps] = useState(0);

  return (
    <div className="space-y-4">
      {/* E01: Hola Scratch */}
      {code === "E01" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Presiona la bandera verde ▶️ para que el Gato Scratch ejecute su primer bloque:
          </p>
          <div className="h-32 bg-sky-50 rounded-2xl border-2 border-sky-200 flex flex-col items-center justify-center relative">
            {e01Said && (
              <div className="absolute top-3 bg-white px-3 py-1.5 rounded-2xl border-2 border-amber-300 font-bold text-xs text-amber-950 shadow-sm animate-in zoom-in-75">
                ¡Hola Mundo! ¡Bienvenido a Scratch! 🐱✨
              </div>
            )}
            <div className={`text-5xl transition-transform ${e01Said ? "-translate-y-2 scale-110" : ""}`}>
              🐱
            </div>
          </div>
          <button
            onClick={() => {
              sound.chime();
              setE01Said(true);
              triggerWin();
            }}
            className="wood-btn px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm"
          >
            🟢 Al presionar bandera verde
          </button>
        </div>
      )}

      {/* E02: El gato baila */}
      {code === "E02" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Agrega al menos 3 pasos de baile a la coreografía y presiona Bailar:
          </p>
          <div className="flex justify-center gap-2 min-h-[44px] items-center p-2 bg-white rounded-xl border border-amber-200">
            {e02Steps.map((s, i) => (
              <span key={i} className="text-xl px-2 py-0.5 bg-amber-100 rounded-lg">
                {s}
              </span>
            ))}
            {e02Steps.length === 0 && <span className="text-xs text-slate-400">Coreografía vacía</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["💃 Paso Der", "🕺 Paso Izq", "🦘 Salto", "🔄 Giro"].map((m) => (
              <button
                key={m}
                onClick={() => { sound.click(); setE02Steps([...e02Steps, m]); }}
                className="wood-btn text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 font-bold"
              >
                {m}
              </button>
            ))}
            <button
              onClick={() => { sound.click(); setE02Steps([]); }}
              className="wood-btn text-xs px-2 py-1.5 bg-slate-50 text-slate-500"
            >
              Borrar
            </button>
          </div>
          <button
            onClick={async () => {
              if (e02Steps.length < 3) {
                sound.bump();
                alert("Agrega al menos 3 pasos de baile.");
                return;
              }
              setE02Dancing(true);
              for (let i = 0; i < e02Steps.length; i++) {
                sound.click();
                await new Promise((r) => setTimeout(r, 400));
              }
              setE02Dancing(false);
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            🎵 ¡Ejecutar Baile!
          </button>
        </div>
      )}

      {/* E03: Por siempre */}
      {code === "E03" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Activa el bucle infinito <code>por siempre</code> para hacer que la pelota rebote sin parar:
          </p>
          <div className="h-20 bg-purple-50 rounded-2xl border-2 border-purple-200 flex items-center px-4 relative overflow-hidden">
            <div
              style={{
                transform: `translateX(${e03Pos}px)`,
                transition: "transform 0.4s ease-in-out"
              }}
              className="text-3xl"
            >
              ⚽
            </div>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = !e03Running;
              setE03Running(next);
              if (next) {
                setE03Pos(180);
                setTimeout(() => setE03Pos(20), 450);
                setTimeout(() => setE03Pos(180), 900);
                setTimeout(() => {
                  triggerWin();
                }, 1300);
              }
            }}
            className={`w-full wood-btn py-2 text-xs font-bold ${
              e03Running ? "bg-rose-500 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {e03Running ? "🛑 Detener Bucle" : "♾️ Iniciar Bucle [Por Siempre]"}
          </button>
        </div>
      )}

      {/* E04: Muévete con flechas */}
      {code === "E04" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Mueve al personaje con las flechas para recoger las 2 manzanas 🍎:
          </p>
          <div className="grid grid-cols-3 gap-2 w-48 mx-auto p-2 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
            {Array.from({ length: 9 }).map((_, i) => {
              const x = i % 3;
              const y = Math.floor(i / 3);
              const isCat = e04Pos.x === x && e04Pos.y === y;
              const key = `${x},${y}`;
              const hasApple = (key === "0,2" || key === "2,0") && !e04Coins[key];
              return (
                <div
                  key={i}
                  className="w-12 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-xl font-bold"
                >
                  {isCat ? "🐱" : hasApple ? "🍎" : ""}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                const nextY = Math.max(0, e04Pos.y - 1);
                setE04Pos({ ...e04Pos, y: nextY });
                checkE04(e04Pos.x, nextY);
              }}
              className="wood-btn p-2 bg-slate-100"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.click();
                const nextX = Math.max(0, e04Pos.x - 1);
                setE04Pos({ ...e04Pos, x: nextX });
                checkE04(nextX, e04Pos.y);
              }}
              className="wood-btn p-2 bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.click();
                const nextY = Math.min(2, e04Pos.y + 1);
                setE04Pos({ ...e04Pos, y: nextY });
                checkE04(e04Pos.x, nextY);
              }}
              className="wood-btn p-2 bg-slate-100"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.click();
                const nextX = Math.min(2, e04Pos.x + 1);
                setE04Pos({ ...e04Pos, x: nextX });
                checkE04(nextX, e04Pos.y);
              }}
              className="wood-btn p-2 bg-slate-100"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* E05: Coordenadas */}
      {code === "E05" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Ajusta las coordenadas X e Y para colocar al personaje en el blanco (X: 50, Y: 30):
          </p>
          <div className="h-28 bg-slate-100 rounded-2xl border border-slate-300 relative flex items-center justify-center overflow-hidden">
            <div className="absolute w-full h-px bg-slate-300" />
            <div className="absolute h-full w-px bg-slate-300" />
            <div className="absolute text-xl" style={{ transform: "translate(50px, -30px)" }}>
              🎯
            </div>
            <div
              style={{ transform: `translate(${e05X}px, ${-e05Y}px)` }}
              className="text-2xl transition-all"
            >
              🚀
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold w-12 text-slate-700">X: {e05X}</span>
              <input
                type="range"
                min="-80"
                max="80"
                value={e05X}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setE05X(val);
                  if (Math.abs(val - 50) < 15 && Math.abs(e05Y - 30) < 15) triggerWin();
                }}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold w-12 text-slate-700">Y: {e05Y}</span>
              <input
                type="range"
                min="-40"
                max="40"
                value={e05Y}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setE05Y(val);
                  if (Math.abs(e05X - 50) < 15 && Math.abs(val - 30) < 15) triggerWin();
                }}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* E06: Disfraces */}
      {code === "E06" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Alterna entre los disfraces para crear la ilusión de movimiento:
          </p>
          <div className="h-24 flex items-center justify-center text-5xl bg-amber-50 rounded-2xl border border-amber-200">
            {e06Costume === 1 ? "🚶" : e06Costume === 2 ? "🏃" : "🦘"}
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => {
                  sound.click();
                  setE06Costume(num);
                  if (num === 3) triggerWin();
                }}
                className={`wood-btn text-xs px-3 py-1.5 font-bold ${
                  e06Costume === num ? "bg-amber-400 text-amber-950" : "bg-white text-slate-700"
                }`}
              >
                Disfraz {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* E07: Si toca... */}
      {code === "E07" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Mueve el gato hacia la derecha hasta que toque la estrella brillante ⭐:
          </p>
          <div className="h-20 bg-sky-50 rounded-2xl border-2 border-sky-200 flex items-center px-4 relative overflow-hidden">
            <div className="absolute right-6 text-3xl">⭐</div>
            <div
              style={{ transform: `translateX(${180 - e07Dist}px)` }}
              className="text-3xl transition-transform"
            >
              🐱
            </div>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = Math.max(0, e07Dist - 30);
              setE07Dist(next);
              if (next <= 30) triggerWin();
            }}
            className="w-full wood-btn py-2 bg-sky-400 hover:bg-sky-500 text-sky-950 font-bold text-xs"
          >
            ➡️ Avanzar hacia la estrella ({e07Dist}px restantes)
          </button>
        </div>
      )}

      {/* E08: Puntaje */}
      {code === "E08" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Incrementa la variable <code>puntos</code> tocando las monedas hasta llegar a 5:
          </p>
          <div className="text-lg font-bold text-amber-900 bg-amber-100 p-2 rounded-xl inline-block">
            Puntaje: {e08Score} / 5
          </div>
          <div className="py-2">
            <button
              onClick={() => {
                sound.chime();
                const next = e08Score + 1;
                setE08Score(next);
                if (next >= 5) triggerWin();
              }}
              className="w-16 h-16 mx-auto rounded-full bg-yellow-300 hover:bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center text-3xl shadow-sm active:scale-95 transition-all"
            >
              🪙
            </button>
          </div>
        </div>
      )}

      {/* E09: Al azar */}
      {code === "E09" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Usa el bloque <code>número al azar entre 1 y 10</code>. ¡Saca un 7 o más para ganar!
          </p>
          <div className="text-4xl font-extrabold text-indigo-900 h-14 flex items-center justify-center">
            {e09Num !== null ? e09Num : "🎲"}
          </div>
          <button
            onClick={() => {
              sound.click();
              const val = Math.floor(Math.random() * 10) + 1;
              setE09Num(val);
              if (val >= 7) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs"
          >
            🎲 Generar Número al Azar
          </button>
        </div>
      )}

      {/* E10: Mensajes */}
      {code === "E10" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Envía el mensaje <code>[comenzar fiesta]</code> para que el otro personaje responda:
          </p>
          <div className="h-20 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-around">
            <div className="text-3xl">🤖</div>
            <div className="text-xs font-bold text-amber-800">
              {e10Broadcast ? "📩 ¡Mensaje Recibido! 🎉" : "Esperando mensaje..."}
            </div>
            <div className={`text-3xl ${e10Broadcast ? "animate-bounce" : ""}`}>🐱</div>
          </div>
          <button
            onClick={() => {
              sound.chime();
              setE10Broadcast(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            📢 Enviar Mensaje [Fiesta]
          </button>
        </div>
      )}

      {/* E11: Sonidos y música */}
      {code === "E11" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Toca las notas del xilófono para componer tu melodía musical:
          </p>
          <div className="flex justify-center gap-2">
            {["Do 🎵", "Re 🎶", "Mi 🎼", "Fa 🎷", "Sol 🎹"].map((n) => (
              <button
                key={n}
                onClick={() => {
                  sound.chime();
                  const next = [...e11Notes, n];
                  setE11Notes(next);
                  if (next.length >= 4) triggerWin();
                }}
                className="wood-btn text-xs px-2.5 py-4 bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold"
              >
                {n}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-slate-500">Notas tocadas: {e11Notes.length} / 4</div>
        </div>
      )}

      {/* E12: Pinta con código */}
      {code === "E12" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Programa el lápiz para dibujar las 4 aristas de un cuadrado:
          </p>
          <div className="w-24 h-24 mx-auto border-2 border-dashed border-amber-300 rounded-xl relative flex items-center justify-center bg-white">
            <div className="text-xs font-bold text-amber-900">{e12Lines} de 4 lados</div>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = e12Lines + 1;
              setE12Lines(next);
              if (next >= 4) triggerWin();
            }}
            className="w-full wood-btn py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            ✏️ Trazar Siguiente Lado (+90°)
          </button>
        </div>
      )}

      {/* E13: Preguntar y responder */}
      {code === "E13" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Scratch pregunta: <code>¿Cuál es tu color favorito?</code>
          </p>
          {e13Answer ? (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 text-center">
              🐱 Gato: ¡El {e13Answer} es un color hermoso! ⭐
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={e13Input}
                onChange={(e) => setE13Input(e.target.value)}
                placeholder="Escribe tu color..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300"
              />
              <button
                onClick={() => {
                  if (!e13Input.trim()) return;
                  sound.click();
                  setE13Answer(e13Input);
                  triggerWin();
                }}
                className="wood-btn text-xs px-4 py-1.5 bg-amber-400 text-amber-950 font-bold"
              >
                Responder
              </button>
            </div>
          )}
        </div>
      )}

      {/* E14: Vidas y fin del juego */}
      {code === "E14" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Esquiva 3 obstáculos antes de que se agoten tus 3 vidas ❤️:
          </p>
          <div className="flex justify-center gap-1 text-2xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={i < e14Lives ? "text-rose-500" : "text-slate-300"}>
                ❤️
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = e14Dodged + 1;
              setE14Dodged(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            🛡️ Esquivar Obstáculo ({e14Dodged}/3)
          </button>
        </div>
      )}

      {/* E15: Enemigos */}
      {code === "E15" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Espera a que el guardia mire a otro lado y presiona Cruzar:
          </p>
          <div className="h-20 bg-slate-100 rounded-2xl flex items-center justify-around border">
            <span className="text-3xl">🐱</span>
            <div className="text-3xl cursor-pointer" onClick={() => setE15GuardAway(!e15GuardAway)}>
              {e15GuardAway ? "👀 ➡️ (Distraído)" : "🚨 👀 (Vigilando)"}
            </div>
            <span className="text-2xl">🏁</span>
          </div>
          <button
            onClick={() => {
              if (e15GuardAway) {
                sound.chime();
                setE15Crossed(true);
                triggerWin();
              } else {
                sound.bump();
                alert("¡Cuidado! El guardia te vio. Toca al guardia para distraerlo primero.");
              }
            }}
            className="wood-btn px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            🏃 ¡Cruzar la Zona!
          </button>
        </div>
      )}

      {/* E16: Arte en píxeles */}
      {code === "E16" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Pinta al menos 4 casillas con el pincel de píxeles:
          </p>
          <div className="grid grid-cols-4 gap-1 w-40 mx-auto p-1.5 bg-slate-100 rounded-xl">
            {e16Grid.map((bg, i) => (
              <button
                key={i}
                style={{ backgroundColor: bg }}
                onClick={() => {
                  sound.click();
                  const next = [...e16Grid];
                  next[i] = e16Color;
                  setE16Grid(next);
                  const painted = next.filter((c) => c !== "#ffffff").length;
                  if (painted >= 4) triggerWin();
                }}
                className="w-8 h-8 rounded border border-slate-300"
              />
            ))}
          </div>
          <div className="flex justify-center gap-1">
            {["#f59e0b", "#10b981", "#3b82f6", "#ec4899"].map((c) => (
              <button
                key={c}
                style={{ backgroundColor: c }}
                onClick={() => setE16Color(c)}
                className={`w-6 h-6 rounded-full border-2 ${e16Color === c ? "border-slate-800 scale-110" : "border-white"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* E17: Mi primer bloque */}
      {code === "E17" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Define tu propio bloque personalizado <code>super_salto()</code> y pruébalo:
          </p>
          <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-xs text-pink-900 font-mono">
            definir [super_salto] = [salto 50] + [giro 360] + [sonido campana]
          </div>
          <button
            onClick={() => {
              sound.chime();
              setE17BlockRun(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs"
          >
            🚀 Ejecutar Bloque [super_salto]
          </button>
        </div>
      )}

      {/* E18: Remix */}
      {code === "E18" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Haz un \"Remix\" del juego ajustando la velocidad a 2x o 3x:
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((v) => (
              <button
                key={v}
                onClick={() => {
                  sound.click();
                  setE18Speed(v);
                  if (v >= 2) triggerWin();
                }}
                className={`wood-btn text-xs px-3 py-1.5 font-bold ${
                  e18Speed === v ? "bg-amber-400 text-amber-950" : "bg-white text-slate-700"
                }`}
              >
                Velocidad {v}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* E19: Ciudadanos digitales */}
      {code === "E19" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Identifica el mensaje sospechoso en internet:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                sound.chime();
                setE19Answered(true);
                triggerWin();
              }}
              className="w-full p-2.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-900 text-left"
            >
              ⚠️ \"¡Ganaste un millón de monedas! Haz clic aquí y escribe tu contraseña\".
            </button>
            <button
              onClick={() => sound.bump()}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 text-left"
            >
              ✅ \"Recuerda la tarea de matemáticas para mañana\".
            </button>
          </div>
        </div>
      )}

      {/* E20: Mi videojuego */}
      {code === "E20" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            ¡Proyecto final de Exploradores! Salta 2 obstáculos para alcanzar el trofeo de oro 🏆:
          </p>
          <div className="h-20 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-around">
            <span className="text-3xl">🐱</span>
            <span className="text-xl">🌵</span>
            <span className="text-xl">🌵</span>
            <span className="text-3xl animate-bounce">🏆</span>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = e20Jumps + 1;
              setE20Jumps(next);
              if (next >= 2) triggerWin();
            }}
            className="wood-btn px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs"
          >
            🦘 ¡Saltar Obstáculo! ({e20Jumps}/2)
          </button>
        </div>
      )}
    </div>
  );

  function checkE04(x: number, y: number) {
    const key = `${x},${y}`;
    if (key === "0,2" || key === "2,0") {
      sound.chime();
      const next = { ...e04Coins, [key]: true };
      setE04Coins(next);
      if (next["0,2"] && next["2,0"]) triggerWin();
    }
  }
}
'''

with open('src/components/minigames/ExploradoresGames.tsx', 'w') as f:
    f.write(content)

print('ExploradoresGames.tsx created successfully!')
