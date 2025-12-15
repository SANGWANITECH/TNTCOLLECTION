'use client'

import { useAddProduct } from "@/app/admin/add-product/context/AddProductContext";
import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { validateProductForm } from "@/utils/validateProduct";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function CreateProduct() {
    const {
        selectedCategory,
        selectedTargetGroup,
        imageUrl,
        price,
        name,
        description,
        availability,
    } = useAddProduct();
    const { fetchProducts } = useFilterCategory();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

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
            toast.error(validation.message);
            setIsLoading(false);
            return;
        }

        const numericPrice = parseFloat(price.replace(/,/g, ""));
        if (isNaN(numericPrice)) {
            toast.error("Price must be a valid number");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/create-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    price: numericPrice,
                    category: selectedCategory,
                    target_group: selectedTargetGroup,
                    availability,
                    imageUrl,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create product");
            }

            toast.success("Product created successfully 🎉");

            await fetchProducts();
            router.push("/admin/products");

        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-2 items-center">
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
