'use client'

import { ReactNode, useState } from "react";
import { AddProductContext } from "@/app/admin/context/AddProductContext";

export function AddProductProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("women's clothing");
    const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("women");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>('');
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