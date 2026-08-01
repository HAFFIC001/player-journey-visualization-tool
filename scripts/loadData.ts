import fs from "fs/promises";
import path from "path";

import { readPlayerJourney } from "../lib/parser/parquet";

async function main() {
  const folder = path.join(process.cwd(), "data", "February_10");

  const files = await fs.readdir(folder);

  console.log("");

  console.log("Total Files:", files.length);

  console.log("");

  const journey = await readPlayerJourney(
    path.join(folder, files[0])
  );

  console.log(journey);

  console.log("");

  console.log("Events:", journey.events.length);

  console.log("");

  console.log(journey.events[0]);
}

main();