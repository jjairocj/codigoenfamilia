import { notFound } from "next/navigation";
import Link from "next/link";
import conceptsData from "@/data/concepts.json";
import missionsData from "@/data/missions.json";
import type { Metadata } from "next";
import { BookOpen, Compass, ArrowLeft, ArrowRight, Star, HeartHandshake, CheckCircle2 } from "lucide-react";

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
    title: `${concept.title} — Conceptos de Programación`,
    description: concept.description,
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
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
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

      {/* Main Concept Header */}
      <div className="wood-card p-6 sm:p-8 bg-gradient-to-br from-teal-50 via-white to-emerald-50 border-2 border-teal-200 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
          Concepto Clave
        </div>

        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          {concept.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
          {concept.description}
        </p>
      </div>

      {/* Concept Body Explanation */}
      <div className="wood-card p-6 sm:p-8 bg-white border-2 border-slate-200/80 space-y-6">
        <h2 className="font-fun text-xl font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
          <span>📖 Explicación Didáctica para la Familia</span>
        </h2>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-sans">
          {concept.body
            .replace(/^>\s*/gm, "")
            .replace(/\{[^\}]+\}/g, "")
            .replace(/⬅️.*$/gm, "")
            .trim()}
        </div>
      </div>

      {/* Related Missions Section */}
      {relatedMissions.length > 0 && (
        <div className="wood-card p-6 sm:p-8 bg-amber-50/50 border-2 border-amber-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-fun text-xl font-bold text-slate-800 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>Misiones donde practicamos este concepto ({relatedMissions.length})</span>
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Aprende {concept.title.toLowerCase()} tocando con las manos y creando en estas misiones guiadas:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {relatedMissions.slice(0, 6).map((m) => (
              <Link
                key={m.id}
                href={`/misiones/${m.id}`}
                className="p-3.5 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-[10px] font-bold font-fun text-amber-800 uppercase tracking-wider">
                    {m.code} · Nivel {m.level}
                  </div>
                  <div className="font-fun text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {m.title.replace(/^[A-Z0-9]+ · /, "")}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Between Concepts */}
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3 pt-4">
        {prevConcept ? (
          <Link
            href={`/conceptos/${prevConcept.id}`}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 text-xs py-3 px-4 border-2 border-slate-200 flex items-center gap-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior: {prevConcept.title}</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/conceptos"
          className="wood-btn bg-teal-100 hover:bg-teal-200 text-teal-950 text-xs py-3 px-4 font-bold text-center"
        >
          Ver Todos los Conceptos
        </Link>

        {nextConcept ? (
          <Link
            href={`/conceptos/${nextConcept.id}`}
            className="wood-btn bg-white hover:bg-slate-50 text-slate-700 text-xs py-3 px-4 border-2 border-slate-200 flex items-center justify-end gap-2 font-bold"
          >
            <span>Siguiente: {nextConcept.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
