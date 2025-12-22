import React from "react";
import {AddProductProvider} from "@/app/admin/context/AddProductProvider";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <main >
                {children}
            </main>
        </div>
    );
}