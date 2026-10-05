import NarratorButton from "@/components/NarratorButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import ProjectActivityAnimation from "@/components/ProjectActivityAnimation";
import { ArrowLeft, Lightbulb, Sparkles, HeartHandshake, CheckCircle2, Compass } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) return { title: "Proyecto no encontrado | Código en Familia" };

  return {
    title: `${project.title} — Proyecto en Familia | Código en Familia`,
    description: project.description,
  };
}

const ICONS: Record<string, string> = {
  "cuento-interactivo": "📚",
  "estacion-del-clima": "🌦️",
  "juego-de-mesa-digital": "🎲",
  "mascota-virtual": "🐶",
  "pagina-de-la-familia": "🏡",
  "quiz-familiar": "❓",
  "recetario-digital": "🍲",
  "tarjeta-animada": "🎂",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const icon = ICONS[project.id] || "💡";

  // Parse markdown body sections
  const body = project.body;

  const extractSection = (titleRegex: RegExp) => {
    const match = body.match(titleRegex);
    return match ? match[1].trim() : "";
  };

  const ideaText = extractSection(/## 💡 La idea\n([\s\S]*?)(?=\n## |$)/);
  const whatYouUseText = extractSection(/## 🧩 Qué vas a usar\n([\s\S]*?)(?=\n## |$)/);
  const howToStartText = extractSection(/## 👣 Cómo empezar\n([\s\S]*?)(?=\n## |$)/);
  const goFurtherText = extractSection(/## 🚀 Para ir más allá\n([\s\S]*?)(?=\n← |$)/);

  // Extract metadata line: **Edades:** ... · **Herramienta:** ...
  const metaMatch = body.match(/\*\*Edades:\*\*\s*([^\n·]+)·\s*\*\*Herramienta:\*\*\s*([^\n]+)/);
  const ages = metaMatch ? metaMatch[1].trim() : "Para toda la familia";
  const tools = metaMatch ? metaMatch[2].trim() : "Scratch, Python o Web";

  const renderBulletList = (text: string) => {
    return text
      .split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .map((line, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{line.replace(/^- /, "")}</span>
        </li>
      ));
  };

  const renderNumberedList = (text: string) => {
    return text
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\./))
      .map((line, idx) => {
        const cleaned = line.replace(/^\d+\.\s*/, "");
        return (
          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
              {idx + 1}
            </span>
            <span className="leading-relaxed">{cleaned}</span>
          </li>
        );
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back button */}
      <Link
        href="/proyectos"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-amber-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Proyectos en Familia
      </Link>

      {/* Hero Header */}
      <div className="wood-card p-6 sm:p-8 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/20 border-2 border-amber-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl sm:text-5xl shadow-sm shrink-0">
            {icon}
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-700" /> Proyecto de Creación en Familia
            </div>
            <h1 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {project.description}
            </p>
            <div className="pt-1">
              <NarratorButton
                title={project.title}
                text={`${project.description}. ${whatYouUseText || ""}. ${howToStartText || ""}`}
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                🎯 {ages}
              </span>
              <span className="bg-amber-100/70 text-amber-900 px-2.5 py-1 rounded-lg font-medium">
                🛠️ {tools}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Animation Demo */}
      <ProjectActivityAnimation projectId={project.id} />

      {/* Main Content Sections */}
      <div className="space-y-6">
        
        {/* La Idea */}
        {ideaText && (
          <div className="wood-card p-6 bg-white border-2 border-amber-100 space-y-3">
            <h2 className="font-fun text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>💡</span> La Idea Central
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {ideaText}
            </p>
          </div>
        )}

        {/* Qué vas a usar */}
        {whatYouUseText && (
          <div className="wood-card p-6 bg-white border-2 border-amber-100 space-y-4">
            <h2 className="font-fun text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🧩</span> Conceptos y Herramientas que vas a Usar
            </h2>
            <ul className="space-y-2.5">
              {renderBulletList(whatYouUseText)}
            </ul>
          </div>
        )}

        {/* Cómo empezar paso a paso */}
        {howToStartText && (
          <div className="wood-card p-6 bg-amber-50/50 border-2 border-amber-200/90 space-y-4">
            <h2 className="font-fun text-lg sm:text-xl font-bold text-amber-950 flex items-center gap-2">
              <span>👣</span> Cómo Empezar (Paso a Paso)
            </h2>
            <ul className="space-y-3">
              {renderNumberedList(howToStartText)}
            </ul>
          </div>
        )}

        {/* Para ir más allá */}
        {goFurtherText && (
          <div className="wood-card p-6 bg-purple-50/40 border-2 border-purple-200/80 space-y-4">
            <h2 className="font-fun text-lg sm:text-xl font-bold text-purple-950 flex items-center gap-2">
              <span>🚀</span> Para Ir Más Allá (Ideas Creativas)
            </h2>
            <ul className="space-y-2.5">
              {renderBulletList(goFurtherText)}
            </ul>
          </div>
        )}

        {/* Guía para la familia */}
        <div className="wood-card p-6 bg-emerald-50/40 border-2 border-emerald-200/80 space-y-3">
          <h3 className="font-fun text-base font-bold text-emerald-950 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-700" />
            Consejo para la Familia
          </h3>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            No busquen la perfección en la primera tarde: comiencen con la versión más pequeña y divertida que funcione. Celebren cada pequeño avance y dejen que el niño tome las decisiones de diseño.
          </p>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/proyectos"
          className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Ver otros proyectos
        </Link>
        <Link
          href="/misiones"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-5 py-2.5 text-xs sm:text-sm"
        >
          Explorar las 84 Misiones
        </Link>
      </div>

    </div>
  );
}
