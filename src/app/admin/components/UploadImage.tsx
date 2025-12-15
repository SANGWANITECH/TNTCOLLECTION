'use client'

import { useState, useRef } from 'react'
import { CloudUpload } from 'lucide-react';
import { useAddProduct } from "@/app/admin/context/AddProductContext";

export default function UploadImage() {
    const [image, setImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { setImageUrl } = useAddProduct()

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result as string
                setImageUrl(base64) // save Base64 to context
                setImage(base64)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemove = () => {
        setImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="card flex flex-col gap-2 w-full">
            <p className={'text-lg'}>Add Product Image</p>
            {/* Relative wrapper for image + buttons */}
            <div className="relative w-full h-64 border border-border-light dark:border-border-dark rounded-md overflow-hidden bg-gray-100 dark:bg-neutral-800">
                <label
                    {...(!image && { htmlFor: 'image-upload' })}
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                >
                    {image ? (
                        <img
                            src={image}
                            alt="Uploaded preview"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-gray-500 flex flex-col items-center justify-center">
                            <CloudUpload />
                            Click to upload image
                        </span>
                    )}
                </label>

                {image && (
                    <div className="absolute inset-0 z-10">
                        <div className={'flex flex-col gap-4 items-center justify-center border border-border-light dark:border-border-dark h-full'}>
                            <label
                                htmlFor="image-upload"
                                className="px-3 py-1 bg-gray-700/50 text-white text-sm rounded cursor-pointer"
                            >
                                Replace
                            </label>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <input
                id="image-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    )
}