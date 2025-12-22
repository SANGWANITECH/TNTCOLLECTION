'use client'

import { useState } from "react";
import { toast } from "sonner";

export default function MarkAsSoldButton({ orderId }: { orderId: number }) {
    const [loading, setLoading] = useState(false);

    const handleMarkAsSold = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/orders/mark-sold", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Order marked as sold ✅");
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleMarkAsSold}
            disabled={loading}
            className="flex-1 bg-[#4b8e47] hover:bg-[#5a9d56] transition-colors rounded-[5px] py-2 disabled:opacity-50"
        >
            {loading ? "Updating..." : "Mark as Sold"}
        </button>
    );
}
