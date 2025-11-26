'use client'
import { useSidebarContext } from "@/app/admin/context/SiderbarContext";
import {
    LayoutDashboard,
    ShieldUser,
    ShoppingBasket,
    PackagePlus,
    ShoppingBag,
    Bell,
    Settings,
    Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Products", icon: ShoppingBasket, href: "/admin/products" },
    { label: "Add Product", icon: PackagePlus, href: "/admin/add-product" },
    { label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { label: "Notifications", icon: Bell, href: "/admin/notifications" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
    { label: "What users search", icon: Search, href: "/admin/users-search" },
];

export default function AdminSidebar() {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (window.innerWidth < 768) {
                if (
                    sidebarRef.current &&
                    !sidebarRef.current.contains(event.target as Node)
                ) {
                    setIsSidebarOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsSidebarOpen]);

    return (
        <>
            {/* Backdrop overlay on mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0  bg-opacity-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed left-0 z-40
                flex flex-col w-[200px] h-screen
                p-4 shadow-md border-r bg-white dark:bg-background-color-dark border-border-light dark:border-border-dark
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
              `}
            >
                <h2 className="font-medium text-lg flex items-center gap-2 mb-4">
                    <ShieldUser className="w-5 h-5 text-green-500" />
                    T&T Admin
                </h2>
                <div className="flex flex-col gap-2">
                    {sidebarItems.map(({ label, icon: Icon, href }) => (
                        <Link
                            href={href}
                            key={label}
                            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                            onClick={() => {
                                // Close sidebar on mobile after navigation
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }}
                        >
                            <Icon className="w-4 h-4" />
                            <p className="font-medium text-sm">{label}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}