import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 9);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Hempioneers</h1>
            <p>
              Independent coverage of cannabis science, policy, and industry.
            </p>
            <div className="cta-row">
              <Link href="/blog" className="btn btn-primary">
                Read the blog
              </Link>
              <Link href="/about" className="btn btn-ghost">
                About the project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Latest stories</h2>
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
