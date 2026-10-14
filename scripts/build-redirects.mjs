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

const categories = JSON.parse(
  fs.readFileSync(path.join(root, "content", "categories.json"), "utf8")
);

const seen = new Set();
const redirects = [];

function add(source, destination, statusCode = 301) {
  const key = `${source}=>${destination}`;
  if (seen.has(key)) return;
  seen.add(key);
  redirects.push({ source, destination, statusCode });
}

function addPair(source, destination) {
  const normalized = source.replace(/\/$/, "") || "/";
  add(normalized, destination);
  add(`${normalized}/`, destination);
}

for (const line of csv) {
  if (!line.trim()) continue;
  const [source, destination] = line.split(",");
  addPair(source, destination);
}

// Categories keep surviving /category/... URLs; 301 trailing-slash → canonical
for (const c of categories) {
  const categoryPath = new URL(c.link).pathname.replace(/\/$/, "");
  add(`${categoryPath}/`, categoryPath, 301);
}

fs.writeFileSync(
  path.join(root, "redirects.json"),
  JSON.stringify(redirects, null, 2),
  "utf8"
);
console.log("Wrote", redirects.length, "redirects");
