'use client'

import { ReactNode, useState } from "react";
import { AddProductContext } from "@/app/admin/add-product/context/AddProductContext";

export function AddProductProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [availability, setAvailability] = useState<boolean>(true);

    return (
        <AddProductContext.Provider
            value={{
                selectedCategory,
                setSelectedCategory,
                selectedTargetGroup,
                setSelectedTargetGroup,
                name,
                setName,
                description,
                setDescription,
                price,
                setPrice,
                imageUrl,
                setImageUrl,
                availability,
                setAvailability,
            }}
        >
            {children}
        </AddProductContext.Provider>
    );
}