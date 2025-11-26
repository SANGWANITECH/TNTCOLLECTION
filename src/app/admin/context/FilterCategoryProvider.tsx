// FilterCategoryProvider.tsx
'use client'

import { ReactNode, useState } from "react";
import { FilterCategoryContext } from "@/app/admin/context/FilterCategoryContext";
import { Products } from "@/app/admin/data/products";

export function FilterCategoryProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("");

    return (
        <FilterCategoryContext.Provider
            value={{
                products: Products,
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