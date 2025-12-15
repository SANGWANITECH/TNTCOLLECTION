import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProduct({ params }: Props) {
    const { id } = await params;
    console.log(id);

    return (
        <div className={'pb-10 pt-2'}>
            <div className={'flex items-center justify-between'}>
                <Link href={'/admin/products'} className={'flex items-center p-2 w-fit'}>
                    <ArrowLeft className={'w-5 h-5'} />
                    Back to list
                </Link>
                <div className={'flex-1 flex md:justify-center justify-end'}>
                    <Link href={'/admin/add-product'}>
                        <Button variant={'primary'}>new product</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}