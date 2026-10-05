import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { familyName, email, category, missionId, message, currentUrl, deviceInfo } = body;

    if (!familyName || !email || !message) {
      return NextResponse.json(
        { error: "Por favor completa tu nombre, correo y el mensaje." },
        { status: 400 }
      );
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ingresa un correo electrónico válido para poder responderte." },
        { status: 400 }
      );
    }

    const ticket = await prisma.feedbackTicket.create({
      data: {
        familyName: String(familyName).trim().slice(0, 100),
        email: String(email).trim().toLowerCase().slice(0, 120),
        category: String(category || "duda_mision").slice(0, 50),
        missionId: missionId ? String(missionId).trim().slice(0, 80) : null,
        message: String(message).trim().slice(0, 2000),
        currentUrl: currentUrl ? String(currentUrl).slice(0, 300) : null,
        deviceInfo: deviceInfo ? String(deviceInfo).slice(0, 200) : null,
        status: "pendiente",
      },
    });

    return NextResponse.json({
      success: true,
      ticketId: ticket.id,
      message: "¡Mensaje recibido con éxito! Lo revisaremos en nuestro panel de soporte familiar.",
    });
  } catch (err) {
    console.error("Error al guardar ticket de feedback:", err);
    return NextResponse.json(
      { error: "Ocurrió un error al registrar tu mensaje. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
