import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import EditProductClient from "@/app/admin/components/EditProductClient";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProduct({ params }: Props) {
    const supabase = await createClient();
    const { id } = await params;
    console.log(id);

    const { data:product, error } = await supabase
        .from('products')
        .select("*")
        .eq("id",id)
        .single()

    if (error || !product) {
        return <div>Product not found</div>;
    }

    console.log(product);

    return (
        <div className={'pb-10 pt-2'}>
            <div className={'flex items-center justify-between'}>
                <Link href={'/admin/products'} className={'flex items-center p-2 w-fit'}>
                    <ArrowLeft className={'w-5 h-5'} />
                    Back to list
                </Link>
                <div className={'flex-1 flex justify-end md:justify-center'}>
                    <Button variant={'primary'}>new product</Button>
                </div>
            </div>
            <EditProductClient product={product} />
        </div>
    );
}