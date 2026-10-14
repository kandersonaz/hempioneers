import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const csv = fs.readFileSync(path.join(root, "redirects.csv"), "utf8").trim().split(/\r?\n/).slice(1);

const redirects = [];

for (const line of csv) {
  if (!line.trim()) continue;
  const [source, destination, status] = line.split(",");
  redirects.push({
    source: source.replace(/\/$/, "") || "/",
    destination,
    permanent: String(status) === "301",
  });
  // also match trailing slash variants via Next trailingSlash handling;
  // add explicit trailing-slash source for safety
  if (source.endsWith("/") && source !== "/") {
    redirects.push({
      source,
      destination,
      permanent: true,
    });
  }
}

fs.writeFileSync(
  path.join(root, "redirects.json"),
  JSON.stringify(redirects, null, 2),
  "utf8"
);
console.log("Wrote", redirects.length, "redirects");
