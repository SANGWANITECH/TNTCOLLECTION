import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabase-server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cartItems } = body;

        if (!cartItems || !cartItems.length) {
            return NextResponse.json(
                { error: "No products provided" },
                { status: 400 }
            );
        }

        const supabase = supabaseServer();

        const { data, error } = await supabase
            .from("orders")
            .insert([
                {
                    products: cartItems,
                    status: "pending",
                    admin_id: null,
                },
            ])
            .select("id")
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ orderId: data.id });
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        );
    }
}
