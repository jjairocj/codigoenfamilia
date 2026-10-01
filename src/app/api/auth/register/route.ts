import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, familyName, childName, level } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este correo ya está registrado" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        familyName: familyName || "Familia Exploradora",
        children: {
          create: {
            alias: childName || "Pequeño Creador",
            currentLevel: level || "semillas",
            avatar: "🌱",
          },
        },
      },
      include: {
        children: {
          include: { stamps: true },
        },
      },
    });

    const activeChild = user.children[0];

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        familyName: user.familyName,
        child: {
          id: activeChild.id,
          alias: activeChild.alias,
          level: activeChild.currentLevel,
          avatar: activeChild.avatar,
          stamps: activeChild.stamps.map((s) => s.missionCode),
        },
      },
    });
  } catch (err: unknown) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Error al registrar la familia" },
      { status: 500 }
    );
  }
}
