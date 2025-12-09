'use client'

import { useAddProduct } from "@/app/admin/add-product/context/AddProductContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { validateProductForm } from "@/utils/validateProduct";

export default function CreateProduct() {
    const { selectedCategory, selectedTargetGroup, imageUrl, price, name, description, availability } = useAddProduct();
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(false);
        setMessage("");

        const formData = {
            name,
            description,
            price,
            selectedCategory,
            selectedTargetGroup,
            imageUrl,
            availability
        };

        const validation = validateProductForm(formData);
        if (!validation.isValid) {
            setMessage(validation.message);
            setError(true);
            setIsLoading(false);
            // You could also set individual field errors here
            return;
        }

        // Convert price to number
        const numericPrice = parseFloat(price);

        // Validate that price is a valid number
        if (isNaN(numericPrice)) {
            setMessage("Error: Price must be a valid number");
            setError(true);
            setIsLoading(false);
            return;
        }

        const res = await fetch("/api/create-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                description,
                price: numericPrice, // Send as number
                category: selectedCategory,
                target_group: selectedTargetGroup,
                availability,
                imageUrl,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Product created successfully!");
            setError(false);
            setIsLoading(false);
        } else {
            setMessage("Error: " + data.error);
            setError(true);
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col space-y-2 items-center">
            <div className={`${error ? "text-red-400" : "text-green-600"} pb-1`}>{message}</div>
            <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-[#3B85F4] w-full text-lg text-white"
                size="xl"
            >
                {isLoading ? "Creating product..." : "Create Product"}
            </Button>
        </div>
    );
}