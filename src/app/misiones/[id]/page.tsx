import { notFound } from "next/navigation";
import missionsData from "@/data/missions.json";
import MissionDetailClient from "@/components/MissionDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return missionsData.map((m) => ({
    id: m.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mission = missionsData.find(
    (m) => m.id === id || m.code.toLowerCase() === id.toLowerCase()
  );

  if (!mission) {
    return {
      title: "Misión no encontrada | Código en Familia",
    };
  }

  return {
    title: `${mission.title} — Código en Familia`,
    description: mission.description,
  };
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = missionsData.findIndex(
    (m) => m.id === id || m.code.toLowerCase() === id.toLowerCase()
  );

  if (index === -1) {
    notFound();
  }

  const mission = missionsData[index];
  const prevMission = index > 0 ? missionsData[index - 1] : null;
  const nextMission = index < missionsData.length - 1 ? missionsData[index + 1] : null;

  return (
    <MissionDetailClient
      mission={mission}
      prevMission={prevMission}
      nextMission={nextMission}
    />
  );
}
