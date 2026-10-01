import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { childId, missionCode } = await req.json();

    if (!childId || !missionCode) {
      return NextResponse.json(
        { error: "Faltan parámetros childId y missionCode" },
        { status: 400 }
      );
    }

    const existing = await prisma.missionStamp.findUnique({
      where: {
        childId_missionCode: {
          childId,
          missionCode: missionCode.toUpperCase(),
        },
      },
    });

    if (existing) {
      await prisma.missionStamp.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ completed: false, missionCode });
    } else {
      await prisma.missionStamp.create({
        data: {
          childId,
          missionCode: missionCode.toUpperCase(),
        },
      });
      return NextResponse.json({ completed: true, missionCode });
    }
  } catch (err: unknown) {
    console.error("Toggle stamp error:", err);
    return NextResponse.json(
      { error: "Error al actualizar sello" },
      { status: 500 }
    );
  }
}
