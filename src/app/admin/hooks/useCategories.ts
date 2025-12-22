// hooks/useCategories.ts
import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext"

export function useCategories() {
    const { products, selectedCategory, setSelectedCategory } = useFilterCategory()

    // Unique categories
    const categories = Array.from(new Set(products.map(p => p.category)))

    // Tabs ready for UI
    const tabs = [{ id: "", label: "All Categories" }, ...categories.map(c => ({ id: c, label: c }))]

    return { tabs, selectedCategory, setSelectedCategory }
}