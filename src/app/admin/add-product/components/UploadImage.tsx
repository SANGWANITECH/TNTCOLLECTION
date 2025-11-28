'use client'

import { useState, useRef } from 'react'
import { CloudUpload } from 'lucide-react';

export default function UploadImage() {
    const [image, setImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
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
        <div className="w-full max-w-sm">
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
                    <div className="absolute top-2 right-2 flex gap-2 z-10">
                        <label
                            htmlFor="image-upload"
                            className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-800 cursor-pointer"
                        >
                            Replace
                        </label>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
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