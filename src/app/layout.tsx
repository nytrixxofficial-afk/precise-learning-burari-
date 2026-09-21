import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Precise Learning Burari | Better thinking begins here",
  description: "Premium tuition and coaching for Classes 6–12 in Burari, Delhi.",
  openGraph: { title: "Precise Learning Burari", description: "Thoughtful teaching for curious minds.", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
