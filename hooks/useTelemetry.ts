"use client";

import { useEffect, useState } from "react";

export type TelemetryEvent = {
  x: number;
  y: number;
  z: number;
  timestamp: number;
  event: string;
};

export type Player = {
  userId: string;
  isBot: boolean;
  events: TelemetryEvent[];
};

export type MatchTelemetry = {
  matchId: string;
  mapId: string;
  players: Player[];
};

export function useTelemetry(matchId: string) {
  const [data, setData] = useState<MatchTelemetry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) {
      setData(null);
      return;
    }

    async function fetchTelemetry() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/telemetry?matchId=${matchId}`
        );

        if (!res.ok) {
          throw new Error("Unable to load telemetry");
        }

        const json = await res.json();

        if (Array.isArray(json) && json.length > 0) {
          setData(json[0]);
        } else {
          setData(null);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTelemetry();
  }, [matchId]);

  return {
    data,
    loading,
    error,
  };
}