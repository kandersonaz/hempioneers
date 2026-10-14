import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <Image
            src="/logo.png"
            alt="Hempioneers"
            width={220}
            height={56}
            className="brand-logo"
            priority
          />
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
