import type { ReactNode } from "react";
import Link from "next/link";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <div className="legal-wrap">
        <header className="legal-header">
          <Link href="/" className="legal-brand">
            Precise Learning <span>Burari, Delhi</span>
          </Link>
          <Link href="/" className="legal-home">
            Back to website
          </Link>
        </header>
        <article className="legal-content">
          <p className="legal-kicker">Precise Learning Burari</p>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: 26 September 2026</p>
          {children}
        </article>
        <footer className="legal-footer">
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-and-conditions">Terms and conditions</Link>
          <a href="mailto:preciselearning0014@gmail.com">Contact us</a>
        </footer>
      </div>
    </main>
  );
}
