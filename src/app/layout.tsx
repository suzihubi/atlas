import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUM Atlas — Global Strategic Network",
  description:
    "AUM Group's global operational architecture: jurisdictions, sourcing corridors, storage network, sukuk framework and product structure — visualized on an interactive 3D globe.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a1410",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
