"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import MicrobitBoardSvg from "./microbit/MicrobitBoardSvg";
import { microbitSound } from "./microbit/microbitSound";
import { MICROBIT_ICONS, buildTextScrollColumns } from "./microbit/microbitFont5x5";
import {
  Sparkles,
  RotateCcw,
  Zap,
  Volume2,
  HelpCircle,
  Dices,
  Hand,
  Repeat,
  Thermometer,
  Sun,
  Compass,
  Music,
  Send,
  ArrowRight,
  Eye,
  Sliders,
  CheckCircle2,
} from "lucide-react";

export default function MicrobitSimulator() {
  // 5x5 LED Matrix Grid state
  const [grid, setGrid] = useState<number[][]>(MICROBIT_ICONS.HEART);
  const [activeProject, setActiveProject] = useState<string>("tamagotchi");
  const [pressedBtn, setPressedBtn] = useState<"A" | "B" | "AB" | "LOGO" | null>(null);
  const [touchedPin, setTouchedPin] = useState<number | string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);

  // Text marquee scrolling state
  const [customText, setCustomText] = useState<string>("HOLA");
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sensor states
  const [tiltX, setTiltX] = useState<number>(0); // -2 to +2
  const [tiltY, setTiltY] = useState<number>(0);
  const [lightLevel, setLightLevel] = useState<number>(180); // 0 to 255
  const [tempCelsius, setTempCelsius] = useState<number>(24); // 24 deg C
  const [compassHeading, setCompassHeading] = useState<number>(0); // 0 = North

  // DOM Refs
  const boardWrapRef = useRef<HTMLDivElement>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
      if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
    };
  }, []);

  // Stop any active scrolling or heartbeats
  const clearActiveModes = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    setIsScrolling(false);
  };

  // Toggle individual LED in free drawing mode
  const toggleLed = (r: number, c: number) => {
    clearActiveModes();
    microbitSound.playButtonClick();
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = next[r][c] === 1 ? 0 : 1;
      return next;
    });
    setActiveProject("custom");
  };

  // 1. Text Scroller (like basic.showString)
  const startTextScroll = (textToScroll = customText) => {
    if (!textToScroll.trim()) return;
    clearActiveModes();
    setIsScrolling(true);
    microbitSound.playTone(880, 0.08, "triangle");

    const columns = buildTextScrollColumns(textToScroll);
    let colIndex = 0;

    scrollIntervalRef.current = setInterval(() => {
      if (colIndex + 5 > columns.length) {
        // End of scroll
        clearActiveModes();
        setGrid(MICROBIT_ICONS.HAPPY);
        return;
      }

      // Extract 5 consecutive columns and format into 5x5 rows
      const frame: number[][] = [
        [columns[colIndex][0], columns[colIndex + 1][0], columns[colIndex + 2][0], columns[colIndex + 3][0], columns[colIndex + 4][0]],
        [columns[colIndex][1], columns[colIndex + 1][1], columns[colIndex + 2][1], columns[colIndex + 3][1], columns[colIndex + 4][1]],
        [columns[colIndex][2], columns[colIndex + 1][2], columns[colIndex + 2][2], columns[colIndex + 3][2], columns[colIndex + 4][2]],
        [columns[colIndex][3], columns[colIndex + 1][3], columns[colIndex + 2][3], columns[colIndex + 3][3], columns[colIndex + 4][3]],
        [columns[colIndex][4], columns[colIndex + 1][4], columns[colIndex + 2][4], columns[colIndex + 3][4], columns[colIndex + 4][4]],
      ];

      setGrid(frame);
      colIndex++;
    }, 110);
  };

  // 2. Beating Heart Animation (like basic.showIcon(IconNames.Heart))
  const startHeartbeatAnimation = () => {
    clearActiveModes();
    setActiveProject("tamagotchi");
    let isBig = true;
    setGrid(MICROBIT_ICONS.HEART);
    microbitSound.playHeartbeat();

    heartbeatIntervalRef.current = setInterval(() => {
      isBig = !isBig;
      setGrid(isBig ? MICROBIT_ICONS.HEART : MICROBIT_ICONS.HEART_SMALL);
      if (isBig) microbitSound.playHeartbeat();
    }, 600);
  };

  // Physical Button A
  const handleButtonA = () => {
    clearActiveModes();
    microbitSound.playButtonClick();
    setPressedBtn("A");
    setTimeout(() => setPressedBtn(null), 350);

    if (activeProject === "tamagotchi") {
      startHeartbeatAnimation();
    } else if (activeProject === "termometro") {
      setGrid(MICROBIT_ICONS.ARROW_N);
      setTimeout(() => startTextScroll(`${tempCelsius}C`), 300);
    } else {
      setGrid(MICROBIT_ICONS.HAPPY);
      microbitSound.playHappyMelody();
    }
  };

  // Physical Button B
  const handleButtonB = () => {
    clearActiveModes();
    microbitSound.playButtonClick();
    setPressedBtn("B");
    setTimeout(() => setPressedBtn(null), 350);

    if (activeProject === "tamagotchi") {
      setGrid(MICROBIT_ICONS.SILLY);
      microbitSound.playHappyMelody();
    } else if (activeProject === "brujula") {
      setGrid(MICROBIT_ICONS.ARROW_N);
      microbitSound.playTone(660, 0.15);
    } else {
      setGrid(MICROBIT_ICONS.SURPRISED);
      microbitSound.playTone(550, 0.2);
    }
  };

  // Virtual A+B Together
  const handleButtonAB = () => {
    clearActiveModes();
    microbitSound.playStartupSound();
    setPressedBtn("AB");
    setTimeout(() => setPressedBtn(null), 350);
    setGrid(MICROBIT_ICONS.STAR);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  // Touch Logo (v2 Gold capacitive logo)
  const handleTouchLogo = () => {
    clearActiveModes();
    microbitSound.playPianoNote(7); // High C
    setPressedBtn("LOGO");
    setTimeout(() => setPressedBtn(null), 350);
    setGrid(MICROBIT_ICONS.SURPRISED);
  };

  // Touch Pins (P0, P1, P2 alligator clips)
  const handleTouchPin = (pin: 0 | 1 | 2 | "3V" | "GND") => {
    clearActiveModes();
    setTouchedPin(pin);
    setTimeout(() => setTouchedPin(null), 400);

    if (pin === 0) {
      microbitSound.playPianoNote(0); // C4
      setGrid(MICROBIT_ICONS.ARROW_W);
    } else if (pin === 1) {
      microbitSound.playPianoNote(2); // E4
      setGrid(MICROBIT_ICONS.STAR);
    } else if (pin === 2) {
      microbitSound.playPianoNote(4); // G4
      setGrid(MICROBIT_ICONS.ARROW_E);
    } else {
      microbitSound.playTone(400, 0.1);
    }
  };

  // GSAP Shake Board (Accelerometer)
  const triggerShake = () => {
    clearActiveModes();
    microbitSound.playDiceRattle();

    if (boardWrapRef.current) {
      gsap.killTweensOf(boardWrapRef.current);
      gsap.fromTo(
        boardWrapRef.current,
        { rotation: -6, x: -8 },
        {
          rotation: 6,
          x: 8,
          duration: 0.06,
          repeat: 7,
          yoyo: true,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.to(boardWrapRef.current, { rotation: 0, x: 0, duration: 0.2 });
          },
        }
      );
    }

    if (activeProject === "dado") {
      // Roll 1 to 6
      const dice = Math.floor(Math.random() * 6) + 1;
      const diceIcon = (MICROBIT_ICONS as Record<string, number[][]>)[`DICE_${dice}`];
      setGrid(diceIcon || MICROBIT_ICONS.STAR);
      setTimeout(() => {
        microbitSound.playHappyMelody();
        try {
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
        } catch {}
      }, 400);
    } else if (activeProject === "ppt") {
      // Rock, Paper, Scissors
      const choices = [MICROBIT_ICONS.CHESSBOARD, MICROBIT_ICONS.YES, MICROBIT_ICONS.NO];
      const pick = choices[Math.floor(Math.random() * choices.length)];
      setGrid(pick);
      microbitSound.playHappyMelody();
    } else {
      // Dizzy Tamagotchi
      setGrid(MICROBIT_ICONS.CONFUSED);
      setTimeout(() => {
        setGrid(MICROBIT_ICONS.HAPPY);
        microbitSound.playHappyMelody();
      }, 900);
    }
  };

  // Spirit Level / Tilt Simulation
  const updateTilt = (dx: number, dy: number) => {
    clearActiveModes();
    const newX = Math.max(-2, Math.min(2, dx));
    const newY = Math.max(-2, Math.min(2, dy));
    setTiltX(newX);
    setTiltY(newY);

    // Create 5x5 empty grid and light up centered coordinate (2 + newX, 2 + newY)
    const levelGrid = Array.from({ length: 5 }, () => Array(5).fill(0));
    levelGrid[2 + newY][2 + newX] = 1;
    setGrid(levelGrid);
    microbitSound.playTone(300 + (newX + 2) * 80 + (newY + 2) * 50, 0.05);
  };

  // 3D Board Flip View
  const toggleFlip = () => {
    microbitSound.playTone(500, 0.1, "sine");
    if (boardWrapRef.current) {
      gsap.to(boardWrapRef.current, {
        rotateY: isFlipped ? 0 : 180,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 select-none">
      {/* Interactive Microbit Board Area */}
      <div className="flex flex-col items-center justify-center space-y-4">
        
        {/* Interaction hints */}
        <div className="flex items-center justify-between w-full max-w-lg px-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Hand className="w-4 h-4 text-amber-500 animate-bounce" />
            Toca bombillos, botones A/B, logo o pines dorados:
          </span>
          <button
            onClick={toggleFlip}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200 transition-colors"
          >
            <Repeat className="w-3.5 h-3.5" />
            {isFlipped ? "Ver Frente (Pantalla)" : "Ver Reverso (Chips y Altavoz)"}
          </button>
        </div>

        {/* Board Container with GSAP 3D Transform */}
        <div
          style={{ perspective: "1000px" }}
          className="w-full max-w-lg px-2 sm:px-4 flex justify-center"
        >
          <div
            ref={boardWrapRef}
            className="w-full will-change-transform transition-shadow duration-300"
          >
            <MicrobitBoardSvg
              grid={grid}
              onToggleLed={toggleLed}
              pressedButton={pressedBtn}
              onPressButtonA={handleButtonA}
              onPressButtonB={handleButtonB}
              onTouchLogo={handleTouchLogo}
              onTouchPin={handleTouchPin}
              touchedPin={touchedPin}
              isMicActive={isMicActive}
              isFlipped={isFlipped}
              interactive={true}
            />
          </div>
        </div>

        {/* Physical Board Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            onClick={handleButtonA}
            className={`wood-btn text-xs font-bold py-2.5 px-4 shadow-sm border transition-all ${
              pressedBtn === "A"
                ? "bg-amber-400 text-amber-950 border-amber-500 scale-95"
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
            }`}
          >
            Pulsar [A]
          </button>

          <button
            onClick={handleButtonB}
            className={`wood-btn text-xs font-bold py-2.5 px-4 shadow-sm border transition-all ${
              pressedBtn === "B"
                ? "bg-amber-400 text-amber-950 border-amber-500 scale-95"
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
            }`}
          >
            Pulsar [B]
          </button>

          <button
            onClick={handleButtonAB}
            className={`wood-btn text-xs font-bold py-2.5 px-4 shadow-sm border transition-all ${
              pressedBtn === "AB"
                ? "bg-amber-400 text-amber-950 border-amber-500 scale-95"
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
            }`}
          >
            Pulsar [A + B]
          </button>

          <button
            onClick={triggerShake}
            className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold py-2.5 px-4 shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-950" />
            ¡Agitar Placa! (Shake)
          </button>

          <button
            onClick={handleTouchLogo}
            className="wood-btn bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold py-2.5 px-3.5 border border-amber-300 shadow-sm flex items-center gap-1"
          >
            <Hand className="w-3.5 h-3.5 text-amber-800" />
            Tocar Logo Dorado
          </button>
        </div>
      </div>

      {/* 2. Interactive Feature Tabs (Proyectos Clásicos, Texto Desplazable, Sensores, Iconos) */}
      <div className="wood-card p-6 bg-white border-2 border-slate-200 shadow-sm space-y-6">
        
        {/* Project Presets Bar */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <span className="font-fun text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Elige un Proyecto Oficial de micro:bit para Probar:
            </span>
            <button
              onClick={() => {
                clearActiveModes();
                setGrid(Array.from({ length: 5 }, () => Array(5).fill(0)));
                setActiveProject("vacio");
              }}
              className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Limpiar Matriz
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mt-3">
            {[
              {
                id: "tamagotchi",
                name: "Mascota Feliz",
                icon: "❤️",
                action: () => startHeartbeatAnimation(),
              },
              {
                id: "dado",
                name: "Dado Digital",
                icon: "🎲",
                action: () => {
                  clearActiveModes();
                  setActiveProject("dado");
                  triggerShake();
                },
              },
              {
                id: "ppt",
                name: "Piedra, Papel, Tijera",
                icon: "✂️",
                action: () => {
                  clearActiveModes();
                  setActiveProject("ppt");
                  triggerShake();
                },
              },
              {
                id: "piano",
                name: "Piano Caimanes",
                icon: "🎹",
                action: () => {
                  clearActiveModes();
                  setActiveProject("piano");
                  setGrid(MICROBIT_ICONS.ARROW_S);
                  microbitSound.playHappyMelody();
                },
              },
              {
                id: "brujula",
                name: "Brújula Digital",
                icon: "🧭",
                action: () => {
                  clearActiveModes();
                  setActiveProject("brujula");
                  setGrid(MICROBIT_ICONS.ARROW_N);
                  microbitSound.playTone(440, 0.15);
                },
              },
              {
                id: "termometro",
                name: "Termómetro",
                icon: "🌡️",
                action: () => {
                  clearActiveModes();
                  setActiveProject("termometro");
                  startTextScroll(`${tempCelsius}C`);
                },
              },
            ].map((p) => (
              <button
                key={p.id}
                onClick={p.action}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 ${
                  activeProject === p.id
                    ? "bg-amber-100/80 border-amber-400 text-amber-950 shadow-xs"
                    : "bg-slate-50 hover:bg-amber-50/50 border-slate-200 text-slate-700"
                }`}
              >
                <span className="text-xl">{p.icon}</span>
                <span className="text-xs font-bold leading-tight">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Text Marquee Scroller (showString) */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-amber-700" />
            Escribe un mensaje para desplazarlo por los 25 LEDs («basic.showString»):
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={20}
              value={customText}
              onChange={(e) => setCustomText(e.target.value.toUpperCase())}
              placeholder="Ej: HOLA, BOTY, FELIZ DÍA"
              className="bg-white border-2 border-slate-200 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 flex-1 outline-none uppercase"
            />
            <button
              onClick={() => startTextScroll(customText)}
              disabled={isScrolling || !customText.trim()}
              className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold px-4 py-2 shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <span>{isScrolling ? "Desplazando..." : "Desplazar Texto"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Sensor Sliders (Tilt, Light, Temperature) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          
          {/* Tilt / Accelerometer Level */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                Nivel de Burbuja (Tilt)
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                X:{tiltX} Y:{tiltY}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 max-w-[120px] mx-auto text-center">
              <span />
              <button
                onClick={() => updateTilt(tiltX, tiltY - 1)}
                className="bg-white border border-slate-300 rounded-md py-1 text-[10px] font-bold hover:bg-amber-100"
              >
                ⬆
              </button>
              <span />
              <button
                onClick={() => updateTilt(tiltX - 1, tiltY)}
                className="bg-white border border-slate-300 rounded-md py-1 text-[10px] font-bold hover:bg-amber-100"
              >
                ⬅
              </button>
              <button
                onClick={() => updateTilt(0, 0)}
                className="bg-indigo-100 text-indigo-900 border border-indigo-300 rounded-md py-1 text-[10px] font-bold"
              >
                ●
              </button>
              <button
                onClick={() => updateTilt(tiltX + 1, tiltY)}
                className="bg-white border border-slate-300 rounded-md py-1 text-[10px] font-bold hover:bg-amber-100"
              >
                ➡
              </button>
              <span />
              <button
                onClick={() => updateTilt(tiltX, tiltY + 1)}
                className="bg-white border border-slate-300 rounded-md py-1 text-[10px] font-bold hover:bg-amber-100"
              >
                ⬇
              </button>
              <span />
            </div>
          </div>

          {/* Light Sensor */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Sensor de Luz
              </span>
              <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                {lightLevel} / 255
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={lightLevel}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLightLevel(val);
                if (val < 60) {
                  // Low light -> Night lamp icon
                  setGrid(MICROBIT_ICONS.STAR);
                } else {
                  setGrid(MICROBIT_ICONS.HAPPY);
                }
              }}
              className="w-full accent-amber-500"
            />
            <p className="text-[10px] text-slate-500 leading-tight">
              Si hay poca luz (&lt;60), la micro:bit enciende una luz de noche automática.
            </p>
          </div>

          {/* Temperature Sensor */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                Termómetro Integrado
              </span>
              <span className="font-mono text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                {tempCelsius} °C
              </span>
            </div>
            <input
              type="range"
              min={-5}
              max={45}
              value={tempCelsius}
              onChange={(e) => setTempCelsius(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
            <button
              onClick={() => startTextScroll(`${tempCelsius}C`)}
              className="text-[10px] font-bold text-rose-700 hover:underline block"
            >
              Mostrar temperatura en la placa ➔
            </button>
          </div>

        </div>

        {/* 5. Official Icon Library Quick Picker */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-700 block">
            Galería de Iconos Oficiales de micro:bit:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Corazón", icon: MICROBIT_ICONS.HEART },
              { label: "Corazón Pequeño", icon: MICROBIT_ICONS.HEART_SMALL },
              { label: "Feliz", icon: MICROBIT_ICONS.HAPPY },
              { label: "Triste", icon: MICROBIT_ICONS.SAD },
              { label: "Sorprendido", icon: MICROBIT_ICONS.SURPRISED },
              { label: "Pato", icon: MICROBIT_ICONS.DUCK },
              { label: "Fantasma", icon: MICROBIT_ICONS.GHOST },
              { label: "Pacman", icon: MICROBIT_ICONS.PACMAN },
              { label: "Estrella", icon: MICROBIT_ICONS.STAR },
              { label: "Checkmark", icon: MICROBIT_ICONS.YES },
              { label: "Ajedrez", icon: MICROBIT_ICONS.CHESSBOARD },
              { label: "Flecha N", icon: MICROBIT_ICONS.ARROW_N },
              { label: "Flecha S", icon: MICROBIT_ICONS.ARROW_S },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  clearActiveModes();
                  setGrid(item.icon);
                  microbitSound.playTone(500 + idx * 30, 0.08);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-950 text-xs font-semibold border border-slate-200 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Physical Didactic Guide */}
      <div className="wood-card p-6 bg-gradient-to-r from-amber-50 to-orange-50/60 border-2 border-amber-200 space-y-3">
        <h3 className="font-fun text-base font-bold text-slate-800 flex items-center gap-2">
          <span>💡 ¿Por qué es la Placa Favorita de los Colegios en el Mundo?</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          La BBC micro:bit fue entregada a más de 1 millón de estudiantes en el Reino Unido y se utiliza en escuelas de más de 60 países. Su magia radica en que los niños pueden pasar de crear un dado o un termómetro en bloques visuales (con Microsoft MakeCode) a programar en Python real, usando la misma placa física con servomotores, luces y sensores.
        </p>
      </div>
    </div>
  );
}
