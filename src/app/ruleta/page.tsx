import FamilyRoulette from "@/components/FamilyRoulette";
import { Dice5, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Ruleta Familiar de Retos Desconectados | Código en Familia",
  description: "Gira la ruleta física en la mesa o pantalla para jugar retos de 10 minutos sin dispositivos: robots humanos, bucles de baile y código binario con linternas.",
};

export default function RuletaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10 overflow-x-hidden">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-300">
          <Dice5 className="w-4 h-4 text-purple-600" />
          Retos Físicos de 10 Minutos para la Sala y la Mesa
        </div>
        <h1 className="font-fun text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 break-words">
          La Ruleta de Retos Familiares
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          ¿Tienen 10 minutos libres después de almorzar o el fin de semana? Giren la ruleta y disfruten de un juego corporal para reírse juntos y ejercitar el pensamiento lógico.
        </p>
      </div>

      {/* Main Roulette Component */}
      <div className="py-2 sm:py-6">
        <FamilyRoulette />
      </div>

      {/* Tips for adults */}
      <div className="wood-card bg-amber-50/70 p-5 sm:p-8 border-2 border-amber-200 max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <h3 className="font-fun text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-amber-700" />
          Consejos para jugar los retos en familia:
        </h3>
        <ul className="text-xs sm:text-sm text-amber-900 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>El humor es clave:</strong> Si el niño da una instrucción imprecisa, exagera el error de forma divertida para que descubra la importancia de la precisión.</li>
          <li><strong>Intercambien roles:</strong> Primero el adulto es el robot y el niño el programador; luego cambien para que el niño experimente obedecer instrucciones literales.</li>
          <li><strong>Sin prisas:</strong> No hay cronómetro que cause estrés. La meta es la conexión familiar y el asombro.</li>
        </ul>
      </div>

    </div>
  );
}
