// Import the server Supabase client
import { supabaseServer } from "@/utils/supabase/supabase-server";

export default async function AdminDashboardPage() {
    const supabase = supabaseServer();
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        return <div>Error loading products</div>;
    }

    console.log(products);

    return (
        <div>
            Admin Dashboard Page
        </div>
    );
}
