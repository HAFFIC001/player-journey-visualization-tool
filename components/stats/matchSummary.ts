import { worldToPixel } from "@/lib/coordinate/mapping";

export function getMatchSummary(telemetry: any) {
  if (!telemetry) return null;

  const players = telemetry.players.length;

  const bots = telemetry.players.filter(
    (p: any) => p.isBot
  ).length;

  const humans = players - bots;

  let loot = 0;
  let botKills = 0;
  let deaths = 0;
  let stormDeaths = 0;

  let distance = 0;

  let firstTime = Number.MAX_SAFE_INTEGER;
  let lastTime = 0;

  telemetry.players.forEach((player: any) => {
    let previous: any = null;

    player.events.forEach((event: any) => {
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
      }

      if (
        typeof event.timestamp === "number"
      ) {
        firstTime = Math.min(
          firstTime,
          event.timestamp
        );

        lastTime = Math.max(
          lastTime,
          event.timestamp
        );
      }

      if (
        event.event === "Position"
      ) {
        if (previous) {
          const dx = event.x - previous.x;
          const dz = event.z - previous.z;

          distance += Math.sqrt(
            dx * dx + dz * dz
          );
        }

        previous = event;
      }
    });
  });

  const durationSeconds =
    Math.max(lastTime - firstTime, 0) / 1000;

  return {
    players,
    humans,
    bots,
    loot,
    botKills,
    deaths,
    stormDeaths,
    durationSeconds,

    distanceKm:
      (distance / 100).toFixed(2),
  };
}