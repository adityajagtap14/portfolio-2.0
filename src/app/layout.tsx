import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya S Jagtap — Full-Stack Developer & Tech Enthusiast",
  description:
    "Portfolio of Aditya S Jagtap — a Full-Stack Developer, IoT enthusiast, and CS student at Shetty Institute of Technology. Building impactful software from web apps to microcontrollers.",
  keywords: [
    "Aditya Jagtap",
    "portfolio",
    "full-stack developer",
    "Next.js",
    "React",
    "IoT",
    "Arduino",
    "web developer",
  ],
  authors: [{ name: "Aditya S Jagtap" }],
  openGraph: {
    title: "Aditya S Jagtap — Full-Stack Developer",
    description:
      "Building digital experiences that bridge software, hardware, and human connection.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
