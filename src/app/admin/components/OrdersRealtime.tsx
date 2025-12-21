'use client'

import { useEffect, useState } from "react";
import OrdersTabs from "./OrdersTabs";
import { createClient } from "@/utils/supabase/client";
import { Order } from "@/app/admin/types/order";

export default function OrdersClient({
                                         initialOrders
                                     }: {
    initialOrders: Order[];
}) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    useEffect(() => {
        const supabase = createClient();

        const channel = supabase
            .channel("orders-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "orders",
                },
                payload => {
                    setOrders(prev => {
                        if (payload.eventType === "INSERT") {
                            return [payload.new as Order, ...prev];
                        }

                        if (payload.eventType === "UPDATE") {
                            return prev.map(order =>
                                order.id === payload.new.id
                                    ? payload.new as Order
                                    : order
                            );
                        }

                        if (payload.eventType === "DELETE") {
                            return prev.filter(
                                order => order.id !== payload.old.id
                            );
                        }

                        return prev;
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return <OrdersTabs orders={orders} />;
}
