// app/admin/layout.tsx
import React from "react";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div >
                <div style={{ display: "flex", minHeight: "100vh" }}>
                           {/* Main content */}
                    <main style={{ flex: 1, padding: "2rem" }}>
                        {children}
                    </main>
                </div>
        </div>
    );
}