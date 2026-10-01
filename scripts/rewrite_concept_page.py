content = r'''import { notFound } from "next/navigation";
import Link from "next/link";
import conceptsData from "@/data/concepts.json";
import missionsData from "@/data/missions.json";
import type { Metadata } from "next";
import {
  BookOpen, Compass, ArrowLeft, ArrowRight, HeartHandshake,
  Sparkles, Layers, Lightbulb, Home, ChevronRight
} from "lucide-react";

export function generateStaticParams() {
  return conceptsData.map((c) => ({
    id: c.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const concept = conceptsData.find((c) => c.id === id);

  if (!concept) {
    return {
      title: "Concepto no encontrado | Código en Familia",
    };
  }

  return {
    title: `${concept.title} — Conceptos de Pensamiento Computacional`,
    description: concept.description,
  };
}

/**
 * Formats inline markdown tokens: bold, italic, code, and links
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
              className="font-bold text-slate-900 bg-amber-100/60 px-1 py-0.5 rounded"
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
              className="text-teal-700 font-bold underline underline-offset-2 hover:text-teal-900 transition-colors"
            >
              {linkText}
            </Link>
          ) : (
            <a
              key={index}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 font-bold underline underline-offset-2 hover:text-teal-900 transition-colors"
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

/**
 * Parses raw concept markdown body into rich structured data
 */
function parseConceptBody(body: string) {
  // Strip top title and trailing wiki tags
  let clean = body
    .replace(/^#\s+[^\n]+\n+/, "")
    .replace(/\{\.is-[a-z]+\}/g, "")
    .replace(/\{is-[a-z]+\}/g, "")
    .replace(/⬅️.*$/gm, "")
    .trim();

  // Extract adult blockquote
  let adultNote = "";
  const adultMatch = clean.match(/>\s*👩‍👧\s*\*\*Para el adulto\*\*([\s\S]*?)(?=(?:\n##|\n---|$))/);
  if (adultMatch) {
    adultNote = adultMatch[1]
      .replace(/^>\s*/gm, "")
      .replace(/\{\.is-[a-z]+\}/g, "")
      .trim();
    clean = clean.replace(adultMatch[0], "");
  }

  // Extract sections split by ##
  const sections: Record<string, string> = {};
  let currentKey = "intro";
  const buffer: string[] = [];

  for (const line of clean.split("\n")) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (buffer.length > 0) {
        sections[currentKey] = buffer.join("\n").trim();
        buffer.length = 0;
      }
      currentKey = match[1].trim();
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    sections[currentKey] = buffer.join("\n").trim();
  }

  // Extract level progression from markdown table in '🪜 Cómo aparece en cada nivel'
  const levelTable: { level: string; desc: string }[] = [];
  const rawTable = sections["🪜 Cómo aparece en cada nivel"] || "";
  for (const line of rawTable.split("\n")) {
    if (line.includes("|") && !line.includes("---") && !line.includes("Cómo se")) {
      const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        levelTable.push({ level: parts[0], desc: parts[1] });
      }
    }
  }

  // Extract related concepts
  const relatedRaw = sections["🔗 Relacionado"] || "";
  const relatedLinks: { title: string; href: string }[] = [];
  const relRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let relMatch;
  while ((relMatch = relRegex.exec(relatedRaw)) !== null) {
    relatedLinks.push({ title: relMatch[1], href: relMatch[2] });
  }

  return {
    kids: sections["🧒 Para niños"] || "",
    daily: sections["🏠 En la vida diaria"] || "",
    adult: adultNote,
    levels: levelTable,
    related: relatedLinks,
  };
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = conceptsData.findIndex((c) => c.id === id);

  if (index === -1) {
    notFound();
  }

  const concept = conceptsData[index];
  const prevConcept = index > 0 ? conceptsData[index - 1] : null;
  const nextConcept =
    index < conceptsData.length - 1 ? conceptsData[index + 1] : null;

  const parsed = parseConceptBody(concept.body);

  // Find missions that use this concept
  const relatedMissions = missionsData.filter((m) => {
    const tagMatch = m.tags.some(
      (t) =>
        t.includes(concept.id) ||
        t.replace("concepto-", "") === concept.id
    );
    const bodyMatch =
      m.body.toLowerCase().includes(`/conceptos/${concept.id}`) ||
      (m.adultBox && m.adultBox.toLowerCase().includes(`/conceptos/${concept.id}`));
    return tagMatch || bodyMatch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-teal-700 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/conceptos" className="hover:text-teal-700 transition-colors">
          Conceptos
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">{concept.title}</span>
      </nav>

      {/* Main Hero Header Card */}
      <div className="wood-card p-6 sm:p-9 bg-gradient-to-br from-teal-50 via-white to-emerald-50 border-2 border-teal-300 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-fun text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            Concepto Clave
          </span>
          <span className="text-xs font-bold text-slate-500">
            {relatedMissions.length} misiones asociadas
          </span>
        </div>

        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {concept.title}
        </h1>

        <p className="text-sm sm:text-lg text-slate-700 leading-relaxed font-medium max-w-3xl">
          {concept.description}
        </p>
      </div>

      {/* Grid: Left: Kids explanation & Everyday analogy | Right: Adult companion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column (Children & Daily Life) */}
        <div className="lg:col-span-7 space-y-6">

          {/* 1. EXPLICACIÓN PARA NIÑOS */}
          {parsed.kids && (
            <div className="wood-card p-6 sm:p-7 bg-white border-2 border-teal-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-teal-100">
                <span className="text-2xl">🧒</span>
                <h2 className="font-fun text-base sm:text-lg font-bold text-slate-900">
                  Explicación para Niños
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                {parsed.kids.split("\n\n").map((para, i) => (
                  <p key={i}>
                    <FormattedText text={para} />
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 2. EN LA VIDA DIARIA (ANALOGÍA) */}
          {parsed.daily && (
            <div className="wood-card p-6 sm:p-7 bg-gradient-to-br from-amber-50 to-orange-50/40 border-2 border-amber-300 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                <span className="text-2xl">🏠</span>
                <h2 className="font-fun text-base sm:text-lg font-bold text-amber-950">
                  ¿Dónde lo vemos en el día a día?
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 font-medium">
                {parsed.daily.split("\n\n").map((para, i) => (
                  <p key={i}>
                    <FormattedText text={para} />
                  </p>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Adult Companion Guide) */}
        <div className="lg:col-span-5 space-y-6">
          
          {parsed.adult ? (
            <div className="wood-card p-6 sm:p-7 bg-purple-50/90 border-2 border-purple-300 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-purple-200">
                <HeartHandshake className="w-5 h-5 text-purple-700" />
                <h3 className="font-fun text-sm sm:text-base font-bold text-purple-950">
                  Guía para el Adulto Acompañante
                </h3>
              </div>
              <p className="text-[11px] text-purple-800 font-semibold">
                Cómo acompañar al niño y profundizar en la tecnología:
              </p>
              <div className="text-xs text-purple-950 leading-relaxed space-y-2">
                {parsed.adult.split("\n\n").map((para, i) => (
                  <p key={i}>
                    <FormattedText text={para} />
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {/* Related Concepts Pills */}
          {parsed.related.length > 0 && (
            <div className="wood-card p-5 bg-white border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Conceptos Relacionados</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {parsed.related.map((rel, i) => (
                  <Link
                    key={i}
                    href={rel.href}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 transition-colors"
                  >
                    {rel.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 3. CÓMO SE TRABAJA EN CADA NIVEL (Progression Grid) */}
      {parsed.levels.length > 0 && (
        <div className="wood-card p-6 sm:p-8 bg-white border-2 border-slate-200 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Layers className="w-5 h-5 text-teal-600" />
            <h2 className="font-fun text-base sm:text-lg font-bold text-slate-900">
              Cómo evoluciona este concepto según la edad
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {parsed.levels.map((row, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:bg-teal-50/50 transition-colors"
              >
                <div className="text-xs font-bold font-fun text-teal-900">
                  <FormattedText text={row.level} />
                </div>
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  <FormattedText text={row.desc} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MISIONES DONDE SE APLICA ESTE CONCEPTO */}
      {relatedMissions.length > 0 && (
        <div className="wood-card p-6 sm:p-8 bg-gradient-to-br from-amber-50/70 to-yellow-50/40 border-2 border-amber-300 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-700" />
              <h2 className="font-fun text-base sm:text-lg font-bold text-amber-950">
                Misiones Prácticas de este Concepto ({relatedMissions.length})
              </h2>
            </div>
            <Link
              href="/misiones"
              className="text-xs font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2"
            >
              Ver todas las 84 misiones
            </Link>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            ¡La mejor forma de entender {concept.title.toLowerCase()} es aplicarlo! Resuelve estos desafíos:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {relatedMissions.map((m) => (
              <Link
                key={m.id}
                href={`/misiones/${m.id}`}
                className="p-4 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-bold font-fun text-amber-800 uppercase tracking-wider">
                    {m.code} · Nivel {m.level}
                  </div>
                  <div className="font-fun text-sm font-bold text-slate-800 group-hover:text-amber-800 transition-colors">
                    {m.title.replace(/^[A-Z0-9]+ · /, "")}
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-800">
                  <span>Abrir misión</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation: Previous / Next Concept */}
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3 pt-4">
        {prevConcept ? (
          <Link
            href={`/conceptos/${prevConcept.id}`}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 text-xs py-3 px-4 border-2 border-slate-200 flex items-center gap-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Anterior: {prevConcept.title}</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/conceptos"
          className="wood-btn bg-teal-100 hover:bg-teal-200 text-teal-950 text-xs py-3 px-5 font-bold text-center"
        >
          📚 Ver Todos los 29 Conceptos
        </Link>

        {nextConcept ? (
          <Link
            href={`/conceptos/${nextConcept.id}`}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 text-xs py-3 px-4 border-2 border-slate-200 flex items-center justify-end gap-2 font-bold"
          >
            <span>Siguiente: {nextConcept.title}</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
'''

with open('src/app/conceptos/[id]/page.tsx', 'w') as f:
    f.write(content)

print('Cleanly rewrote src/app/conceptos/[id]/page.tsx with raw string literal!')
