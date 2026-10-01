import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { childId, localStamps } = await req.json();

    if (!childId || !Array.isArray(localStamps)) {
      return NextResponse.json(
        { error: "childId y lista de sellos requeridos" },
        { status: 400 }
      );
    }

    // Insert any local stamps that are missing in DB
    for (const code of localStamps) {
      const upper = String(code).toUpperCase();
      try {
        await prisma.missionStamp.upsert({
          where: {
            childId_missionCode: {
              childId,
              missionCode: upper,
            },
          },
          update: {},
          create: {
            childId,
            missionCode: upper,
          },
        });
      } catch (e) {
        // Ignore single collision
      }
    }

    // Return unified list of stamps
    const allStamps = await prisma.missionStamp.findMany({
      where: { childId },
      select: { missionCode: true },
    });

    return NextResponse.json({
      success: true,
      stamps: allStamps.map((s) => s.missionCode),
    });
  } catch (err: unknown) {
    console.error("Sync stamps error:", err);
    return NextResponse.json(
      { error: "Error al sincronizar sellos" },
      { status: 500 }
    );
  }
}
