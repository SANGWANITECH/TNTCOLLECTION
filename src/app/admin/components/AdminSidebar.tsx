'use client'
import { useSidebarContext } from "@/app/admin/context/SiderbarContext";
import { LayoutDashboard, ShieldUser, ShoppingBasket, PackagePlus, ShoppingBag, Bell, Settings, Search } from 'lucide-react';
import Link from "next/link";


const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Products", icon: ShoppingBasket, href: "/admin/products" },
    { label: "Add Product", icon: PackagePlus, href: "/admin/add-product" },
    { label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { label: "Notifications", icon: Bell, href: "/admin/notifications" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
    { label: "What users search", icon: Search, href: "/admin/users-search" },
]

export default function AdminSidebar() {
    const { isSidebarOpen } = useSidebarContext();

    return (
        <div>
            {/* Sidebar is always visible on md+ */}

            <div
                className={`
          flex flex-col w-[200px]
          p-4 
          ${isSidebarOpen ? "block" : "hidden"} md:block
        `}
            >
                <h2 className={'font-medium text-lg flex items-center gap-2 mb-4 pt-4'}>
                    <ShieldUser className="w-5 h-5 text-green-500" />
                    T&T Admin
                </h2>
                <div className="flex flex-col gap-2">
                    {sidebarItems.map(({ label, icon: Icon, href }) => (
                        <Link href={href} key={label} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                            <Icon className="w-4 h-4" />
                            <p className="font-medium text-sm">{label}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}