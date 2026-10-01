import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glosario y Conceptos Fundamentales de Informática",
  description:
    "Diccionario didáctico de ciencias de la computación explicado de forma sencilla para niños y familias: algoritmos, bucles, condicionales, variables, funciones, depuración y redes.",
  keywords: [
    "glosario programación niños",
    "conceptos informática básica",
    "qué es un algoritmo",
    "qué es un bucle",
    "programación explicada para niños",
  ],
  openGraph: {
    title: "Glosario de Ciencias de la Computación | Código en Familia",
    description:
      "Aprende qué es un algoritmo, un bucle y una variable con ejemplos cotidianos y metáforas del hogar.",
    url: "/conceptos",
    type: "website",
  },
  alternates: {
    canonical: "/conceptos",
  },
};

export default function ConceptosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
