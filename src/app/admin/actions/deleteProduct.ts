'use server'

import { createClient } from "@/utils/supabase/server";

export async function deleteProduct(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}