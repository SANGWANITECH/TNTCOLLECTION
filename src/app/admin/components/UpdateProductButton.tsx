'use client'

import { useAddProduct } from "@/app/admin/context/AddProductContext";
import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { validateProductForm } from "@/utils/validateProduct";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UpdateProductButton({ productId }: { productId: number }) {
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

    const handleUpdate = async () => {
        setIsLoading(true);

        const validation = validateProductForm({
            name,
            description,
            price,
            selectedCategory,
            selectedTargetGroup,
            imageUrl,
            availability
        });

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
            const res = await fetch(`/api/update-product/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: productId,
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
                throw new Error(data.error);
            }

            toast.success("Product updated successfully ✨");
            await fetchProducts();
            router.push("/admin/products");

        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-[#10B981] w-full text-lg text-white"
            size="xl"
        >
            {isLoading ? "Updating product..." : "Update Product"}
        </Button>
    );
}
