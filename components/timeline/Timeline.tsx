"use client";

import { formatDuration } from "@/lib/utils/time";

type Props = {
  frame: number;
  maxFrame: number;
  timestamps?: number[];
  onChange: (value: number) => void;
};

export default function Timeline({
  frame,
  maxFrame,
  timestamps = [],
  onChange,
}: Props) {
  const current =
    timestamps.length > frame
      ? timestamps[frame] - timestamps[0]
      : 0;

  const total =
    timestamps.length
      ? timestamps[timestamps.length - 1] - timestamps[0]
      : 0;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">

      <input
        type="range"
        min={0}
        max={Math.max(maxFrame, 0)}
        value={frame}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />

      <div className="mt-3 flex justify-between text-sm text-zinc-400">
        <span>{formatDuration(current)}</span>

        <span>
          {formatDuration(current)} / {formatDuration(total)}
        </span>

        <span>{formatDuration(total)}</span>
      </div>

    </div>
  );
}