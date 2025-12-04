'use client'

import { useAddProduct } from "@/app/admin/add-product/context/AddProductContext";
import {Button} from "@/components/ui/button";

const handleSubmit = () => {
    alert('clicked');
}

export default function CreateProduct() {
    const {  selectedCategory, selectedTargetGroup } = useAddProduct();
    return (
        <Button
            onClick={handleSubmit}
            className={'bg-[#3B85F4] w-full text-lg text-white'}
            size="xl">
            Create Product
        </Button>
    )
}