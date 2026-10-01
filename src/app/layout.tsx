import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PassportProvider } from "@/context/PassportContext";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://codigoenfamilia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Código en Familia — Aprender a programar jugando juntos",
    template: "%s | Código en Familia",
  },
  description:
    "Plataforma educativa libre y 100% gratuita para aprender pensamiento computacional y programación en familia (4 a 15 años). 84 misiones guiadas, simulador de robot interactivo, ruleta desconectada y guías PDF imprimibles.",
  applicationName: "Código en Familia",
  authors: [{ name: "Jhon Jairo Cruz Jiménez", url: siteUrl }],
  creator: "Jhon Jairo Cruz Jiménez",
  publisher: "Código en Familia",
  keywords: [
    "programación para niños",
    "pensamiento computacional",
    "actividades desconectadas",
    "CS Unplugged",
    "educación en familia",
    "Scratch niños",
    "Python infantil",
    "robótica para niños",
    "juegos de lógica",
    "educación abierta Colombia",
    "recursos educativos gratuitos",
    "pasaporte de programación infantil",
    "aprender a programar sin pantallas",
  ],
  category: "education",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "Código en Familia",
    title: "Código en Familia — Aprender a programar jugando juntos",
    description:
      "84 misiones guiadas, simulador de robot, ruleta desconectada y 12 guías PDF imprimibles. 100% gratuito, sin anuncios y respetuoso con la privacidad.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Código en Familia — Aprender a programar jugando juntos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Código en Familia — Aprender a programar jugando juntos",
    description:
      "84 misiones guiadas para aprender lógica y programación en familia. 100% gratis y sin anuncios.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Código en Familia",
      "description":
        "Plataforma educativa gratuita para aprender programación y lógica en familia de 4 a 15 años.",
      "inLanguage": "es-CO",
      "publisher": {
        "@type": "Person",
        "name": "Jhon Jairo Cruz Jiménez"
      }
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      "name": "Código en Familia",
      "url": siteUrl,
      "logo": `${siteUrl}/icon-512.png`,
      "description":
        "Iniciativa de educación abierta y sin ánimo de lucro para el fomento del pensamiento computacional infantil y juvenil en el hogar.",
      "founder": {
        "@type": "Person",
        "name": "Jhon Jairo Cruz Jiménez"
      }
    },
    {
      "@type": "Course",
      "@id": `${siteUrl}/#course`,
      "name": "Rutas de Pensamiento Computacional y Programación en Familia",
      "description":
        "84 misiones progresivas en 4 niveles evolutivos (Semillas, Exploradores, Inventores y Creadores) con enfoque vivencial y CS Unplugged.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Código en Familia"
      },
      "isAccessibleForFree": true,
      "inLanguage": "es"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Quicksand:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-slate-800 antialiased overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
        <PassportProvider>
          {/* Subtle ambient pastel circles */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40 w-full max-w-full">
            <div className="absolute -top-24 -left-24 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-amber-200/50 blur-3xl" />
            <div className="absolute top-1/3 -right-16 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute -bottom-24 left-1/4 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute top-2/3 left-4 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-purple-200/30 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </PassportProvider>
      </body>
    </html>
  );
}
