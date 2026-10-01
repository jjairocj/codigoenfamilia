import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Código en Familia — Pensamiento Computacional y Programación",
    short_name: "Código en Familia",
    description: "Plataforma educativa gratuita para aprender pensamiento computacional y programación en familia de 4 a 15 años.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#0ea5e9",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
