"use client";

import { useMemo } from "react";
import { useTelemetry } from "@/hooks/useTelemetry";

type Props = {
  selectedMatch: string;
};

export default function MatchSummary({
  selectedMatch,
}: Props) {
  const { data, loading } = useTelemetry(selectedMatch);

  const stats = useMemo(() => {
    if (!data) return null;

    const totalPlayers = data.players.length;
    const bots = data.players.filter((p) => p.isBot).length;
    const humans = totalPlayers - bots;

    let loot = 0;
    let botKills = 0;
    let deaths = 0;
    let stormDeaths = 0;

    const timestamps: number[] = [];
    let totalDistance = 0;

    data.players.forEach((player) => {
      let previous: any = null;

      player.events.forEach((event) => {
        switch (event.event) {
          case "Loot":
            loot++;
            break;

          case "BotKill":
            botKills++;
            break;

          case "Death":
            deaths++;
            break;

          case "StormDeath":
            stormDeaths++;
            break;

          case "Position":
            timestamps.push(event.timestamp);

            if (previous) {
              const dx = event.x - previous.x;
              const dz = event.z - previous.z;

              totalDistance += Math.sqrt(dx * dx + dz * dz);
            }

            previous = event;
            break;
        }
      });
    });

    let duration = "00:00";

    if (timestamps.length) {
      const min = Math.min(...timestamps);
      const max = Math.max(...timestamps);

      const seconds = Math.floor(max - min);

      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;

      duration =
        `${mins}`.padStart(2, "0") +
        ":" +
        `${secs}`.padStart(2, "0");
    }

    return {
      totalPlayers,
      humans,
      bots,
      loot,
      botKills,
      deaths,
      stormDeaths,
      duration,
      distance: (totalDistance / 1000).toFixed(2),
    };
  }, [data]);

  if (!selectedMatch)
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
        Select a match to view statistics.
      </div>
    );

  if (loading)
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-zinc-400">
        Loading match summary...
      </div>
    );

  if (!stats) return null;

  const cards = [
    {
      title: "Players",
      value: stats.totalPlayers,
      color: "text-white",
    },
    {
      title: "Humans",
      value: stats.humans,
      color: "text-cyan-400",
    },
    {
      title: "Bots",
      value: stats.bots,
      color: "text-orange-400",
    },
    {
      title: "Loot Events",
      value: stats.loot,
      color: "text-yellow-400",
    },
    {
      title: "Bot Kills",
      value: stats.botKills,
      color: "text-red-400",
    },
    {
      title: "Deaths",
      value: stats.deaths,
      color: "text-white",
    },
    {
      title: "Storm Deaths",
      value: stats.stormDeaths,
      color: "text-purple-400",
    },
    {
      title: "Distance Travelled",
      value: `${stats.distance} km`,
      color: "text-emerald-400",
      wide: true,
    },
    {
      title: "Duration",
      value: stats.duration,
      color: "text-emerald-400",
      wide: true,
    },
  ];

  return (
    <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 shadow-2xl">

      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Match Summary
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Player statistics and match analytics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`group rounded-2xl border border-white/5 bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-zinc-800/70 hover:shadow-xl ${
              card.wide ? "md:col-span-1" : ""
            }`}
          >
            <div className="p-6">

              <p className="text-xs font-medium tracking-wide text-zinc-500">
                {card.title}
              </p>

              <p
                className={`mt-4 text-4xl font-semibold tracking-tight ${card.color}`}
              >
                {card.value}
              </p>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}