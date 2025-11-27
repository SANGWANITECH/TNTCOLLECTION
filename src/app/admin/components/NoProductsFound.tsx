'use client'

import { Button } from "@/components/ui/button"
import { PackageSearch } from "lucide-react"
import { useRouter } from "next/navigation"
import GoBackButton from "@/components/GoBackButton";

export default function NoProductsFound() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">

            {/* Icon */}
            <div className="p-4 rounded-full bg-muted">
                <PackageSearch className="w-10 h-10 text-muted-foreground" />
            </div>

            {/* Message */}
            <h2 className="text-xl font-semibold mt-4">
                No products found
            </h2>

            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Try adjusting your filters or add a new product to your inventory.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">

                {/* Back Button */}
                <GoBackButton />

                {/* Add Product */}
                <Button variant={'primary'} onClick={() => router.push('/admin/add-product')}>
                    Add Product
                </Button>

            </div>
        </div>
    )
}
