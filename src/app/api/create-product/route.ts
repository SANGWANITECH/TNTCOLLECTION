import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/supabase-server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, price, category, target_group, availability, imageUrl } = body;

        const supabase = supabaseServer();

        let uploadedImageUrl: string | null = null;

        if (imageUrl) {
            const base64Data = imageUrl.split(",")[1];
            const buffer = Buffer.from(base64Data, "base64");
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;

            const { error: uploadError } = await supabase.storage
                .from("products") // bucket name
                .upload(fileName, buffer, { contentType: "image/png" });

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            const { data: publicUrlData } = supabase.storage.from("products").getPublicUrl(fileName);
            uploadedImageUrl = publicUrlData.publicUrl;
        }

        const { data, error } = await supabase.from("products").insert([
            {
                name,
                description,
                price,
                category,
                target_group,
                ordered: false,
                is_available: availability,
                image: uploadedImageUrl,
            },
        ]);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
