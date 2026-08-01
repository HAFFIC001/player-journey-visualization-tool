"use client";

import { useMemo } from "react";
import { useTelemetry } from "./useTelemetry";

export function useMatchFrames(selectedMatch: string) {
  const { data } = useTelemetry(selectedMatch);

  return useMemo(() => {
    if (!data) {
      return {
        maxFrame: 0,
        startTime: 0,
        endTime: 0,
        duration: 0,
        timestamps: [],
      };
    }

    const timestamps: number[] = [];

    data.players.forEach((player) => {
      player.events
        .filter((event) => event.event === "Position")
        .forEach((event) => {
          timestamps.push(event.timestamp);
        });
    });

    timestamps.sort((a, b) => a - b);

    if (!timestamps.length) {
      return {
        maxFrame: 0,
        startTime: 0,
        endTime: 0,
        duration: 0,
        timestamps: [],
      };
    }

    return {
      maxFrame: timestamps.length - 1,
      startTime: timestamps[0],
      endTime: timestamps[timestamps.length - 1],
      duration: timestamps[timestamps.length - 1] - timestamps[0],
      timestamps,
    };
  }, [data]);
}