// app/admin/layout.tsx
import React from "react";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
                <div >
                    {/* Main content */}
                    <div>
                        <main >
                            {children}
                        </main>
                    </div>
                </div>
    );
}