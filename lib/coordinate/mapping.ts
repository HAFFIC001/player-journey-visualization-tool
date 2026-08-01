import { MAPS } from "../constants/maps";
import {
  MapId,
  PixelCoordinate,
  WorldCoordinate,
} from "../types/telemetry";

export function worldToPixel(
  world: WorldCoordinate,
  map: MapId
): PixelCoordinate {
  const config = MAPS[map];

  const u = (world.x - config.originX) / config.scale;

  const v = (world.z - config.originZ) / config.scale;

  return {
    x: u * config.imageSize,
    y: (1 - v) * config.imageSize,
  };
}

export function pixelToWorld(
  pixel: PixelCoordinate,
  map: MapId
): WorldCoordinate {
  const config = MAPS[map];

  const u = pixel.x / config.imageSize;

  const v = 1 - pixel.y / config.imageSize;

  return {
    x: u * config.scale + config.originX,
    z: v * config.scale + config.originZ,
  };
}