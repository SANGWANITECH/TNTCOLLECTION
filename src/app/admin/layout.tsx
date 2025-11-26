// app/admin/layout.tsx
import React from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import {SidebarProvider} from "@/app/admin/context/SidebarProvider";


export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider >
            <AdminHeader/>
                <div style={{ display: "flex", minHeight: "100vh" }}>
                           {/* Main content */}
                    <div className={'pt-12 flex-1 flex items-start'}>
                        <AdminSidebar />
                        <main className={ " p-2 h-full w-full md:ml-[200px]" }>
                            {children}
                        </main>
                    </div>
                </div>
        </SidebarProvider>
    );
}