import { Download, FileText, Award, Printer, HeartHandshake, Sparkles } from "lucide-react";

export const metadata = {
  title: "Centro de Descargas Gratuitas en PDF | Código en Familia",
  description: "Descarga 12 cuadernillos, pasaportes físicos de sellos, tarjetas desconectadas para el piso y certificados oficiales de graduación.",
};

const DOWNLOADS = [
  {
    category: "📖 Guías y Materiales de Alfombra",
    color: "border-emerald-300 bg-emerald-50/40",
    items: [
      {
        title: "Guía de Inicio para Adultos Acompañantes",
        desc: "Consejos prácticos para papás, mamás y educadores: cómo usar el método socrático y respetar los tiempos de aprendizaje sin frustración.",
        filename: "guia-de-inicio-para-adultos.pdf",
        tag: "Para Padres",
        pages: "8 págs",
      },
      {
        title: "Materiales y Tarjetas Sin Pantalla",
        desc: "Juego completo de tarjetas de flechas recortables, fichas de depuración y tableros para jugar en el piso de la sala.",
        filename: "materiales-sin-pantalla.pdf",
        tag: "Recortable",
        pages: "12 págs",
      },
      {
        title: "Tarjeta de Regalo Educativa",
        desc: "Hermosa tarjeta para imprimir y regalar a sobrinos, nietos o ahijados para invitarlos a comenzar su aventura de programación.",
        filename: "tarjeta-de-regalo.pdf",
        tag: "Regalo",
        pages: "2 págs",
      },
    ],
  },
  {
    category: "🌟 Pasaportes Físicos de Sellos",
    color: "border-amber-300 bg-amber-50/40",
    items: [
      {
        title: "Pasaporte Nivel Semillas (4–6 años)",
        desc: "Cuadernillo con las 16 misiones de Semillas y casillas para estampar sellos de tinta o pegatinas de estrellas.",
        filename: "pasaporte-semillas.pdf",
        tag: "Nivel 1",
        pages: "4 págs",
      },
      {
        title: "Pasaporte Nivel Exploradores (7–9 años)",
        desc: "Cuadernillo con las 24 misiones de Scratch y algoritmos iniciales con bitácora de descubrimientos.",
        filename: "pasaporte-exploradores.pdf",
        tag: "Nivel 2",
        pages: "6 págs",
      },
      {
        title: "Pasaporte Nivel Inventores (10–12 años)",
        desc: "Cuadernillo para las 24 misiones de lógica, variables, bucles condicionales y pequeños videojuegos.",
        filename: "pasaporte-inventores.pdf",
        tag: "Nivel 3",
        pages: "6 págs",
      },
      {
        title: "Pasaporte Nivel Creadores (13–15 años)",
        desc: "Cuadernillo para las 20 misiones avanzadas de Python, portafolio de proyectos e impacto comunitario.",
        filename: "pasaporte-creadores.pdf",
        tag: "Nivel 4",
        pages: "6 págs",
      },
    ],
  },
  {
    category: "🏆 Diplomas de Graduación",
    color: "border-sky-300 bg-sky-50/40",
    items: [
      {
        title: "Diploma de Graduación · Semillas",
        desc: "Certificado de honor para colgar en la pared tras completar las 16 misiones desconectadas.",
        filename: "certificado-semillas.pdf",
        tag: "Diploma",
        pages: "1 pág",
      },
      {
        title: "Diploma de Graduación · Exploradores",
        desc: "Certificado para celebrar el dominio de Scratch y algoritmos creativos.",
        filename: "certificado-exploradores.pdf",
        tag: "Diploma",
        pages: "1 pág",
      },
      {
        title: "Diploma de Graduación · Inventores",
        desc: "Certificado de ingenio lógico para reconocer el pensamiento sistemático.",
        filename: "certificado-inventores.pdf",
        tag: "Diploma",
        pages: "1 pág",
      },
      {
        title: "Diploma de Graduación · Creadores",
        desc: "Certificado de madurez en programación y creación de software con propósito.",
        filename: "certificado-creadores.pdf",
        tag: "Diploma",
        pages: "1 pág",
      },
      {
        title: "Gran Certificado de Maestría Completa",
        desc: "Diploma de honor máximo para la familia tras completar las 84 misiones del programa.",
        filename: "certificado-programa-completo.pdf",
        tag: "Gran Diploma",
        pages: "1 pág",
      },
    ],
  },
];

export default function DescargasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300">
          <Printer className="w-4 h-4 text-blue-600" />
          Recursos Imprimibles 100% Libres y Gratuitos
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          Centro de Descargas en PDF
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Materiales listos para imprimir en casa o en la escuela en tamaño carta estándar. Diseñados con tipografía amigable y bajo consumo de tinta.
        </p>
      </div>

      {/* Grid of categories */}
      <div className="space-y-10">
        {DOWNLOADS.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h2 className="font-fun text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>{section.category}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className={`wood-card p-5 border-2 ${section.color} flex flex-col justify-between group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-800 border border-slate-200">
                        {item.tag}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {item.pages}
                      </span>
                    </div>

                    <h3 className="font-fun text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <a
                    href={`/downloads/${item.filename}`}
                    download
                    className="wood-btn bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold py-2.5 px-4 mt-5 border-2 border-slate-200 flex items-center justify-center gap-2 shadow-2xs group-hover:border-indigo-400 group-hover:text-indigo-600"
                  >
                    <Download className="w-4 h-4 text-indigo-500" />
                    Descargar PDF Gratis
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Printing tip */}
      <div className="wood-card bg-amber-50 p-6 border-2 border-amber-200 max-w-3xl mx-auto flex items-start gap-4">
        <div className="text-3xl">🖨️</div>
        <div className="space-y-1">
          <h4 className="font-fun text-sm font-bold text-slate-800">
            Recomendación para imprimir en familia
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Puedes imprimir los pasaportes en papel común de oficina o en cartulina opalina si deseas mayor resistencia. Si no tienes impresora, los niños pueden dibujar sus propias tarjetas de flechas en recortes de cartón reciclado: ¡es una excelente actividad de motricidad fina!
          </p>
        </div>
      </div>

    </div>
  );
}
