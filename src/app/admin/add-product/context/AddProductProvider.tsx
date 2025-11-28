'use client'

import { ReactNode, useState } from "react";
import { AddProductContext } from "@/app/admin/add-product/context/AddProductContext";

import { Products } from "@/app/admin/data/products";

export function AddProductProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("");

    return (
        <AddProductContext.Provider
            value={{
                product: Products,
                selectedCategory,
                setSelectedCategory,
                selectedTargetGroup,
                setSelectedTargetGroup
            }}
        >
            {children}
        </AddProductContext.Provider>
    );
}