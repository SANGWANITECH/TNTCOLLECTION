// app/admin/components/Actions.tsx
'use client'

import { useState, useRef, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import { Product } from "@/app/admin/types/product";
import { deleteProduct } from "@/app/admin/actions/deleteProduct";

interface ProductPopupProps {
    product: Product;
    onDeleted?: (productId: number) => void;
}

export default function ProductPopup({ product, onDeleted }: ProductPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        startTransition(async () => {
            await deleteProduct(product.id);
            onDeleted?.(product.id);
        });

        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div
                ref={buttonRef}
                className="flex items-center justify-between mt-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="text-sm text-gray-600 dark:text-text-secondary">
                    {product.category}
                </p>
                <EllipsisVertical className="w-5 h-5" />
            </div>

            {isOpen && (
                <div
                    ref={popupRef}
                    className="card absolute right-0 top--10 bottom-5 mt-1 w-48 shadow-lg border z-10"
                >
                    <Link
                        href={`/admin/products/edit-product/${product.id}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="w-full text-left px-4 py-2 text-sm cursor-pointer text-red-600 hover:text-white hover:bg-red-500 rounded-sm  disabled:opacity-50"
                    >
                        {isPending ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            )}
        </div>
    );
}
