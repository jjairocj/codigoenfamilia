import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPin } from "@/lib/adminAuth";

export async function GET(req: Request) {
  if (!verifyAdminPin(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        familyName: true,
        createdAt: true,
        children: {
          select: {
            id: true,
            alias: true,
            currentLevel: true,
            avatar: true,
            stamps: {
              select: { missionCode: true, completedAt: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!verifyAdminPin(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID de usuario requerido" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Usuario y datos asociados eliminados" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 });
  }
}
