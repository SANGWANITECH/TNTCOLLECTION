// app/admin/page.tsx
import AdminSearchBar from "@/app/admin/components/AdminSearchBar";
import ToggleCategory from "@/app/admin/components/ToggleCategory";
import ToggleTargetGroup from "@/app/admin/components/ToggleTargetGroup";
import ProductsList from "@/app/admin/components/ProductsList";


export default function AdminPage() {

    return (
        <div className={'flex flex-col gap-4 p-2'}>
            <div className={'w-full flex sm:hidden pl-2'}>
                <AdminSearchBar />
            </div>
            <div className="w-full flex md:flex-col gap-2">
                <div className="w-2/3 md:w-1/2 max-w-md">
                    <ToggleCategory />
                </div>

                <div className="w-1/3 md:w-1/2 max-w-md">
                    <ToggleTargetGroup />
                </div>
            </div>
            <div>
                <ProductsList />
            </div>
        </div>
    );
}