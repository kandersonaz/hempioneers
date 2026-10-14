import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import {
  getAllCategories,
  getCategoryByPath,
  getPostsByCategorySlug,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({
    slug: c.path.replace(/^\/category\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryByPath(slug);
  if (!category) return {};
  return {
    title: category.name,
    description:
      category.description ||
      `Articles in the ${category.name} category on Hempioneers.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryByPath(slug);
  if (!category) notFound();

  const posts = getPostsByCategorySlug(category.slug);

  return (
    <section className="section">
      <div className="wrap">
        <h2>{category.name}</h2>
        {category.description ? (
          <p className="muted" style={{ marginBottom: "0.5rem" }}>
            {category.description}
          </p>
        ) : null}
        <p className="muted" style={{ marginBottom: "1.5rem" }}>
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
        {posts.length ? (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="muted">No articles in this category yet.</p>
        )}
      </div>
    </section>
  );
}
