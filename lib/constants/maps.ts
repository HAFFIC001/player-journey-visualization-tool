import { MapId } from "../types/telemetry";

export interface MapConfig {
  id: MapId;

  image: string;

  scale: number;

  originX: number;

  originZ: number;

  imageSize: number;
}

export const MAPS: Record<MapId, MapConfig> = {
  AmbroseValley: {
    id: "AmbroseValley",
    image: "/minimaps/AmbroseValley_Minimap.png",
    scale: 900,
    originX: -370,
    originZ: -473,
    imageSize: 1024,
  },

  GrandRift: {
    id: "GrandRift",
    image: "/minimaps/GrandRift_Minimap.png",
    scale: 581,
    originX: -290,
    originZ: -290,
    imageSize: 1024,
  },

  Lockdown: {
    id: "Lockdown",
    image: "/minimaps/Lockdown_Minimap.jpg",
    scale: 1000,
    originX: -500,
    originZ: -500,
    imageSize: 1024,
  },
};