import { ShieldCheck, Heart, Lock, CheckCircle2, UserCheck, EyeOff, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad y Protección de Datos | Código en Familia",
  description: "Declaración legal y ética de privacidad: no recopilamos ni vendemos datos personales. Proyecto educativo libre, abierto y 100% gratuito.",
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Compromiso Total con la Privacidad Familiar
        </div>
        <h1 className="font-fun text-3xl sm:text-5xl font-extrabold text-slate-800">
          Política de Privacidad y Tratamiento de Datos
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          En <strong>Código en Familia</strong> creemos firmemente que la educación debe ser un espacio seguro, protegido y libre de intereses comerciales. Esta política explica de forma clara y con validez jurídica cómo protegemos a las familias y a los niños.
        </p>
      </div>

      {/* Highlight Box */}
      <div className="wood-card p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-300 space-y-3">
        <h3 className="font-fun text-base font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Resumen en Lenguaje Claro:
        </h3>
        <ul className="text-xs sm:text-sm text-emerald-900 space-y-1.5 list-disc list-inside">
          <li><strong>No recopilamos ni almacenamos datos personales</strong> de ninguna persona ni de ningún niño.</li>
          <li><strong>No vendemos ni comercializamos información</strong> bajo ninguna circunstancia.</li>
          <li><strong>No usamos cookies de rastreo ni publicidad</strong> de terceros.</li>
          <li>Es un <strong>proyecto libre, de acceso abierto y 100% gratuito</strong> para el beneficio de la comunidad.</li>
        </ul>
      </div>

      {/* Structured Legal Sections */}
      <div className="wood-card p-8 bg-white space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed border-2 border-slate-200">
        
        {/* Sección 1 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">1</span>
            Identidad del Proyecto y Gratuidad
          </h2>
          <p>
            <strong>Código en Familia</strong> es una plataforma de divulgación científica y pensamiento computacional desarrollada como una iniciativa de impacto social y educativo por <strong>Jhon Jairo Cruz Jiménez</strong>. El acceso a todo el contenido, incluyendo las 84 misiones, herramientas interactivas, simuladores y cuadernos en formato PDF, es y será siempre <strong>completamente gratuito</strong>, sin suscripciones, muros de pago ni cargos ocultos.
          </p>
        </section>

        {/* Sección 2 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
            Principio Fundamental: No Tratamiento de Datos Personales
          </h2>
          <p>
            En cumplimiento de la legislación aplicable en materia de protección de datos personales (incluyendo la <strong>Ley Estatutaria 1581 de 2012</strong> y el <strong>Decreto 1377 de 2013</strong> de la República de Colombia, así como estándares internacionales como el Reglamento General de Protección de Datos —GDPR— y la Ley de Protección de la Privacidad Infantil en Línea —COPPA—):
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>No solicitamos nombres completos, números de cédula ni documentos de identidad.</li>
            <li>No requerimos números telefónicos, direcciones de residencia ni datos de geolocalización.</li>
            <li>No almacenamos datos bancarios, tarjetas de crédito ni ningún medio de pago.</li>
            <li>No realizamos elaboración de perfiles comerciales ni análisis de comportamiento para publicidad.</li>
          </ul>
        </section>

        {/* Sección 3 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-bold">3</span>
            Modo Invitado (Almacenamiento Local Exclusivo)
          </h2>
          <p>
            Por defecto, la plataforma funciona en <strong>Modo Invitado</strong>. Cuando un niño o familia marca una misión completada o gana un sello, esta información se guarda <em>exclusivamente</em> en el almacenamiento local de su propio navegador web (mediante la tecnología estándar <code>localStorage</code> de su dispositivo).
          </p>
          <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
            🔒 <em>En este modo, los servidores no reciben, no transmiten ni guardan ningún registro de su progreso. Los datos nunca salen de su computador, tablet o celular.</em>
          </p>
        </section>

        {/* Sección 4 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">4</span>
            Cuenta Familiar Opcional (Sincronización Mínima)
          </h2>
          <p>
            Para las familias que voluntariamente deseen sincronizar sus sellos entre diferentes dispositivos (por ejemplo, entre el teléfono móvil y el computador de mesa), se ofrece un registro opcional con los siguientes parámetros estrictos:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Seudónimo familiar:</strong> Puede ser cualquier nombre ficticio o apodo (ej. «Familia Aventurera»).</li>
            <li><strong>Alias del niño(a):</strong> Un apodo o nombre de pila sin apellidos para identificar el nivel.</li>
            <li><strong>Contraseña:</strong> Se almacena utilizando algoritmos de cifrado criptográfico unidireccional (bcrypt con sal aleatoria). Nadie, ni siquiera los administradores, tiene acceso a su contraseña en texto plano.</li>
          </ul>
        </section>

        {/* Sección 5 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold">5</span>
            Protección Especial de Menores de Edad
          </h2>
          <p>
            Reconocemos el estatus constitucional de especial protección de los derechos fundamentales de los niños, niñas y adolescentes. <strong>Código en Familia jamás recopilará datos biométricos, fotografías, grabaciones de voz ni hábitos de consumo de los menores.</strong>
          </p>
        </section>

        {/* Sección 6 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">6</span>
            Ausencia de Publicidad, Rastreadores y Cookies de Terceros
          </h2>
          <p>
            Este sitio web no contiene anuncios publicitarios de ninguna red publicitaria (Google AdSense, Meta Ads u otras). No utilizamos píxeles espía ni scripts de seguimiento entre sitios. Los sonidos interactivos se sintetizan localmente en tiempo real mediante la biblioteca nativa <em>Web Audio API</em> de su navegador, sin descargar archivos externos con rastreadores.
          </p>
        </section>

        {/* Sección 7 */}
        <section className="space-y-2">
          <h2 className="font-fun text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">7</span>
            Derecho de Supresión (Habeas Data)
          </h2>
          <p>
            Usted tiene el control absoluto sobre sus datos en todo momento:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>En Modo Invitado:</strong> Puede eliminar todo su progreso en cualquier momento simplemente borrando los datos de navegación o cookies de su explorador.</li>
            <li><strong>En Cuenta Familiar:</strong> Puede solicitar la eliminación inmediata e irreversible de su usuario y sellos asociados sin necesidad de justificación alguna.</li>
          </ul>
        </section>

        {/* Sección 8 */}
        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="font-fun text-lg font-bold text-slate-900">
            Responsable del Proyecto y Contacto
          </h2>
          <p>
            Para cualquier consulta, inquietud o sugerencia relativa a la presente política de privacidad o a los contenidos pedagógicos, puede dirigirse al autor y responsable del proyecto:
          </p>
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-xs space-y-1">
            <p><strong>Responsable:</strong> Jhon Jairo Cruz Jiménez</p>
            <p><strong>Iniciativa:</strong> Código en Familia</p>
            <p><strong>Naturaleza:</strong> Proyecto de acceso abierto, sin fines de lucro y con fines estrictamente educativos y formativos.</p>
            <p className="text-slate-500 pt-1">Última actualización: Octubre de 2026.</p>
          </div>
        </section>

      </div>

    </div>
  );
}
