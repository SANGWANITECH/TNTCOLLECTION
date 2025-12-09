import React from "react";
import {AddProductProvider} from "@/app/admin/add-product/context/AddProductProvider";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
                <AddProductProvider >
                    {/* Main content */}
                    <div>
                        <main >
                            {children}
                        </main>
                    </div>
                </AddProductProvider>
    );
}