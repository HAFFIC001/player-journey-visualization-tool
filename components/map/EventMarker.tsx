"use client";

import { useState } from "react";

import { worldToPixel } from "@/lib/coordinate/mapping";
import { MatchTelemetry } from "@/hooks/useTelemetry";

type Props = {
  telemetry: MatchTelemetry;

  filters: {
    humans: boolean;
    bots: boolean;
    loot: boolean;
    botKills: boolean;
    stormDeaths: boolean;
  };
};

type HoverInfo = {
  x: number;
  y: number;
  event: string;
  timestamp: number;
  player: string;
};

export default function EventMarker({
  telemetry,
  filters,
}: Props) {
  const [hovered, setHovered] =
    useState<HoverInfo | null>(null);

  const formatTime = (timestamp: number) => {
    const first =
      telemetry.players[0]?.events[0]?.timestamp ??
      timestamp;

    const seconds = Math.max(
      0,
      Math.floor(timestamp - first)
    );

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return (
      `${mins}`.padStart(2, "0") +
      ":" +
      `${secs}`.padStart(2, "0")
    );
  };

  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1024 1024"
        preserveAspectRatio="none"
      >
        {telemetry.players.flatMap((player) => {
          // Human/Bot Filters
          if (
            player.isBot &&
            !filters.bots
          )
            return [];

          if (
            !player.isBot &&
            !filters.humans
          )
            return [];

          return player.events.map(
            (event, index) => {
              // Event Filters
              if (
                event.event === "Loot" &&
                !filters.loot
              )
                return null;

              if (
                event.event === "BotKill" &&
                !filters.botKills
              )
                return null;

              if (
                event.event ===
                  "StormDeath" &&
                !filters.stormDeaths
              )
                return null;

              if (
                event.event !== "Loot" &&
                event.event !== "BotKill" &&
                event.event !== "Death" &&
                event.event !==
                  "StormDeath"
              ) {
                return null;
              }

              const pixel =
                worldToPixel(
                  {
                    x: event.x,
                    z: event.z,
                  },
                  telemetry.mapId as any
                );

              let color = "#ffffff";
              let radius = 5;

              switch (event.event) {
                case "Loot":
                  color = "#facc15";
                  radius = 4;
                  break;

                case "BotKill":
                  color = "#ef4444";
                  radius = 6;
                  break;

                case "Death":
                  color = "#000000";
                  radius = 6;
                  break;

                case "StormDeath":
                  color = "#9333ea";
                  radius = 7;
                  break;
              }

              return (
                <circle
                  key={`${player.userId}-${index}`}
                  cx={pixel.x}
                  cy={pixel.y}
                  r={radius}
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-150 hover:scale-125"
                  onMouseEnter={() =>
                    setHovered({
                      x: pixel.x,
                      y: pixel.y,
                      event: event.event,
                      timestamp:
                        event.timestamp,
                      player:
                        player.isBot
                          ? "Bot"
                          : "Human",
                    })
                  }
                  onMouseLeave={() =>
                    setHovered(null)
                  }
                />
              );
            }
          );
        })}
      </svg>

      {hovered && (
        <div
          className="absolute z-50 rounded-lg border border-zinc-700 bg-black/90 px-4 py-3 text-xs text-white shadow-xl pointer-events-none"
          style={{
            left: `${
              (hovered.x / 1024) *
              100
            }%`,
            top: `${
              (hovered.y / 1024) *
              100
            }%`,
            transform:
              "translate(12px,-110%)",
          }}
        >
          <div
            className={`mb-1 font-semibold ${
              hovered.event === "Loot"
                ? "text-yellow-400"
                : hovered.event ===
                  "BotKill"
                ? "text-red-400"
                : hovered.event ===
                  "StormDeath"
                ? "text-purple-400"
                : "text-white"
            }`}
          >
            {hovered.event ===
              "Loot" && "📦 Loot"}

            {hovered.event ===
              "BotKill" &&
              "💀 Bot Kill"}

            {hovered.event ===
              "Death" &&
              "☠ Death"}

            {hovered.event ===
              "StormDeath" &&
              "🌩 Storm Death"}
          </div>

          <div className="text-zinc-300">
            Time:{" "}
            {formatTime(
              hovered.timestamp
            )}
          </div>

          <div className="mt-1 text-zinc-400">
            Player: {hovered.player}
          </div>
        </div>
      )}
    </>
  );
}