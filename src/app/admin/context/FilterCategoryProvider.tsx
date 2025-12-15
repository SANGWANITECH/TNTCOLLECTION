// FilterCategoryProvider.tsx
'use client'

import { ReactNode, useState, useEffect, useCallback } from "react";
import { FilterCategoryContext } from "@/app/admin/context/FilterCategoryContext";
import { Product } from "@/app/admin/types/product";

interface Props {
    children: ReactNode;
}

export function FilterCategoryProvider({ children }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("");

    // Define fetchProducts with useCallback to memoize it
    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch("/api/fetchproducts");
            const data: Product[] = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    }, []);

    // Fetch products from API on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <FilterCategoryContext.Provider
            value={{
                products,
                fetchProducts,
                selectedCategory,
                setSelectedCategory,
                selectedTargetGroup,
                setSelectedTargetGroup
            }}
        >
            {children}
        </FilterCategoryContext.Provider>
    );
}