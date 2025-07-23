import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "BitGold Thailand - ราคาทองคำและ Bitcoin",
  description: "ติดตามราคาทองคำและ Bitcoin เป็นเงินบาทแบบเรียลไทม์ พร้อมกราฟแสดงการเปลี่ยนแปลงราคา รองรับการใช้งานบนมือถือ",
  keywords: "ราคาทองคำ, Bitcoin, BTC, ราคาบิทคอย, เงินบาท, THB, กราฟราคา, Thailand",
  authors: [{ name: "BitGold Thailand" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  openGraph: {
    title: "BitGold Thailand - ราคาทองคำและ Bitcoin",
    description: "ติดตามราคาทองคำและ Bitcoin เป็นเงินบาทแบบเรียลไทม์",
    type: "website",
    locale: "th_TH",
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
      </body>
    </html>
  );
}
