import { NextResponse } from "next/server";

import { getTelemetry } from "@/lib/services/telemetryService";

export async function GET() {
  const matches = await getTelemetry();

  const response = matches.map((match: any) => ({
    matchId: match.matchId,
    mapId: match.mapId,
    playerCount: match.players.length,
  }));

  return NextResponse.json(response);
}