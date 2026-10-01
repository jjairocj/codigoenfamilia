content = '''"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { usePassport } from "@/context/PassportContext";
import { SemillasGame } from "./minigames/SemillasGames";
import { ExploradoresGame } from "./minigames/ExploradoresGames";
import { InventoresGame } from "./minigames/InventoresGames";
import { CreadoresGame } from "./minigames/CreadoresGames";
import {
  Gamepad2, Star, CheckCircle2, RotateCcw, Sparkles
} from "lucide-react";

interface MissionMinigameProps {
  mission: {
    code: string;
    title: string;
    level: string;
  };
}

export default function MissionMinigame({ mission }: MissionMinigameProps) {
  const { isCompleted, toggleStamp } = usePassport();
  const [minigameWon, setMinigameWon] = useState(false);
  const passportDone = isCompleted(mission.code);

  const handleWin = () => {
    setMinigameWon(true);
  };

  const handlePassportStamp = () => {
    sound.stamp();
    toggleStamp(mission.code);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const codePrefix = mission.code.charAt(0).toUpperCase();

  return (
    <div className="wood-card p-5 sm:p-7 bg-white border-2 border-amber-300 shadow-md space-y-4 relative overflow-hidden">
      {/* Decorative accent top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 absolute top-0 left-0" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl shrink-0 shadow-2xs">
            🎮
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-fun text-base sm:text-lg font-bold text-slate-900">
                Minijuego Interactivo: Reto {mission.code}
              </h3>
              {minigameWon && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 animate-in zoom-in-75">
                  ¡Superado! ⭐
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Aprende jugando: resuelve el reto interactivo directamente aquí abajo.
            </p>
          </div>
        </div>

        {minigameWon && (
          <button
            onClick={() => setMinigameWon(false)}
            className="self-end sm:self-center text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl"
            title="Volver a jugar"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Jugar de nuevo
          </button>
        )}
      </div>

      {/* Game Content Box */}
      <div className="pt-2">
        {codePrefix === "S" && (
          <SemillasGame
            code={mission.code}
            onWin={handleWin}
            completed={minigameWon}
          />
        )}
        {codePrefix === "E" && (
          <ExploradoresGame
            code={mission.code}
            onWin={handleWin}
            completed={minigameWon}
          />
        )}
        {codePrefix === "I" && (
          <InventoresGame
            code={mission.code}
            onWin={handleWin}
            completed={minigameWon}
          />
        )}
        {codePrefix === "C" && (
          <CreadoresGame
            code={mission.code}
            onWin={handleWin}
            completed={minigameWon}
          />
        )}
      </div>

      {/* Success Banner and Passport Prompt */}
      {minigameWon && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 via-yellow-100/80 to-emerald-100/90 border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-amber-950 font-fun">
                ¡Reto interactivo completado con éxito!
              </div>
              <div className="text-[11px] text-amber-900">
                Has aplicado el concepto de la misión {mission.code}.
              </div>
            </div>
          </div>

          <button
            onClick={handlePassportStamp}
            className={`wood-btn text-xs px-4 py-2 font-bold flex items-center gap-2 shadow-xs shrink-0 ${
              passportDone
                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                : "bg-amber-400 hover:bg-amber-500 text-amber-950"
            }`}
          >
            <Star className={`w-4 h-4 ${passportDone ? "fill-emerald-800" : "fill-amber-950"}`} />
            <span>{passportDone ? "¡Misión ya sellada!" : "Estampar en Pasaporte ⭐"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
'''

with open('src/components/MissionMinigame.tsx', 'w') as f:
    f.write(content)

print('MissionMinigame.tsx created successfully!')
