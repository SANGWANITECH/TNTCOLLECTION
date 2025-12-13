// app/admin/components/ProductCard.tsx
'use client'

import Image from "next/image";
import { Product } from "@/app/admin/types/product";
import ProductPopup from "@/app/admin/components/Actions";
import { useRouter } from "next/navigation";


type ProductCardProps = {
    product: Product;
    onEdit: (productId: number) => void;
    onDelete: (productId: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const router = useRouter();
    // Example edit and delete handlers if parent doesn't provide them
    const handleEdit = (productId: number) => {
        console.log('Edit product:', productId);
        // Add your edit logic here
        onEdit(productId);
    };

    const handleDelete = (productId: number) => {
        console.log('Delete product:', productId);
        // Add confirmation dialog here
        if (confirm('Are you sure you want to delete this product?')) {
            onDelete(productId);
        }
    };

    return (
        <div className="card p-2 flex flex-col gap-4 w-full max-w-sm mx-auto">
            <div className="relative aspect-square rounded-md overflow-hidden group">
                <Image
                    src={product.image}
                    alt={product.name || 'product image'}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 250px"
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAH0lEQVR42mP8/5+hP6VQwMDA8J+FhwMDgYGjAwAIHhCqZ8b2swAAAABJRU5ErkJggg=="
                    className="transition-transform duration-300 group-hover:scale-105"
                />

                <div
                    className={`absolute text-white bottom-2 left-2 text-xs font-medium px-2 py-1 rounded-full bg-background-color-dark/40 backdrop-blur-sm`}
                >
                    {product.target_group}
                </div>
            </div>

            {/* Details */}
            <div className={'card'}>
                <h2 className="font-medium text-lg">{product.name}</h2>

                <div className={'flex items-center justify-between mt-2'}>
                    <p className="text-sm text-gray-500">MK{product.price.toLocaleString()}</p>
                    <p className={`text-xs text-white w-fit p-1 px-2 rounded-full ${product.is_available ? 'bg-green-500' : 'bg-red-500'}`}>
                        {product.is_available ? "Available" : "Sold Out"}
                    </p>
                </div>

                {/* Pass the product and handlers correctly */}
                <ProductPopup
                    product={product}
                    onDeleted={(id) => {
                        console.log("Deleted product:", id);
                        router.refresh();
                        // remove from state OR trigger router.refresh()
                    }}
                />
            </div>
        </div>
    );
}