"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquarePlus, X, Send, Sparkles, AlertCircle, CheckCircle2, HelpCircle, Wrench, Lightbulb, Compass } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";

export default function FeedbackModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("duda_mision");
  const [message, setMessage] = useState("");

  // Pre-fill family name from local storage if logged in
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("cef_family_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.familyName) setFamilyName(parsed.familyName);
        if (parsed.email) setEmail(parsed.email);
      }
    } catch {}
  }, [isOpen]);

  // Determine if on a mission page
  const missionMatch = pathname.match(/\/misiones\/([^\/]+)/);
  const detectedMissionId = missionMatch ? missionMatch[1] : null;

  const handleOpen = () => {
    sound.click();
    setSuccess(false);
    setError(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    sound.click();
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim() || !email.trim() || !message.trim()) {
      setError("Por favor completa tu nombre, correo y el mensaje.");
      sound.bump();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const deviceInfo = `${navigator.userAgent.slice(0, 80)} (${window.innerWidth}x${window.innerHeight})`;
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyName: familyName.trim(),
          email: email.trim().toLowerCase(),
          category,
          missionId: detectedMissionId,
          message: message.trim(),
          currentUrl: window.location.href,
          deviceInfo,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al enviar feedback");
      }

      sound.chime();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#10b981", "#3b82f6", "#ec4899"],
      });

      setSuccess(true);
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error. Intenta de nuevo.");
      sound.bump();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante accesible en todas las páginas */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={handleOpen}
          className="group wood-card bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold shadow-2xl border-2 border-amber-600/80 rounded-full px-4 py-2.5 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Enviar sugerencia o pedir ayuda"
        >
          <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-amber-900 shadow-xs group-hover:rotate-12 transition-transform">
            <MessageSquarePlus className="w-4 h-4" />
          </div>
          <span className="font-fun text-xs sm:text-sm tracking-wide">
            ¿Dudas o Ayuda?
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg wood-card bg-gradient-to-br from-amber-50 via-white to-amber-50/80 border-4 border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
            
            {/* Header decorativo */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-200/60 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-xs shrink-0">
                  💌
                </div>
                <div>
                  <h3 className="font-fun text-lg sm:text-xl font-black text-amber-950 leading-tight">
                    Buzón de Ayuda &amp; Feedback
                  </h3>
                  <p className="text-xs text-amber-900/70 font-sans mt-0.5">
                    ¿Te quedaste varado o tienes alguna duda? ¡Estamos para acompañarte!
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pantalla de éxito */}
            {success ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm animate-bounce">
                  🎉
                </div>
                <h4 className="font-fun text-xl font-bold text-slate-800">
                  ¡Mensaje Recibido con Éxito!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Tu reporte ha sido enviado directamente a nuestro panel de soporte familiar. Lo revisaremos con mucho cariño para ayudarte.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold px-6 py-2.5 rounded-2xl text-sm shadow-md transition-all cursor-pointer"
                  >
                    ¡Entendido, gracias!
                  </button>
                </div>
              </div>
            ) : (
              /* Formulario */
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
                
                {/* Misión detectada automáticamente */}
                {detectedMissionId && (
                  <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center gap-2.5 text-cyan-900 text-xs font-mono">
                    <Compass className="w-4 h-4 text-cyan-600 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold block text-[10px] uppercase text-cyan-700">Misión Activa Detectada</span>
                      <span className="truncate font-sans font-semibold text-cyan-950">{detectedMissionId}</span>
                    </div>
                  </div>
                )}

                {/* Categoría del mensaje */}
                <div>
                  <label className="block font-fun font-bold text-amber-950 text-xs mb-1.5">
                    ¿En qué podemos ayudarte?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "duda_mision", label: "Duda en misión", icon: "🧩" },
                      { id: "error_tecnico", label: "Error / Bug", icon: "🐛" },
                      { id: "sugerencia", label: "Sugerencia", icon: "💡" },
                      { id: "otro", label: "Otra consulta", icon: "❓" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => { sound.click(); setCategory(cat.id); }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          category === cat.id
                            ? "bg-amber-200/80 border-amber-500 text-amber-950 font-bold shadow-xs"
                            : "bg-white/80 border-amber-200/80 text-slate-700 hover:bg-amber-100/50"
                        }`}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span className="text-xs leading-none font-medium">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campos de Nombre y Correo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fun font-bold text-amber-950 text-xs mb-1">
                      Nombre de la Familia o Tutor:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Familia Cruz"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm text-slate-800 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block font-fun font-bold text-amber-950 text-xs mb-1">
                      Correo electrónico:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm text-slate-800 shadow-inner"
                    />
                  </div>
                </div>

                {/* Mensaje detallado */}
                <div>
                  <label className="block font-fun font-bold text-amber-950 text-xs mb-1">
                    Cuéntanos el detalle de lo que sucede:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ej. En el paso 2 de la misión, el robot se queda quieto o no entendemos cómo funciona el bucle..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-inner"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Botón de envío */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-black w-full py-3 rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Enviando mensaje...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensaje de Ayuda</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
