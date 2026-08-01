"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Minimap from "@/components/map/Minimap";

import SpeedSelector from "@/components/timeline/SpeedSelector";
import PlaybackControls from "@/components/timeline/PlaybackControls";
import Timeline from "@/components/timeline/Timeline";

import HeatmapControls from "@/components/heatmap/HeatmapControls";
import FilterPanel from "@/components/filters/FilterPanel";

import MatchSummary from "@/components/stats/MatchSummary";

import { useMatchFrames } from "@/hooks/useMatchFrames";

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState("");

  const [frame, setFrame] = useState(0);

  const [heatmapEnabled, setHeatmapEnabled] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [speed, setSpeed] = useState(1);

  // NEW
  const [filters, setFilters] = useState({
    humans: true,
    bots: true,
    loot: true,
    botKills: true,
    stormDeaths: true,
  });

  const {
    maxFrame,
    timestamps,
  } = useMatchFrames(selectedMatch);

  // Reset frame if needed
  useEffect(() => {
    if (frame > maxFrame) {
      setFrame(0);
    }
  }, [frame, maxFrame]);

  // Replay Engine
  useEffect(() => {
    if (!isPlaying) return;

    if (frame >= maxFrame) {
      setIsPlaying(false);
      return;
    }

    const timer = setInterval(() => {
      setFrame((prev) => {
        if (prev >= maxFrame) {
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, 60 / speed);

    return () => clearInterval(timer);
  }, [isPlaying, frame, maxFrame, speed]);

  return (
    <main className="flex h-screen flex-col bg-zinc-950">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedMatch={selectedMatch}
          onSelect={(id) => {
            setSelectedMatch(id);
            setFrame(0);
            setIsPlaying(false);
          }}
        />

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8">

          {/* Minimap */}
          <div className="relative h-[800px] w-full">
            <Minimap
              image="/minimaps/AmbroseValley_Minimap.png"
              selectedMatch={selectedMatch}
              frame={frame}
              heatmapEnabled={heatmapEnabled}
              filters={filters}
            />
          </div>

          {/* Playback */}
          <PlaybackControls
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onRestart={() => {
              setFrame(0);
              setIsPlaying(false);
            }}
          />

          {/* Heatmap Toggle */}
          <HeatmapControls
            enabled={heatmapEnabled}
            onToggle={() =>
              setHeatmapEnabled(!heatmapEnabled)
            }
          />

          {/* NEW Filter Panel */}
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
          />

          {/* Speed */}
          <div className="flex justify-center">
            <SpeedSelector
              speed={speed}
              onChange={setSpeed}
            />
          </div>

          {/* Timeline */}
          <Timeline
            frame={frame}
            maxFrame={maxFrame}
            timestamps={timestamps}
            onChange={setFrame}
          />

          {/* Match Summary */}
          <MatchSummary
            selectedMatch={selectedMatch}
          />
        </div>
      </div>
    </main>
  );
}
