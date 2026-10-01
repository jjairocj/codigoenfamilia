import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Bot,
  Award,
  Dice5,
  Sparkles,
  Download,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16 sm:pb-20 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-4 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 max-w-full text-center flex-wrap px-3 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-[11px] sm:text-xs font-bold shadow-2xs">
              <span className="text-sm">🌱</span>
              <span className="break-words">Educación Abierta & Gratuita</span>
              <span className="text-emerald-400 hidden sm:inline">·</span>
              <span className="text-emerald-700 hidden sm:inline">Programación en Familia</span>
            </div>

            <h1 className="font-fun text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.18] break-words">
              Aprende a programar{" "}
              <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
                jugando en familia
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Un viaje de pensamiento computacional de <strong>4 a 15 años</strong>. Sin pantallas o con herramientas libres: 84 misiones diseñadas para estimular la curiosidad, la autonomía y el descubrimiento sin frustración.
            </p>

            {/* Quick Actions (Full width on mobile, inline on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/misiones"
                className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 px-6 py-3.5 text-sm sm:text-base font-bold shadow-md hover:scale-102 transition-transform text-center"
              >
                <Compass className="w-5 h-5 text-amber-950" />
                Explorar las 84 Misiones
              </Link>
              <Link
                href="/robot"
                className="wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 px-5 py-3.5 text-sm sm:text-base font-bold shadow-md hover:scale-102 transition-transform text-center"
              >
                <Bot className="w-5 h-5 text-emerald-950" />
                Jugar con Robot Boty
              </Link>
              <Link
                href="/pasaporte"
                className="wood-btn bg-sky-200 hover:bg-sky-300 text-sky-900 px-5 py-3.5 text-sm sm:text-base font-bold shadow-xs hover:scale-102 transition-transform text-center"
              >
                <Award className="w-5 h-5 text-sky-800" />
                Mi Pasaporte
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                100% Gratuito y Libre
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Sin anuncios ni rastreo
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Modo invitado en tu celular
              </div>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative pastel glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 via-rose-200 to-sky-200 rounded-3xl opacity-70 blur-xs" />
              
              {/* Wooden framed card with hero photo */}
              <div className="relative wood-card p-2.5 sm:p-3 bg-white border-4 border-amber-100 rounded-3xl shadow-xl">
                <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/codigo-en-familia-hero.jpg"
                    alt="Familia aprendiendo a programar con bloques y juegos de mesa"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle soft vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Dedicated Quote Banner with full breathing room and zero overlap */}
                <div className="mt-3 px-3.5 py-2.5 bg-amber-50/90 rounded-xl border border-amber-200/80 flex items-center justify-center text-center shadow-xs">
                  <p className="text-xs sm:text-[13px] font-semibold text-amber-950 font-fun tracking-tight">
                    ✨ «Primero tocamos con las manos, luego pensamos con la mente.»
                  </p>
                </div>

                {/* Floating badge 1 (Top Left) */}
                <div className="absolute top-3 sm:top-5 left-1 sm:-left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl border-2 border-emerald-300 shadow-md flex items-center gap-2 animate-soft-bounce z-20">
                  <span className="text-base sm:text-lg">⭐</span>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 font-fun">84 Misiones</div>
                    <div className="text-[9px] text-slate-500">Con guía para adultos</div>
                  </div>
                </div>

                {/* Floating badge 2 (Middle Right - no overlap with quote) */}
                <div className="absolute top-24 sm:top-32 right-1 sm:-right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl border-2 border-sky-300 shadow-md flex items-center gap-2 z-20 shadow-lg">
                  <span className="text-base sm:text-lg">🖨️</span>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 font-fun">12 Guías PDF</div>
                    <div className="text-[9px] text-slate-500">Imprimibles listos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 DEVELOPMENTAL LEVELS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
          <span className="text-xs font-bold font-fun px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Rutas Adaptadas a la Infancia
          </span>
          <h2 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-800">
            Los 4 Niveles de Autonomía y Descubrimiento
          </h2>
          <p className="text-xs sm:text-base text-slate-600">
            El niño no necesita cumplir un currículo rígido. Selecciona el nivel que mejor se adapte a su etapa y avancen jugando a su propio ritmo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Nivel 1: Semillas */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-b from-white to-emerald-50/50 border-2 border-emerald-200 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl sm:text-2xl border border-emerald-300">
                  🌱
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  4 – 6 años
                </span>
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Semillas
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Actividades en la alfombra, recetas de cocina, laberintos con cintas y juegos desconectados.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pt-1 border-t border-emerald-100">
                <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 16 misiones desconectadas</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> Pasaporte de huellas</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> 100% sin pantallas</li>
              </ul>
            </div>
            <Link
              href="/misiones?nivel=semillas"
              className="wood-btn bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs mt-5 w-full font-bold"
            >
              Ver Misiones Semillas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Nivel 2: Exploradores */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-b from-white to-sky-50/50 border-2 border-sky-200 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl sm:text-2xl border border-sky-300">
                  🧭
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                  7 – 9 años
                </span>
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                  Exploradores
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Primeros algoritmos con ScratchJr y Scratch: personajes animados, bucles, música y arte en píxeles.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pt-1 border-t border-sky-100">
                <li className="flex items-center gap-1.5"><span className="text-sky-500 font-bold">✓</span> 24 misiones interactivas</li>
                <li className="flex items-center gap-1.5"><span className="text-sky-500 font-bold">✓</span> Bloques visuales táctiles</li>
                <li className="flex items-center gap-1.5"><span className="text-sky-500 font-bold">✓</span> Cuentos y animaciones</li>
              </ul>
            </div>
            <Link
              href="/misiones?nivel=exploradores"
              className="wood-btn bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs mt-5 w-full font-bold"
            >
              Ver Misiones Exploradores <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Nivel 3: Inventores */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-b from-white to-purple-50/50 border-2 border-purple-200 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl sm:text-2xl border border-purple-300">
                  🔬
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                  10 – 12 años
                </span>
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                  Inventores
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Lógica condicional (si... entonces), variables de puntaje, mini-juegos mecánicos y depuración avanzada.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pt-1 border-t border-purple-100">
                <li className="flex items-center gap-1.5"><span className="text-purple-500 font-bold">✓</span> 24 misiones de ingenio</li>
                <li className="flex items-center gap-1.5"><span className="text-purple-500 font-bold">✓</span> Videojuegos completos</li>
                <li className="flex items-center gap-1.5"><span className="text-purple-500 font-bold">✓</span> Lógica y depuración</li>
              </ul>
            </div>
            <Link
              href="/misiones?nivel=inventores"
              className="wood-btn bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs mt-5 w-full font-bold"
            >
              Ver Misiones Inventores <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Nivel 4: Creadores */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-b from-white to-amber-50/50 border-2 border-amber-200 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl sm:text-2xl border border-amber-300">
                  🚀
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  13 – 15 años
                </span>
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                  Creadores
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Transición a Python real, proyectos con impacto comunitario, ciudadanía digital y lógica computacional.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pt-1 border-t border-amber-100">
                <li className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">✓</span> 20 misiones avanzadas</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">✓</span> Código en texto (Python)</li>
                <li className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">✓</span> Portafolio de proyectos</li>
              </ul>
            </div>
            <Link
              href="/misiones?nivel=creadores"
              className="wood-btn bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs mt-5 w-full font-bold"
            >
              Ver Misiones Creadores <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* PEDAGOGICAL PILLARS */}
      <section className="bg-amber-50/60 border-y border-amber-900/5 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold font-fun px-3 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
              Pedagogía Activa y Creativa
            </span>
            <h2 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-800">
              Cómo Aprendemos Mejor en Familia
            </h2>
            <p className="text-xs sm:text-base text-slate-600">
              Los niños no aprenden memorizando código frente a una pantalla fría, sino manipulando, experimentando y creando juntos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold">
                🖐️
              </div>
              <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                De lo Concreto a lo Abstracto
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Antes de escribir bucles en una computadora, el niño baila secuencias, sigue recetas en la cocina y camina sobre baldosas.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
                🔄
              </div>
              <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                Control del Error Amable
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No hay notas rojas ni timbres de castigo. Si el robot choca, el material mismo le muestra al niño qué paso revisar con serenidad.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl font-bold">
                🕊️
              </div>
              <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                Autonomía y Elección Libre
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                El niño elige qué misión emprender hoy. Puede saltar entre retos desconectados, el robot virtual o inventar su propio proyecto.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl font-bold">
                👩‍👧
              </div>
              <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800">
                El Adulto como Guía
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada misión incluye una «Caja para el Adulto» con preguntas orientadoras para estimular el diálogo sin quitarle el mouse al niño.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE APPS SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold font-fun px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
            Laboratorio Interactivo
          </span>
          <h2 className="font-fun text-2xl sm:text-4xl font-extrabold text-slate-800">
            Herramientas Digitales Táctiles
          </h2>
          <p className="text-xs sm:text-base text-slate-600">
            Diseñadas con audio suave, botones de madera y retroalimentación inmediata para que los niños experimenten con alegría.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 1: Robot Boty */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-br from-white to-emerald-50/40 border-2 border-emerald-200/80 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl border border-emerald-300">
                🤖
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800">
                  El Robot Boty
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Simulador de cuadrícula 5x5. Programa secuencias de flechas para que Boty esquive obstáculos y recoja estrellas doradas.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 p-2 rounded-xl">
                <span>🔊 Sonidos de madera y aplausos suaves</span>
              </div>
            </div>
            <Link
              href="/robot"
              className="wood-btn bg-emerald-400 hover:bg-emerald-500 text-emerald-950 text-xs sm:text-sm mt-5 font-bold w-full"
            >
              Jugar con el Robot <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Ruleta Familiar */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-br from-white to-purple-50/40 border-2 border-purple-200/80 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl border border-purple-300">
                🎡
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800">
                  Ruleta de Retos Desconectados
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  ¿No saben qué jugar hoy? Giren la ruleta física para recibir un reto de 10 minutos en la sala sin prender ninguna pantalla.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-purple-900 bg-purple-100/70 p-2 rounded-xl">
                <span>✋ Perfecto para después de almorzar o fines de semana</span>
              </div>
            </div>
            <Link
              href="/ruleta"
              className="wood-btn bg-purple-300 hover:bg-purple-400 text-purple-950 text-xs sm:text-sm mt-5 font-bold w-full"
            >
              Girar la Ruleta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Pasaporte & Sellos */}
          <div className="wood-card p-5 sm:p-6 bg-gradient-to-br from-white to-amber-50/40 border-2 border-amber-200/80 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl border border-amber-300">
                🌟
              </div>
              <div>
                <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-800">
                  Pasaporte & Diplomas
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Cada misión cumplida otorga un sello brillante en el pasaporte. Al completar un nivel, descarguen su diploma oficial para imprimir.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-900 bg-amber-100/70 p-2 rounded-xl">
                <span>🖨️ Diplomas imprimibles con nombre personalizado</span>
              </div>
            </div>
            <Link
              href="/pasaporte"
              className="wood-btn bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs sm:text-sm mt-5 font-bold w-full"
            >
              Abrir Pasaporte <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* PRINTABLE MATERIALS CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="wood-card bg-gradient-to-r from-amber-100 via-rose-100 to-sky-100 p-6 sm:p-10 border-2 border-amber-300 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold font-fun px-3 py-1 rounded-full bg-white text-slate-800 shadow-2xs">
              Materiales Físicos para Imprimir
            </span>
            <h2 className="font-fun text-2xl sm:text-3xl font-extrabold text-slate-800">
              12 Cuadernos, Tarjetas y Pasaportes en PDF
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Descarga gratis las guías para padres, las tarjetas con flechas para jugar en el piso, las tarjetas de regalo educativas y los pasaportes para sellar con tinta o stickers en casa.
            </p>
          </div>
          <Link
            href="/descargas"
            className="wood-btn bg-white hover:bg-slate-50 text-slate-900 px-6 py-3.5 text-sm sm:text-base font-bold shadow-md shrink-0 w-full lg:w-auto text-center"
          >
            <Download className="w-5 h-5 text-indigo-600" />
            Descargar todos los PDFs (Gratis)
          </Link>
        </div>
      </section>

    </div>
  );
}
