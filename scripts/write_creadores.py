content = '''"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Play, RotateCcw, Sparkles, Terminal, Code, Award, Check
} from "lucide-react";

export interface MinigameProps {
  code: string;
  onWin: () => void;
  completed: boolean;
}

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

  // C01: Repaso Python
  const [c01Output, setC01Output] = useState("");

  // C02: Cadenas de texto
  const [c02Text, setC02Text] = useState("codigo");

  // C03: Listas y diccionarios
  const [c03Dict, setC03Dict] = useState<Record<string, string>>({ nombre: "Ada", rol: "Pionera" });

  // C04: Funciones y módulos
  const [c04Math, setC04Math] = useState<number | null>(null);

  // C05: Archivos
  const [c05Saved, setC05Saved] = useState(false);

  // C06: Manejo de errores
  const [c06Handled, setC06Handled] = useState(false);

  // C07: Buscar y ordenar
  const [c07Sorted, setC07Sorted] = useState(false);

  // C08: Gestor de tareas
  const [c08Tasks, setC08Tasks] = useState<string[]>(["Aprender Python"]);
  const [c08Input, setC08Input] = useState("");

  // C09: Juego 2D
  const [c09Hits, setC09Hits] = useState(0);

  // C10: Analizar datos
  const [c10Bars, setC10Bars] = useState([40, 70, 90]);

  // C11: HTML estructura
  const [c11Tag, setC11Tag] = useState("h1");

  // C12: CSS estilo
  const [c12Radius, setC12Radius] = useState(8);

  // C13: Diseñar para celular
  const [c13Mobile, setC13Mobile] = useState(false);

  // C14: JavaScript básico
  const [c14Result, setC14Result] = useState<number | null>(null);

  // C15: Eventos en la página
  const [c15Events, setC15Events] = useState(0);

  // C16: Juego en el navegador
  const [c16Time, setC16Time] = useState<number | null>(null);

  // C17: Publicar una página
  const [c17Deployed, setC17Deployed] = useState(false);

  // C18: Proyecto mi sitio
  const [c18SiteName, setC18SiteName] = useState("Mi Portfolio Tech");

  // C19: Git control de versiones
  const [c19Commits, setC19Commits] = useState(["Initial commit"]);

  // C20: Colaborar en un proyecto
  const [c20Approved, setC20Approved] = useState(false);

  // C21: IA como herramienta
  const [c21Prompt, setC21Prompt] = useState(false);

  // C22: Ética y huella digital
  const [c22Checked, setC22Checked] = useState<Record<number, boolean>>({});

  // C23: Caminos en tecnología
  const [c23Path, setC23Path] = useState<string | null>(null);

  // C24: Proyecto final de Creadores
  const [c24Graduated, setC24Graduated] = useState(false);

  return (
    <div className="space-y-4">
      {/* C01: Repaso rápido de Python */}
      {code === "C01" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Ejecuta el script en la consola de Python para imprimir el saludo inicial:
          </p>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">
            &gt;&gt;&gt; print(\"¡Hola, familia programadora!\")
            {c01Output && <div className="text-white mt-1">{c01Output}</div>}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC01Output("¡Hola, familia programadora! 🚀");
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
          >
            ▶️ Ejecutar Script Python
          </button>
        </div>
      )}

      {/* C02: Cadenas de texto */}
      {code === "C02" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Aplica el método <code>.upper()</code> para convertir el texto a mayúsculas:
          </p>
          <div className="text-lg font-mono font-bold text-amber-900 bg-amber-50 p-2 rounded-xl">
            \"{c02Text}\" → Longitud: {c02Text.length} caracteres
          </div>
          <button
            onClick={() => {
              sound.click();
              setC02Text("CODIGO EN FAMILIA");
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            ⚡ Aplicar texto.upper()
          </button>
        </div>
      )}

      {/* C03: Listas y diccionarios */}
      {code === "C03" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Inspecciona el diccionario de clave-valor:
          </p>
          <pre className="p-2.5 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl overflow-x-auto">
            {JSON.stringify(c03Dict, null, 2)}
          </pre>
          <button
            onClick={() => {
              sound.click();
              setC03Dict({ ...c03Dict, nivel: "Creadores ⭐" });
              triggerWin();
            }}
            className="w-full wood-btn py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            ➕ Agregar Clave [nivel] al Diccionario
          </button>
        </div>
      )}

      {/* C04: Funciones y módulos */}
      {code === "C04" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Usa el módulo <code>math.sqrt(81)</code> para calcular la raíz cuadrada:
          </p>
          <div className="text-xl font-bold font-mono text-indigo-900 bg-indigo-50 p-2 rounded-xl">
            Resultado: {c04Math !== null ? c04Math : "?"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC04Math(9);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-indigo-600 text-white font-bold text-xs"
          >
            🧮 Calcular math.sqrt(81)
          </button>
        </div>
      )}

      {/* C05: Archivos */}
      {code === "C05" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Escribe y guarda datos en el archivo virtual <code>diario.txt</code>:
          </p>
          <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-mono text-slate-700">
            with open(\"diario.txt\", \"w\") as f: f.write(\"Día 1\")
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC05Saved(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            💾 Guardar Archivo en Disco
          </button>
        </div>
      )}

      {/* C06: Manejo de errores */}
      {code === "C06" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Atrapa el error con <code>try / except ZeroDivisionError</code>:
          </p>
          <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl">
            {c06Handled
              ? "✅ Error interceptado: ¡No se puede dividir por cero! El programa continúa."
              : "100 / 0  → ¿Crash o manejo seguro?"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC06Handled(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            🛡️ Ejecutar Bloque Seguro try/except
          </button>
        </div>
      )}

      {/* C07: Buscar y ordenar */}
      {code === "C07" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Ordena la lista desordenada <code>[42, 12, 88, 5]</code>:
          </p>
          <div className="text-sm font-mono font-bold text-slate-800 bg-sky-100 p-2 rounded-xl">
            {c07Sorted ? "[5, 12, 42, 88] ⭐" : "[42, 12, 88, 5]"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC07Sorted(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-sky-600 text-white font-bold text-xs"
          >
            🔄 Aplicar Bubble Sort
          </button>
        </div>
      )}

      {/* C08: Proyecto gestor de tareas */}
      {code === "C08" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Agrega una tarea al gestor CLI:
          </p>
          <div className="space-y-1 bg-white p-2 rounded-xl border">
            {c08Tasks.map((t, i) => (
              <div key={i} className="text-xs font-mono p-1 bg-slate-50 rounded">
                [{i + 1}] {t}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={c08Input}
              onChange={(e) => setC08Input(e.target.value)}
              placeholder="Nueva tarea..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border"
            />
            <button
              onClick={() => {
                if (!c08Input.trim()) return;
                sound.click();
                const next = [...c08Tasks, c08Input];
                setC08Tasks(next);
                setC08Input("");
                if (next.length >= 2) triggerWin();
              }}
              className="wood-btn text-xs px-3 py-1.5 bg-amber-400 text-amber-950 font-bold"
            >
              add
            </button>
          </div>
        </div>
      )}

      {/* C09: Juego 2D */}
      {code === "C09" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Golpea la pelota con la paleta de Pong hasta 3 rebotes:
          </p>
          <div className="h-20 bg-slate-900 rounded-xl flex items-center justify-around text-2xl text-white">
            <span>🟩</span>
            <span className="animate-ping">⚪</span>
            <span>🟩</span>
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = c09Hits + 1;
              setC09Hits(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            🏓 Rebotar Pelota ({c09Hits}/3)
          </button>
        </div>
      )}

      {/* C10: Analizar datos */}
      {code === "C10" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Grafica los datos en barras estadísticas:
          </p>
          <div className="flex justify-center items-end gap-3 h-20 bg-slate-50 p-2 rounded-xl border">
            {c10Bars.map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="w-8 bg-sky-500 rounded-t transition-all" />
            ))}
          </div>
          <button
            onClick={() => {
              sound.click();
              setC10Bars([60, 95, 80]);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-sky-600 text-white font-bold text-xs"
          >
            📊 Actualizar Datos del Gráfico
          </button>
        </div>
      )}

      {/* C11: HTML la estructura */}
      {code === "C11" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Alterna entre etiquetas HTML para cambiar la jerarquía semántica:
          </p>
          <div className="p-3 bg-white border rounded-xl">
            {c11Tag === "h1" ? <h1 className="text-lg font-bold">Título &lt;h1&gt;</h1> : <p className="text-xs">Párrafo &lt;p&gt;</p>}
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
                className="wood-btn text-xs px-3 py-1.5 bg-slate-100"
              >
                &lt;{t}&gt;
              </button>
            ))}
          </div>
        </div>
      )}

      {/* C12: CSS el estilo */}
      {code === "C12" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Modifica la propiedad <code>border-radius</code> de la tarjeta:
          </p>
          <div
            style={{ borderRadius: `${c12Radius}px` }}
            className="w-24 h-16 mx-auto bg-amber-400 border-2 border-amber-600 flex items-center justify-center font-bold text-xs"
          >
            {c12Radius}px
          </div>
          <input
            type="range"
            min="0"
            max="32"
            value={c12Radius}
            onChange={(e) => {
              const val = Number(e.target.value);
              setC12Radius(val);
              if (val >= 24) triggerWin();
            }}
            className="w-48 mx-auto"
          />
        </div>
      )}

      {/* C13: Diseñar para celular */}
      {code === "C13" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Prueba la vista responsive de teléfono móvil (375px):
          </p>
          <div className={`mx-auto bg-slate-800 p-2 rounded-xl text-white text-[11px] transition-all ${c13Mobile ? "w-36" : "w-64"}`}>
            {c13Mobile ? "📱 Vista Móvil (375px)" : "💻 Vista Escritorio (1200px)"}
          </div>
          <button
            onClick={() => {
              sound.click();
              setC13Mobile(!c13Mobile);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-indigo-600 text-white font-bold text-xs"
          >
            📱 Alternar Viewport Móvil
          </button>
        </div>
      )}

      {/* C14: JavaScript básico */}
      {code === "C14" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Ejecuta la función flecha JS: <code>const sumar = (a, b) =&gt; a + b</code>
          </p>
          <div className="text-base font-bold font-mono text-emerald-900 bg-emerald-50 p-2 rounded-xl">
            sumar(15, 25) = {c14Result !== null ? c14Result : "?"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC14Result(40);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            ⚡ Evaluar en Consola JS
          </button>
        </div>
      )}

      {/* C15: Eventos en la página */}
      {code === "C15" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Escucha eventos de clic con <code>addEventListener(\"click\")</code>:
          </p>
          <div className="text-sm font-bold text-slate-700 bg-sky-50 p-2 rounded-xl">
            Eventos capturados: {c15Events} / 3
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = c15Events + 1;
              setC15Events(next);
              if (next >= 3) triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-sky-500 text-white font-bold text-xs"
          >
            👆 Disparar Evento Clic
          </button>
        </div>
      )}

      {/* C16: Juego en el navegador */}
      {code === "C16" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Prueba tus reflejos: presiona el botón lo más rápido que puedas:
          </p>
          <div className="text-base font-bold text-amber-900 bg-amber-100 p-2 rounded-xl">
            {c16Time ? `Tiempo de reacción: ${c16Time} ms ⭐` : "¡Listo... ya!"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC16Time(Math.floor(Math.random() * 80) + 180);
              triggerWin();
            }}
            className="wood-btn px-6 py-2.5 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            ⚡ ¡Clic Rápido!
          </button>
        </div>
      )}

      {/* C17: Publicar una página */}
      {code === "C17" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Despliega tu página web a internet con un solo clic:
          </p>
          <div className="text-xs font-mono p-2.5 bg-slate-900 text-emerald-400 rounded-xl">
            {c17Deployed ? "🚀 Desplegado en: https://mi-sitio-familia.dev" : "Estado: Listo para compilar"}
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC17Deployed(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            🌐 Publicar en la Web
          </button>
        </div>
      )}

      {/* C18: Proyecto mi sitio */}
      {code === "C18" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Edita el título principal de tu portafolio web personal:
          </p>
          <input
            type="text"
            value={c18SiteName}
            onChange={(e) => {
              setC18SiteName(e.target.value);
              if (e.target.value.length > 5) triggerWin();
            }}
            className="px-3 py-1.5 text-xs rounded-xl border w-56 mx-auto block text-center font-bold"
          />
        </div>
      )}

      {/* C19: Git control de versiones */}
      {code === "C19" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Haz un commit en el historial de Git: <code>git commit -m \"feat: minijuego\"</code>
          </p>
          <div className="space-y-1 bg-slate-900 p-2 rounded-xl text-emerald-400 font-mono text-xs">
            {c19Commits.map((c, i) => (
              <div key={i}>* [commit {i + 1}] {c}</div>
            ))}
          </div>
          <button
            onClick={() => {
              sound.click();
              const next = [...c19Commits, "feat: reto superado"];
              setC19Commits(next);
              if (next.length >= 2) triggerWin();
            }}
            className="w-full wood-btn py-2 bg-amber-400 text-amber-950 font-bold text-xs"
          >
            🌿 Ejecutar git commit
          </button>
        </div>
      )}

      {/* C20: Colaborar en un proyecto */}
      {code === "C20" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Revisa el Pull Request de tu compañero y apruébalo:
          </p>
          <div className="p-2.5 bg-white border rounded-xl text-xs text-left">
            PR #12: \"Agregar soporte para modo oscuro\"
          </div>
          <button
            onClick={() => {
              sound.chime();
              setC20Approved(true);
              triggerWin();
            }}
            className="wood-btn px-4 py-2 bg-emerald-500 text-white font-bold text-xs"
          >
            ✅ Approve &amp; Merge Pull Request
          </button>
        </div>
      )}

      {/* C21: IA como herramienta */}
      {code === "C21" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Elige el mejor prompt para obtener una respuesta útil de la IA:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                sound.chime();
                setC21Prompt(true);
                triggerWin();
              }}
              className="w-full p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-900 text-left"
            >
              🎯 \"Explícame cómo funciona un bucle for en Python con una analogía para un niño de 8 años\".
            </button>
            <button
              onClick={() => sound.bump()}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-600 text-left"
            >
              \"Haz un bucle\".
            </button>
          </div>
        </div>
      )}

      {/* C22: Ética y huella digital */}
      {code === "C22" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Auditoría de huella digital: marca las dos prácticas seguras:
          </p>
          <div className="space-y-2 text-xs">
            {["Pedir permiso antes de publicar una foto de un amigo", "Revisar la privacidad de mis perfiles sociales"].map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.click();
                  const next = { ...c22Checked, [idx]: true };
                  setC22Checked(next);
                  if (next[0] && next[1]) triggerWin();
                }}
                className={`w-full p-2 rounded-xl border text-left font-medium ${
                  c22Checked[idx] ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-white text-slate-700"
                }`}
              >
                {c22Checked[idx] ? "✅ " : "⚪ "} {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* C23: Caminos en tecnología */}
      {code === "C23" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            Explora las rutas del mundo digital: ¿Qué te gustaría crear?
          </p>
          {c23Path ? (
            <div className="p-3 bg-amber-50 rounded-xl text-xs font-bold text-amber-900">
              ¡Genial! Tu camino es: {c23Path} ⭐
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {["🎮 Videojuegos", "🌐 Páginas Web", "🤖 Robótica & IA", "🛡️ Ciberseguridad"].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    sound.chime();
                    setC23Path(r);
                    triggerWin();
                  }}
                  className="wood-btn text-xs px-3 py-1.5 bg-white hover:bg-amber-100"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* C24: Proyecto final de Creadores */}
      {code === "C24" && (
        <div className="space-y-3 text-center">
          <p className="text-xs text-slate-600">
            ¡Graduación de Código en Familia! Genera tu diploma de Creadores:
          </p>
          <button
            onClick={() => {
              sound.stamp();
              confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.5 }
              });
              setC24Graduated(true);
              triggerWin();
            }}
            className="wood-btn px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-md"
          >
            🎓 ¡Generar Diploma de Graduación Oficial!
          </button>
        </div>
      )}
    </div>
  );
}
'''

with open('src/components/minigames/CreadoresGames.tsx', 'w') as f:
    f.write(content)

print('CreadoresGames.tsx created successfully!')
