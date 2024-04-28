import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const inter = Merriweather({
  weight: ["300", "400"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Findd",
  description: "Meet someone just like you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
