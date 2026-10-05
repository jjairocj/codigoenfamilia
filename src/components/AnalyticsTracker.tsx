"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    // Evitar contar rutas vacías o duplicadas por re-renders
    if (!pathname || pathname === lastTracked.current) return;

    // NUNCA rastrear visitas a rutas administrativas
    if (
      pathname.startsWith("/control-familia") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api")
    ) {
      return;
    }

    // NUNCA rastrear visitas si el navegador pertenece al administrador
    try {
      if (typeof window !== "undefined") {
        const isAdminSession = sessionStorage.getItem("cef_admin_pin");
        const isAdminDevice = localStorage.getItem("cef_admin_device") === "true";
        if (isAdminSession || isAdminDevice) {
          // Visita de administrador: excluida del contador
          return;
        }
      }
    } catch {}

    lastTracked.current = pathname;

    // Detectar sección general para agregación
    let section = "general";
    if (pathname.startsWith("/misiones")) section = "misiones";
    else if (pathname.startsWith("/desenchufado")) section = "desenchufado";
    else if (pathname.startsWith("/scratch")) section = "scratch";
    else if (pathname.startsWith("/robot")) section = "robot";
    else if (pathname.startsWith("/ruleta")) section = "ruleta";
    else if (pathname.startsWith("/binario")) section = "binario";
    else if (pathname.startsWith("/python")) section = "python";
    else if (pathname.startsWith("/microbit")) section = "microbit";
    else if (pathname.startsWith("/proyectos")) section = "proyectos";

    // Enviar ping anónimo sin bloquear
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagePath: pathname, section }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }, [pathname]);

  return null;
}
