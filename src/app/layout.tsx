import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowHR V2",
  description: "FlowHR V2 core implementation for approved Office, Retail, and Platform packs.",
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
