"use client";

import React, { useState } from "react";
import { usePassport } from "@/context/PassportContext";
import { X, Sparkles, User, Lock, Mail, Heart } from "lucide-react";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { loginUser } = usePassport();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [childName, setChildName] = useState("");
  const [level, setLevel] = useState("semillas");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const payload = isRegister
      ? { email, password, familyName, childName, level }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Algo salió mal");
        setLoading(false);
        return;
      }

      await loginUser(data.user);
      onClose();
    } catch {
      setError("Error de conexión al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="wood-card bg-white max-w-md w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-3xl mb-3 shadow-xs">
            🌟
          </div>
          <h3 className="font-fun text-2xl font-bold text-slate-800">
            {isRegister ? "Crear Pasaporte Familiar" : "Bienvenido de Nuevo"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister
              ? "Guarda las medallas y sellos de tus pequeños en la nube"
              : "Inicia sesión para sincronizar el progreso de tus niños"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre de la Familia
                </label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    placeholder="Ej. Familia Gómez"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre del Niño(a)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Ej. Sofía"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nivel Inicial
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-hidden focus:border-amber-400"
                  >
                    <option value="semillas">🌱 Semillas (5–7)</option>
                    <option value="exploradores">🧭 Exploradores (8–10)</option>
                    <option value="inventores">💡 Inventores (11–13)</option>
                    <option value="creadores">🚀 Creadores (14+)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Correo Electrónico (del Adulto)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adulto@familia.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold py-3 shadow-sm mt-2"
          >
            {loading ? "Cargando..." : isRegister ? "¡Crear Cuenta Familiar!" : "Entrar a mi Cuenta"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2 text-center text-xs">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-amber-800 font-bold hover:underline"
          >
            {isRegister
              ? "¿Ya tienes cuenta? Inicia sesión aquí"
              : "¿Primera vez? Crea tu pasaporte familiar gratis"}
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            Continuar en modo invitado sin guardar en la nube
          </button>
        </div>
      </div>
    </div>
  );
}
