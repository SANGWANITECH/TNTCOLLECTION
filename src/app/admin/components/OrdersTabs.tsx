'use client'

import { useState } from "react";
import { Order, OrderStatus } from "@/app/admin/types/order";

const TABS: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Sold", value: "sold" },
    { label: "Cancelled", value: "cancelled" },
];

export default function OrdersTabs({ orders }: { orders: Order[] }) {
    const [filter, setFilter] = useState<OrderStatus | "all">("all");

    const filteredOrders =
        filter === "all"
            ? orders
            : orders.filter(order => order.status === filter);

    return (
        <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-2">
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={`px-2 sm:px-4 py-2 rounded-md text-sm transition ${
                            filter === tab.value
                                ? "bg-white text-black border border-gray-200"
                                : "bg-neutral-800 text-white hover:bg-neutral-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Debug view (temporary) */}
            <div className="space-y-2 text-sm text-neutral-400">
                {filteredOrders.map(order => (
                    <div key={order.id}>
                        Order #{order.id} — {order.status}
                    </div>
                ))}
            </div>
        </div>
    );
}
