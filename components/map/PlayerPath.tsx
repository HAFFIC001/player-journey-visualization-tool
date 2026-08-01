"use client";

import { worldToPixel } from "@/lib/coordinate/mapping";
import { useTelemetry } from "@/hooks/useTelemetry";
import { MapId } from "@/lib/types/telemetry";

type Props = {
  selectedMatch: string;
  frame: number;

  filters: {
    humans: boolean;
    bots: boolean;
    loot: boolean;
    botKills: boolean;
    stormDeaths: boolean;
  };
};

export default function PlayerPath({
  selectedMatch,
  frame,
  filters,
}: Props) {
  const { data, loading } = useTelemetry(selectedMatch);

  if (loading) {
    return (
      <div className="absolute top-4 left-4 rounded bg-black/70 px-3 py-2 text-white">
        Loading telemetry...
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 1024 1024"
        preserveAspectRatio="none"
      >
        {data.players.map((player) => {
          // ----------------------------
          // Filters
          // ----------------------------
          if (player.isBot && !filters.bots) {
            return null;
          }

          if (!player.isBot && !filters.humans) {
            return null;
          }

          const positions = player.events
            .filter((e) => e.event === "Position")
            .map((e) =>
              worldToPixel(
                {
                  x: e.x,
                  z: e.z,
                },
                data.mapId as MapId
              )
            );

          if (!positions.length) return null;

          const visiblePoints =
            frame === 0
              ? [positions[0]]
              : positions.slice(
                  0,
                  Math.min(frame + 1, positions.length)
                );

          const latest =
            visiblePoints[visiblePoints.length - 1];

          return (
            <g key={player.userId}>
              {/* Animated Trail */}
              {visiblePoints.slice(1).map((point, i) => {
                const previous = visiblePoints[i];

                const progress =
                  (i + 1) / visiblePoints.length;

                return (
                  <line
                    key={i}
                    x1={previous.x}
                    y1={previous.y}
                    x2={point.x}
                    y2={point.y}
                    stroke={
                      player.isBot
                        ? "#f97316"
                        : "#06b6d4"
                    }
                    strokeWidth={2 + progress * 2}
                    opacity={0.15 + progress * 0.85}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Glow */}
              <circle
                cx={latest.x}
                cy={latest.y}
                r={9}
                fill={
                  player.isBot
                    ? "#f97316"
                    : "#06b6d4"
                }
                opacity={0.18}
              />

              {/* Current Position */}
              <circle
                cx={latest.x}
                cy={latest.y}
                r={5}
                fill={
                  player.isBot
                    ? "#f97316"
                    : "#06b6d4"
                }
                stroke="white"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>
    </>
  );
}