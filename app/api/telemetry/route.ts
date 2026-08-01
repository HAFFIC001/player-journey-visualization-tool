import { NextRequest, NextResponse } from "next/server";
import { getTelemetry } from "@/lib/services/telemetryService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const matchId = searchParams.get("matchId");

    const telemetry = await getTelemetry();

    if (!matchId) {
      return NextResponse.json(telemetry);
    }

    const filtered = telemetry.filter(
      (match: any) => match.matchId === matchId
    );

    return NextResponse.json(filtered);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load telemetry",
      },
      {
        status: 500,
      }
    );
  }
}