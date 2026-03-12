import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowHR",
  description:
    "FlowHR UI rebuilt on Next.js, TypeScript, Supabase, Prisma, and Vercel-ready structure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
