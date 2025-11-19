import VerifyForm from "@/components/auth/VerifyForm";
import { Suspense } from "react";

export default function VerifyPage(){

    return (
        <div className={'flex flex-col gap-8 text-center pt-20 px-2'}>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyForm />
            </Suspense>
        </div>
    )
}