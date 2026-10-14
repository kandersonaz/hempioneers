import Link from "next/link";
import type { PostMeta } from "@/lib/content";

export function PostCard({ post }: { post: PostMeta }) {
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <article className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            className="post-card-img"
          />
        ) : (
          <div className="post-card-img placeholder" aria-hidden />
        )}
        <div className="post-card-body">
          <time dateTime={post.date}>{date}</time>
          <h2>{post.title}</h2>
          {post.excerpt ? <p>{post.excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}
