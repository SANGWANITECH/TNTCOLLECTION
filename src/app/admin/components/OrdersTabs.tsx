'use client'

import { useState } from "react";
import { Order, OrderStatus } from "@/app/admin/types/order";
import Image from "next/image";
import MarkAsSoldButton from "@/app/admin/components/MarkAsSoldButton";
import CancelOrderButton from "@/app/admin/components/CancelOrderButton";

const TABS: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All Orders", value: "all" },
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


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: OrderStatus) => {
        switch(status) {
            case 'sold': return 'bg-[#4b8e47]';
            case 'cancelled': return 'bg-red-500';
            case 'pending': return 'bg-yellow-400';
            default: return 'bg-yellow-400';
        }
    };


    return (
        <div className="space-y-4 px-4 py-6 max-w-[800px] mx-auto">
            {/* Tabs */}
            <div className="flex gap-2">
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={`px-2 sm:px-4 py-2 rounded-md text-xs transition ${
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
                {filteredOrders.map(order => {
                    const orderTotal = order.products.reduce(
                        (sum, product) => sum + product.price * product.quantity,
                        0
                    );

                    return (
                        <div key={order.id} className={'card mb-3 flex flex-col gap-3'}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-800 dark:text-white font-semibold text-[16px]">
                                        Order #{order.id}
                                    </p>
                                    <p className="text-xs">{formatDate(order.order_date)}</p>
                                </div>
                                <div>
                                    <p className={`text-white ${getStatusColor(order.status)} rounded-lg py-1 px-2 w-fit`}>
                                        {order.status}
                                    </p>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="space-y-3 mb-3">
                                {order.products.map(product => (
                                    <div
                                        key={product.id}
                                        className="flex items-center gap-3 bg-gray-300 dark:bg-[#1e1e1e] border border-none rounded-[5px] p-2"
                                    >
                                        <div className="relative w-[60px] h-[60px] bg-gray-400 dark:bg-[#2a2a2a] rounded-[5px] overflow-hidden">
                                            <Image
                                                src={`https://ovapnnyjvmiqnoqgdarc.supabase.co/storage/v1/object/public/products/${product.image}`}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                                sizes="60px"
                                                priority={false}
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="dark:text-white text-sm truncate">
                                                {product.title}
                                            </p>
                                            <p className="text-[#888] text-xs capitalize mt-1">
                                                {product.category}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="dark:text-white text-[12px]">
                                                MKW {product.price.toLocaleString()}
                                            </p>
                                            <p className="text-[#888] text-[10px] mt-1">
                                                Qty: {product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Total */}
                            <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                                <p className="dark:text-white font-semibold text-[14px]">
                                    Total
                                </p>
                                <p className="dark:text-white font-bold text-[16px]">
                                    MKW {orderTotal.toLocaleString()}
                                </p>
                            </div>
                            {/* Action Buttons */}
                            {order.status === "pending" && (
                                <div className="flex gap-2 mt-4">
                                    <MarkAsSoldButton orderId={order.id} />

                                    <CancelOrderButton orderId={order.id} />
                                </div>
                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
}
