// FilterCategoryContext.tsx
'use client'

import { createContext, useContext } from "react";
import { Product } from "@/app/admin/types/product";

interface FilterCategoryContextType {
    products: Product[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedTargetGroup: string;
    setSelectedTargetGroup: (group: string) => void;
    fetchProducts: () => Promise<void>;
    removeProduct: (category: number) => void;
    restoreProducts: (products: Product[]) => void;
}

export const FilterCategoryContext = createContext<FilterCategoryContextType | null>(null);

export const useFilterCategory = () => {
    const context = useContext(FilterCategoryContext);
    if (!context) {
        throw new Error("useFilterCategory must be used within FilterCategoryProvider");
    }
    return context;
};