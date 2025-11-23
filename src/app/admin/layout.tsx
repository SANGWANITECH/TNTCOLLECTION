// app/admin/layout.tsx
import React from "react";
import AdminHeader from "@/components/adminComponents/AdminHeader";


export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <AdminHeader/>
                <div style={{ display: "flex", minHeight: "100vh" }}>
                           {/* Main content */}
                    <main style={{ flex: 1, padding: "2rem" }}>
                        {children}
                    </main>
                </div>
        </div>
    );
}