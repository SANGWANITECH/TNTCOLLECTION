'use client'

import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext"
import ProductCard from "./ProductCard"
import NoProductsFound from "@/app/admin/components/NoProductsFound";

export default function ProductsList() {
    const { products, selectedCategory, selectedTargetGroup } = useFilterCategory()

    // Filter the products based on selectedCategory + selectedTargetGroup
    const filtered = products.filter(product => {
        const okCategory = selectedCategory ? product.category === selectedCategory : true
        const okGroup = selectedTargetGroup ? product.target_group === selectedTargetGroup : true
        return okCategory && okGroup
    })

    if (filtered.length === 0) {
        return <NoProductsFound />
    }

    return (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
