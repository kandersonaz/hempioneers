import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csv = fs
  .readFileSync(path.join(root, "redirects.csv"), "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1);

const seen = new Set();
const redirects = [];

function add(source, destination) {
  const normalized = source.replace(/\/$/, "") || "/";
  if (seen.has(normalized)) return;
  seen.add(normalized);
  // Match both /slug and /slug/ so WP trailing-slash URLs redirect in one hop
  redirects.push({
    source: normalized,
    destination,
    statusCode: 301,
  });
  redirects.push({
    source: `${normalized}/`,
    destination,
    statusCode: 301,
  });
}

for (const line of csv) {
  if (!line.trim()) continue;
  const [source, destination] = line.split(",");
  add(source, destination);
}

fs.writeFileSync(
  path.join(root, "redirects.json"),
  JSON.stringify(redirects, null, 2),
  "utf8"
);
console.log("Wrote", redirects.length, "redirects");
