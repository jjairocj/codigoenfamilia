import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { pagePath, section } = body;

    const path = typeof pagePath === "string" ? pagePath.trim().slice(0, 150) : "/";

    // NUNCA registrar visitas a rutas administrativas, APIs o archivos internos
    if (
      path.startsWith("/control-familia") ||
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.startsWith("/_next") ||
      path.includes("control-familia")
    ) {
      return NextResponse.json({ success: true, ignored: true });
    }

    await prisma.siteVisit.create({
      data: {
        pagePath: path,
        section: typeof section === "string" ? section.slice(0, 80) : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    // Analytics nunca debe romper la experiencia de usuario
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
