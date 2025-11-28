// hooks/useTargetGroups.ts
import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext"

export function useTargetGroups() {
    const { products, selectedTargetGroup, setSelectedTargetGroup } = useFilterCategory()

    // Unique groups
    const targetGroups = Array.from(new Set(products.map(p => p.target_group)))

    // Tabs ready for UI
    const tabs = [{ id: "", label: "All" }, ...targetGroups.map(g => ({ id: g, label: g }))]

    return { tabs, selectedTargetGroup, setSelectedTargetGroup }
}