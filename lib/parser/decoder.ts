import { EventType } from "../types/telemetry";

export function decodeEvent(value: unknown): EventType {
  if (value instanceof Uint8Array) {
    return new TextDecoder().decode(value) as EventType;
  }

  if (typeof value === "string") {
    return value as EventType;
  }

  return String(value) as EventType;
}

export function isBot(userId: string) {
  return /^\d+$/.test(userId);
}