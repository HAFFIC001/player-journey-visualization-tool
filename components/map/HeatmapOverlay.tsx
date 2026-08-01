"use client";

import { useEffect, useRef } from "react";
import { worldToPixel } from "@/lib/coordinate/mapping";

type Props = {
  telemetry: any;
};

const MAP_SIZE = 1024;

export default function HeatmapOverlay({
  telemetry,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!telemetry) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

    // Makes overlapping circles brighten naturally
    ctx.globalCompositeOperation = "screen";

    telemetry.players.forEach((player: any) => {
      player.events
        .filter((e: any) => e.event === "Position")
        .forEach((e: any, index: number) => {
          // Skip some points for performance
          if (index % 3 !== 0) return;

          const p = worldToPixel(
            {
              x: e.x,
              z: e.z,
            },
            telemetry.mapId
          );

          drawHeatPoint(ctx, p.x, p.y);
        });
    });

    ctx.globalCompositeOperation = "source-over";
  }, [telemetry]);

  return (
    <canvas
      ref={canvasRef}
      width={MAP_SIZE}
      height={MAP_SIZE}
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}

function drawHeatPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  const radius = 44;

  const gradient = ctx.createRadialGradient(
    x,
    y,
    0,
    x,
    y,
    radius
  );

  gradient.addColorStop(
    0.00,
    "rgba(255,245,180,0.30)"
  );

  gradient.addColorStop(
    0.15,
    "rgba(255,210,0,0.34)"
  );

  gradient.addColorStop(
    0.35,
    "rgba(255,180,0,0.30)"
  );

  gradient.addColorStop(
    0.75,
    "rgba(255,60,0,0.14)"
);

  gradient.addColorStop(
    1.00,
    "rgba(255,0,0,0)"
  );

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );
  ctx.fill();
}