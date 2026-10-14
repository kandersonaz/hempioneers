import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content", "posts");
const pagesDir = path.join(process.cwd(), "content", "pages");

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  author?: string;
  excerpt?: string;
  categories?: string[];
  tags?: string[];
  coverImage?: string;
  coverImageAlt?: string;
  originalUrl?: string;
};

export type PageMeta = {
  title: string;
  slug: string;
  path: string;
  date: string;
  excerpt?: string;
  originalUrl?: string;
};

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function getAllPosts(): (PostMeta & { contentHtml: string })[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    const processed = remark().use(html).processSync(content);
    return {
      title: decodeEntities(String(data.title || data.slug)),
      slug: String(data.slug || file.replace(/\.md$/, "")),
      date: String(data.date || ""),
      updated: data.updated ? String(data.updated) : undefined,
      author: data.author ? String(data.author) : undefined,
      excerpt: data.excerpt ? decodeEntities(String(data.excerpt)) : undefined,
      categories: Array.isArray(data.categories) ? data.categories.map(String) : [],
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      coverImage: data.coverImage ? String(data.coverImage) : undefined,
      coverImageAlt: data.coverImageAlt ? String(data.coverImageAlt) : undefined,
      originalUrl: data.originalUrl ? String(data.originalUrl) : undefined,
      contentHtml: processed.toString(),
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllPages(): (PageMeta & { contentHtml: string })[] {
  if (!fs.existsSync(pagesDir)) return [];
  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(pagesDir, file), "utf8");
      const { data, content } = matter(raw);
      const pagePath = String(data.path || "/");
      // Page bodies are already HTML from WP
      return {
        title: decodeEntities(String(data.title || data.slug)),
        slug: String(data.slug || ""),
        path: pagePath,
        date: String(data.date || ""),
        excerpt: data.excerpt ? decodeEntities(String(data.excerpt)) : undefined,
        originalUrl: data.originalUrl ? String(data.originalUrl) : undefined,
        contentHtml: content.trim(),
      };
    })
    .filter((p) => p.path !== "/"); // home is handled by app/page
}

export function getPageByPath(segments: string[]) {
  const pagePath = "/" + segments.join("/");
  return getAllPages().find((p) => p.path === pagePath);
}
