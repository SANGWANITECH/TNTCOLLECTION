'use client'

import { useState } from "react"
import { ChevronDown, ChevronUp, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

// Static category list
const STATIC_CATEGORIES = [
    { id: "fashion & accessories", label: "Fashion & Accessories" },
    { id: "men's clothing", label: "Men's Clothing" },
    { id: "women's clothing", label: "Women's Clothing" },
    { id: "kid's clothing", label: "Kid's Clothing" },
    { id: "footwear", label: "Footwear" },
    { id: "bags", label: "Bags" },
]

interface Props {
    selectedCategory: string
    onCategoryChange: (id: string) => void
}

export default function AddProductCategory({ selectedCategory, onCategoryChange }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <div className="card flex flex-col w-full p-2 rounded-xl relative">
            {/* Header */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <p className="flex gap-2 items-center font-medium">
                    <Layers className="w-4 h-4" />
                    <span className="text-sm">{selectedCategory || "Select Category"}</span>
                </p>
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    className="flex flex-col gap-1 mt-2
             lg:static lg:shadow-none lg:p-0 lg:bg-transparent
             absolute left-0 right-0 z-50 top-3
             p-2 rounded-xl
             bg-background dark:bg-background-dark
             shadow-md"
                >
                    {STATIC_CATEGORIES.map(tab => (
                        <Button
                            key={tab.id}
                            variant={selectedCategory === tab.id ? "primary" : "default"}
                            onClick={() => {
                                onCategoryChange(tab.id)
                                setOpen(false)
                            }}
                            className="w-full py-2 px-2 text-sm font-medium flex justify-between transition"
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}
