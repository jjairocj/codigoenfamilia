import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Shield, Gift, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-amber-50/70 border-t border-amber-900/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="font-fun text-lg font-bold text-slate-800">
                Código en Familia
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Iniciativa educativa libre y abierta para aprender pensamiento computacional y programación en familia con respeto a los tiempos de la infancia.
            </p>
            <p className="text-[11px] font-semibold text-amber-800">
              Diseñado con amor por Jhon Jairo Cruz Jiménez.
            </p>
          </div>

          <div>
            <h4 className="font-fun font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Los 4 Niveles
            </h4>
            <ul className="text-xs space-y-2 text-slate-600">
              <li><Link href="/misiones?nivel=semillas" className="hover:text-emerald-700">🌱 Semillas (4–6 años)</Link></li>
              <li><Link href="/misiones?nivel=exploradores" className="hover:text-sky-700">🧭 Exploradores (7–9 años)</Link></li>
              <li><Link href="/misiones?nivel=inventores" className="hover:text-purple-700">🔬 Inventores (10–12 años)</Link></li>
              <li><Link href="/misiones?nivel=creadores" className="hover:text-amber-700">🚀 Creadores (13–15 años)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fun font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-purple-500" /> Herramientas
            </h4>
            <ul className="text-xs space-y-2 text-slate-600">
              <li><Link href="/robot" className="hover:text-emerald-700">🤖 El Robot Boty</Link></li>
              <li><Link href="/ruleta" className="hover:text-purple-700">🎡 Ruleta de Retos Familiares</Link></li>
              <li><Link href="/scratch" className="hover:text-rose-700">🧩 Laboratorio Scratch</Link></li>
              <li><Link href="/descargas" className="hover:text-blue-700">🖨️ Pasaportes y Diplomas PDF</Link></li>
              <li><Link href="/conceptos" className="hover:text-teal-700">🧠 Glosario de Conceptos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fun font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-600" /> Privacidad & Respeto
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              No recopilamos ni comercializamos datos personales de ninguna persona o niño. Es un proyecto educativo 100% gratuito y libre de anuncios.
            </p>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Libre de Anuncios y Rastreo
              </span>
              <Link
                href="/privacidad"
                className="text-xs font-bold text-teal-700 hover:text-teal-800 underline decoration-teal-400"
              >
                Ver Política de Privacidad ➔
              </Link>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Código en Familia · Diseñado con amor por Jhon Jairo Cruz Jiménez.</p>
          <div className="flex items-center gap-3 text-slate-500">
            <Link href="/privacidad" className="hover:underline">
              Política de Privacidad
            </Link>
            <span>·</span>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Hecho con</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>para las familias del mundo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
