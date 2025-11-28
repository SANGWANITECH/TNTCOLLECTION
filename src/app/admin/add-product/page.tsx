import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UploadImage from "@/app/admin/add-product/components/UploadImage";

export default function AddProductPage() {
    return(
        <div>
            <div className={'flex items-center justify-between'}>
                <Link href={'/admin/products'} className={'flex items-center p-2 w-fit'}>
                    <ArrowLeft className={'w-5 h-5'} />
                    Back to list
                </Link>
                <h1 className={'flex-1 flex justify-center text-xl font-medium'}> New Product </h1>
            </div>

            <div>
                <div>
                    <UploadImage />
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}