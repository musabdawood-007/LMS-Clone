import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UET Lahore LMS - AI-Powered Learning Management System",
  description: "University of Engineering and Technology, Lahore - AI-Powered Learning Management System",
  keywords: ["UET", "Lahore", "LMS", "Learning Management System", "AI", "Education", "Engineering"],
  authors: [{ name: "Musab Dawood" }],
  icons: { icon: "/uet-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8fafc] text-slate-800`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}