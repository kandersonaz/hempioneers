import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="article">
      <header className="article-hero">
        <time dateTime={post.date}>{date}</time>
        {post.author ? <span className="meta"> · {post.author}</span> : null}
        <h1>{post.title}</h1>
        {post.categories?.length ? (
          <p className="meta">{post.categories.join(" · ")}</p>
        ) : null}
      </header>
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.coverImageAlt || post.title}
          className="cover"
        />
      ) : null}
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
