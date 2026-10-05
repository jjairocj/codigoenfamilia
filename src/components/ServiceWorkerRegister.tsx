"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Smartphone, X } from "lucide-react";

export default function ServiceWorkerRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registrado con éxito:", reg.scope);
        })
        .catch((err) => {
          console.warn("Fallo al registrar Service Worker:", err);
        });
    }

    // Check if running as standalone PWA
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    // 2. Capture beforeinstallprompt event (Android / Chrome / Edge)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show banner after a short delay so it doesn't disrupt initial view
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem("pwa_banner_dismissed");
        if (!dismissed) {
          setShowBanner(true);
        }
      }, 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      window.location.href = "/instalar";
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("pwa_banner_dismissed", "true");
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="wood-card p-4 bg-white/95 backdrop-blur-md border-2 border-emerald-300 shadow-2xl rounded-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl shrink-0">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Modo Sin Internet
              </span>
            </div>
            <h4 className="font-fun text-xs font-bold text-slate-800 mt-0.5">
              ¿Llevar Código en Familia a todo lado?
            </h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Instálala en tu pantalla para abrirla sin señal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 font-bold shadow-xs"
          >
            Instalar
          </button>
          <button
            onClick={dismissBanner}
            className="text-slate-400 hover:text-slate-600 p-1"
            title="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
