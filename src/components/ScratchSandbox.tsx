"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import {
  Play,
  RotateCcw,
  Sparkles,
  Maximize2,
  Trash2,
  Volume2,
  Eye,
  EyeOff,
  Compass,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { sound } from "@/lib/sound";
import {
  ScratchBlockSvg,
  ScratchCategory,
  SCRATCH_COLORS,
} from "./scratch/ScratchBlockSvg";
import { ScratchCatSpriteSvg } from "./scratch/ScratchCatSpriteSvg";

export interface ScriptBlockItem {
  uid: string;
  category: ScratchCategory;
  shape: "hat" | "stack" | "cap" | "c-block";
  template: string;
  args: Record<string, string | number>;
  actionType:
    | "start"
    | "move"
    | "spin"
    | "goto"
    | "say"
    | "think"
    | "costume"
    | "change_size"
    | "set_size"
    | "meow"
    | "wait"
    | "repeat";
}

// Complete library of authentic Scratch 3.0 blocks
const AVAILABLE_BLOCKS: Omit<ScriptBlockItem, "uid">[] = [
  // 1. EVENTOS (Yellow)
  {
    category: "events",
    shape: "hat",
    template: "al hacer clic en 🚩",
    args: {},
    actionType: "start",
  },
  {
    category: "events",
    shape: "hat",
    template: "al presionar tecla [espacio]",
    args: {},
    actionType: "start",
  },
  {
    category: "events",
    shape: "hat",
    template: "al hacer clic en este objeto",
    args: {},
    actionType: "start",
  },

  // 2. MOVIMIENTO (Blue)
  {
    category: "motion",
    shape: "stack",
    template: "mover {steps} pasos",
    args: { steps: 25 },
    actionType: "move",
  },
  {
    category: "motion",
    shape: "stack",
    template: "girar ↻ {degs} grados",
    args: { degs: 90 },
    actionType: "spin",
  },
  {
    category: "motion",
    shape: "stack",
    template: "ir a x: {x} y: {y}",
    args: { x: 0, y: 0 },
    actionType: "goto",
  },

  // 3. APARIENCIA (Purple)
  {
    category: "looks",
    shape: "stack",
    template: "decir {msg} por {secs} segs",
    args: { msg: "¡Hola, Familia! 🌟", secs: 2 },
    actionType: "say",
  },
  {
    category: "looks",
    shape: "stack",
    template: "pensar {msg} por {secs} segs",
    args: { msg: "¡Me encanta programar! 💡", secs: 2 },
    actionType: "think",
  },
  {
    category: "looks",
    shape: "stack",
    template: "siguiente disfraz",
    args: {},
    actionType: "costume",
  },
  {
    category: "looks",
    shape: "stack",
    template: "cambiar tamaño por {size}",
    args: { size: 15 },
    actionType: "change_size",
  },
  {
    category: "looks",
    shape: "stack",
    template: "fijar tamaño al {size} %",
    args: { size: 100 },
    actionType: "set_size",
  },

  // 4. SONIDO (Magenta)
  {
    category: "sound",
    shape: "stack",
    template: "tocar sonido miau hasta terminar",
    args: {},
    actionType: "meow",
  },

  // 5. CONTROL (Orange)
  {
    category: "control",
    shape: "stack",
    template: "esperar {secs} segundos",
    args: { secs: 1 },
    actionType: "wait",
  },
  {
    category: "control",
    shape: "stack",
    template: "repetir {times} veces mover 15 pasos",
    args: { times: 3 },
    actionType: "repeat",
  },
];

// Pre-built projects for instant inspiration
const PRESET_PROJECTS: { name: string; icon: string; script: ScriptBlockItem[] }[] = [
  {
    name: "Gatito Paseador",
    icon: "🚶",
    script: [
      {
        uid: "p1-1",
        category: "events",
        shape: "hat",
        template: "al hacer clic en 🚩",
        args: {},
        actionType: "start",
      },
      {
        uid: "p1-2",
        category: "looks",
        shape: "stack",
        template: "decir {msg} por {secs} segs",
        args: { msg: "¡Vamos a caminar juntos! 🐾", secs: 2 },
        actionType: "say",
      },
      {
        uid: "p1-3",
        category: "motion",
        shape: "stack",
        template: "mover {steps} pasos",
        args: { steps: 35 },
        actionType: "move",
      },
      {
        uid: "p1-4",
        category: "looks",
        shape: "stack",
        template: "siguiente disfraz",
        args: {},
        actionType: "costume",
      },
      {
        uid: "p1-5",
        category: "motion",
        shape: "stack",
        template: "mover {steps} pasos",
        args: { steps: 35 },
        actionType: "move",
      },
      {
        uid: "p1-6",
        category: "sound",
        shape: "stack",
        template: "tocar sonido miau hasta terminar",
        args: {},
        actionType: "meow",
      },
    ],
  },
  {
    name: "Salto y Giro 360°",
    icon: "🤸",
    script: [
      {
        uid: "p2-1",
        category: "events",
        shape: "hat",
        template: "al hacer clic en 🚩",
        args: {},
        actionType: "start",
      },
      {
        uid: "p2-2",
        category: "looks",
        shape: "stack",
        template: "decir {msg} por {secs} segs",
        args: { msg: "¡Mira este giro acrobático! 🌀", secs: 1.5 },
        actionType: "say",
      },
      {
        uid: "p2-3",
        category: "motion",
        shape: "stack",
        template: "girar ↻ {degs} grados",
        args: { degs: 360 },
        actionType: "spin",
      },
      {
        uid: "p2-4",
        category: "looks",
        shape: "stack",
        template: "cambiar tamaño por {size}",
        args: { size: 25 },
        actionType: "change_size",
      },
      {
        uid: "p2-5",
        category: "sound",
        shape: "stack",
        template: "tocar sonido miau hasta terminar",
        args: {},
        actionType: "meow",
      },
      {
        uid: "p2-6",
        category: "looks",
        shape: "stack",
        template: "fijar tamaño al {size} %",
        args: { size: 100 },
        actionType: "set_size",
      },
    ],
  },
  {
    name: "Cuadrado Matemático",
    icon: "📐",
    script: [
      {
        uid: "p3-1",
        category: "events",
        shape: "hat",
        template: "al hacer clic en 🚩",
        args: {},
        actionType: "start",
      },
      {
        uid: "p3-2",
        category: "motion",
        shape: "stack",
        template: "ir a x: {x} y: {y}",
        args: { x: -50, y: -40 },
        actionType: "goto",
      },
      {
        uid: "p3-3",
        category: "looks",
        shape: "stack",
        template: "decir {msg} por {secs} segs",
        args: { msg: "¡Dibujo un cuadrado con 4 lados!", secs: 2 },
        actionType: "say",
      },
      {
        uid: "p3-4",
        category: "motion",
        shape: "stack",
        template: "mover {steps} pasos",
        args: { steps: 50 },
        actionType: "move",
      },
      {
        uid: "p3-5",
        category: "motion",
        shape: "stack",
        template: "girar ↻ {degs} grados",
        args: { degs: 90 },
        actionType: "spin",
      },
      {
        uid: "p3-6",
        category: "motion",
        shape: "stack",
        template: "mover {steps} pasos",
        args: { steps: 50 },
        actionType: "move",
      },
      {
        uid: "p3-7",
        category: "motion",
        shape: "stack",
        template: "girar ↻ {degs} grados",
        args: { degs: 90 },
        actionType: "spin",
      },
    ],
  },
];

export default function ScratchSandbox() {
  // Category selection for palette
  const [selectedCategory, setSelectedCategory] = useState<ScratchCategory | "all">("all");

  // Script blocks in workspace
  const [script, setScript] = useState<ScriptBlockItem[]>(PRESET_PROJECTS[0].script);

  // Active executing step index
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Stage & Sprite physical state (Scratch coordinate system: X -200..200, Y -140..140)
  const [catX, setCatX] = useState<number>(0);
  const [catY, setCatY] = useState<number>(0);
  const [catRotation, setCatRotation] = useState<number>(90);
  const [catScale, setCatScale] = useState<number>(1.0);
  const [catVisible, setCatVisible] = useState<boolean>(true);
  const [catCostume, setCatCostume] = useState<"costume1" | "costume2">("costume1");
  const [speechBubble, setSpeechBubble] = useState<{ text: string; type: "say" | "think" } | null>(null);

  // Selected Stage Backdrop
  const [backdrop, setBackdrop] = useState<"grid" | "park" | "room" | "space">("grid");

  // DOM Refs for GSAP animations
  const catRef = useRef<HTMLDivElement>(null);
  const flagBtnRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const abortExecutionRef = useRef<boolean>(false);

  // Dragging cat directly on stage
  const stageRef = useRef<HTMLDivElement>(null);
  const [isDraggingCat, setIsDraggingCat] = useState(false);

  // Reset Sprite to stage center (0, 0)
  const resetSprite = () => {
    abortExecutionRef.current = true;
    setIsRunning(false);
    setActiveStep(null);
    setSpeechBubble(null);

    if (catRef.current) {
      gsap.killTweensOf(catRef.current);
      gsap.to(catRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
      });
    }

    setCatX(0);
    setCatY(0);
    setCatRotation(90);
    setCatScale(1.0);
    setCatVisible(true);
    setCatCostume("costume1");
  };

  // Add block to workspace with tactile GSAP snap animation
  const addBlockToScript = (blockDef: Omit<ScriptBlockItem, "uid">) => {
    if (isRunning) return;
    sound.playWoodClick();

    const newItem: ScriptBlockItem = {
      ...blockDef,
      uid: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      args: { ...blockDef.args },
    };

    setScript((prev) => [...prev, newItem]);

    // GSAP snap bounce on workspace
    setTimeout(() => {
      if (workspaceRef.current) {
        const lastEl = workspaceRef.current.lastElementChild;
        if (lastEl) {
          gsap.fromTo(
            lastEl,
            { y: -16, opacity: 0.6, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: "back.out(1.6)" }
          );
        }
      }
    }, 20);
  };

  // Delete a block from workspace
  const removeBlock = (index: number) => {
    if (isRunning) return;
    sound.playWoodClick();
    setScript((prev) => prev.filter((_, i) => i !== index));
  };

  // Update block argument values
  const updateBlockArg = (index: number, key: string, val: string) => {
    if (isRunning) return;
    setScript((prev) => {
      const copy = [...prev];
      const parsedNum = Number(val);
      copy[index] = {
        ...copy[index],
        args: {
          ...copy[index].args,
          [key]: isNaN(parsedNum) || val.trim() === "" ? val : parsedNum,
        },
      };
      return copy;
    });
  };

  // Execute the script step by step with GSAP
  const runProgram = async () => {
    if (isRunning || script.length === 0) return;
    setIsRunning(true);
    abortExecutionRef.current = false;

    // Green Flag Wobble Animation
    if (flagBtnRef.current) {
      gsap.fromTo(
        flagBtnRef.current,
        { rotate: 0 },
        { rotate: 15, yoyo: true, repeat: 5, duration: 0.08, ease: "power1.inOut" }
      );
    }

    sound.playWoodClick();

    // Loop through each block
    for (let i = 0; i < script.length; i++) {
      if (abortExecutionRef.current) break;

      setActiveStep(i);
      const item = script[i];

      // Physical Execution according to action type
      switch (item.actionType) {
        case "start":
          sound.playWoodClick();
          await new Promise((r) => setTimeout(r, 200));
          break;

        case "move": {
          const rawSteps = Number(item.args.steps) || 20;
          // Calculate movement based on direction angle
          const rad = ((catRotation - 90) * Math.PI) / 180;
          const deltaX = Math.round(rawSteps * Math.cos(rad));
          const deltaY = Math.round(-rawSteps * Math.sin(rad));

          const nextX = Math.max(-180, Math.min(180, catX + deltaX));
          const nextY = Math.max(-130, Math.min(130, catY + deltaY));

          setCatX(nextX);
          setCatY(nextY);
          sound.playWoodClick();

          // GSAP smooth slide with little footstep bounce
          if (catRef.current) {
            await gsap.to(catRef.current, {
              x: nextX,
              y: -nextY,
              duration: 0.35,
              ease: "power2.out",
            });
          }
          break;
        }

        case "spin": {
          const rawDegs = Number(item.args.degs) || 90;
          const nextRot = (catRotation + rawDegs) % 360;
          setCatRotation(nextRot);
          sound.playWoodClick();

          if (catRef.current) {
            await gsap.to(catRef.current, {
              rotation: `+=${rawDegs}`,
              duration: 0.45,
              ease: "back.out(1.3)",
            });
          }
          break;
        }

        case "goto": {
          const targetX = Number(item.args.x) || 0;
          const targetY = Number(item.args.y) || 0;
          setCatX(targetX);
          setCatY(targetY);
          sound.playWoodClick();

          if (catRef.current) {
            await gsap.to(catRef.current, {
              x: targetX,
              y: -targetY,
              duration: 0.4,
              ease: "power2.out",
            });
          }
          break;
        }

        case "say":
        case "think": {
          const msg = String(item.args.msg || "¡Hola!");
          const duration = (Number(item.args.secs) || 2) * 1000;
          setSpeechBubble({ text: msg, type: item.actionType });
          sound.playStarChime();

          if (bubbleRef.current) {
            gsap.fromTo(
              bubbleRef.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }
            );
          }

          await new Promise((r) => setTimeout(r, duration));
          if (bubbleRef.current) {
            await gsap.to(bubbleRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.2,
            });
          }
          setSpeechBubble(null);
          break;
        }

        case "costume": {
          sound.playWoodClick();
          setCatCostume((prev) => (prev === "costume1" ? "costume2" : "costume1"));
          if (catRef.current) {
            await gsap.fromTo(
              catRef.current,
              { scaleY: 0.88 },
              { scaleY: 1, duration: 0.2, ease: "back.out(2)" }
            );
          }
          break;
        }

        case "change_size": {
          const delta = Number(item.args.size) || 15;
          const nextScale = Math.max(0.5, Math.min(1.8, catScale + delta / 100));
          setCatScale(nextScale);
          sound.playWoodClick();

          if (catRef.current) {
            await gsap.to(catRef.current, {
              scale: nextScale,
              duration: 0.3,
              ease: "back.out(1.4)",
            });
          }
          break;
        }

        case "set_size": {
          const target = Number(item.args.size) || 100;
          const nextScale = Math.max(0.5, Math.min(1.8, target / 100));
          setCatScale(nextScale);
          sound.playWoodClick();

          if (catRef.current) {
            await gsap.to(catRef.current, {
              scale: nextScale,
              duration: 0.3,
              ease: "back.out(1.4)",
            });
          }
          break;
        }

        case "meow": {
          sound.playCatMeow();
          if (catRef.current) {
            // Excited cat ear wiggle & bounce
            await gsap.timeline()
              .to(catRef.current, { scale: catScale * 1.12, duration: 0.12, ease: "power1.out" })
              .to(catRef.current, { rotation: "-=8", duration: 0.1 })
              .to(catRef.current, { rotation: "+=16", duration: 0.12 })
              .to(catRef.current, { rotation: 0, scale: catScale, duration: 0.15, ease: "back.out(1.5)" });
          }
          await new Promise((r) => setTimeout(r, 450));
          break;
        }

        case "wait": {
          const secs = Number(item.args.secs) || 1;
          await new Promise((r) => setTimeout(r, secs * 1000));
          break;
        }

        case "repeat": {
          const times = Number(item.args.times) || 3;
          for (let step = 0; step < times; step++) {
            if (abortExecutionRef.current) break;
            sound.playWoodClick();
            const nextX = Math.min(180, catX + 15 * (step + 1));
            setCatX(nextX);
            if (catRef.current) {
              await gsap.to(catRef.current, {
                x: nextX,
                duration: 0.22,
                ease: "power1.out",
              });
            }
            await new Promise((r) => setTimeout(r, 120));
          }
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 120));
    }

    setActiveStep(null);
    setIsRunning(false);

    if (!abortExecutionRef.current) {
      sound.playStarChime();
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.5 },
        colors: ["#4C97FF", "#FFBF00", "#9966FF", "#10B981"],
      });
    }
  };

  // Interactive Stage Dragging
  const handlePointerDownCat = (e: React.PointerEvent) => {
    if (isRunning) return;
    setIsDraggingCat(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMoveStage = (e: React.PointerEvent) => {
    if (!isDraggingCat || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert pixel to Scratch (-240..240, -180..180)
    const stageWidth = rect.width;
    const stageHeight = rect.height;
    const sX = Math.round(((mouseX / stageWidth) * 480) - 240);
    const sY = Math.round(180 - ((mouseY / stageHeight) * 360));

    setCatX(Math.max(-200, Math.min(200, sX)));
    setCatY(Math.max(-140, Math.min(140, sY)));

    if (catRef.current) {
      gsap.set(catRef.current, { x: sX, y: -sY });
    }
  };

  const handlePointerUpStage = () => {
    if (isDraggingCat) {
      setIsDraggingCat(false);
      sound.playWoodClick();
    }
  };

  // Click on cat directly: trigger meow and wiggle
  const handleClickCat = () => {
    if (isDraggingCat || isRunning) return;
    sound.playCatMeow();
    if (catRef.current) {
      gsap.timeline()
        .to(catRef.current, { scale: catScale * 1.15, duration: 0.12 })
        .to(catRef.current, { scale: catScale, duration: 0.2, ease: "elastic.out(1, 0.5)" });
    }
  };

  return (
    <div className="bg-slate-100/90 border-2 border-slate-300 rounded-3xl p-3 sm:p-5 shadow-xl space-y-4 max-w-7xl mx-auto select-none">
      
      {/* 1. TOP SCRATCH NAVIGATION BAR (Iconic Scratch 3.0 Header) */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-white shadow-md">
        
        {/* Scratch Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-orange-600 font-extrabold px-3 py-1 rounded-xl text-xs sm:text-sm tracking-wider uppercase font-fun shadow-sm flex items-center gap-1.5">
            <span className="text-base">🐱</span> SCRATCH 3.0
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-orange-700/40 px-3 py-1 rounded-xl border border-orange-400/30">
            <span>🌐 Español</span>
            <span className="opacity-60">•</span>
            <span>Archivo</span>
            <span className="opacity-60">•</span>
            <span>Editar</span>
          </div>
          <span className="text-xs font-bold text-amber-100 hidden md:inline">
            | Proyecto: Gatito Interactivo
          </span>
        </div>

        {/* Green Flag & Stop Sign Controls */}
        <div className="flex items-center gap-2">
          {/* Green Flag (Play) */}
          <button
            ref={flagBtnRef}
            onClick={runProgram}
            disabled={isRunning || script.length === 0}
            title="Ejecutar bandera verde (Iniciar programa)"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold font-fun text-xs shadow-md transition-all ${
              isRunning
                ? "bg-emerald-600 text-white cursor-wait animate-pulse"
                : "bg-emerald-400 hover:bg-emerald-300 text-emerald-950 active:scale-95"
            }`}
          >
            <span className="text-base">🚩</span>
            <span>{isRunning ? "Corriendo..." : "Ir"}</span>
          </button>

          {/* Red Stop Sign (Stop) */}
          <button
            onClick={resetSprite}
            title="Detener todo y reiniciar personaje"
            className="w-8 h-8 rounded-xl bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center font-bold text-sm shadow-md active:scale-95 transition-all"
          >
            🛑
          </button>

          {/* Reset Position */}
          <button
            onClick={resetSprite}
            title="Centrar Gatito al origen (0, 0)"
            className="w-8 h-8 rounded-xl bg-orange-700/60 hover:bg-orange-700 text-white flex items-center justify-center text-xs border border-orange-400/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Preset Projects Bar (1-Click Learning Templates) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-600 font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Proyectos de ejemplo:
        </span>
        {PRESET_PROJECTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              resetSprite();
              sound.playWoodClick();
              setScript(p.script);
            }}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/70 border border-slate-300 text-slate-700 font-bold font-fun shrink-0 flex items-center gap-1.5 shadow-2xs hover:border-amber-400 active:scale-95 transition-all"
          >
            <span>{p.icon}</span>
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* 2. MAIN WORKSPACE GRID: Left Palette | Middle Code Script | Right Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT COLUMN: Scratch Block Palette (Col 1-4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-3">
          
          {/* Category Rail Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedCategory === "all"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Todos
            </button>
            {(["events", "motion", "looks", "sound", "control"] as ScratchCategory[]).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                    selectedCategory === cat
                      ? "ring-2 ring-slate-800 font-extrabold text-white"
                      : "text-slate-700 opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: SCRATCH_COLORS[cat].bg,
                    color: SCRATCH_COLORS[cat].text,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full border border-white/60"
                    style={{ backgroundColor: SCRATCH_COLORS[cat].border }}
                  />
                  <span className="capitalize">
                    {cat === "events"
                      ? "Eventos"
                      : cat === "motion"
                      ? "Movimiento"
                      : cat === "looks"
                      ? "Apariencia"
                      : cat === "sound"
                      ? "Sonido"
                      : "Control"}
                  </span>
                </button>
              )
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            Toca cualquier bloque para añadirlo a tu programa:
          </p>

          {/* Palette Blocks Scroll Area */}
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {AVAILABLE_BLOCKS.filter(
              (b) => selectedCategory === "all" || b.category === selectedCategory
            ).map((bDef, idx) => (
              <div
                key={idx}
                onClick={() => addBlockToScript(bDef)}
                className="cursor-pointer hover:scale-[1.02] active:scale-98 transition-transform"
                title="Toca para agregar a tu código"
              >
                <ScratchBlockSvg
                  category={bDef.category}
                  shape={bDef.shape}
                  template={bDef.template}
                  args={bDef.args}
                  compact={true}
                />
              </div>
            ))}
          </div>

        </div>

        {/* MIDDLE COLUMN: Programming Workspace / Script Area (Col 5-7) */}
        <div className="lg:col-span-4 bg-[#f8fafc] border border-slate-300 rounded-2xl p-3 shadow-inner flex flex-col min-h-96">
          
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="font-fun text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-orange-500" />
                Programa del Gatito ({script.length} bloques)
              </span>
            </div>
            <button
              onClick={() => setScript([])}
              disabled={isRunning || script.length === 0}
              className="text-[11px] text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 disabled:opacity-40"
            >
              <Trash2 className="w-3 h-3" /> Vaciar
            </button>
          </div>

          {/* Connected Script Column (Grid canvas pattern) */}
          <div
            ref={workspaceRef}
            className="flex-1 overflow-y-auto p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-0 relative min-h-64"
            style={{
              backgroundImage:
                "radial-gradient(circle, #e2e8f0 1.2px, transparent 1.2px)",
              backgroundSize: "16px 16px",
            }}
          >
            {script.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-2 text-slate-400">
                <div className="text-3xl">🧩</div>
                <p className="text-xs font-semibold">Tu programa está vacío</p>
                <p className="text-[11px]">
                  Toca los bloques de la izquierda para apilarlos como fichas de Lego.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-start -space-y-[3px]">
                {script.map((item, idx) => (
                  <ScratchBlockSvg
                    key={item.uid}
                    category={item.category}
                    shape={item.shape}
                    template={item.template}
                    args={item.args}
                    onArgChange={(key, val) => updateBlockArg(idx, key, val)}
                    isActive={activeStep === idx}
                    onDelete={() => removeBlock(idx)}
                    compact={false}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Run Bar */}
          <div className="pt-3 flex gap-2">
            <button
              onClick={runProgram}
              disabled={isRunning || script.length === 0}
              className="flex-1 wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold py-2 text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-950" />
              {isRunning ? "Ejecutando..." : "Ejecutar Programa"}
            </button>
            <button
              onClick={resetSprite}
              title="Reiniciar"
              className="wood-btn bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Stage & Sprite Controller (Col 8-12) */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Authentic Stage Canvas (480 x 360 ratio) */}
          <div className="wood-card p-2.5 bg-white border border-slate-300 shadow-sm space-y-2">
            
            <div className="flex items-center justify-between text-xs px-1 font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <span>🖥️</span> Escenario de Scratch
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  x: {catX} | y: {catY}
                </span>
              </div>
            </div>

            {/* Stage Screen Container */}
            <div
              ref={stageRef}
              onPointerMove={handlePointerMoveStage}
              onPointerUp={handlePointerUpStage}
              className={`w-full aspect-[4/3] rounded-xl relative overflow-hidden border-2 border-slate-300 shadow-inner select-none transition-colors ${
                backdrop === "space"
                  ? "bg-slate-950"
                  : backdrop === "room"
                  ? "bg-amber-100/80"
                  : backdrop === "park"
                  ? "bg-sky-200"
                  : "bg-white"
              }`}
            >
              
              {/* BACKDROP 1: OFFICIAL SCRATCH X-Y GRID */}
              {backdrop === "grid" && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Subtle Grid Lines */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Blue X Axis */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sky-400 -translate-y-1/2" />
                  {/* Orange Y Axis */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-500 -translate-x-1/2" />

                  {/* Axis Coordinate Labels */}
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-amber-600 bg-white/80 px-1 rounded">
                    y: 180
                  </span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-amber-600 bg-white/80 px-1 rounded">
                    y: -180
                  </span>
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-sky-600 bg-white/80 px-1 rounded">
                    x: -240
                  </span>
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-sky-600 bg-white/80 px-1 rounded">
                    x: 240
                  </span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-slate-500 bg-white px-1 rounded shadow-xs">
                    (0, 0)
                  </span>
                </div>
              )}

              {/* BACKDROP 2: SUNNY PARK */}
              {backdrop === "park" && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-3 left-4 text-xl">☁️</div>
                  <div className="absolute top-6 right-8 text-2xl">☁️</div>
                  <div className="absolute top-3 right-4 w-10 h-10 rounded-full bg-amber-300 border-2 border-amber-400 shadow-md" />
                  {/* Green Hill Grass */}
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-emerald-400 rounded-t-[50%] border-t-2 border-emerald-500" />
                </div>
              )}

              {/* BACKDROP 3: ROOM */}
              {backdrop === "room" && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-6 w-16 h-12 border-2 border-amber-800 bg-amber-50 shadow-inner flex items-center justify-center text-xs">
                    🖼️
                  </div>
                  {/* Wooden Floor Planks */}
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-amber-700 border-t-4 border-amber-900 flex justify-around">
                    <div className="w-0.5 h-full bg-amber-900/40" />
                    <div className="w-0.5 h-full bg-amber-900/40" />
                    <div className="w-0.5 h-full bg-amber-900/40" />
                  </div>
                </div>
              )}

              {/* BACKDROP 4: SPACE */}
              {backdrop === "space" && (
                <div className="absolute inset-0 pointer-events-none text-slate-100">
                  <span className="absolute top-5 left-8 text-xs">✨</span>
                  <span className="absolute top-12 right-12 text-xs">⭐</span>
                  <span className="absolute bottom-16 left-16 text-xs">🌟</span>
                  <span className="absolute top-8 right-24 text-sm">🪐</span>
                  <span className="absolute bottom-8 right-8 text-lg">🌙</span>
                </div>
              )}

              {/* SPEECH BUBBLE (Authentic Scratch Comic Balloon) */}
              {speechBubble && (
                <div
                  ref={bubbleRef}
                  className="absolute z-30 pointer-events-none"
                  style={{
                    left: `${Math.max(15, Math.min(80, ((catX + 240) / 480) * 100))}%`,
                    top: `${Math.max(12, Math.min(75, ((180 - catY) / 360) * 100 - 22))}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div
                    className={`bg-white border-2 px-3 py-1.5 rounded-2xl text-xs font-bold font-fun text-slate-800 shadow-lg ${
                      speechBubble.type === "think"
                        ? "border-dashed border-purple-500 rounded-3xl"
                        : "border-slate-800"
                    }`}
                  >
                    {speechBubble.text}
                    {/* Beak / Tail */}
                    <div
                      className={`w-2.5 h-2.5 bg-white border-r-2 border-b-2 absolute left-1/2 -bottom-1.5 -translate-x-1/2 rotate-45 ${
                        speechBubble.type === "think"
                          ? "border-purple-500"
                          : "border-slate-800"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* SCRATCH CAT SPRITE (Interactive & Draggable) */}
              {catVisible && (
                <div
                  ref={catRef}
                  onPointerDown={handlePointerDownCat}
                  onClick={handleClickCat}
                  className={`absolute z-20 cursor-grab active:cursor-grabbing transition-shadow ${
                    isDraggingCat ? "scale-105" : ""
                  }`}
                  style={{
                    left: `${((catX + 240) / 480) * 100}%`,
                    top: `${((180 - catY) / 360) * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${catRotation - 90}deg) scale(${catScale})`,
                  }}
                  title="Gatito Scratch (Arrastra o haz clic para que maúlle)"
                >
                  <ScratchCatSpriteSvg
                    className="w-20 h-20 sm:w-24 sm:h-24"
                    costume={catCostume}
                    isTalking={!!speechBubble}
                  />
                </div>
              )}

            </div>

            {/* SPRITE INSPECTOR PANE (Scratch Sprite Info Bar) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 space-y-2">
              
              <div className="flex items-center justify-between font-fun font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-xs">
                    🐱
                  </span>
                  <span>Objeto 1 (Gatito)</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCatVisible(!catVisible)}
                    className="p-1 rounded hover:bg-slate-200"
                    title={catVisible ? "Ocultar objeto" : "Mostrar objeto"}
                  >
                    {catVisible ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Coordinates & Attributes Grid */}
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-mono">
                <div className="bg-white border rounded px-1.5 py-1 flex items-center justify-between">
                  <span className="text-slate-400">x:</span>
                  <span className="font-bold text-sky-700">{catX}</span>
                </div>
                <div className="bg-white border rounded px-1.5 py-1 flex items-center justify-between">
                  <span className="text-slate-400">y:</span>
                  <span className="font-bold text-amber-700">{catY}</span>
                </div>
                <div className="bg-white border rounded px-1.5 py-1 flex items-center justify-between">
                  <span className="text-slate-400">tam:</span>
                  <span className="font-bold">{Math.round(catScale * 100)}%</span>
                </div>
                <div className="bg-white border rounded px-1.5 py-1 flex items-center justify-between">
                  <span className="text-slate-400">dir:</span>
                  <span className="font-bold">{catRotation}°</span>
                </div>
              </div>

              {/* Backdrop Selector Pills */}
              <div className="pt-1 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-500 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Fondo:
                </span>
                <div className="flex gap-1">
                  {(
                    [
                      { id: "grid", label: "Cuadrícula" },
                      { id: "park", label: "Parque" },
                      { id: "room", label: "Sala" },
                      { id: "space", label: "Espacio" },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        sound.playWoodClick();
                        setBackdrop(b.id);
                      }}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                        backdrop === b.id
                          ? "bg-orange-500 text-white font-bold"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
