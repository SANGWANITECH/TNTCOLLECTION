import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UploadImage from "@/app/admin/add-product/components/UploadImage";
import ProductDetails from "@/app/admin/add-product/components/ProductDetails";
import CreateProductButton from "@/app/admin/add-product/components/CreateProductButton";

export default function AddProductPage() {
    return(
        <div className={'pb-10 pt-2'}>
            <div className={'flex items-center justify-between'}>
                <Link href={'/admin/products'} className={'flex items-center p-2 w-fit'}>
                    <ArrowLeft className={'w-5 h-5'} />
                    Back to list
                </Link>
                <h1 className={'flex-1 flex justify-center text-xl font-medium'}> New Product </h1>
            </div>

            <div className={'flex flex-col gap-6'}>
                <div>
                    <UploadImage />
                </div>
                <div>
                    <ProductDetails />
                </div>
                <div>
                    <CreateProductButton />
                </div>
            </div>
        </div>
    )
}