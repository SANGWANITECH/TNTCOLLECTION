// /api/fetchproducts/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabase-server";

export async function GET() {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}
