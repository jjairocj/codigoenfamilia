"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePassport } from "@/context/PassportContext";
import AuthModal from "@/components/AuthModal";
import {
  Compass,
  Bot,
  Award,
  Dice5,
  Sparkles,
  Download,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { user, stamps, logoutUser } = usePassport();
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Desktop Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo (Responsive, never wraps or breaks) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-xl sm:text-2xl shadow-xs group-hover:scale-105 transition-transform">
              🤖
            </div>
            <div className="flex flex-col">
              <span className="font-fun text-base sm:text-2xl font-bold tracking-tight text-slate-800 group-hover:text-amber-700 transition-colors">
                Código en Familia
              </span>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden md:block">
                Aprender a programar creando juntos
              </p>
            </div>
          </Link>

          {/* Desktop Navigation: Partitioned into 3 Clear Sections */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-2 xl:gap-3">
            
            {/* Sección 1: APRENDER */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("aprender")}
                className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${
                  pathname.startsWith("/misiones") || pathname.startsWith("/conceptos")
                    ? "bg-amber-100/80 text-amber-950 border border-amber-300"
                    : "text-slate-700 hover:text-amber-900 hover:bg-amber-50/70"
                }`}
              >
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Aprender</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "aprender" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "aprender" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border-2 border-amber-200 shadow-xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 z-50">
                  <Link
                    href="/misiones"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shrink-0">
                      🧭
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-amber-800">
                        Las 84 Misiones
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Rutas guiadas de 4 a 15 años
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/conceptos"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-lg shrink-0">
                      🧠
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-teal-800">
                        Glosario de Conceptos
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        29 ideas explicadas para niños
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Divisor sutil */}
            <div className="h-5 w-px bg-slate-200" />

            {/* Sección 2: JUGAR & CREAR */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("laboratorio")}
                className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${
                  pathname.startsWith("/robot") || pathname.startsWith("/ruleta") || pathname.startsWith("/scratch")
                    ? "bg-purple-100/80 text-purple-950 border border-purple-300"
                    : "text-slate-700 hover:text-purple-900 hover:bg-purple-50/70"
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Jugar & Crear</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "laboratorio" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "laboratorio" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border-2 border-purple-200 shadow-xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 z-50">
                  <Link
                    href="/robot"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg shrink-0">
                      🤖
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                        El Robot Boty
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Simulador de algoritmos en cuadrícula
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/ruleta"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-lg shrink-0">
                      🎡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-purple-800">
                        Ruleta Familiar
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Retos de 10 min sin pantalla
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/scratch"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-rose-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center text-lg shrink-0">
                      🧩
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-rose-800">
                        Laboratorio Scratch
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Bloques visuales interactivos
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/microbit"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-lg shrink-0">
                      📟
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-800">
                        Simulador Micro:bit
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Matriz 5x5 LED y botones A/B
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/binario"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cyan-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-lg shrink-0">
                      💡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-cyan-800">
                        Taller Binario 8-Bits
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Interruptores y retos numéricos
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/python"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shrink-0">
                      🐍
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-amber-800">
                        Laboratorio Python
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Recetas interactivas y consola
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Divisor sutil */}
            <div className="h-5 w-px bg-slate-200" />

            {/* Sección 3: PASAPORTE & RECURSOS */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("recursos")}
                className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${
                  pathname.startsWith("/pasaporte") || pathname.startsWith("/descargas")
                    ? "bg-sky-100/80 text-sky-950 border border-sky-300"
                    : "text-slate-700 hover:text-sky-900 hover:bg-sky-50/70"
                }`}
              >
                <Award className="w-4 h-4 text-sky-600" />
                <span>Progreso & PDFs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === "recursos" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "recursos" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border-2 border-sky-200 shadow-xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 z-50">
                  <Link
                    href="/pasaporte"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shrink-0">
                      🌟
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-amber-800">
                        Mi Pasaporte
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Colección de sellos y diplomas
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/descargas"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sky-50/80 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-lg shrink-0">
                      🖨️
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-sky-800">
                        Centro de Descargas
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        12 Guías y cuadernillos en PDF
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

          </nav>

          {/* Right Action: Stamps & Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Stamp counter pill */}
            <Link
              href="/pasaporte"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1 shadow-2xs hover:bg-amber-200 transition-colors"
            >
              <span>⭐</span>
              <span className="hidden sm:inline">{stamps.length} sellos</span>
              <span className="sm:hidden">{stamps.length}</span>
            </Link>

            {/* Desktop Account Button */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-700">
                      {user.familyName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {user.child?.alias}
                    </span>
                  </div>
                  <button
                    onClick={logoutUser}
                    title="Cerrar sesión"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3.5 py-2 shadow-xs"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Guardar en Nube</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle (Always visible and comfortably sized) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="lg:hidden p-2 rounded-xl text-slate-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown with 3 partitioned sections + Account Button */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b-2 border-amber-200 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-3">
            
            {/* Mobile Account Section */}
            <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Familia: {user.familyName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Niño(a): {user.child?.alias}
                    </div>
                  </div>
                  <button
                    onClick={logoutUser}
                    className="text-xs text-rose-600 font-bold bg-white px-2.5 py-1.5 rounded-lg border border-rose-200"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-800 block">Modo Invitado</span>
                    Progreso en tu celular
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowAuth(true);
                    }}
                    className="wood-btn bg-emerald-500 text-white text-xs px-3 py-2 font-bold shrink-0"
                  >
                    <User className="w-3.5 h-3.5" /> Guardar en Nube
                  </button>
                </div>
              )}
            </div>

            {/* Sección 1: APRENDER */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider px-2">
                🧭 Ruta de Aprendizaje
              </span>
              <Link
                href="/misiones"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-amber-50 active:bg-amber-100"
              >
                <span className="text-xl">🧭</span>
                <div>
                  <div className="text-xs font-bold">Las 84 Misiones</div>
                  <div className="text-[10px] text-slate-500">Filtradas por edad y pantalla</div>
                </div>
              </Link>
              <Link
                href="/conceptos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-teal-50 active:bg-teal-100"
              >
                <span className="text-xl">🧠</span>
                <div>
                  <div className="text-xs font-bold">Glosario de Conceptos</div>
                  <div className="text-[10px] text-slate-500">29 conceptos fáciles para niños</div>
                </div>
              </Link>
            </div>

            {/* Sección 2: JUGAR & CREAR */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider px-2">
                🎮 Laboratorio & Juegos
              </span>
              <Link
                href="/robot"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-emerald-50 active:bg-emerald-100"
              >
                <span className="text-xl">🤖</span>
                <div>
                  <div className="text-xs font-bold">El Robot Boty</div>
                  <div className="text-[10px] text-slate-500">Simulador de algoritmos 5x5</div>
                </div>
              </Link>
              <Link
                href="/ruleta"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-purple-50 active:bg-purple-100"
              >
                <span className="text-xl">🎡</span>
                <div>
                  <div className="text-xs font-bold">Ruleta Familiar</div>
                  <div className="text-[10px] text-slate-500">Retos de 10 min en la sala</div>
                </div>
              </Link>
              <Link
                href="/scratch"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-rose-50 active:bg-rose-100"
              >
                <span className="text-xl">🧩</span>
                <div>
                  <div className="text-xs font-bold">Laboratorio Scratch</div>
                  <div className="text-[10px] text-slate-500">Bloques visuales interactivos</div>
                </div>
              </Link>
              <Link
                href="/microbit"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-indigo-50 active:bg-indigo-100"
              >
                <span className="text-xl">📟</span>
                <div>
                  <div className="text-xs font-bold">Simulador Micro:bit</div>
                  <div className="text-[10px] text-slate-500">Matriz 5x5 LED y botones A/B</div>
                </div>
              </Link>
              <Link
                href="/binario"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-cyan-50 active:bg-cyan-100"
              >
                <span className="text-xl">💡</span>
                <div>
                  <div className="text-xs font-bold">Taller Binario 8-Bits</div>
                  <div className="text-[10px] text-slate-500">Interruptores y retos numéricos</div>
                </div>
              </Link>
              <Link
                href="/python"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-amber-50 active:bg-amber-100"
              >
                <span className="text-xl">🐍</span>
                <div>
                  <div className="text-xs font-bold">Laboratorio Python</div>
                  <div className="text-[10px] text-slate-500">Recetas de código y consola</div>
                </div>
              </Link>
            </div>

            {/* Sección 3: PROGRESO & RECURSOS */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider px-2">
                🌟 Progreso & Recursos
              </span>
              <Link
                href="/pasaporte"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-amber-50 active:bg-amber-100"
              >
                <span className="text-xl">⭐</span>
                <div>
                  <div className="text-xs font-bold">Pasaporte Digital & Sellos</div>
                  <div className="text-[10px] text-slate-500">Seguimiento y diplomas oficiales</div>
                </div>
              </Link>
              <Link
                href="/descargas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-slate-800 hover:bg-sky-50 active:bg-sky-100"
              >
                <span className="text-xl">🖨️</span>
                <div>
                  <div className="text-xs font-bold">Centro de Descargas (12 PDFs)</div>
                  <div className="text-[10px] text-slate-500">Guías, pasaportes y recortables</div>
                </div>
              </Link>
            </div>

          </div>
        )}
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
