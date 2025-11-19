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
                    {/* Sidebar */}
                    <aside
                        style={{
                            width: "220px",
                            background: "#1e293b",
                            color: "#fff",
                            padding: "1rem",
                        }}
                    >
                        <h2>Admin Panel</h2>
                        <nav>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                <li><a href="/admin/login" style={{ color: "#fff" }}>Login</a></li>
                                <li><a href="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</a></li>
                                <li><a href="/admin/settings" style={{ color: "#fff" }}>Settings</a></li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main content */}
                    <main style={{ flex: 1, padding: "2rem" }}>
                        {children}
                    </main>
                </div>
        </div>
    );
}