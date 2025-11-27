'use client'

import { useState } from "react"
import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext"
import { ChevronDown, ChevronUp, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ToggleCategory() {
    const {
        products,
        selectedCategory,
        setSelectedCategory,
    } = useFilterCategory()

    const [open, setOpen] = useState(false)

    // Unique categories
    const categories = Array.from(new Set(products.map(p => p.category)))

    const tabs = [
        { id: "", label: "All Categories" },
        ...categories.map(c => ({ id: c, label: c }))
    ]

    return (
        <div className="card flex flex-col w-full p-2 rounded-xl relative">
        {/* Header */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <p className="flex gap-2 items-center font-medium">
                    <Layers className="w-4 h-4" />
                    <span className={'text-sm'}>{selectedCategory?`${selectedCategory}`:"Categories"}</span>
                </p>

                {open ? (
                    <ChevronUp className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4" />
                )}
            </div>

            {/* Wrapper stays relative so absolute works */}
            <div className="relative">

                {/* Dropdown List */}
                {open && (
                    <div
                        className={`
                flex flex-col gap-1 mt-2
                lg:static lg:shadow-none lg:p-0 lg:bg-transparent
                absolute left-0 right-0 z-50 top-3
                p-2 rounded-xl
                bg-background dark:bg-background-dark
                shadow-md
            `}
                    >
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={selectedCategory === tab.id ? "primary" : "default"}
                                onClick={() => {
                                    setSelectedCategory(tab.id)
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

        </div>
    )
}
