"use client";

type Props = {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
};

export default function PlaybackControls({
  isPlaying,
  onPlay,
  onPause,
  onRestart,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">

      <button
        onClick={isPlaying ? onPause : onPlay}
        className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-500"
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>

      <button
        onClick={onRestart}
        className="rounded-md bg-zinc-700 px-5 py-2 text-white transition hover:bg-zinc-600"
      >
        ⟲ Restart
      </button>

    </div>
  );
}