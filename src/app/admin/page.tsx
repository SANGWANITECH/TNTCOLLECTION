// app/admin/page.tsx
import AdminSearchBar from "@/app/admin/components/AdminSearchBar";
import ToggleCategory from "@/app/admin/components/ToggleCategory";
import ToggleTargetGroup from "@/app/admin/components/ToggleTargetGroup";


export default function AdminPage() {

    return (
        <div>
            <div className={'w-full max-w-md mx-auto flex sm:hidden'}>
                <AdminSearchBar />
            </div>
            <div>
                <ToggleCategory />
                <ToggleTargetGroup />
            </div>

        </div>
    );
}