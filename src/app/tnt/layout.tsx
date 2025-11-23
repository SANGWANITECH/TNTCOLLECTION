// app/tnt/layout.tsx
import React from "react";
import Header from "@/components/Heade";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartProvider";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <div className={'antialiased min-h-screen flex flex-col'}>
                {/* Main content */}
                <CartProvider>
                    <Header />
                    <main className="pt-21 pb-20 flex-grow">
                        {children}
                    </main>
                    <Footer />
                </CartProvider>
            </div>
        </div>
    );
}