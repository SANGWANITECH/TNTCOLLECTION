'use client'
import { Menu } from "lucide-react";
import {useSidebarContext} from "@/app/admin/context/SiderbarContext";

export default function ToggleSidebar() {
    const {setIsSidebarOpen} = useSidebarContext();

    return (
        <div>
        <Menu
            onClick={() => {setIsSidebarOpen(prev => !prev)}}
            className={'md:hidden w-5 h-5'}
        />
        </div>
    );
}