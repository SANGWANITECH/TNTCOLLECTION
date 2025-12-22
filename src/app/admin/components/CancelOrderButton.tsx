'use client'

import { useState } from "react";
import { toast } from "sonner";

export default function CancelOrderButton({ orderId }: { orderId: number }) {
    const [loading, setLoading] = useState(false);

    const handleCancelOrder = async () => {
        // Confirmation is always good for destructive actions like cancelling
        if (!confirm("Are you sure you want to cancel this order?")) return;

        setLoading(true);
        try {
            const res = await fetch("/api/orders/cancel", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            toast.success("Order cancelled ❌");
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCancelOrder}
            disabled={loading}
            className="flex-1 bg-[#ff383c] hover:bg-[#ff4a4e] transition-colors rounded-[5px] py-2 disabled:opacity-50 text-white"
        >
            {loading ? "Cancelling..." : "Cancel Order"}
        </button>
    );
}
