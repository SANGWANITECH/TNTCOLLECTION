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
  title: "TNT COLLECTION",
  description: "TNT COLLECTION is a modern ecommerce brand offering curated essentials with clean design, fluid responsiveness, and semantic clarity. Discover products that elevate everyday living through simplicity and style.",
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
