import AdminSearchBar from "@/app/admin/components/AdminSearchBar";
import ToggleCategory from "@/app/admin/components/ToggleCategory";
import ToggleTargetGroup from "@/app/admin/components/ToggleTargetGroup";
import ProductsList from "@/app/admin/components/ProductsList";

export default function ProductsPage() {
    return (
        <div className={'flex flex-col xl:flex-row gap-4 pt-2 xl:pt-16'}>
            <div className={'w-full flex sm:hidden pl-2'}>
                <AdminSearchBar />
            </div>
            <div className="w-full flex xl:flex-col gap-2 xl:max-w-xs">
                <div className="w-2/3 md:w-full max-w-md">
                    <ToggleCategory />
                </div>

                <div className="w-1/3 md:w-full max-w-md">
                    <ToggleTargetGroup />
                </div>
            </div>
            <div className={'flex-1 w-full'}>
                <ProductsList />
            </div>
        </div>
    );
}