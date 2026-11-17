import type { Metadata } from "next";
import { MainLayout } from "@/components/layout";
import { brandFontStyle } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // Figma `10 · Favicon & Site Icon` documents the tab title format as
  // "Page name — The Working Tribe".
  title: {
    default: "The Working Tribe",
    template: "%s — The Working Tribe",
  },
  description:
    "A people-first transformation firm. We advise leaders on where to go — and build the capability to get there.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" style={brandFontStyle}>
      <body className="flex min-h-full flex-col">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
