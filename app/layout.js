// "use client";
// import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Toast from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import FooterBar from "@/components/FooterBar";
import "./globals.css";
import HeaderBarNew from "@/components/HeaderBarNew";
import TawkToWidget from "@/components/TawkToWidget";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ClientLayout from "./ClientLayout";
// import { useProductStore } from "@/stores/InitdataFetch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NepKart — Shop, Sell, Connect.",
  description:
    "NepKart — Nepal’s ultimate online marketplace for electronics, fashion, cosmetics, groceries, and pre-loved items. Shop from trusted sellers, discover great deals, and get fast delivery across Nepal.",
  keywords: [
  "online shopping Nepal",
  "NepKart",
  "buy electronics online Nepal",
  "cosmetics online Nepal",
  "fashion clothing Nepal",
  "grocery delivery Nepal",
  "second-hand goods Nepal",
  "used electronics online",
  "home appliances Nepal",
  "smartphones Nepal",
  "laptops Nepal",
  "beauty products Nepal",
  "makeup online Nepal",
  "personal care products Nepal",
  "men's fashion Nepal",
  "women's fashion Nepal",
  "kids clothing online Nepal",
  "shoes online Nepal",
  "bags and accessories Nepal",
  "online marketplace Nepal",
  "multi-vendor shopping Nepal",
  "affordable online shopping Nepal",
  "daily essentials Nepal",
  "buy second-hand items Nepal",
  "used furniture Nepal",
  "online deals Nepal",
  "discounts Nepal",
  "top brands Nepal",
  "fast delivery Nepal"
],
  icons: {
    icon: "logo.ico",
  },
};

export default function RootLayout({ children }) {

   

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
       
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <HeaderBarNew />
           <ClientLayout>{children}</ClientLayout>
     
        <CookieConsentBanner />
        <FooterBar />
        <TawkToWidget />
        <Toaster position="top-right" />
        <Toast />
      </body>
    </html>
  );
}
