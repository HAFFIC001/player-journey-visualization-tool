import { useEffect, useState } from "react";

export function usePlayback(
  totalFrames: number,
  speed = 30
) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setFrame((prev) => {
        if (prev >= totalFrames - 1) {
          return totalFrames - 1;
        }

        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [playing, totalFrames, speed]);

  function play() {
    setPlaying(true);
  }

  function pause() {
    setPlaying(false);
  }

  function restart() {
    setFrame(0);
    setPlaying(false);
  }

  return {
    frame,
    playing,
    play,
    pause,
    restart,
    setFrame,
  };
}