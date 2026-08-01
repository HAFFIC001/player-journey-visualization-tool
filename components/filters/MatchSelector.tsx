"use client";

import { useMemo, useState } from "react";

import { useMatches } from "@/hooks/useMatches";

type Props = {
  selected?: string;
  onSelect: (id: string) => void;
};

export default function MatchSelector({
  selected,
  onSelect,
}: Props) {
  const { data, isLoading } = useMatches();

  const [search, setSearch] = useState("");

  const matches = useMemo(() => {
    if (!data) return [];

    return data.filter((match: any) => {
      const text =
        `${match.matchId} ${match.mapId}`.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="p-4 text-zinc-400">
        Loading matches...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 border-b border-zinc-800">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Match..."
          className="w-full rounded-md bg-zinc-800 px-3 py-2 text-sm outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {matches.map((match: any) => (
          <button
            key={match.matchId}
            onClick={() => onSelect(match.matchId)}
            className={`w-full rounded-lg border p-3 text-left transition ${
              selected === match.matchId
                ? "border-blue-500 bg-blue-500/20"
                : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            <div className="font-medium">
              {match.matchId.slice(0, 8)}
            </div>

            <div className="mt-1 text-xs text-zinc-400">
              {match.mapId}
            </div>

            <div className="mt-2 text-xs text-zinc-500">
              👥 {match.playerCount} Players
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}