import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          Hempioneers
        </Link>
        <nav className="nav">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/science">Science</Link>
          <Link href="/legal">Legal</Link>
          <Link href="/business">Business</Link>
          <Link href="/more-info/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
