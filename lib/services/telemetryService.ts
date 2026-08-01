import fs from "fs/promises";
import path from "path";

let cache: any[] = [];

export async function getTelemetry(): Promise<any[]> {
  if (cache.length > 0) {
    return cache;
  }

  const filePath = path.join(
    process.cwd(),
    "cache",
    "telemetry.json"
  );

  const raw = await fs.readFile(filePath, "utf8");

  cache = JSON.parse(raw);

  return cache;
}