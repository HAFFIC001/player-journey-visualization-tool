"use client";

import { useTelemetry } from "@/hooks/useTelemetry";

import MapViewport from "./MapViewport";
import PlayerPath from "./PlayerPath";
import EventMarker from "./EventMarker";
import HeatmapOverlay from "./HeatmapOverlay";

type Props = {
  image: string;
  selectedMatch: string;
  frame: number;
  heatmapEnabled: boolean;

  filters: {
    humans: boolean;
    bots: boolean;
    loot: boolean;
    botKills: boolean;
    stormDeaths: boolean;
  };
};

export default function Minimap({
  image,
  selectedMatch,
  frame,
  heatmapEnabled,
  filters,
}: Props) {
  const { data, loading } = useTelemetry(selectedMatch);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-700 bg-black shadow-2xl">
      <MapViewport image={image}>

        {/* Heatmap */}
        {heatmapEnabled && data && (
          <HeatmapOverlay telemetry={data} />
        )}

        {/* Player Paths */}
        <PlayerPath
          selectedMatch={selectedMatch}
          frame={frame}
          filters={filters}
        />

        {/* Events */}
        {data && (
          <EventMarker
            telemetry={data}
            filters={filters}
          />
        )}

      </MapViewport>

      {/* Loading */}
      {loading && (
        <div className="absolute left-4 top-4 z-50 rounded-md bg-black/80 px-3 py-2 text-sm text-white">
          Loading...
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-5 right-5 z-50 w-44 rounded-lg border border-zinc-700 bg-black/80 p-4 text-white backdrop-blur">
        <h3 className="mb-4 text-base font-semibold">
          Legend
        </h3>

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-cyan-500" />
            <span>Human</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-orange-500" />
            <span>Bot</span>
          </div>

          <hr className="border-zinc-700" />

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span>Loot</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span>Bot Kill</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-purple-500" />
            <span>Storm Death</span>
          </div>

        </div>
      </div>
    </div>
  );
}