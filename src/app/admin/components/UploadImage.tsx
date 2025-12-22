'use client'

import { useRef } from 'react'
import { CloudUpload } from 'lucide-react'
import { useAddProduct } from "@/app/admin/context/AddProductContext"

export default function UploadImage() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { imageUrl, setImageUrl } = useAddProduct()

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImageUrl(reader.result as string) // Base64
        }
        reader.readAsDataURL(file)
    }

    const handleRemove = () => {
        setImageUrl('')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const previewSrc = imageUrl
        ? imageUrl.startsWith('data:')
            ? imageUrl
            : `https://ovapnnyjvmiqnoqgdarc.supabase.co/storage/v1/object/public/products/${imageUrl}`
        : null

    return (
        <div className="card flex flex-col gap-2 w-full">
            <p className="text-lg">Add Product Image</p>

            <div className="relative w-full h-64 border rounded-md overflow-hidden bg-gray-100 dark:bg-neutral-800">
                <label
                    {...(!previewSrc && { htmlFor: 'image-upload' })}
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                >
                    {previewSrc ? (
                        <img
                            src={previewSrc}
                            alt="Product preview"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-gray-500 flex flex-col items-center">
                            <CloudUpload />
                            Click to upload image
                        </span>
                    )}
                </label>

                {previewSrc && (
                    <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black/30">
                        <label
                            htmlFor="image-upload"
                            className="px-3 py-1 bg-gray-700/70 text-white rounded cursor-pointer"
                        >
                            Replace
                        </label>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                            Remove
                        </button>
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
