import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Precise Learning Burari | Tuition for Classes 6–12",
  description:
    "Tuition for Classes 6–12 in Burari, Delhi. Ask about Mathematics, Science, Physics, Chemistry, English and Social Science batches.",
  openGraph: {
    title: "Precise Learning Burari | Tuition for Classes 6–12",
    description:
      "Tuition for Classes 6–12 in Burari, Delhi. Contact us for subjects, batch availability and timings.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
