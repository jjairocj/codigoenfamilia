import NarratorButton from "@/components/NarratorButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import unpluggedData from "@/data/unplugged.json";
import UnpluggedActivityAnimation from "@/components/UnpluggedActivityAnimation";
import type { Metadata } from "next";
import {
  Scissors,
  ArrowLeft,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Users,
  Compass,
  Lightbulb,
  FileText
} from "lucide-react";

export function generateStaticParams() {
  return unpluggedData.map((a) => ({
    id: a.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const activity = unpluggedData.find((a) => a.id === id);

  if (!activity) {
    return {
      title: "Actividad no encontrada | Código en Familia",
    };
  }

  return {
    title: `${activity.title} — Actividad Sin Pantalla | Código en Familia`,
    description: activity.description,
  };
}

/**
 * FormattedText handles markdown bold, italic, code, and links
 */
function FormattedText({ text }: { text: string }) {
  if (!text) return null;
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={index}
              className="font-bold text-slate-900 bg-amber-100/70 px-1 py-0.5 rounded"
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="italic text-slate-800">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 font-mono text-xs border border-amber-200"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, linkText, linkUrl] = linkMatch;
          const isInternal = linkUrl.startsWith("/");
          return isInternal ? (
            <Link
              key={index}
              href={linkUrl}
              className="text-amber-800 font-bold underline underline-offset-2 hover:text-amber-950 transition-colors"
            >
              {linkText}
            </Link>
          ) : (
            <a
              key={index}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 font-bold underline underline-offset-2 hover:text-amber-950 transition-colors"
            >
              {linkText}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

function parseActivityBody(body: string) {
  // Strip top title and clean trailing
  let clean = body
    .replace(/^#\s+[^\n]+\n+/, "")
    .replace(/←\s*\[Actividades sin pantalla\].*$/gm, "")
    .replace(/---\s*\nVarias de estas actividades se inspiran en[\s\S]*$/, "")
    .trim();

  // Extract meta line (**Edades:** ... · **Tiempo:** ...)
  let metaLine = "";
  const metaMatch = clean.match(/^\*\*Edades:\*\*.*$/m);
  if (metaMatch) {
    metaLine = metaMatch[0];
    clean = clean.replace(metaMatch[0], "").trim();
  }

  // Extract sections by ##
  const sections: { title: string; content: string }[] = [];
  const lines = clean.split("\n");
  let currentTitle = "Resumen";
  let buffer: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^##\s+(.+)$/);
    if (headerMatch) {
      if (buffer.length > 0 && buffer.some((l) => l.trim())) {
        sections.push({ title: currentTitle, content: buffer.join("\n").trim() });
        buffer = [];
      }
      currentTitle = headerMatch[1].trim();
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0 && buffer.some((l) => l.trim())) {
    sections.push({ title: currentTitle, content: buffer.join("\n").trim() });
  }

  return { metaLine, sections };
}

export default async function UnpluggedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = unpluggedData.find((a) => a.id === id);

  if (!activity) {
    notFound();
  }

  const { metaLine, sections } = parseActivityBody(activity.body);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
        <Link href="/" className="hover:text-amber-800 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/desenchufado" className="hover:text-amber-800 transition-colors">
          Actividades Sin Pantalla
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">
          {activity.title}
        </span>
      </nav>

      {/* Hero Header */}
      <div className="wood-card p-6 sm:p-8 bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-amber-100/70 border-2 border-amber-300 rounded-3xl space-y-4 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-emerald-700" />
            Dinámica Desenchufada
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 font-bold text-xs border border-amber-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-800" />
            Juego en Familia
          </span>
        </div>

        <h1 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          {activity.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          {activity.description}
        </p>

        <div className="pt-1">
          <NarratorButton
            title={activity.title}
            text={`${activity.description}. ${sections.map((s) => `${s.title}: ${s.content}`).join(". ")}`}
          />
        </div>

        {metaLine && (
          <div className="pt-3 border-t border-amber-200/80 text-xs sm:text-sm text-slate-700 font-semibold flex flex-wrap items-center gap-2">
            <FormattedText text={metaLine} />
          </div>
        )}
      </div>

      {/* Visual Animation Demo */}
      <UnpluggedActivityAnimation activityId={activity.id} />

      {/* Sections Rendering */}
      <div className="space-y-6">
        {sections.map((sec, idx) => {
          const isMaterials = sec.title.includes("Materiales");
          const isIdea = sec.title.includes("idea de computación");
          const isHowTo = sec.title.includes("Cómo se juega");

          return (
            <div
              key={idx}
              className={`wood-card p-6 sm:p-8 rounded-3xl border-2 space-y-4 ${
                isMaterials
                  ? "bg-emerald-50/50 border-emerald-200"
                  : isIdea
                  ? "bg-indigo-50/60 border-indigo-200 shadow-sm"
                  : isHowTo
                  ? "bg-amber-50/40 border-amber-200 shadow-sm"
                  : "bg-white border-amber-100"
              }`}
            >
              <h2 className="font-fun text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2.5">
                {sec.title}
              </h2>

              <div className="space-y-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                {sec.content.split("\n").map((line, lIdx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;

                  // List items (bullets)
                  if (trimmed.startsWith("- ")) {
                    return (
                      <div key={lIdx} className="flex items-start gap-2.5 pl-1">
                        <span className="text-amber-500 font-bold mt-1 text-sm">•</span>
                        <span><FormattedText text={trimmed.slice(2)} /></span>
                      </div>
                    );
                  }

                  // Numbered list items
                  const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
                  if (numMatch) {
                    return (
                      <div key={lIdx} className="flex items-start gap-3 pl-1 py-1">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {numMatch[1]}
                        </span>
                        <div className="pt-0.5"><FormattedText text={numMatch[2]} /></div>
                      </div>
                    );
                  }

                  return (
                    <p key={lIdx} className="leading-relaxed">
                      <FormattedText text={trimmed} />
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <Link
          href="/desenchufado"
          className="wood-btn bg-white hover:bg-slate-100 text-slate-800 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs border border-slate-300 w-full sm:w-auto text-center"
        >
          <ArrowLeft className="w-4 h-4" /> Todas las actividades sin pantalla
        </Link>
        <Link
          href="/descargas"
          className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-2xs w-full sm:w-auto text-center"
        >
          <FileText className="w-4 h-4" /> Descargar materiales imprimibles
        </Link>
      </div>

    </div>
  );
}
