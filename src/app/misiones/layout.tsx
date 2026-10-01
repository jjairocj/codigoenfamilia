import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "84 Misiones de Programación para Niños y Familias",
  description:
    "Rutas prácticas de pensamiento computacional en 4 niveles evolutivos: Semillas (5-7 años), Exploradores (8-10 años), Inventores (11-13 años) y Creadores (14+ años). Misiones sin pantalla, Scratch y Python con sellos coleccionables.",
  keywords: [
    "misiones de programación",
    "retos para niños",
    "aprender a programar jugando",
    "actividades desconectadas",
    "Scratch niños",
    "Python infantil",
  ],
  openGraph: {
    title: "84 Misiones de Programación | Código en Familia",
    description:
      "Explora retos prácticos paso a paso con guía para adultos, materiales de casa y sellos coleccionables.",
    url: "/misiones",
    type: "website",
  },
  alternates: {
    canonical: "/misiones",
  },
};

export default function MisionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
