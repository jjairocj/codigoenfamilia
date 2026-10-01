"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Sparkles, Binary, Key, RefreshCw, CheckCircle2 } from "lucide-react";

const BIT_VALUES = [128, 64, 32, 16, 8, 4, 2, 1];

export default function BinaryWorkshop() {
  // 8-bit switch states (0 or 1)
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 1, 1, 0, 1]); // default: 13
  const [targetNumber, setTargetNumber] = useState<number>(25);
  const [success, setSuccess] = useState<boolean>(false);

  // Text to binary translator
  const [secretText, setSecretText] = useState<string>("HOLA");

  const totalValue = bits.reduce(
    (acc, bit, idx) => acc + (bit === 1 ? BIT_VALUES[idx] : 0),
    0
  );

  const toggleBit = (index: number) => {
    sound.click();
    setBits((prev) => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      const newTotal = next.reduce(
        (acc, bit, idx) => acc + (bit === 1 ? BIT_VALUES[idx] : 0),
        0
      );
      if (newTotal === targetNumber) {
        sound.stamp();
        setSuccess(true);
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } else {
        setSuccess(false);
      }
      return next;
    });
  };

  const newChallenge = () => {
    sound.chime();
    const newTarget = Math.floor(Math.random() * 63) + 1; // 1 to 63
    setTargetNumber(newTarget);
    setBits([0, 0, 0, 0, 0, 0, 0, 0]);
    setSuccess(false);
  };

  // Convert string to 8-bit binary representation
  const textToBinary = (text: string) => {
    return text
      .split("")
      .map((char) => {
        const bin = char.charCodeAt(0).toString(2).padStart(8, "0");
        return `${char}: ${bin}`;
      })
      .join("  |  ");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Minigame: Activa los Interruptores Binarios */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-indigo-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">
              <Binary className="w-3.5 h-3.5 text-indigo-600" />
              Reto: Enciende los Bits
            </div>
            <h2 className="font-fun text-xl sm:text-2xl font-bold text-slate-800 mt-1">
              Forma el Número Secreto: <span className="text-indigo-600 text-3xl font-extrabold">{targetNumber}</span>
            </h2>
          </div>

          <button
            onClick={newChallenge}
            className="wood-btn bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs py-2 px-3 border border-indigo-200 flex items-center gap-1.5 font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Otro Número
          </button>
        </div>

        {/* 8-bit Switches Interface */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
          {bits.map((bit, idx) => {
            const val = BIT_VALUES[idx];
            const isOn = bit === 1;
            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between gap-2 transition-all ${
                  isOn
                    ? "bg-indigo-500 text-white border-indigo-600 shadow-md scale-102"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold ${isOn ? "text-indigo-200" : "text-slate-400"}`}>
                  +{val}
                </span>

                <button
                  onClick={() => toggleBit(idx)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-bold shadow-xs active:scale-90 transition-transform ${
                    isOn
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "bg-white text-slate-800 border border-slate-300"
                  }`}
                >
                  {bit}
                </button>

                <span className="text-[9px] font-bold uppercase tracking-wider">
                  {isOn ? "ON" : "OFF"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Calculation Total Display */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <div className="text-xs text-slate-500 font-medium">Suma total de los bits encendidos:</div>
            <div className="font-fun text-2xl font-extrabold text-slate-800">
              Valor actual: <span className={totalValue === targetNumber ? "text-emerald-600" : "text-indigo-600"}>{totalValue}</span>
            </div>
          </div>

          {success ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ¡Excelente! ¡Conseguiste el número {targetNumber}! 🎉
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              {totalValue < targetNumber
                ? `Te faltan ${targetNumber - totalValue} para alcanzar la meta`
                : totalValue > targetNumber
                ? `Te pasaste por ${totalValue - targetNumber}, apaga algún interruptor`
                : "¡Enciende interruptores!"}
            </div>
          )}
        </div>
      </div>

      {/* 2. Text to Secret Binary Cypher Translator */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-slate-200 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-600" />
          <h3 className="font-fun text-lg font-bold text-slate-800">
            Traductor de Mensajes Secretos (Texto a Binario)
          </h3>
        </div>
        <p className="text-xs text-slate-600">
          Escribe tu nombre o un mensaje corto para ver cómo lo leen las computadoras por dentro (en secuencias de 8 bits por letra):
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            maxLength={12}
            value={secretText}
            onChange={(e) => setSecretText(e.target.value.toUpperCase())}
            placeholder="Escribe una palabra..."
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {secretText && (
          <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto shadow-inner">
            {textToBinary(secretText)}
          </div>
        )}
      </div>
    </div>
  );
}
