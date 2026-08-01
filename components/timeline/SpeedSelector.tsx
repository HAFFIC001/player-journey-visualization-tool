"use client";

type Props = {
  speed: number;
  onChange: (speed: number) => void;
};

const speeds = [0.5, 1, 2, 4];

export default function SpeedSelector({
  speed,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-400">
        Speed
      </span>

      {speeds.map((value) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-md px-3 py-1 text-sm transition ${
            speed === value
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {value}×
        </button>
      ))}
    </div>
  );
}