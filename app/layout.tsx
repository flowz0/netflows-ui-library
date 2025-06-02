import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LibraryNav from "./components/LibraryNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netflows UI Library",
  description: "React UI component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <LibraryNav />
        {children}
      </body>
    </html>
  );
}
