'use client'

import { createContext, useContext } from "react";

interface AddProductContextType {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedTargetGroup: string;
    setSelectedTargetGroup: (group: string) => void;
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (desc: string) => void;
    price: number;
    setPrice: (price: number) => void;
    imageUrl: string;
    setImageUrl: (url: string) => void;
    availability: boolean;
    setAvailability: (available: boolean) => void;
}

export const AddProductContext = createContext<AddProductContextType | null>(null);

export const useAddProduct = () => {
    const context = useContext(AddProductContext);
    if (!context) {
        throw new Error("useAddProduct must be used within AddProductProvider");
    }
    return context;
};