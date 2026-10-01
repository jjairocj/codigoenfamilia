import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/imprimibles",
        destination: "/descargas",
        permanent: false,
      },
      {
        source: "/glosario",
        destination: "/conceptos",
        permanent: false,
      },
      {
        source: "/recursos",
        destination: "/descargas",
        permanent: false,
      },
      {
        source: "/ciudadania-digital",
        destination: "/conceptos/privacidad",
        permanent: false,
      },
      {
        source: "/niveles/:nivel",
        destination: "/misiones?nivel=:nivel",
        permanent: false,
      },
      {
        source: "/misiones/:nivel/:id",
        destination: "/misiones/:id",
        permanent: false,
      },
      {
        source: "/desenchufado/:slug*",
        destination: "/ruleta",
        permanent: false,
      },
      {
        source: "/herramientas/scratch",
        destination: "/scratch",
        permanent: false,
      },
      {
        source: "/herramientas/microbit",
        destination: "/microbit",
        permanent: false,
      },
      {
        source: "/herramientas/python",
        destination: "/python",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
