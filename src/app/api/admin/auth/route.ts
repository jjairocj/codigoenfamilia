import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    const validPin = process.env.ADMIN_PIN || "familia2026admin";

    if (pin && pin.trim() === validPin.trim()) {
      return NextResponse.json({ success: true, authorized: true });
    }

    return NextResponse.json(
      { error: "PIN de seguridad incorrecto" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error de autenticación" },
      { status: 500 }
    );
  }
}
