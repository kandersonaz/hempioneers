import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "All Hempioneers articles on cannabis science, policy, and industry.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="section">
      <div className="wrap">
        <h2>Blog</h2>
        <p className="muted" style={{ marginBottom: "1.5rem" }}>
          {posts.length} articles
        </p>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
