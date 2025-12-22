import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(req: Request) {
    const supabase = await createClient();

    // 👇 Get logged-in user from session
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { orderId } = await req.json();

    if (!orderId) {
        return NextResponse.json(
            { error: "Order ID is required" },
            { status: 400 }
        );
    }

    const { error } = await supabase
        .from("orders")
        .update({
            status: "sold",
            admin_id: user.id, // 🔥 REAL admin
        })
        .eq("id", orderId);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}
