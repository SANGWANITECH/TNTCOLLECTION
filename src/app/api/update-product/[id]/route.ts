import { supabaseServer } from "@/utils/supabase/supabase-server";
import {NextResponse} from "next/server";

export async function PUT( req: Request ) {
    try {
        const body = await req.json();
        const {
            id,
            name,
            description,
            price,
            category,
            target_group,
            availability,
            imageUrl,
        } = body;

        const supabase = supabaseServer();

        //fetching existing products (to get old image)
        const { data: existing, error:fetchError } = await supabase
            .from("products")
            .select("image")
            .eq("id",id)
            .single();

        if (fetchError || !existing) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        let finalImageName = existing.image;

        //if image is base64 -> upload new image
        if(imageUrl.startsWith("data:image/")){
            // Delete old image (if exists)
            if(existing.image){
                await supabase.storage
                    .from("products")
                    .remove(existing.image);
            }

            //upload new image
            const base64Data = imageUrl.split(",")[1];
            const buffer = Buffer.from(base64Data, "base64");
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;

            const { error: uploadError } = await supabase.storage
                .from("products")
                .upload(fileName, buffer, {
                    contentType: "image/png",
                    upsert: false
                });

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            finalImageName = fileName;
        }

        // Update product row
        const {error: updateError } = await supabase
            .from('products')
            .update({
                name,
                description,
                price,
                category,
                target_group,
                is_available: availability,
                image: finalImageName,
            })
            .eq("id", id)

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    }catch (err){
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        );
    }
}