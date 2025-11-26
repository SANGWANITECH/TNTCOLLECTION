'use client'
import { useSidebarContext } from "@/app/admin/context/SiderbarContext";

export default function AdminSidebar() {
    const { isSidebarOpen } = useSidebarContext();

    return (
        <div>
            {/* Sidebar is always visible on md+ */}
            <div
                className={`
          flex flex-col items-center justify-center w-[250px]
          ${isSidebarOpen ? "block" : "hidden"} md:block
        `}
            >
                <p>Game</p>
                <p>Search</p>
                <p>BMX Br</p>
                <p>MHAI</p>
            </div>
        </div>
    );
}