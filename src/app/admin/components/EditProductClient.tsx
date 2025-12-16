'use client'

import {Product} from "@/app/admin/types/product";
import { useAddProduct } from "@/app/admin/context/AddProductContext";
import {useEffect} from "react";
import UploadImage from "@/app/admin/components/UploadImage";
import ProductDetails from "@/app/admin/components/ProductDetails";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {UpdateProductButton} from "@/app/admin/components/UpdateProductButton";



export default function EditProductClient({ product }: { product: Product }) {
    const {
        setName,
        setDescription,
        setPrice,
        setAvailability,
        setSelectedCategory,
        setSelectedTargetGroup,
        setImageUrl
    } = useAddProduct();


    useEffect(() => {
        // Only update if product data exists
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.toLocaleString());
            setSelectedCategory(product.category);
            setSelectedTargetGroup(product.target_group);
            setImageUrl(product.image);
            setAvailability(product.is_available);
        }

        // Cleanup function to reset context when component unmounts
        return () => {
            setName('');
            setDescription('');
            setPrice('');
            setSelectedCategory('');
            setSelectedTargetGroup('');
            setImageUrl('');
            setAvailability(true);
        };
    }, [product]);

    return (
        <div>
            <div className={'flex flex-col gap-6 lg:flex-row items-center md:items-start justify-between xl:justify-center md:mt-10'}>
                <div className={'w-full xl:max-w-md flex justify-around'}>
                    <UploadImage />
                </div>
                <div className={'flex flex-col gap-6 w-full xl:max-w-xl'}>
                    <ProductDetails />
                    <UpdateProductButton productId={product.id} />
                </div>
            </div>
        </div>
    )
}