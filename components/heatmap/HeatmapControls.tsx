"use client";

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

export default function HeatmapControls({
  enabled,
  onToggle,
}: Props) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onToggle}
        className={`rounded-lg px-5 py-2 font-medium transition
        ${
          enabled
            ? "bg-emerald-600 hover:bg-emerald-500 text-white"
            : "bg-zinc-700 hover:bg-zinc-600 text-white"
        }`}
      >
        🔥 Heatmap {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
}