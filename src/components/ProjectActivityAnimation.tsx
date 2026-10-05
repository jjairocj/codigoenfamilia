"use client";

import React, { useState, useEffect, useRef } from "react";
import { montessoriStageTransition, montessoriSuccessPulse, montessoriIdleFloat } from "@/lib/montessoriMotion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface Props {
  projectId: string;
}

export default function ProjectActivityAnimation({ projectId }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // GSAP step transition and idle icon animation
  useEffect(() => {
    if (stageRef.current) {
      montessoriStageTransition(stageRef.current);
      if (step === 3) {
        montessoriSuccessPulse(stageRef.current);
      }
    }
  }, [step]);

  useEffect(() => {
    if (iconRef.current) {
      const anim = montessoriIdleFloat(iconRef.current, { y: -3, duration: 2.2 });
      return () => {
        anim?.kill();
      };
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, projectId]);

  const restart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="wood-card overflow-hidden border-2 border-amber-300 shadow-md bg-white rounded-3xl my-6">
      
      {/* Top Bar with Controls */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div ref={iconRef} className="w-10 h-10 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-xl shadow-xs shrink-0">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider bg-amber-200/80 px-2 py-0.5 rounded-full">
                Animación de Creación
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Paso a Paso
              </span>
            </div>
            <h3 className="font-fun text-sm sm:text-base font-bold text-slate-800">
              ¿Cómo construir este proyecto? Guía animada
            </h3>
          </div>
        </div>

        {/* Play/Pause & Replay Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 border border-slate-200"
            title={isPlaying ? "Pausar animación" : "Reanudar animación"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span className="hidden sm:inline">{isPlaying ? "Pausar" : "Reanudar"}</span>
          </button>
          <button
            onClick={restart}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 border border-slate-200"
            title="Repetir animación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Animation Stage */}
      <div className="p-4 sm:p-6 space-y-4">
        <div ref={stageRef} className="relative rounded-2xl border-2 border-slate-800 bg-slate-950 p-4 sm:p-8 min-h-[260px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
          
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* 1. CUENTO INTERACTIVO */}
          {projectId === "cuento-interactivo" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-3">
                <div className="text-3xl animate-bounce">
                  {step < 2 ? "🧙‍♂️" : step === 2 ? "🐲" : "💎"}
                </div>
                <div className="text-xs text-center text-slate-200 font-medium">
                  {step === 0 && "«El mago encuentra una encrucijada en el bosque encantado...»"}
                  {step === 1 && "Decisión: ¿Ir hacia la cueva del dragón o cruzar el puente?"}
                  {step === 2 && "¡El lector eligió la cueva! Aparece un dragón dormido."}
                  {step === 3 && "Final secreto: ¡Encontraron el diamante de la sabiduría!"}
                </div>
                {/* Decision Buttons */}
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      step >= 2 ? "bg-amber-400 text-slate-950 scale-105" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    1. Entrar a la cueva ➔
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-800 text-slate-500">
                    2. Cruzar puente
                  </span>
                </div>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">📚</div>
                <div className="text-xs">
                  <div className="text-amber-300 font-bold">
                    {step === 0 && "Paso 1: Dibujan la historia en papel y definen las ramas de la aventura."}
                    {step === 1 && "Paso 2: En Scratch o Python crean botones con condicionales IF / ELSE."}
                    {step === 2 && "Paso 3: El lector elige su camino y el programa cambia de escena."}
                    {step === 3 && "Paso 4: ¡Un libro digital vivo con múltiples finales creado en familia!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Lógica de ramificación (Branching Narrative) y eventos interactivos.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ESTACIÓN DEL CLIMA */}
          {projectId === "estacion-del-clima" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              <div className="flex items-center justify-around w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-mono">micro:bit Sensor</span>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center text-3xl shadow-lg">
                    {step < 2 ? "☀️" : "🌧️"}
                  </div>
                </div>

                <div className="text-xl text-amber-400 animate-pulse">➔</div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-mono">Consola Python</span>
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-mono text-[11px] text-emerald-400">
                    <div>Temp: {step < 2 ? "26°C (Cálido)" : "16°C (Lluvia)"}</div>
                    <div>Luz: {step < 2 ? "Nivel 88 / 100" : "Nivel 22 / 100"}</div>
                  </div>
                </div>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">🌦️</div>
                <div className="text-xs">
                  <div className="text-sky-300 font-bold">
                    {step === 0 && "Paso 1: Colocan la micro:bit en la ventana para medir la luz y la temperatura."}
                    {step === 1 && "Paso 2: Con buena luz, la pantalla LED dibuja un sol radiante."}
                    {step === 2 && "Paso 3: Si se nubla o baja la temperatura, activa la alarma de lluvia."}
                    {step === 3 && "Paso 4: Python almacena los datos y grafica el clima familiar de la semana."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Internet de las Cosas (IoT), adquisición de datos sensoriales y análisis.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. JUEGO DE MESA DIGITAL */}
          {projectId === "juego-de-mesa-digital" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              {/* Board track */}
              <div className="flex items-center gap-1.5 p-2 bg-slate-900 border border-slate-700 rounded-2xl w-full justify-center">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isPlayer =
                    (step === 0 && num === 1) ||
                    (step === 1 && num === 2) ||
                    (step >= 2 && num === 5);
                  return (
                    <div
                      key={num}
                      className={`w-9 h-11 rounded-xl flex flex-col items-center justify-between p-1 border font-bold text-xs transition-all duration-500 ${
                        isPlayer
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      <span className="text-[10px]">#{num}</span>
                      <span className="text-sm">{isPlayer ? "👧" : ""}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dice roll animation */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg transition-transform duration-500 ${
                    step === 1 ? "rotate-[360deg] scale-110" : ""
                  }`}
                >
                  {step === 0 ? "🎲" : step === 1 ? "⚂" : "⚄"}
                </div>
                <div className="text-xs text-purple-300 font-mono">
                  {step === 0 && "Turno del Jugador 1 · ¡Lanzar dado!"}
                  {step === 1 && "Lanzando dado aleatorio..."}
                  {step >= 2 && "¡Sacó 4! Avanza automáticamente 4 casillas."}
                </div>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">🎲</div>
                <div className="text-xs">
                  <div className="text-purple-300 font-bold">
                    {step === 0 && "Paso 1: Diseñan las casillas de su juego favorito (parqués o escalera)."}
                    {step === 1 && "Paso 2: Programan el dado con la función de números aleatorios `random()`."}
                    {step === 2 && "Paso 3: Las fichas se mueven sumando casillas y respetando turnos."}
                    {step === 3 && "Paso 4: ¡Pueden jugar partidas familiares completas desde el computador!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Gestión de estados de juego (Game State), variables y números pseudoaleatorios.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. MASCOTA VIRTUAL */}
          {projectId === "mascota-virtual" && (
            <div className="w-full max-w-md flex flex-col items-center gap-4 z-10">
              <div className="flex items-center justify-around w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl">
                <div className="text-5xl animate-bounce">
                  {step === 0 ? "🐶" : step === 1 ? "😋" : step === 2 ? "😴" : "🥳"}
                </div>
                <div className="space-y-1.5 w-40">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Hambre</span>
                      <span>{step === 1 ? "100%" : "50%"}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-emerald-400 transition-all duration-500 ${
                          step === 1 ? "w-full" : "w-1/2"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>Energía</span>
                      <span>{step === 2 ? "30%" : "80%"}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-amber-400 transition-all duration-500 ${
                          step === 2 ? "w-[30%]" : "w-[80%]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 shadow-xs">
                  🥣 Alimentar
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-xs">
                  💤 Dormir
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-purple-500 text-slate-950 shadow-xs">
                  ⚽ Jugar
                </span>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">🐶</div>
                <div className="text-xs">
                  <div className="text-emerald-300 font-bold">
                    {step === 0 && "Paso 1: Dibujan la mascota con disfraces (feliz, con hambre, dormida)."}
                    {step === 1 && "Paso 2: Al pulsar «Alimentar», una variable suma +20 puntos de energía."}
                    {step === 2 && "Paso 3: Un temporizador resta energía poco a poco para simular cansancio."}
                    {step === 3 && "Paso 4: ¡Un Tamagotchi personalizado hecho con lógica pura!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Variables cuantitativas continuas y ciclos de actualización en tiempo real.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. PÁGINA DE LA FAMILIA */}
          {projectId === "pagina-de-la-familia" && (
            <div className="w-full max-w-md flex flex-col items-center gap-3 z-10 font-mono text-xs">
              <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                {/* Browser top bar */}
                <div className="bg-slate-800 px-3 py-1.5 flex items-center gap-1.5 border-b border-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-400 ml-2">familia-cruz.local</span>
                </div>
                {/* Rendered page */}
                <div className="p-4 space-y-2 bg-gradient-to-b from-amber-50/10 to-transparent">
                  <div className="text-amber-300 font-bold text-sm">🏡 Bienvenidos a Casa</div>
                  <p className="text-[11px] text-slate-300">
                    Recetas de los domingos y calendario de cumpleaños.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md text-[10px] border border-amber-400/30">
                      🎂 Cumpleaños
                    </span>
                    <span className="bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-md text-[10px] border border-emerald-400/30">
                      🍲 Arepas de la Abuela
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">🏡</div>
                <div className="text-xs">
                  <div className="text-amber-300 font-bold">
                    {step === 0 && "Paso 1: Escriben la estructura HTML con títulos `<h1>` y párrafos `<p>`."}
                    {step === 1 && "Paso 2: Con CSS eligen los colores favoritos de la familia y tipografías."}
                    {step === 2 && "Paso 3: Aplican privacidad por diseño: ¡nada de publicar fotos de caras ni direcciones!"}
                    {step === 3 && "Paso 4: Lo abren en la red WiFi de la casa desde cualquier teléfono."}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Desarrollo Web moderno: HTML semántico, CSS responsivo y privacidad ciudadana.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. QUIZ DE LA FAMILIA */}
          {projectId === "quiz-familiar" && (
            <div className="w-full max-w-md flex flex-col items-center gap-3 z-10">
              <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-purple-300 font-bold">Pregunta #1</span>
                  <span className="bg-purple-900 text-purple-200 px-2 py-0.5 rounded-md font-mono text-[10px]">
                    Puntos: {step >= 2 ? "10 pts 🏆" : "0 pts"}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-100">
                  ¿Cuál es el plato favorito que cocina mamá en los paseos?
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`p-2 rounded-xl border text-center font-semibold transition-all ${
                      step >= 2
                        ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md scale-102"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    A) Arepas con queso ✅
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-center">
                    B) Ensalada verde
                  </div>
                </div>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">❓</div>
                <div className="text-xs">
                  <div className="text-purple-300 font-bold">
                    {step === 0 && "Paso 1: Cada integrante aporta 2 preguntas divertidas y secretas sobre la familia."}
                    {step === 1 && "Paso 2: Guardan las preguntas y respuestas en listas de Scratch o Python."}
                    {step === 2 && "Paso 3: Al responder, el programa evalúa con un `IF` y suma puntos con música."}
                    {step === 3 && "Paso 4: ¡Un concurso interactivo para jugar todos juntos en la cena!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Listas (Arrays), comparación de cadenas de texto y sistemas de puntuación.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. RECETARIO DE LA ABUELA */}
          {projectId === "recetario-digital" && (
            <div className="w-full max-w-md flex flex-col items-center gap-3 z-10">
              <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥟</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-300">Empanadas Caseras</span>
                  </div>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                    Calculadora: x{step >= 1 ? "4 personas" : "1 persona"}
                  </span>
                </div>
                <div className="space-y-1 font-mono text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between">
                    <span>Harina de maíz:</span>
                    <span className="text-amber-400 font-bold">{step >= 1 ? "4 tazas" : "1 taza"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Queso rallado:</span>
                    <span className="text-amber-400 font-bold">{step >= 1 ? "200 gramos" : "50 gramos"}</span>
                  </div>
                </div>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">🍲</div>
                <div className="text-xs">
                  <div className="text-amber-300 font-bold">
                    {step === 0 && "Paso 1: Entrevistan a los abuelos y anotan ingredientes y trucos culinarios."}
                    {step === 1 && "Paso 2: Crean una función que multiplica los gramos según cuántos comensales hay."}
                    {step === 2 && "Paso 3: Añaden casillas de verificación para marcar los pasos mientras cocinan."}
                    {step === 3 && "Paso 4: ¡Un tesoro familiar eterno que une tecnología y gastronomía casera!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Operaciones matemáticas funcionales, diccionarios clave-valor y diseño UI adaptable.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. TARJETA ANIMADA DE CUMPLEAÑOS */}
          {projectId === "tarjeta-animada" && (
            <div className="w-full max-w-md flex flex-col items-center gap-3 z-10 text-center">
              <div className="relative w-full h-32 bg-gradient-to-b from-purple-950 to-slate-900 rounded-2xl border border-purple-600/50 p-3 flex flex-col items-center justify-between overflow-hidden shadow-xl">
                {/* Floating balloons */}
                <div className="absolute inset-0 flex justify-around pointer-events-none">
                  <span
                    className={`text-2xl transition-all duration-700 ${
                      step >= 1 ? "-translate-y-2 opacity-100" : "translate-y-24 opacity-0"
                    }`}
                  >
                    🎈
                  </span>
                  <span
                    className={`text-2xl transition-all duration-700 delay-100 ${
                      step >= 1 ? "-translate-y-4 opacity-100" : "translate-y-24 opacity-0"
                    }`}
                  >
                    🎉
                  </span>
                  <span
                    className={`text-2xl transition-all duration-700 delay-200 ${
                      step >= 1 ? "-translate-y-2 opacity-100" : "translate-y-24 opacity-0"
                    }`}
                  >
                    🎈
                  </span>
                </div>

                <div className="text-2xl">🎂</div>
                <div className="font-fun text-sm font-bold text-amber-300">
                  {step >= 1 ? "¡Feliz Cumpleaños, Abuela! 💖" : "Toca el botón sorpresa..."}
                </div>
                <span className="text-[10px] bg-rose-500 text-white font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                  🎁 ¡Presiona la bandera!
                </span>
              </div>

              {/* Step Dialogue */}
              <div className="w-full bg-slate-900/90 rounded-xl p-3 border border-slate-700 flex items-center gap-3">
                <div className="text-2xl">🎂</div>
                <div className="text-xs text-left">
                  <div className="text-rose-300 font-bold">
                    {step === 0 && "Paso 1: Dibujan la torta, los personajes y graban el saludo de voz en Scratch."}
                    {step === 1 && "Paso 2: Con un bucle «Por siempre», programan los globos flotando hacia arriba."}
                    {step === 2 && "Paso 3: Un evento «Al hacer clic» dispara confeti y reproduce la canción."}
                    {step === 3 && "Paso 4: ¡Envían el enlace a la familia para alegrar el día de cumpleaños!"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Animación por cuadros, sincronización de audio y bucles continuos de repetición.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-950 block">Diseño en papel</span>
              <span className="text-amber-800 text-[11px]">Primero bocetar la idea</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-950 block">Construcción paso a paso</span>
              <span className="text-emerald-800 text-[11px]">La versión mínima que funcione</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-50/60 border border-purple-200">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-purple-950 block">Probar juntos</span>
              <span className="text-purple-800 text-[11px]">Aprender y mejorar en familia</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
