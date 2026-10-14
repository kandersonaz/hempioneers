import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pages = JSON.parse(
  fs.readFileSync(
    path.join(root, "..", "_export", "pages.json"),
    "utf8"
  )
);
const outDir = path.join(root, "content", "pages");
fs.mkdirSync(outDir, { recursive: true });

function stripHtml(html) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function yamlEscape(s) {
  return String(s || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

for (const p of pages) {
  const url = new URL(p.link);
  const pagePath = url.pathname.replace(/\/$/, "") || "/";
  const slug = p.slug;
  const title = p.title?.rendered || slug;
  const excerpt = stripHtml(p.excerpt?.rendered || "").slice(0, 280);
  const html = p.content?.rendered || "";
  const fm = [
    "---",
    `title: "${yamlEscape(title)}"`,
    `slug: "${yamlEscape(slug)}"`,
    `path: "${yamlEscape(pagePath)}"`,
    `date: "${p.date}"`,
    `excerpt: "${yamlEscape(excerpt)}"`,
    `originalUrl: "${p.link}"`,
    "---",
    "",
    html,
  ].join("\n");
  const fileName =
    (pagePath === "/" ? "home" : pagePath.replace(/^\//, "").replace(/\//g, "__")) +
    ".html.md";
  fs.writeFileSync(path.join(outDir, fileName), fm, "utf8");
}

console.log("Wrote", pages.length, "pages");
