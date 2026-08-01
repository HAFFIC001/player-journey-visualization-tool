export type MapId =
  | "AmbroseValley"
  | "GrandRift"
  | "Lockdown";

export type EventType =
  | "Position"
  | "BotPosition"
  | "Kill"
  | "Killed"
  | "BotKill"
  | "BotKilled"
  | "KilledByStorm"
  | "Loot";

export interface TelemetryEvent {
  userId: string;
  matchId: string;
  mapId: MapId;

  x: number;
  y: number;
  z: number;

  timestamp: number;

  event: EventType;

  isBot: boolean;
}

export interface PlayerJourney {
  userId: string;

  matchId: string;

  mapId: MapId;

  isBot: boolean;

  events: TelemetryEvent[];
}

export interface MatchData {
  matchId: string;

  mapId: MapId;

  players: PlayerJourney[];

  startTime: number;

  endTime: number;

  duration: number;
}

export interface PixelCoordinate {
  x: number;

  y: number;
}

export interface WorldCoordinate {
  x: number;

  z: number;
}

export interface HeatmapPoint {
  x: number;

  y: number;

  intensity: number;
}