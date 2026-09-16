import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salesforce Trail MCQ Mastery",
  description: "Master Salesforce certifications with dynamic 7-question scenario quizzes powered by Gemini AI",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SF Trail",
  },
  icons: {
    icon: "/icon-192.svg",
    apple: "/icon-192.svg",
  },
};

export const viewport = {
  themeColor: "#0B0F17",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#0B0F17]`}>
      <body className="min-h-full flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-[#0284C7]/30 selection:text-sky-200">
        {/* Mobile Viewport Container: Constrained to 448px (max-w-md), centered on desktop */}
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative bg-[#0B0F17] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-[#243049]/40">
          {children}
        </div>
      </body>
    </html>
  );
}
