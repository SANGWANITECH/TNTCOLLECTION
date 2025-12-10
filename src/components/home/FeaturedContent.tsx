export const dynamic = "force-dynamic";
export const revalidate = 0;

import FeaturedTabs from "./FeaturedTabs";
import { supabaseServer } from '@/utils/supabase/supabase-server';
import { FrontendProduct } from "@/app/tnt/types/frontendProduct";

export default async function FeaturedContent() {
    const supabase = supabaseServer();

    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) throw new Error(error.message);

    const products = data as FrontendProduct[];

    const tabData: Record<string, FrontendProduct[]> = { all: [...products] };
    products.forEach((product) => {
        const key = product.category.toLowerCase().replace(/\s+/g, '_');
        if (!tabData[key]) tabData[key] = [];
        tabData[key].push(product);
    });

    return (
        <div className="max-w-[1500px] m-auto">
            <FeaturedTabs tabData={tabData} />
        </div>
    );
}
