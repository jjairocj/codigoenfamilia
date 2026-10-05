import Link from "next/link";
import {
  Smartphone,
  Apple,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  WifiOff,
  ShieldCheck,
  Zap,
  Share,
  PlusSquare,
  MoreVertical,
  Compass,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo Instalar la App en tu Celular o Computador | Código en Familia",
  description:
    "Guía paso a paso para instalar Código en Familia en iPhone, iPad, Android y PC para usarla sin conexión a internet y llevarla a todo lado.",
};

export default function InstalarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Smartphone className="w-4 h-4 text-emerald-700" />
          Aplicación Web Progresiva (PWA) · 100% Gratuita
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Lleva Código en Familia a Todo Lado
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Instálala en tu celular, tableta o computador en solo 3 clics. <strong>Funciona sin conexión a internet</strong> para jugar en la finca, el carro, el parque o cuando no hay señal en casa.
        </p>
      </div>

      {/* 3 Great Advantages for Parents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="wood-card p-4 sm:p-6 bg-emerald-50/50 border-2 border-emerald-200 space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl border border-emerald-300">
            <WifiOff className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="font-fun text-base font-bold text-slate-800">
            Modo Sin Internet (Offline)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Boty el Robot, la Ruleta, las actividades desenchufadas y las 84 misiones cargan al instante aunque no tengas datos móviles ni WiFi.
          </p>
        </div>

        <div className="wood-card p-4 sm:p-6 bg-amber-50/50 border-2 border-amber-200 space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl border border-amber-300">
            <Zap className="w-6 h-6 text-amber-700" />
          </div>
          <h3 className="font-fun text-base font-bold text-slate-800">
            Pantalla Completa sin Distracciones
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Se abre limpia como una app nativa, sin barras de navegación, sin botones de búsqueda que distraigan al niño y con acceso instantáneo.
          </p>
        </div>

        <div className="wood-card p-4 sm:p-6 bg-sky-50/50 border-2 border-sky-200 space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl border border-sky-300">
            <ShieldCheck className="w-6 h-6 text-sky-700" />
          </div>
          <h3 className="font-fun text-base font-bold text-slate-800">
            Cero Anuncios y Menos de 5 MB
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No ocupa memoria en tu celular, no recopila datos de los niños y no contiene ningún anuncio publicitario. 100% libre.
          </p>
        </div>
      </div>

      {/* Step-by-Step Guides per Device */}
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <h2 className="font-fun text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-800">
            Elige tu Dispositivo para Instalar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sigue estos 3 sencillos pasos según el teléfono o computador que tengas en la mano:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Guide 1: iPhone & iPad */}
          <div className="wood-card p-4 sm:p-6 lg:p-7 bg-white border-2 border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-sm">
                  🍏
                </div>
                <div>
                  <h3 className="font-fun text-lg font-bold text-slate-800">
                    iPhone o iPad
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">Navegador Safari</span>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    1
                  </span>
                  <span>
                    Abre <strong>codigoenfamilia.org</strong> en el navegador <strong>Safari</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    2
                  </span>
                  <span>
                    Toca el botón <strong>Compartir</strong> (el ícono del cuadro con una flecha hacia arriba <Share className="w-3.5 h-3.5 inline text-sky-600" /> en la barra inferior).
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    3
                  </span>
                  <span>
                    Baja un poco y selecciona <strong>«Agregar a la pantalla de inicio»</strong> <PlusSquare className="w-3.5 h-3.5 inline text-emerald-600" />.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                    ✓
                  </span>
                  <span className="text-emerald-900 font-semibold">
                    ¡Listo! Verás el ícono de <strong>Boty el Robot</strong> en tu pantalla junto a tus aplicaciones.
                  </span>
                </li>
              </ol>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              💡 <em>En iPad es ideal para jugar con el simulador de Boty en el suelo de la sala.</em>
            </div>
          </div>

          {/* Guide 2: Android */}
          <div className="wood-card p-4 sm:p-6 lg:p-7 bg-white border-2 border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="font-fun text-lg font-bold text-slate-800">
                    Celular o Tablet Android
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">Google Chrome / Edge</span>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    1
                  </span>
                  <span>
                    Abre <strong>codigoenfamilia.org</strong> en <strong>Google Chrome</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    2
                  </span>
                  <span>
                    Toca los <strong>tres puntos verticales ⋮</strong> en la esquina superior derecha.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    3
                  </span>
                  <span>
                    Toca <strong>«Instalar aplicación»</strong> o <strong>«Agregar a la pantalla principal»</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                    ✓
                  </span>
                  <span className="text-emerald-900 font-semibold">
                    Confirma y ¡listo! Se instalará en tu cajón de aplicaciones con soporte sin conexión.
                  </span>
                </li>
              </ol>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900">
              💡 <em>En Android puedes girar la pantalla horizontal para programar con más comodidad.</em>
            </div>
          </div>

          {/* Guide 3: PC / Mac / Chromebook */}
          <div className="wood-card p-4 sm:p-6 lg:p-7 bg-white border-2 border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-2xl shadow-sm">
                  💻
                </div>
                <div>
                  <h3 className="font-fun text-lg font-bold text-slate-800">
                    Computador o Laptop
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">Windows, Mac o Chromebook</span>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    1
                  </span>
                  <span>
                    Abre la página en <strong>Google Chrome</strong> o <strong>Microsoft Edge</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    2
                  </span>
                  <span>
                    En la barra de direcciones (al lado de la estrella), busca el ícono de <strong>monitor con flecha 💻</strong> o menú ⋮ ➔ <strong>«Instalar Código en Familia»</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    3
                  </span>
                  <span>
                    Haz clic en <strong>«Instalar»</strong>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                    ✓
                  </span>
                  <span className="text-emerald-900 font-semibold">
                    Se abrirá como una aplicación de escritorio rápida, perfecta para los niveles de Scratch y Python.
                  </span>
                </li>
              </ol>
            </div>

            <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-sky-900">
              💡 <em>En PC los niños pueden escribir con teclado real en el Laboratorio Python y Scratch.</em>
            </div>
          </div>

        </div>
      </div>

      {/* FAQ for Parents */}
      <div className="wood-card p-6 sm:p-8 bg-amber-50/60 border-2 border-amber-200 max-w-3xl mx-auto space-y-4">
        <h3 className="font-fun text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>❓</span> Preguntas Frecuentes de las Familias
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div>
            <h4 className="font-bold text-slate-800">¿Tengo que pagar algo en la App Store o Google Play?</h4>
            <p className="text-slate-600 mt-0.5">
              No. Esta es una Aplicación Web Progresiva libre y abierta. Se instala directamente desde el navegador sin intermediarios, sin tarifas y sin publicidad.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800">¿Qué pasa con los sellos del pasaporte si no tengo internet?</h4>
            <p className="text-slate-600 mt-0.5">
              Los sellos y misiones completadas se guardan de forma segura en la memoria de tu dispositivo. En cuanto vuelvas a tener señal WiFi, si iniciaste sesión familiar, se sincronizan con la nube automáticamente.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800">¿Cómo la desinstalo si no la quiero más?</h4>
            <p className="text-slate-600 mt-0.5">
              Exactamente igual que cualquier otra app: mantén presionado el ícono en tu pantalla de inicio y selecciona «Eliminar app» o arrástrala a la papelera.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-center sm:text-left">
          <Link
            href="/misiones"
            className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <span>Ir a las 84 Misiones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/robot"
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            Probar Boty el Robot ➔
          </Link>
        </div>
      </div>

    </div>
  );
}
