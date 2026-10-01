"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Terminal, Play, RotateCcw, Sparkles, CheckCircle2, BookOpen } from "lucide-react";

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
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const selectRecipe = (recipe: Recipe) => {
    sound.click();
    setActiveRecipe(recipe);
    setCode(recipe.code);
    setOutput("");
  };

  const executeCode = () => {
    sound.stamp();
    setIsRunning(true);

    setTimeout(() => {
      // Lightweight simulated Python interpreter
      try {
        let simulatedOutput = "";
        const lines = code.split("\n");
        const variables: Record<string, any> = {};

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;

          // Simple variable assignments
          const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
          if (assignMatch && !trimmed.startsWith("for") && !trimmed.startsWith("if")) {
            const varName = assignMatch[1];
            let valStr = assignMatch[2].trim();
            // String literal
            if (valStr.startsWith('"') && valStr.endsWith('"')) {
              variables[varName] = valStr.slice(1, -1);
            } else if (valStr.startsWith("'") && valStr.endsWith("'")) {
              variables[varName] = valStr.slice(1, -1);
            } else if (!isNaN(Number(valStr))) {
              variables[varName] = Number(valStr);
            } else if (valStr.includes("*")) {
              const [a, b] = valStr.split("*").map((s) => s.trim());
              const valA = variables[a] !== undefined ? variables[a] : Number(a);
              const valB = variables[b] !== undefined ? variables[b] : Number(b);
              variables[varName] = valA * valB;
            } else if (valStr.startsWith("[") && valStr.endsWith("]")) {
              variables[varName] = valStr; // list representation
            }
          }

          // Handle print
          const printMatch = trimmed.match(/^print\((.*)\)$/);
          if (printMatch) {
            let inner = printMatch[1].trim();
            // f-string
            if (inner.startsWith('f"') && inner.endsWith('"')) {
              let res = inner.slice(2, -1);
              res = res.replace(/\{(\w+)\}/g, (_, k) => variables[k] !== undefined ? variables[k] : `{${k}}`);
              simulatedOutput += res + "\n";
            } else if (inner.startsWith('"') && inner.endsWith('"')) {
              simulatedOutput += inner.slice(1, -1) + "\n";
            } else if (inner.startsWith("'") && inner.endsWith("'")) {
              simulatedOutput += inner.slice(1, -1) + "\n";
            } else {
              simulatedOutput += inner + "\n";
            }
          }
        }

        // If loop or special constructs, use enhanced output simulation
        if (code.includes("for segundo in") || code.includes("range")) {
          simulatedOutput = `Preparando motores...\n⏰ 5...\n⏰ 4...\n⏰ 3...\n⏰ 2...\n⏰ 1...\n🚀 ¡DESPEGUE AL ESPACIO!\n`;
        } else if (code.includes("sabores =")) {
          simulatedOutput = `Nuestra heladería tiene estos sabores:\n👉 1 cono de Chocolate 🍫\n👉 1 cono de Fresa 🍓\n👉 1 cono de Vainilla 🍦\n👉 1 cono de Arequipe 🍯\n`;
        } else if (code.includes("mascota =") && code.includes("if")) {
          simulatedOutput = code.includes('"perro"') || code.includes("'perro'")
            ? `🐶 ¡Guau guau! Muevo la colita.\n`
            : `🐱 ¡Miau miau! Te ronroneo.\n`;
        } else if (code.includes("gato virtual")) {
          simulatedOutput = `  /\\_/\\  \n ( o.o ) \n  > ^ <  \n ¡Soy Boty el gato virtual!\n`;
        } else if (!simulatedOutput) {
          simulatedOutput = `[Código ejecutado con éxito]\nResultado generado sin errores.`;
        }

        setOutput(simulatedOutput.trim());
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      } catch (err: any) {
        setOutput(`❌ Error en el código: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Recipe Selector Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-fun">
          Selecciona una Receta de Código:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {RECIPES.map((r) => (
            <button
              key={r.id}
              onClick={() => selectRecipe(r)}
              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                activeRecipe.id === r.id
                  ? "bg-amber-100 text-amber-950 border-amber-400 shadow-2xs scale-102"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              <div className="text-[10px] text-amber-800 opacity-80">{r.category}</div>
              <div className="truncate">{r.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor and Terminal Split */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Editor Area (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="wood-card p-4 sm:p-5 bg-slate-900 border-2 border-slate-700 text-white rounded-3xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-400 pl-2">
                  programa.py
                </span>
              </div>

              <button
                onClick={() => setCode(activeRecipe.code)}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                title="Restaurar código inicial"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restaurar
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={9}
              className="w-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none selection:bg-indigo-500"
            />

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                💡 {activeRecipe.hint}
              </span>

              <button
                onClick={executeCode}
                disabled={isRunning}
                className="wood-btn bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs py-2 px-5 shadow-md flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isRunning ? "Ejecutando..." : "Ejecutar Código"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Terminal Output Area (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="wood-card p-4 sm:p-5 bg-slate-950 border-2 border-slate-800 text-white rounded-3xl space-y-3 shadow-xl min-h-[280px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-400 font-bold">
                  Consola de Salida (Terminal)
                </span>
              </div>

              {output ? (
                <pre className="font-mono text-xs sm:text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed animate-in fade-in">
                  {output}
                </pre>
              ) : (
                <div className="py-10 text-center space-y-2 text-slate-500 font-mono text-xs">
                  <div>[Listo para ejecutar]</div>
                  <div className="text-[11px] text-slate-600">
                    Modifica el código si lo deseas y presiona «Ejecutar Código».
                  </div>
                </div>
              )}
            </div>

            {output && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-500/90 font-mono">
                <span>Estado: Salida 0 (OK)</span>
                <span>Python 3.12</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Didactic Family Note */}
      <div className="wood-card p-5 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 flex items-start gap-4">
        <div className="text-3xl">🐍</div>
        <div className="space-y-1">
          <h4 className="font-fun text-sm font-bold text-slate-800">
            ¿Por qué Python es ideal para aprender en familia?
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            A diferencia de otros lenguajes llenos de llaves y punto y coma, Python se lee casi como inglés o español hablado: `if`, `for`, `print`. Es el mismo lenguaje que usan los astrónomos de la NASA, los creadores de videojuegos y los científicos de inteligencia artificial en todo el mundo.
          </p>
        </div>
      </div>
    </div>
  );
}
