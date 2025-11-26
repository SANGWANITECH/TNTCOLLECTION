'use client'

import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext";

export default function ToggleCategory() {
    const {
        products,
        selectedCategory,
        setSelectedCategory,

    } = useFilterCategory();

    // Get unique categories
    const categories = Array.from(new Set(products.map(p => p.category)));

    // Unique target groups
    const targetGroups = Array.from(new Set(products.map(p => p.target_group)));

    return (
        <div>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={'card w-full'}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}