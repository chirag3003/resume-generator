import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Professional Resume Builder - AI Powered",
    template: "%s | Resume Builder",
  },
  description:
    "Create professional, ATS-friendly resumes in minutes with our AI-powered resume builder. Built by Chirag Bhalotia.",
  keywords: [
    "resume",
    "builder",
    "ai",
    "cv",
    "career",
    "job search",
    "Chirag Bhalotia",
    "Full-Stack Developer",
    "Resume Generator",
  ],
  authors: [{ name: "Chirag Bhalotia", url: "https://chirag.codes" }],
  creator: "Chirag Bhalotia",
  publisher: "Chirag Bhalotia",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Professional Resume Builder - AI Powered",
    description:
      "Create professional, ATS-friendly resumes in minutes with our AI-powered resume builder.",
    siteName: "Resume Builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Resume Builder - AI Powered",
    description:
      "Create professional, ATS-friendly resumes in minutes with our AI-powered resume builder.",
    creator: "@CBhalotia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
