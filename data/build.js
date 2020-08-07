const fs = require("fs");
const path = require("path");
const parse = require("csv-parse/lib/sync");

const args = process.argv.slice(2);

const buildTarget = args[0];
if (typeof buildTarget != "string") {
  console.error("Expected string for first argument and got %O", buildTarget);
}

/**
 * Array of game abbreviations that correspond to subfolders in `raw` directory.
 * These are also the expected command line arguments.
 * TODO: add support for arbitrary number of games to build data for.
 * TODO: add support for command line argument "all" that builds everything.
 * */
const topLevelGames = ["SG"];

const rawData = fs.readFileSync(
  path.join(process.cwd(), "data", "raw", "SG", "SparkRateTable.csv")
);
const records = parse(rawData);
records.map((r) => console.log(r));
