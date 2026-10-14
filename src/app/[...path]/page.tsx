import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPages, getPageByPath } from "@/lib/content";

type Props = { params: Promise<{ path: string[] }> };

export function generateStaticParams() {
  return getAllPages().map((p) => ({
    path: p.path.replace(/^\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const page = getPageByPath(path);
  if (!page) return {};
  return {
    title: page.title,
    description: page.excerpt,
  };
}

export default async function CmsPage({ params }: Props) {
  const { path } = await params;
  const page = getPageByPath(path);
  if (!page) notFound();

  return (
    <article className="prose-page">
      <h1>{page.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </article>
  );
}
