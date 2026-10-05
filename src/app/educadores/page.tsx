import React from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Download,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  Scissors,
  FileText,
  Clock,
  Lightbulb,
  Heart,
  Share2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit del Educador & Escuelas | Código en Familia",
  description:
    "Guía pedagógica completa, rúbricas de evaluación formativa y plan de clase de 45 minutos para docentes de preescolar, básica primaria y talleres comunitarios.",
};

const PILLARS = [
  {
    icon: "🧩",
    title: "Descomposición",
    desc: "Aprender a partir un problema grande y abrumador en pedazos pequeños y manejables.",
    classroom: "Ej: Desglosar cómo lavarse los dientes o dibujar un monstruo en pasos sencillos.",
  },
  {
    icon: "🔍",
    title: "Reconocimiento de Patrones",
    desc: "Encontrar similitudes, repeticiones y reglas comunes entre diferentes situaciones.",
    classroom: "Ej: Identificar que el estribillo de una canción se repite cada cuatro versos.",
  },
  {
    icon: "💡",
    title: "Abstracción",
    desc: "Quedarse con la información relevante e ignorar los detalles innecesarios.",
    classroom: "Ej: Dibujar un mapa del salón señalando solo las puertas y pupitres, sin dibujar cada lápiz.",
  },
  {
    icon: "📋",
    title: "Algoritmos & Depuración",
    desc: "Crear una secuencia ordenada paso a paso y aprender a corregir los fallos con calma.",
    classroom: "Ej: Guiar a un compañero con los ojos tapados sin chocar con las mesas.",
  },
];

const CURRICULUM_MATRIX = [
  {
    level: "Semillas",
    age: "4 a 6 años (Preescolar / 1°)",
    color: "bg-emerald-100 text-emerald-950 border-emerald-300",
    focus: "Pensamiento espacial vivencial, lateralidad y secuencias corporales",
    evidence: "Puede ordenar 3 tarjetas ilustradas en secuencia lógica y guiar a un compañero con órdenes de avance y giro.",
    area: "Dimensión corporal, motricidad fina y lenguaje oral",
  },
  {
    level: "Exploradores",
    age: "7 a 9 años (2° a 4°)",
    color: "bg-sky-100 text-sky-950 border-sky-300",
    focus: "Algoritmos condicionales (SI / ENTONCES), bucles repetitivos y depuración básica",
    evidence: "Crea historias animadas donde un personaje reacciona al teclado y depura errores sin frustrarse.",
    area: "Matemáticas (geometría y series) y comprensión lectora",
  },
  {
    level: "Inventores",
    age: "10 a 12 años (5° a 7°)",
    color: "bg-purple-100 text-purple-950 border-purple-300",
    focus: "Variables, lógica binaria (0 y 1), simulación de hardware y sensores",
    evidence: "Codifica mensajes en binario, programa condiciones compuestas y entiende cómo viajan los datos en Internet.",
    area: "Ciencias naturales, tecnología y razonamiento lógico-formal",
  },
  {
    level: "Creadores",
    age: "13 a 15 años (8° a 10°)",
    color: "bg-amber-100 text-amber-950 border-amber-300",
    focus: "Programación en texto real con Python, lógica algorítmica y ética digital",
    evidence: "Escribe funciones que procesan datos de texto, crea simulaciones interactivas y reflexiona sobre privacidad.",
    area: "Álgebra, tecnología avanzada y convivencia ciudadana",
  },
];

export default function EducadoresPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          Para Docentes, Escuelas y Familias
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Kit Pedagógico del Educador
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Estructura curricular, rúbrica formativa y plan de clase probado para enseñar pensamiento computacional <strong>con o sin computadores en el aula</strong>. 100% libre, gratuito y respetuoso.
        </p>
      </div>

      {/* The 4 Pillars */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="font-fun text-base sm:text-2xl font-bold text-slate-800 leading-snug px-3">
            Los 4 Pilares del Pensamiento Computacional
          </h2>
          <p className="text-xs text-slate-500">
            Habilidades para la vida aplicables a cualquier materia, no solo a la informática:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => (
            <div key={i} className="wood-card p-5 bg-white border-2 border-slate-200 space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="font-fun text-base font-bold text-slate-800">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-900 bg-amber-50/60 p-2 rounded-xl">
                <strong>En clase:</strong> {p.classroom}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curricular Matrix */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-amber-300 shadow-md rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-amber-200">
          <div>
            <h2 className="font-fun text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📊</span> Matriz de Aprendizaje por Edades
            </h2>
            <p className="text-xs text-slate-500">
              Articulada con estándares internacionales CSTA y competencias del MEN (Colombia).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM_MATRIX.map((c, i) => (
            <div key={i} className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${c.color}`}>
                  {c.level}
                </span>
                <span className="text-xs font-bold text-slate-500">{c.age}</span>
              </div>
              <div>
                <strong className="text-xs text-slate-800 block">Núcleo conceptual:</strong>
                <p className="text-xs text-slate-600">{c.focus}</p>
              </div>
              <div>
                <strong className="text-xs text-emerald-900 block">Evidencia de aprendizaje:</strong>
                <p className="text-xs text-slate-600 leading-relaxed">{c.evidence}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                <strong>Articulación transversal:</strong> {c.area}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 45-Minute Lesson Plan */}
      <div className="wood-card p-6 sm:p-8 bg-amber-50/50 border-2 border-amber-300 shadow-sm rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-amber-200">
          <Clock className="w-6 h-6 text-amber-700" />
          <div>
            <h2 className="font-fun text-base sm:text-2xl font-bold text-slate-800 leading-snug px-3">
              Clase Modelo (45 Minutos)
            </h2>
            <p className="text-xs text-slate-500">
              Formato probado para mantener la atención, el movimiento y la reflexión sin saturación.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          <div className="p-4 bg-white rounded-2xl border-2 border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                0 – 10 min
              </span>
              <span className="text-xl">🏃</span>
            </div>
            <h3 className="font-fun text-sm font-bold text-slate-800">
              1. Activación Desenchufada
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Juego corporal en el suelo del salón (ej: El Robot Humano o La Arepa). Nadie toca pantallas.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                10 – 25 min
              </span>
              <span className="text-xl">👥</span>
            </div>
            <h3 className="font-fun text-sm font-bold text-slate-800">
              2. Reto en Parejas (Pair Work)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Un estudiante es el 'conductor' y el otro es el 'navegante'. Resuelven la misión en equipo.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                25 – 35 min
              </span>
              <span className="text-xl">🐞</span>
            </div>
            <h3 className="font-fun text-sm font-bold text-slate-800">
              3. Depuración Colectiva (Debugging)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intercambian soluciones con otra pareja. Buscar errores se celebra como descubrimiento, no como falla.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                35 – 45 min
              </span>
              <span className="text-xl">⏳</span>
            </div>
            <h3 className="font-fun text-sm font-bold text-slate-800">
              4. Círculo y Reloj de la Sala
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cierre con El Reloj de la Sala y una pregunta reflexiva: '¿Qué error fue el más divertido hoy?'.
            </p>
          </div>

        </div>
      </div>

      {/* Formative Evaluation Rubric */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-slate-200 rounded-3xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <h2 className="font-fun text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📋</span> Rúbrica Formativa de Observación
            </h2>
            <p className="text-xs text-slate-500">
              Evaluación cualitativa basada en procesos, sin notas numéricas punitivas.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            100% Formativa y Continua
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-amber-100/70 text-slate-800 border-b border-amber-300">
                <th className="p-3 font-fun font-bold">Criterio Pedagógico</th>
                <th className="p-3 font-fun font-bold text-amber-900">🌱 En Inicio</th>
                <th className="p-3 font-fun font-bold text-sky-900">🧭 En Desarrollo</th>
                <th className="p-3 font-fun font-bold text-emerald-900">🚀 Consolidado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold text-slate-800">Descomposición y Pasos</td>
                <td className="p-3">Intenta resolver el problema de un solo golpe sin dividirlo.</td>
                <td className="p-3">Identifica 2 o 3 pasos con guía del docente o su compañero.</td>
                <td className="p-3 font-medium text-emerald-900">Divide problemas complejos en secuencias claras de forma autónoma.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Actitud ante el Error (Debugging)</td>
                <td className="p-3">Se desmotiva o abandona cuando el robot no hace lo esperado.</td>
                <td className="p-3">Acepta revisar las instrucciones y prueba una alternativa.</td>
                <td className="p-3 font-medium text-emerald-900">Celebra el error como pista y rastrea el paso exacto que falló.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Precisión en el Lenguaje</td>
                <td className="p-3">Usa órdenes ambiguas ('muévete allá', 'ponlo ahí').</td>
                <td className="p-3">Usa vocabulario direccional correcto (avanza 3, gira 90°).</td>
                <td className="p-3 font-medium text-emerald-900">Explica la lógica con términos precisos (condición, bucle, evento).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">Colaboración y Escucha</td>
                <td className="p-3">Acapara el rol o no presta atención a su compañero.</td>
                <td className="p-3">Alterna roles de conductor y navegante con recordatorios.</td>
                <td className="p-3 font-medium text-emerald-900">Construye sobre las ideas del compañero y respeta los turnos con empatía.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Classroom Resources / 12 Free PDFs */}
      <div className="wood-card p-6 sm:p-8 bg-sky-50/50 border-2 border-sky-300 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🖨️</span>
            <div>
              <h3 className="font-fun text-lg font-bold text-slate-800">
                Materiales Imprimibles para el Salón de Clases
              </h3>
              <p className="text-xs text-slate-600">
                12 PDFs diseñados con alto contraste para fotocopiadora escolar en blanco y negro o color.
              </p>
            </div>
          </div>

          <Link
            href="/descargas"
            className="wood-btn bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Centro de Descargas (12 PDFs)</span>
          </Link>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          href="/desenchufado"
          className="wood-btn bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs w-full sm:w-auto text-center"
        >
          ✂️ Ver Actividades Sin Pantalla
        </Link>
        <Link
          href="/reloj"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs w-full sm:w-auto text-center"
        >
          ⏳ Abrir el Reloj de la Sala
        </Link>
      </div>

    </div>
  );
}
