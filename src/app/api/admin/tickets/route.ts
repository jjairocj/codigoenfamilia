import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminPin } from "@/lib/adminAuth";

export async function GET(req: Request) {
  if (!verifyAdminPin(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const tickets = await prisma.feedbackTicket.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, tickets });
  } catch (err) {
    console.error("Error al listar tickets:", err);
    return NextResponse.json({ error: "Error al obtener tickets" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!verifyAdminPin(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID y nuevo estado requeridos" }, { status: 400 });
    }

    const updated = await prisma.feedbackTicket.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, ticket: updated });
  } catch (err) {
    console.error("Error al actualizar ticket:", err);
    return NextResponse.json({ error: "Error al actualizar estado del ticket" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!verifyAdminPin(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID de ticket requerido" }, { status: 400 });
    }

    await prisma.feedbackTicket.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Ticket eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar ticket:", err);
    return NextResponse.json({ error: "Error al eliminar ticket" }, { status: 500 });
  }
}
