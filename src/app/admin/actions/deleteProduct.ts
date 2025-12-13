'use server'

import { createClient } from "@/utils/supabase/server";

export async function deleteProduct(productId: number) {
    const supabase = await createClient();

    // 1️⃣ Get the product first
    const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("image")
        .eq("id", productId)
        .single();

    if (fetchError) {
        throw new Error("Failed to fetch product");
    }

    // 2️⃣ Delete image from storage (if it exists)
    if (product?.image) {
        const { error: storageError } = await supabase.storage
            .from("products") // bucket name
            .remove([product.image]);

        if (storageError) {
            throw new Error("Failed to delete product image");
        }
    }

    // 3️⃣ Delete product row
    const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (deleteError) {
        throw new Error("Failed to delete product");
    }
}
