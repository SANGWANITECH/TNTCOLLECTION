'use client'

import { useAddProduct } from "@/app/admin/add-product/context/AddProductContext";
import { Button } from "@/components/ui/button";

const handleSubmit = () => {
    alert('clicked');
}

export default function CreateProduct() {
    const { selectedCategory, selectedTargetGroup, imageUrl, price, name, description, availability } = useAddProduct();

    return (
        <div className="flex flex-col space-y-2">
            <div>
                <div>{selectedCategory}</div>
                <div>{selectedTargetGroup}</div>
                <div>{name}</div>
                <div>{description}</div>
                <div>{availability &&('true')}</div>
                <div>{price}</div>
            </div>
            <div>{imageUrl}</div>
            <Button
                onClick={handleSubmit}
                className="bg-[#3B85F4] w-full text-lg text-white"
                size="xl"
            >
                Create Product
            </Button>
        </div>
    );
}