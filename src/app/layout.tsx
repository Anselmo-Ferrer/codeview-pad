import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Codeview Pad",
  description: "Educational platform to prepare you for dev interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>
      </head>
      <body className={`${inter.className} antialiased relative h-screen bg-[#FBFAE1]`}>
        <div className="absolute top-0 left-0 w-[800px] h-[400px] bg-gradient-to-br from-[#04DEAD] to-transparent blur-3xl opacity-30 pointer-events-none" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
