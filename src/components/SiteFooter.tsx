import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          <Link href="/" className="brand-sm">
            Hempioneers
          </Link>
        </p>
        <p className="muted">
          Cannabis industry news, science, and policy — archived static edition.
        </p>
      </div>
    </footer>
  );
}
