"use client";

const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 border border-border-light dark:border-border-dark rounded-2xl w-full sm:max-w-sm animate-pulse">
            <div className="relative aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="border border-border-light dark:border-border-dark rounded-xl p-3 flex flex-col gap-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" /> {/* category */}
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" /> {/* title */}
                <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4" /> {/* price */}
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" /> {/* add cart */}
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
