import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "A starter for clean Next.js projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
