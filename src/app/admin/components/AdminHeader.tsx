import {  UserRoundIcon } from "lucide-react";
import {ModeToggle} from "@/components/theme-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ToggleSidebar from "@/app/admin/components/ToggleSidebar";
import AdminSearchBar from "@/app/admin/components/AdminSearchBar";

export default function AdminHeader() {
    return (
        <div className={'flex justify-between md:justify-center md:gap-[var(--gap-fluid)] fixed left-0 top-0 right-0 items-center border-b border-border-light dark:border-border-dark py-2 backdrop-blur-2xl px-4 sm:px-6 lg:px-8 z-50 bg-background/90'}>
            <div className={'flex gap-4 items-center'}>
                <ToggleSidebar />
                <h1>T&T <span className={'hidden md:inline-block'}>Collection</span></h1>
            </div>

            <div className={'hidden lg:flex gap-4 items-center'}>
                <Link href={'/admin/products'}>Products</Link>
                <Link href={'/admin/add-product'}>Add Product</Link>
                <Link href={'/admin/settings'}>Settings</Link>
            </div>

            <div className={'flex-1 max-w-md'}>
                <AdminSearchBar />
            </div>

            <div className={'flex gap-4 items-center ml-4'}>
                <ModeToggle />
                <UserRoundIcon className={'w-5 h-5'} />
                <Button
                    variant={'admin'}
                    size={'sm'}
                    className={'h-7 px-2 py-1 text-xs'}
                >Admin</Button>
            </div>
        </div>
    )
}