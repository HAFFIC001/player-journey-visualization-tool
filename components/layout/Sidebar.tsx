"use client";

import MatchSelector from "../filters/MatchSelector";

type Props = {
  selectedMatch: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({
  selectedMatch,
  onSelect,
}: Props) {
  return (
    <aside className="w-80 border-r border-zinc-800 bg-zinc-900 flex flex-col">
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-3xl font-bold text-white">
          Match Explorer
        </h2>

        <p className="text-zinc-400">
          Choose a match
        </p>
      </div>

      <div className="flex-1 overflow-hidden p-2">
        <MatchSelector
          selected={selectedMatch}
          onSelect={onSelect}
        />
      </div>
    </aside>
  );
}