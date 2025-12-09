// app/tnt/layout.tsx
import React from "react";
import Header from "@/components/Heade";
import Footer from "@/components/Footer";


export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <div className={'antialiased min-h-screen flex flex-col'}>
                {/* Main content */}
                    <Header />
                    <main className="pt-21 pb-20 flex-grow">
                        {children}
                    </main>
                    <Footer />
            </div>
        </div>
    );
}