'use client'

import {ReactNode, useState} from "react";
import {SidebarContext} from "@/app/admin/context/SiderbarContext";

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    return (
        <SidebarContext value={{isSidebarOpen, setIsSidebarOpen}}>
            {children}
        </SidebarContext>
    )
}