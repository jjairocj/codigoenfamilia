"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import gsap from "gsap";
import {
  Play, RotateCcw, Sparkles, Terminal, Code, Award, Check,
  ArrowRight, ArrowLeft, ShieldCheck, Flame, Cpu, FileText,
  Bug, ListFilter, BarChart3, Globe, Palette, Smartphone,
  Laptop, GitCommit, GitPullRequest, Bot, Shield, Trophy
} from "lucide-react";

export interface MinigameProps {
  code: string;
  onWin: () => void;
  completed: boolean;
}

// -------------------------------------------------------------
// C09: 2D Pong Arcade Game Component
// -------------------------------------------------------------
function C09PongArcade({ onWin, completed }: { onWin: () => void; completed: boolean }) {
  const COURT_WIDTH = 400;
  const COURT_HEIGHT = 220;
  const PADDLE_WIDTH = 75;
  const PADDLE_HEIGHT = 10;
  const BALL_RADIUS = 7;
  const PADDLE_Y = 195;

  const [paddleX, setPaddleX] = useState(200);
  const [ball, setBall] = useState({ x: 200, y: 50, vx: 2.8, vy: 3.2 });
  const [hits, setHits] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState("¡Presiona Iniciar para jugar Pong 2D!");
  
  const courtRef = useRef<SVGSVGElement | null>(null);
  const paddleRef = useRef<SVGRectElement | null>(null);
  const ballRef = useRef<SVGCircleElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Keep state ref for smooth loop
  const stateRef = useRef({
    paddleX: 200,
    ball: { x: 200, y: 50, vx: 2.8, vy: 3.2 },
    hits: 0,
    isPlaying: false,
    won: completed,
  });

  useEffect(() => {
    stateRef.current = { paddleX, ball, hits, isPlaying, won: completed };
  }, [paddleX, ball, hits, isPlaying, completed]);

  // Main Game Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = () => {
      const cur = stateRef.current;
      let nextX = cur.ball.x + cur.ball.vx;
      let nextY = cur.ball.y + cur.ball.vy;
      let nextVx = cur.ball.vx;
      let nextVy = cur.ball.vy;

      // Bounce Left
      if (nextX <= BALL_RADIUS + 4) {
        nextX = BALL_RADIUS + 4;
        nextVx = Math.abs(cur.ball.vx);
        sound.bump();
      }
      // Bounce Right
      else if (nextX >= COURT_WIDTH - BALL_RADIUS - 4) {
        nextX = COURT_WIDTH - BALL_RADIUS - 4;
        nextVx = -Math.abs(cur.ball.vx);
        sound.bump();
      }

      // Bounce Top
      if (nextY <= BALL_RADIUS + 4) {
        nextY = BALL_RADIUS + 4;
        nextVy = Math.abs(cur.ball.vy);
        sound.bump();
      }

      // Check Paddle Hit
      if (
        nextY + BALL_RADIUS >= PADDLE_Y &&
        nextY - BALL_RADIUS <= PADDLE_Y + PADDLE_HEIGHT &&
        nextVy > 0
      ) {
        const leftEdge = cur.paddleX - PADDLE_WIDTH / 2 - 4;
        const rightEdge = cur.paddleX + PADDLE_WIDTH / 2 + 4;

        if (nextX >= leftEdge && nextX <= rightEdge) {
          // Rebound up
          nextVy = -Math.abs(cur.ball.vy);
          // Angle offset from center of paddle
          const offset = (nextX - cur.paddleX) / (PADDLE_WIDTH / 2);
          nextVx = offset * 3.8;
          if (Math.abs(nextVx) < 1.0) nextVx = nextVx >= 0 ? 1.5 : -1.5;

          const newHits = cur.hits + 1;
          setHits(newHits);
          sound.chime();
          setFeedback(`¡Buen rebote! (${newHits}/3) ⭐`);

          // GSAP squish paddle
          if (paddleRef.current) {
            gsap.fromTo(
              paddleRef.current,
              { scaleY: 0.6, transformOrigin: "center bottom" },
              { scaleY: 1, duration: 0.25, ease: "elastic.out(1, 0.3)" }
            );
          }

          if (newHits >= 3) {
            setIsPlaying(false);
            sound.chime();
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
            setFeedback("¡Misión Cumplida! Has dominado el rebote en 2D 🎉");
            onWin();
            return;
          }
        }
      }

      // Miss: ball falls past paddle
      if (nextY > COURT_HEIGHT + 15) {
        sound.bump();
        setFeedback("¡Casi! Mueve la paleta para recibir la pelota.");
        nextX = 200;
        nextY = 40;
        nextVx = (Math.random() - 0.5) * 3;
        nextVy = 2.8;
      }

      setBall({ x: nextX, y: nextY, vx: nextVx, vy: nextVy });
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, onWin]);

  // Pointer/Touch Dragging on SVG
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!courtRef.current) return;
    const rect = courtRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * COURT_WIDTH;
    const clamped = Math.max(PADDLE_WIDTH / 2, Math.min(COURT_WIDTH - PADDLE_WIDTH / 2, svgX));
    setPaddleX(clamped);
  };

  const movePaddle = (delta: number) => {
    sound.click();
    setPaddleX((prev) =>
      Math.max(PADDLE_WIDTH / 2, Math.min(COURT_WIDTH - PADDLE_WIDTH / 2, prev + delta))
    );
  };

  const simulateHit = () => {
    sound.click();
    // Position paddle directly under ball
    const targetX = Math.max(
      PADDLE_WIDTH / 2,
      Math.min(COURT_WIDTH - PADDLE_WIDTH / 2, ball.x)
    );
    setPaddleX(targetX);
    const nextHits = hits + 1;
    setHits(nextHits);
    sound.chime();
    setFeedback(`¡Rebote asistido! (${nextHits}/3) ⭐`);

    if (paddleRef.current) {
      gsap.fromTo(
        paddleRef.current,
        { scaleY: 0.5, transformOrigin: "center bottom" },
        { scaleY: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" }
      );
    }

    if (nextHits >= 3) {
      setIsPlaying(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setFeedback("¡Misión Cumplida! Has dominado el juego 2D 🎉");
      onWin();
    }
  };

  return (
    <div className="space-y-3">
      {/* Game Header */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">🏓 Arcade Pong 2D</span>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            Rebotes: {hits}/3
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">{feedback}</div>
      </div>

      {/* SVG Game Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-inner select-none touch-none">
        <svg
          ref={courtRef}
          viewBox={`0 0 ${COURT_WIDTH} ${COURT_HEIGHT}`}
          className="w-full h-44 sm:h-52 cursor-pointer"
          onPointerDown={handlePointerMove}
          onPointerMove={handlePointerMove}
        >
          {/* Subtle arcade grid */}
          <defs>
            <pattern id="arcadeGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
            <filter id="ballGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width={COURT_WIDTH} height={COURT_HEIGHT} fill="#090d16" />
          <rect width={COURT_WIDTH} height={COURT_HEIGHT} fill="url(#arcadeGrid)" />

          {/* Court Neon Border */}
          <rect
            x="4"
            y="4"
            width={COURT_WIDTH - 8}
            height={COURT_HEIGHT - 8}
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            rx="8"
          />

          {/* Top Wall highlight */}
          <line x1="8" y1="6" x2={COURT_WIDTH - 8} y2="6" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" />

          {/* Paddle */}
          <rect
            ref={paddleRef}
            x={paddleX - PADDLE_WIDTH / 2}
            y={PADDLE_Y}
            width={PADDLE_WIDTH}
            height={PADDLE_HEIGHT}
            rx="5"
            fill="#10b981"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.7))" }}
          />

          {/* Ball */}
          <circle
            ref={ballRef}
            cx={ball.x}
            cy={ball.y}
            r={BALL_RADIUS}
            fill="#facc15"
            style={{ filter: "url(#ballGlow)" }}
          />

          {/* Center line */}
          <line
            x1="8"
            y1={COURT_HEIGHT / 2}
            x2={COURT_WIDTH - 8}
            y2={COURT_HEIGHT / 2}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Start Overlay if not started */}
        {!isPlaying && hits < 3 && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-2xs flex flex-col items-center justify-center gap-2 p-4">
            <span className="text-3xl">🎮</span>
            <div className="text-xs font-bold text-white text-center">
              Mueve la paleta con el dedo, ratón o flechas para rebotar 3 veces.
            </div>
            <button
              onClick={() => {
                sound.click();
                setIsPlaying(true);
                setFeedback("¡Mueve la paleta debajo de la bola!");
              }}
              className="wood-btn px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4 fill-white" /> Iniciar Partido Pong
            </button>
          </div>
        )}
      </div>

      {/* Touch & Assist Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex gap-2">
          <button
            onClick={() => movePaddle(-35)}
            className="wood-btn px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1"
            title="Mover Izquierda"
          >
            ◀ Izquierda
          </button>
          <button
            onClick={() => movePaddle(35)}
            className="wood-btn px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1"
            title="Mover Derecha"
          >
            Derecha ▶
          </button>
        </div>

        <button
          onClick={simulateHit}
          className="wood-btn px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1 border border-amber-300"
          title="Ayuda de rebote automático"
        >
          🎯 Simular Rebote ({hits}/3)
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Main Creadores Game Component
// -------------------------------------------------------------
export function CreadoresGame({ code, onWin, completed }: MinigameProps) {
  const triggerWin = () => {
    sound.chime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onWin();
  };

  // C01: Repaso Python & FizzBuzz
  const [c01Running, setC01Running] = useState(false);
  const [c01Lines, setC01Lines] = useState<string[]>([]);

  // C02: Cadenas y Palíndromos
  const [c02Word, setC02Word] = useState("reconocer");
  const [c02Transformed, setC02Transformed] = useState("reconocer");
  const [c02IsPal, setC02IsPal] = useState(true);

  // C03: Listas y Diccionarios
  const [c03Dict, setC03Dict] = useState<Record<string, any>>({
    nombre: "Ada",
    nivel: 1,
    habilidades: ["Python 🐍"]
  });

  // C04: Funciones y Módulos (Pitágoras / math.sqrt)
  const [c04A, setC04A] = useState(3);
  const [c04B, setC04B] = useState(4);

  // C05: Archivos (with open)
  const [c05Files, setC05Files] = useState<Array<{ name: string; size: number }>>([
    { name: "main.py", size: 142 }
  ]);
  const [c05FileName, setC05FileName] = useState("diario.txt");

  // C06: Manejo de errores
  const [c06Divisor, setC06Divisor] = useState(0);
  const [c06SafeMode, setC06SafeMode] = useState(true);
  const [c06Message, setC06Message] = useState("");

  // C07: Bubble Sort
  const [c07Bars, setC07Bars] = useState([42, 12, 88, 5, 27]);
  const [c07Sorting, setC07Sorting] = useState(false);
  const [c07Sorted, setC07Sorted] = useState(false);

  // C08: Gestor de tareas
  const [c08Tasks, setC08Tasks] = useState([
    { text: "Instalar Python o abrir Trinket", done: true },
    { text: "Resolver FizzBuzz", done: false }
  ]);
  const [c08Input, setC08Input] = useState("");

  // C10: Analizar datos
  const [c10Metric, setC10Metric] = useState<"promedio" | "max" | "min">("promedio");
  const c10Data = [35, 60, 20, 85, 45];

  // C11: HTML semántico
  const [c11Tag, setC11Tag] = useState("h1");

  // C12: CSS estilo
  const [c12Radius, setC12Radius] = useState(12);
  const [c12Color, setC12Color] = useState("#4f46e5");

  // C13: Responsive
  const [c13Device, setC13Device] = useState<"desktop" | "mobile">("desktop");

  // C14: JavaScript
  const [c14Console, setC14Console] = useState<string[]>([]);

  // C15: Eventos DOM
  const [c15EventCount, setC15EventCount] = useState(0);

  // C16: Juego web canvas (clicker reflejos)
  const [c16TargetPos, setC16TargetPos] = useState({ x: 50, y: 50 });
  const [c16Score, setC16Score] = useState(0);

  // C17: Deploy
  const [c17Deployed, setC17Deployed] = useState(false);

  // C18: Mi sitio web
  const [c18Page, setC18Page] = useState<"inicio" | "proyectos" | "contacto">("inicio");

  // C19: Git commits
  const [c19Commits, setC19Commits] = useState([
    { hash: "f3a1", msg: "feat: estructura inicial" }
  ]);

  // C20: Pull Request
  const [c20Approved, setC20Approved] = useState(false);

  // C21: IA Prompts
  const [c21Refined, setC21Refined] = useState(false);

  // C22: Huella digital
  const [c22Checks, setC22Checks] = useState<Record<string, boolean>>({
    passwords: true,
    privacidad: false,
    respeto: true
  });

  // C23: Rutas tech
  const [c23Chosen, setC23Chosen] = useState<string | null>(null);

  // C24: Graduación
  const [c24Name, setC24Name] = useState("Joven Creador/a");

  return (
    <div className="space-y-4">
      {/* C01: Repaso rápido de Python - FizzBuzz Interactive Runner */}
      {code === "C01" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Ejecuta el algoritmo clásico de <strong>FizzBuzz</strong> en la consola virtual de Python:
          </p>
          <div className="p-3.5 bg-slate-950 rounded-2xl font-mono text-xs text-slate-300 border border-slate-800 space-y-1.5 shadow-inner">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> &gt;&gt;&gt; python fizzbuzz.py
            </div>
            <div className="text-slate-400 text-[11px]">
              for n in range(1, 16):<br />
              &nbsp;&nbsp;if n % 15 == 0: print("FizzBuzz 🚀")<br />
              &nbsp;&nbsp;elif n % 3 == 0: print("Fizz")<br />
              &nbsp;&nbsp;elif n % 5 == 0: print("Buzz")
            </div>
            {c01Lines.length > 0 && (
              <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                {c01Lines.map((line, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      line === "FizzBuzz 🚀"
                        ? "bg-emerald-500 text-white animate-bounce"
                        : line === "Fizz"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : line === "Buzz"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC01Running(true);
              const output = [
                "1", "2", "Fizz", "4", "Buzz", "Fizz",
                "7", "8", "Fizz", "Buzz", "11", "Fizz",
                "13", "14", "FizzBuzz 🚀"
              ];
              setC01Lines(output);
              triggerWin();
            }}
            className="w-full wood-btn py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Ejecutar FizzBuzz en Python
          </button>
        </div>
      )}

      {/* C02: Cadenas de texto y Palíndromos */}
      {code === "C02" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Aplica métodos de texto y verifica si la palabra es un <strong>palíndromo</strong> (se lee igual al revés con <code>[::-1]</code>):
          </p>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
            <div className="text-xl font-mono font-extrabold text-amber-950 tracking-wider">
              "{c02Transformed}"
            </div>
            <div className="flex justify-center gap-2">
              <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                len: {c02Transformed.length}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  c02IsPal
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {c02IsPal ? "✅ Es Palíndromo" : "No es palíndromo"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => {
                sound.click();
                const upper = c02Word.toUpperCase();
                setC02Transformed(upper);
              }}
              className="wood-btn text-xs py-1.5 bg-slate-100 font-mono"
            >
              .upper()
            </button>
            <button
              onClick={() => {
                sound.click();
                const lower = c02Word.toLowerCase();
                setC02Transformed(lower);
              }}
              className="wood-btn text-xs py-1.5 bg-slate-100 font-mono"
            >
              .lower()
            </button>
            <button
              onClick={() => {
                sound.click();
                const rev = c02Transformed.split("").reverse().join("");
                setC02Transformed(rev);
                const pal = rev.toLowerCase() === c02Word.toLowerCase();
                setC02IsPal(pal);
                if (pal) triggerWin();
              }}
              className="wood-btn text-xs py-1.5 bg-amber-300 text-amber-950 font-bold font-mono"
            >
              [::-1] Invertir
            </button>
            <button
              onClick={() => {
                sound.click();
                const nextW = c02Word === "reconocer" ? "radar" : c02Word === "radar" ? "somos" : "reconocer";
                setC02Word(nextW);
                setC02Transformed(nextW);
                setC02IsPal(true);
                triggerWin();
              }}
              className="wood-btn text-xs py-1.5 bg-emerald-500 text-white font-bold"
            >
              Otra palabra 🔄
            </button>
          </div>
        </div>
      )}

      {/* C03: Listas y Diccionarios */}
      {code === "C03" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Modifica la estructura clave-valor del personaje en Python:
          </p>
          <pre className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-2xl overflow-x-auto border border-slate-800">
            {JSON.stringify(c03Dict, null, 2)}
          </pre>
          <div className="flex gap-2">
            <button
              onClick={() => {
                sound.click();
                setC03Dict({
                  ...c03Dict,
                  habilidades: [...c03Dict.habilidades, "Algoritmos ⚡"]
                });
                triggerWin();
              }}
              className="flex-1 wood-btn py-2 bg-amber-400 text-amber-950 font-bold text-xs"
            >
              ➕ .append("Algoritmos ⚡")
            </button>
            <button
              onClick={() => {
                sound.click();
                setC03Dict({ ...c03Dict, nivel: c03Dict.nivel + 1 });
                triggerWin();
              }}
              className="flex-1 wood-btn py-2 bg-indigo-600 text-white font-bold text-xs"
            >
              ⭐ Subir Nivel (+1)
            </button>
          </div>
        </div>
      )}

      {/* C04: Funciones y Módulos (math.sqrt) */}
      {code === "C04" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Usa el módulo <code>math</code> de Python para calcular la hipotenusa: <code>math.sqrt(a² + b²)</code>
          </p>
          <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <div className="text-xs font-bold text-indigo-900">
                Catetos: a = {c04A}, b = {c04B}
              </div>
              <div className="text-lg font-mono font-bold text-indigo-950">
                Hipotenusa = math.sqrt({c04A * c04A + c04B * c04B}) ={" "}
                <span className="text-emerald-600">{Math.sqrt(c04A * c04A + c04B * c04B).toFixed(1)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.click();
                  setC04A((prev) => (prev % 8) + 1);
                }}
                className="wood-btn text-xs px-2.5 py-1.5 bg-white font-bold"
              >
                a = {c04A + 1}
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setC04B((prev) => (prev % 8) + 1);
                  triggerWin();
                }}
                className="wood-btn text-xs px-2.5 py-1.5 bg-indigo-600 text-white font-bold"
              >
                b = {c04B + 1}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C05: Archivos en disco */}
      {code === "C05" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Guarda datos con el gestor de contexto <code>with open("...", "w") as f:</code>
          </p>
          <div className="p-3 bg-slate-900 rounded-2xl font-mono text-xs text-emerald-400 border border-slate-800">
            with open("{c05FileName}", "w") as f:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;f.write("¡Día superado en Código en Familia!")
          </div>
          <div className="flex items-center justify-between gap-2 p-2 bg-slate-100 rounded-xl">
            <span className="text-xs font-bold text-slate-700">Archivos en disco:</span>
            <div className="flex gap-1.5">
              {c05Files.map((f, i) => (
                <span key={i} className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-300">
                  📄 {f.name} ({f.size} B)
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              sound.chime();
              if (!c05Files.some((f) => f.name === c05FileName)) {
                setC05Files([...c05Files, { name: c05FileName, size: 48 }]);
              }
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            💾 Ejecutar Guardado en Disco
          </button>
        </div>
      )}

      {/* C06: Manejo de errores */}
      {code === "C06" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Simula una división por cero y comprueba cómo <code>try / except</code> evita que el programa se cierre:
          </p>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs">
            <div className="text-slate-400">resultado = 100 / {c06Divisor}</div>
            <div className="mt-1 font-bold text-emerald-400">
              {c06Divisor === 0
                ? "🛡️ ZeroDivisionError interceptado: ¡El programa continúa sin caerse!"
                : `✅ Operación exitosa: resultado = ${100 / c06Divisor}`}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                sound.click();
                setC06Divisor(0);
                triggerWin();
              }}
              className="flex-1 wood-btn py-2 bg-amber-400 text-amber-950 font-bold text-xs"
            >
              ⚠️ Probar con Divisor = 0 (Atrapar Error)
            </button>
            <button
              onClick={() => {
                sound.click();
                setC06Divisor(5);
              }}
              className="wood-btn px-4 py-2 bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Divisor = 5
            </button>
          </div>
        </div>
      )}

      {/* C07: Buscar y ordenar (Bubble Sort) */}
      {code === "C07" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Visualiza el algoritmo de ordenamiento paso a paso:
          </p>
          <div className="flex justify-center items-end gap-2.5 h-24 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            {c07Bars.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-slate-400">{val}</span>
                <div
                  style={{ height: `${val}px` }}
                  className={`w-7 rounded-t transition-all duration-300 ${
                    c07Sorted ? "bg-emerald-400" : "bg-sky-500"
                  }`}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC07Sorted(true);
              setC07Bars([...c07Bars].sort((a, b) => a - b));
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            🔄 Ejecutar Bubble Sort
          </button>
        </div>
      )}

      {/* C08: Gestor de tareas */}
      {code === "C08" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Añade y completa tareas en el gestor CLI:
          </p>
          <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            {c08Tasks.map((t, idx) => (
              <div
                key={idx}
                onClick={() => {
                  sound.click();
                  const updated = [...c08Tasks];
                  updated[idx].done = !updated[idx].done;
                  setC08Tasks(updated);
                  if (updated.every((x) => x.done)) triggerWin();
                }}
                className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer border ${
                  t.done
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900 line-through"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <span>{t.text}</span>
                <span>{t.done ? "✅" : "⬜"}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={c08Input}
              onChange={(e) => setC08Input(e.target.value)}
              placeholder="Nueva tarea..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300"
            />
            <button
              onClick={() => {
                if (!c08Input.trim()) return;
                sound.click();
                setC08Tasks([...c08Tasks, { text: c08Input, done: false }]);
                setC08Input("");
                triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      {/* C09: Juego 2D - Pong Arcade Interactive Game */}
      {code === "C09" && (
        <C09PongArcade onWin={triggerWin} completed={completed} />
      )}

      {/* C10: Analizar datos */}
      {code === "C10" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Calcula estadísticas descriptivas con el módulo <code>statistics</code>:
          </p>
          <div className="flex justify-around items-end gap-2 h-20 bg-slate-50 p-2 rounded-2xl border">
            {c10Data.map((val, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500">{val}</span>
                <div
                  style={{ height: `${val}%` }}
                  className="w-8 bg-indigo-500 rounded-t transition-all"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.chime();
                setC10Metric("promedio");
                triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-indigo-600 text-white font-bold"
            >
              📊 Promedio (mean = 44)
            </button>
            <button
              onClick={() => {
                sound.click();
                setC10Metric("max");
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-slate-200 text-slate-800"
            >
              Máximo (max = 85)
            </button>
          </div>
        </div>
      )}

      {/* C11: HTML la estructura */}
      {code === "C11" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Alterna entre etiquetas HTML para cambiar la jerarquía semántica:
          </p>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
            {c11Tag === "h1" && <h1 className="text-xl font-extrabold text-slate-900">&lt;h1&gt; Título Principal &lt;/h1&gt;</h1>}
            {c11Tag === "p" && <p className="text-xs text-slate-600">&lt;p&gt; Un párrafo de texto informativo &lt;/p&gt;</p>}
            {c11Tag === "button" && <button className="wood-btn text-xs px-3 py-1.5 bg-amber-400 font-bold">&lt;button&gt; Botón Interactivo &lt;/button&gt;</button>}
          </div>
          <div className="flex justify-center gap-2">
            {["h1", "p", "button"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  sound.click();
                  setC11Tag(t);
                  if (t === "button") triggerWin();
                }}
                className={`wood-btn text-xs px-3 py-1.5 font-mono ${
                  c11Tag === t ? "bg-amber-400 text-amber-950 font-bold" : "bg-slate-100"
                }`}
              >
                &lt;{t}&gt;
              </button>
            ))}
          </div>
        </div>
      )}

      {/* C12: CSS estilo */}
      {code === "C12" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Modifica propiedades CSS en tiempo real con <code>border-radius</code>:
          </p>
          <div
            style={{ borderRadius: `${c12Radius}px`, backgroundColor: c12Color }}
            className="w-32 h-16 mx-auto transition-all flex items-center justify-center text-white text-xs font-bold shadow-md"
          >
            radius: {c12Radius}px
          </div>
          <div className="flex justify-center gap-2">
            {[4, 16, 32].map((r) => (
              <button
                key={r}
                onClick={() => {
                  sound.click();
                  setC12Radius(r);
                  if (r === 32) triggerWin();
                }}
                className="wood-btn text-xs px-3 py-1.5 bg-slate-100 font-bold"
              >
                {r}px
              </button>
            ))}
          </div>
        </div>
      )}

      {/* C13: Responsive */}
      {code === "C13" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Prueba la <strong>media query</strong> cambiando el tamaño del viewport:
          </p>
          <div className="flex justify-center">
            <div
              className={`p-3 border-2 border-slate-700 rounded-2xl bg-slate-900 text-white text-xs transition-all duration-300 ${
                c13Device === "mobile" ? "w-40" : "w-72"
              }`}
            >
              {c13Device === "mobile" ? "📱 Celular: 1 Columna" : "💻 Computador: 3 Columnas"}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                sound.click();
                setC13Device("mobile");
                triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              📱 Modo Celular (max-width: 600px)
            </button>
            <button
              onClick={() => {
                sound.click();
                setC13Device("desktop");
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-slate-100 text-slate-800"
            >
              💻 Modo Pantalla Grande
            </button>
          </div>
        </div>
      )}

      {/* C14: JavaScript */}
      {code === "C14" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Compara Python con JavaScript ejecutando un <code>console.log()</code>:
          </p>
          <div className="p-3 bg-slate-950 rounded-2xl font-mono text-xs text-yellow-300 border border-slate-800">
            const doble = (n) =&gt; n * 2;<br />
            console.log(doble(21));
            {c14Console.length > 0 && (
              <div className="text-white mt-1 pt-1 border-t border-slate-800">
                &gt; 42 ⭐
              </div>
            )}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC14Console(["42"]);
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs"
          >
            ⚡ Ejecutar en Consola JS
          </button>
        </div>
      )}

      {/* C15: Eventos en la página */}
      {code === "C15" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Escucha eventos del usuario con <code>addEventListener("click")</code>:
          </p>
          <div className="text-sm font-bold text-slate-800 bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200">
            Clics capturados: {c15EventCount} / 3
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = c15EventCount + 1;
              setC15EventCount(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm"
          >
            🖱️ Disparar Evento Clic
          </button>
        </div>
      )}

      {/* C16: Juego en el navegador */}
      {code === "C16" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Juego de reflejos con <code>requestAnimationFrame</code>: haz clic en el blanco 🎯
          </p>
          <div className="relative h-28 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
            <button
              onClick={() => {
                sound.chime();
                const nextScore = c16Score + 1;
                setC16Score(nextScore);
                setC16TargetPos({
                  x: Math.floor(Math.random() * 75) + 10,
                  y: Math.floor(Math.random() * 60) + 15
                });
                if (nextScore >= 3) triggerWin();
              }}
              style={{ top: `${c16TargetPos.y}%`, left: `${c16TargetPos.x}%` }}
              className="absolute text-2xl transition-all duration-200 hover:scale-125"
            >
              🎯
            </button>
          </div>
          <div className="text-xs font-bold text-slate-700">
            Puntos: {c16Score} / 3
          </div>
        </div>
      )}

      {/* C17: Publicar una página */}
      {code === "C17" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Despliega tu página estática en la web con HTTPS:
          </p>
          <div className="p-3 bg-slate-950 rounded-2xl text-xs font-mono text-emerald-400 border border-slate-800">
            {c17Deployed ? "🚀 https://mi-proyecto.web.app (Online en vivo)" : "localhost:3000 (Solo en tu equipo)"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC17Deployed(true);
              triggerWin();
            }}
            className="wood-btn px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            🚀 Publicar Sitio a Producción
          </button>
        </div>
      )}

      {/* C18: Proyecto mi sitio */}
      {code === "C18" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Navega entre las páginas de tu sitio web multipágina:
          </p>
          <div className="flex gap-2 justify-center border-b pb-2">
            {(["inicio", "proyectos", "contacto"] as const).map((p) => (
              <button
                key={p}
                onClick={() => {
                  sound.click();
                  setC18Page(p);
                  if (p === "proyectos") triggerWin();
                }}
                className={`text-xs px-3 py-1 rounded-xl font-bold ${
                  c18Page === p ? "bg-amber-400 text-amber-950" : "bg-slate-100 text-slate-600"
                }`}
              >
                /{p}
              </button>
            ))}
          </div>
          <div className="p-3 bg-white border rounded-2xl text-xs text-center text-slate-700">
            Contenido cargado de: <strong>/{c18Page}.html</strong>
          </div>
        </div>
      )}

      {/* C19: Git control de versiones */}
      {code === "C19" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Crea un nuevo commit con <code>git commit -m "..."</code>:
          </p>
          <div className="space-y-1 bg-slate-900 p-2.5 rounded-2xl font-mono text-xs text-slate-300">
            {c19Commits.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-amber-400">commit {c.hash}</span>
                <span>{c.msg}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC19Commits([
                ...c19Commits,
                { hash: "b8e2", msg: "feat: añadir controles responsive" }
              ]);
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            🌿 git commit -m "feat: añadir controles"
          </button>
        </div>
      )}

      {/* C20: Colaborar en un proyecto */}
      {code === "C20" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Revisa el Pull Request y haz clic en fusionar (Merge):
          </p>
          <div className="p-3 bg-slate-50 border rounded-2xl text-xs space-y-1">
            <div className="font-bold text-slate-800">PR #12: Mejorar accesibilidad de botones</div>
            <div className="text-emerald-700 font-mono">+14 líneas agregadas</div>
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC20Approved(true);
              triggerWin();
            }}
            className="wood-btn px-5 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            {c20Approved ? "✅ PR Fusionado" : "🔀 Merge Pull Request"}
          </button>
        </div>
      )}

      {/* C21: IA como herramienta */}
      {code === "C21" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Compara un prompt vago con uno específico y estructurado:
          </p>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs space-y-2">
            <div className="text-slate-600 line-through">"Hazme una web"</div>
            <div className="font-bold text-indigo-950">
              "Crea una landing en HTML5 accesible para una biblioteca escolar con colores contrastados"
            </div>
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC21Refined(true);
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-indigo-600 text-white font-bold text-xs"
          >
            ✨ Optimizar Prompt con Contexto y Criterios
          </button>
        </div>
      )}

      {/* C22: Ética y huella digital */}
      {code === "C22" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Activa las buenas prácticas de privacidad digital:
          </p>
          <div className="space-y-1.5">
            {[
              { id: "passwords", label: "Contraseñas seguras y únicas" },
              { id: "privacidad", label: "Sin compartir datos privados familiares" },
              { id: "respeto", label: "Comportamiento empático en línea" }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sound.click();
                  const updated = { ...c22Checks, [item.id]: !c22Checks[item.id] };
                  setC22Checks(updated);
                  if (Object.values(updated).every(Boolean)) triggerWin();
                }}
                className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer border ${
                  c22Checks[item.id] ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-white border-slate-200"
                }`}
              >
                <span>{item.label}</span>
                <span>{c22Checks[item.id] ? "✅" : "⬜"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* C23: Caminos en tecnología */}
      {code === "C23" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            ¿Qué rama de la tecnología te llama más la atención?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "web", label: "🌐 Desarrollo Web" },
              { id: "games", label: "🎮 Videojuegos" },
              { id: "data", label: "📊 Ciencia de Datos" },
              { id: "ai", label: "🤖 Inteligencia Artificial" }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.chime();
                  setC23Chosen(p.id);
                  triggerWin();
                }}
                className={`wood-btn p-2 text-xs font-bold ${
                  c23Chosen === p.id ? "bg-amber-400 text-amber-950" : "bg-slate-100"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* C24: Proyecto final de Creadores */}
      {code === "C24" && (
        <div className="space-y-3 text-center">
          <div className="text-4xl animate-bounce">🎓</div>
          <h4 className="font-fun text-base font-bold text-slate-800">
            ¡Felicitaciones por llegar al final de Creadores!
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Has aprendido pensamiento computacional, algoritmos, Python, desarrollo web y buenas prácticas de ingeniería.
          </p>
          <button
            onClick={() => {
              sound.chime();
              confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
              triggerWin();
            }}
            className="wood-btn px-6 py-2.5 bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 text-white font-extrabold text-xs shadow-md"
          >
            🏆 Recibir Certificado de Creador/a
          </button>
        </div>
      )}
    </div>
  );
}
