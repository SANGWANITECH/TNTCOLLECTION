import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://tnt-collection.store"),
    title: {
        default: "TNT COLLECTION | Modern Curated Essentials",
        template: "%s | TNT COLLECTION",
    },
    description: "TNT COLLECTION is a modern ecommerce brand offering curated essentials with clean design, fluid responsiveness, and semantic clarity. Discover products that elevate everyday living through simplicity and style.",
    keywords: ["e-commerce", "curated essentials", "modern design", "fashion",'clothing', 'male clothing','female clothing', 'tntcollection','tnt-collection','malawi e-commerce','e-commerce'],
    authors: [{ name: "TNT Team" }],
    creator: "TNT COLLECTION",

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tnt-collection.store",
        title: "TNT COLLECTION | Modern Curated Essentials",
        description: "Elevate your everyday living through simplicity and style.",
        siteName: "TNT COLLECTION",
        images: [
            {
                url: "/logo.png", // Create this 1200x630 image in your /public folder
                width: 1200,
                height: 630,
                alt: "TNT COLLECTION - Curated Essentials",
            },
        ],
    },

    // Twitter (X)
    twitter: {
        card: "summary_large_image",
        title: "TNT COLLECTION",
        description: "Curated essentials for modern living.",
        images: ["/logo.png"],
        creator: "@TNT_Collection",
    },

    // Icons
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
      <CartProvider>
                      <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div>
                  {children}
                  <Toaster position="top-right" />
              </div>
            </ThemeProvider>
      </CartProvider>
      </body>
    </html>
  );
}
