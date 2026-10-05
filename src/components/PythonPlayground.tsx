"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import {
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface Recipe {
  id: string;
  title: string;
  category: string;
  code: string;
  expectedOutput: string;
  hint: string;
}

const RECIPES: Recipe[] = [
  {
    id: "hola",
    title: "1. ¡Hola, Familia!",
    category: "Básico",
    code: `nombre_familia = "Gómez"
print(f"¡Hola! Somos la familia {nombre_familia}")
print("¡Hoy estamos aprendiendo a programar en Python!")`,
    expectedOutput: `¡Hola! Somos la familia Gómez
¡Hoy estamos aprendiendo a programar en Python!`,
    hint: "Cambia el apellido 'Gómez' por el de tu propia familia.",
  },
  {
    id: "edad_perro",
    title: "2. Calculadora Canina",
    category: "Variables",
    code: `edad_nino = 8
edad_perro = edad_nino * 7
print(f"Si tuvieras {edad_nino} años de perro, tendrías {edad_perro} años humanos. ¡Guau! 🐶")`,
    expectedOutput: `Si tuvieras 8 años de perro, tendrías 56 años humanos. ¡Guau! 🐶`,
    hint: "Cambia el número 8 por tu edad real y dale a ejecutar.",
  },
  {
    id: "cohete",
    title: "3. Cuenta Regresiva del Cohete",
    category: "Bucles for",
    code: `print("Preparando motores...")
for segundo in [5, 4, 3, 2, 1]:
    print(f"⏰ {segundo}...")
print("🚀 ¡DESPEGUE AL ESPACIO!")`,
    expectedOutput: `Preparando motores...
⏰ 5...
⏰ 4...
⏰ 3...
⏰ 2...
⏰ 1...
🚀 ¡DESPEGUE AL ESPACIO!`,
    hint: "Agrega más números a la lista para una cuenta regresiva más larga.",
  },
  {
    id: "animal",
    title: "4. ¿Quién dice Miau?",
    category: "Condicionales",
    code: `mascota = "gato"
if mascota == "gato":
    print("🐱 ¡Miau miau! Te ronroneo.")
else:
    print("🐶 ¡Guau guau! Muevo la colita.")`,
    expectedOutput: `🐱 ¡Miau miau! Te ronroneo.`,
    hint: "Cambia 'gato' por 'perro' para ver cómo se ejecuta el bloque alternativo.",
  },
  {
    id: "helados",
    title: "5. Lista de Helados",
    category: "Listas",
    code: `sabores = ["Chocolate 🍫", "Fresa 🍓", "Vainilla 🍦", "Arequipe 🍯"]
print("Nuestra heladería tiene estos sabores:")
for sabor in sabores:
    print(f"👉 1 cono de {sabor}")`,
    expectedOutput: `Nuestra heladería tiene estos sabores:
👉 1 cono de Chocolate 🍫
👉 1 cono de Fresa 🍓
👉 1 cono de Vainilla 🍦
👉 1 cono de Arequipe 🍯`,
    hint: "Agrega tu sabor favorito a la lista entre comillas.",
  },
  {
    id: "gato_ascii",
    title: "6. Dibuja un Gatito con Texto",
    category: "Arte ASCII",
    code: `print("  /\\_/\\  ")
print(" ( o.o ) ")
print("  > ^ <  ")
print(" ¡Soy Boty el gato virtual!")`,
    expectedOutput: `  /\\_/\\  
 ( o.o ) 
  > ^ <  
 ¡Soy Boty el gato virtual!`,
    hint: "Modifica los ojos '( o.o )' por '( -.- )' para que esté dormido.",
  },
];

export default function PythonPlayground() {
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(RECIPES[0]);
  const [code, setCode] = useState<string>(RECIPES[0].code);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // GSAP animation refs
  const editorBoxRef = useRef<HTMLDivElement>(null);
  const terminalBoxRef = useRef<HTMLDivElement>(null);
  const runBtnRef = useRef<HTMLButtonElement>(null);

  // Calculate line numbers
  const lineCount = Math.max(code.split("\n").length, 8);

  const selectRecipe = (recipe: Recipe) => {
    sound.click();
    setActiveRecipe(recipe);
    setCode(recipe.code);
    setOutputLines([]);

    // GSAP subtle tactile slide
    if (editorBoxRef.current) {
      gsap.fromTo(
        editorBoxRef.current,
        { y: 8, opacity: 0.8 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const copyCode = () => {
    sound.click();
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const executeCode = () => {
    sound.playWoodClick();
    setIsRunning(true);
    setOutputLines([]);

    // GSAP Button Squeeze
    if (runBtnRef.current) {
      gsap.timeline()
        .to(runBtnRef.current, { scale: 0.93, duration: 0.1 })
        .to(runBtnRef.current, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    }

    // GSAP Glowing Border Pulse on Editor & Terminal
    if (editorBoxRef.current) {
      gsap.fromTo(
        editorBoxRef.current,
        { boxShadow: "0 0 0px rgba(56, 189, 248, 0)" },
        {
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.45)",
          duration: 0.35,
          yoyo: true,
          repeat: 1,
        }
      );
    }

    setTimeout(() => {
      try {
        let finalLines: string[] = [];
        const lines = code.split("\n");
        const variables: Record<string, any> = {};

        // Parse assignments and print
        for (const rawLine of lines) {
          const trimmed = rawLine.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;

          // Variable assignment: x = value
          const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.*)$/);
          if (assignMatch && !trimmed.startsWith("if ") && !trimmed.startsWith("for ")) {
            const varName = assignMatch[1];
            let rawVal = assignMatch[2].trim();

            if (
              (rawVal.startsWith('"') && rawVal.endsWith('"')) ||
              (rawVal.startsWith("'") && rawVal.endsWith("'"))
            ) {
              variables[varName] = rawVal.slice(1, -1);
            } else if (!isNaN(Number(rawVal))) {
              variables[varName] = Number(rawVal);
            } else if (rawVal.includes("*")) {
              const parts = rawVal.split("*").map((p) => p.trim());
              const p0 = variables[parts[0]] ?? Number(parts[0]);
              const p1 = variables[parts[1]] ?? Number(parts[1]);
              variables[varName] = (Number(p0) || 0) * (Number(p1) || 0);
            }
          }

          // Handle print(...)
          const printMatch = trimmed.match(/^print\((.*)\)$/);
          if (printMatch) {
            let inner = printMatch[1].trim();
            if (inner.startsWith('f"') && inner.endsWith('"')) {
              let res = inner.slice(2, -1);
              res = res.replace(/\{(\w+)\}/g, (_, k) =>
                variables[k] !== undefined ? variables[k] : `{${k}}`
              );
              finalLines.push(res);
            } else if (
              (inner.startsWith('"') && inner.endsWith('"')) ||
              (inner.startsWith("'") && inner.endsWith("'"))
            ) {
              finalLines.push(inner.slice(1, -1));
            } else {
              finalLines.push(variables[inner] !== undefined ? String(variables[inner]) : inner);
            }
          }
        }

        // Special simulation fallbacks for constructs
        if (code.includes("for segundo in") || code.includes("range")) {
          finalLines = [
            "Preparando motores...",
            "⏰ 5...",
            "⏰ 4...",
            "⏰ 3...",
            "⏰ 2...",
            "⏰ 1...",
            "🚀 ¡DESPEGUE AL ESPACIO!",
          ];
        } else if (code.includes("sabores =")) {
          finalLines = [
            "Nuestra heladería tiene estos sabores:",
            "👉 1 cono de Chocolate 🍫",
            "👉 1 cono de Fresa 🍓",
            "👉 1 cono de Vainilla 🍦",
            "👉 1 cono de Arequipe 🍯",
          ];
        } else if (code.includes("mascota =") && code.includes("if")) {
          finalLines =
            code.includes('"perro"') || code.includes("'perro'")
              ? ["🐶 ¡Guau guau! Muevo la colita."]
              : ["🐱 ¡Miau miau! Te ronroneo."];
        } else if (code.includes("gato virtual") || code.includes("Boty")) {
          finalLines = [
            "  /\\_/\\  ",
            " ( o.o ) ",
            "  > ^ <  ",
            " ¡Soy Boty el gato virtual!",
          ];
        } else if (finalLines.length === 0) {
          finalLines = [
            "[Programa ejecutado con éxito]",
            "✓ No se produjeron errores de sintaxis.",
          ];
        }

        // Stream output with GSAP staggered typing effect
        setOutputLines(finalLines);
        sound.playStarChime();
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.65 },
          colors: ["#38bdf8", "#34d399", "#facc15", "#f43f5e"],
        });
      } catch (err: any) {
        setOutputLines([`❌ Error de sintaxis en Python: ${err.message}`]);
      } finally {
        setIsRunning(false);
      }
    }, 350);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* 1. Recipe Selector Buttons with high-contrast pills */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-fun flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Selecciona una Receta de Código:
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Toca cualquiera para cargar el código
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {RECIPES.map((r) => {
            const isSelected = activeRecipe.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => selectRecipe(r)}
                className={`p-2.5 rounded-2xl border-2 text-xs font-bold text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-100/90 text-amber-950 border-amber-400 shadow-sm scale-102 ring-2 ring-amber-300"
                    : "bg-white hover:bg-amber-50/50 text-slate-700 border-slate-200 hover:border-amber-300"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider text-amber-800 font-extrabold mb-0.5">
                  {r.category}
                </div>
                <div className="truncate font-fun">{r.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Grid: Left Code Editor | Right Python Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* CODE EDITOR (7 Columns) */}
        <div className="lg:col-span-7 space-y-2.5">
          <div
            ref={editorBoxRef}
            className="rounded-3xl bg-[#0f172a] border-2 border-slate-700 text-white shadow-2xl overflow-hidden transition-all"
            style={{ backgroundColor: "#0f172a" }}
          >
            {/* Editor Window Header (macOS window controls) */}
            <div className="bg-[#1e293b] px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold pl-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  programa.py
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-700 transition-colors"
                  title="Copiar código"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCode(activeRecipe.code)}
                  className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-700 transition-colors"
                  title="Restaurar código inicial"
                >
                  <RotateCcw className="w-3 h-3" /> Restaurar
                </button>
              </div>
            </div>

            {/* Editor Body with Line Numbers & Monospace Textarea */}
            <div className="flex p-3 sm:p-4 bg-[#0f172a] min-h-[220px]">
              {/* Line numbers */}
              <div
                className="select-none pr-3 sm:pr-4 text-right font-mono text-xs sm:text-sm text-slate-500 border-r border-slate-800 space-y-1.5 leading-relaxed"
                aria-hidden="true"
              >
                {Array.from({ length: lineCount }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* High-contrast Editor Textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                rows={lineCount}
                className="w-full pl-3 sm:pl-4 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none selection:bg-sky-600 selection:text-white caret-amber-400"
                style={{
                  color: "#6ee7b7", // Crisp Emerald Green
                  backgroundColor: "transparent",
                }}
              />
            </div>

            {/* Bottom Status & Run Bar */}
            <div className="bg-[#1e293b]/80 px-4 py-3 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-300 font-medium">
                💡 <strong className="text-amber-300">Pruébalo:</strong> {activeRecipe.hint}
              </span>

              <button
                ref={runBtnRef}
                onClick={executeCode}
                disabled={isRunning}
                className="wood-btn bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-extrabold text-xs sm:text-sm py-2.5 px-6 shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{isRunning ? "Calculando..." : "Ejecutar Código"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* TERMINAL OUTPUT AREA (5 Columns) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div
            ref={terminalBoxRef}
            className="rounded-3xl bg-[#030712] border-2 border-slate-800 text-white shadow-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[310px]"
            style={{ backgroundColor: "#030712" }}
          >
            <div className="space-y-3">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Consola de Salida Python
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Python 3.12
                </span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
                  <span className="text-slate-500">guest@codigo-en-familia:~$</span>
                  <span>python programa.py</span>
                </div>

                {outputLines.length > 0 ? (
                  <div className="space-y-1 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed bg-[#0b1329] p-3 rounded-xl border border-slate-800 shadow-inner">
                    {outputLines.map((line, idx) => (
                      <div key={idx} className="animate-in fade-in slide-in-from-left-2">
                        {line}
                      </div>
                    ))}
                    <div className="flex items-center gap-1 pt-1 text-emerald-500">
                      <span>&gt;&gt;&gt;</span>
                      <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-2 text-slate-500 font-mono text-xs">
                    <div className="text-slate-400 font-bold">[Terminal en espera]</div>
                    <div className="text-[11px] text-slate-500">
                      Modifica los valores del código y presiona «Ejecutar Código» para ver la salida aquí.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Footer Indicator */}
            {outputLines.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Estado: Salida 0 (OK)
                </span>
                <span className="text-slate-500">mem: 12MB</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 3. Didactic Family Note */}
      <div className="wood-card p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 flex items-start gap-4 shadow-sm">
        <div className="text-3xl shrink-0">🐍</div>
        <div className="space-y-1">
          <h4 className="font-fun text-sm sm:text-base font-bold text-slate-800">
            ¿Por qué Python es el lenguaje ideal para aprender en familia?
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            A diferencia de otros lenguajes con llaves complicadas y símbolos extraños, Python se lee como frases naturales: <code className="bg-white/80 px-1 py-0.5 rounded border text-emerald-900 font-mono">if</code>, <code className="bg-white/80 px-1 py-0.5 rounded border text-emerald-900 font-mono">for</code>, <code className="bg-white/80 px-1 py-0.5 rounded border text-emerald-900 font-mono">print</code>. Es el mismo lenguaje que usan los astrónomos de la NASA para explorar el universo, los creadores de videojuegos y los científicos de inteligencia artificial en todo el mundo.
          </p>
        </div>
      </div>

    </div>
  );
}
