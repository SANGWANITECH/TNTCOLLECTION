"use client";

import { useEffect, useState } from "react";
import FeaturedTabs from "./FeaturedTabs";
import { FrontendProduct } from "@/app/tnt/types/frontendProduct";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function FeaturedContent() {
    const [products, setProducts] = useState<FrontendProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/fetchproducts");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        // Show 6 skeleton cards while loading
        const skeletons = Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />);
        return <div className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">{skeletons}</div>;
    }

    if (!products.length) {
        return (
            <div className="flex flex-col items-center justify-center p-6 border rounded-xl text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg font-semibold">No products found</p>
                <p className="text-sm">Please try another category.</p>
            </div>
        );
    }

    const tabData: Record<string, FrontendProduct[]> = { all: [...products] };
    products.forEach((product) => {
        const key = product.category.toLowerCase().replace(/\s+/g, "_");
        if (!tabData[key]) tabData[key] = [];
        tabData[key].push(product);
    });

    return (
        <div className="max-w-[1500px] m-auto">
            <FeaturedTabs tabData={tabData} />
        </div>
    );
}
