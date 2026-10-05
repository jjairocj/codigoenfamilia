import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/empezar",
        destination: "/misiones",
        permanent: false,
      },
      {
        source: "/codigo-en-familia/:path*",
        destination: "/:path*",
        permanent: false,
      },
      {
        source: "/codigo-en-familia",
        destination: "/",
        permanent: false,
      },
      {
        source: "/guia-adultos/:slug*",
        destination: "/descargas",
        permanent: false,
      },
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






      
      
      
      
      
      
    ];
  },
};

export default nextConfig;
