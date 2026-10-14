import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          <Link href="/" className="brand-sm">
            <Image
              src="/logo.png"
              alt="Hempioneers"
              width={180}
              height={46}
              className="brand-logo brand-logo-sm"
            />
          </Link>
        </p>
        <p className="muted">
          Cannabis industry news, science, and policy.
        </p>
      </div>
    </footer>
  );
}
