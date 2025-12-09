import FeaturedTabs from "./FeaturedTabs";
import { supabaseServer } from '@/utils/supabase/supabase-server';
import { FrontendProduct } from "@/app/tnt/types/frontendProduct";

export default async function FeaturedContent(){
    const supabase = supabaseServer();

    try {
        const { data, error } = await supabase.from('products').select('*');

        if (error) throw new Error(error.message);

        const products = data as FrontendProduct[];

        // Dynamically create category-based tabData
        const tabData: Record<string, FrontendProduct[]> = { all: [...products] };
        products.forEach((product) => {
            const key = product.category.toLowerCase().replace(/\s+/g, '_'); // e.g., "Women's clothing" -> "womens_clothing"
            if (!tabData[key]) tabData[key] = [];
            tabData[key].push(product);
        });

        return (
            <div className="max-w-[1500px] m-auto">
                <FeaturedTabs tabData={tabData} />
            </div>
        );
    } catch (err) {
        console.error("Error fetching products:", err);
        return (
            <div className="text-center my-6 p-6">
                <h3 className="text-h3">⚠️ Oops!</h3>
                <p className="text-text-secondary">
                    We couldn’t load featured products. Please check your connection and try again.
                </p>
            </div>
        );
    }
};

