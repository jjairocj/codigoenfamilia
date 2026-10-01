import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        children: {
          include: { stamps: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const activeChild = user.children[0] || {
      id: "guest",
      alias: "Explorador",
      currentLevel: "semillas",
      avatar: "🌱",
      stamps: [],
    };

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
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
