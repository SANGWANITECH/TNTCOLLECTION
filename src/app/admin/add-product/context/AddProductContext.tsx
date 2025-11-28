'use client'

import { createContext, useContext } from "react";
import { AddProduct } from "@/app/admin/types/product";

interface AddProductContextType {
    product: AddProduct[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedTargetGroup: string;
    setSelectedTargetGroup: (group: string) => void;
}

export const AddProductContext = createContext<AddProductContextType | null>(null);

export const useAddProduct = () => {
    const context = useContext(AddProductContext);
    if (!context) {
        throw new Error("useAddProduct must be used within AddProductProvider");
    }
    return context;
};