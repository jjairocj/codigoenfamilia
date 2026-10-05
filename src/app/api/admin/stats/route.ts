import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPin } from "@/lib/adminAuth";

export async function GET(req: Request) {
  if (!verifyAdminPin(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const publicVisitFilter = {
      NOT: [
        { pagePath: { startsWith: "/control-familia" } },
        { pagePath: { startsWith: "/admin" } },
        { pagePath: { startsWith: "/api" } },
      ],
    };

    const [
      totalFamilies,
      totalChildren,
      totalStamps,
      totalVisits,
      recentVisits7d,
      pendingTickets,
      resolvedTickets,
      childrenProfiles,
      recentVisitsSample
    ] = await Promise.all([
      prisma.user.count(),
      prisma.childProfile.count(),
      prisma.missionStamp.count(),
      prisma.siteVisit.count({
        where: publicVisitFilter,
      }),
      prisma.siteVisit.count({
        where: {
          visitedAt: { gte: sevenDaysAgo },
          ...publicVisitFilter,
        },
      }),
      prisma.feedbackTicket.count({ where: { status: "pendiente" } }),
      prisma.feedbackTicket.count({ where: { status: "resuelto" } }),
      prisma.childProfile.findMany({
        select: { currentLevel: true },
      }),
      prisma.siteVisit.findMany({
        where: publicVisitFilter,
        take: 500,
        orderBy: { visitedAt: "desc" },
        select: { pagePath: true },
      }),
    ]);

    // Conteo por nivel
    const levelCounts: Record<string, number> = {
      semillas: 0,
      exploradores: 0,
      inventores: 0,
      creadores: 0,
    };
    for (const c of childrenProfiles) {
      const lvl = c.currentLevel.toLowerCase();
      if (levelCounts[lvl] !== undefined) {
        levelCounts[lvl]++;
      }
    }

    // Top páginas más visitadas (muestra reciente de páginas públicas)
    const pageFrequencies: Record<string, number> = {};
    for (const v of recentVisitsSample) {
      pageFrequencies[v.pagePath] = (pageFrequencies[v.pagePath] || 0) + 1;
    }
    const topPages = Object.entries(pageFrequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    return NextResponse.json({
      success: true,
      stats: {
        totalFamilies,
        totalChildren,
        totalStamps,
        totalVisits,
        recentVisits7d,
        pendingTickets,
        resolvedTickets,
        levelCounts,
        topPages,
      },
    });
  } catch (err) {
    console.error("Error al obtener estadísticas de admin:", err);
    return NextResponse.json(
      { error: "Error al calcular estadísticas" },
      { status: 500 }
    );
  }
}
