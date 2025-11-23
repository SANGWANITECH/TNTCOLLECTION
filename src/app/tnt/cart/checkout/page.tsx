import {NextPage} from "next";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import OrderDetails from "@/components/checkout/OrderDetails";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

const Checkout : NextPage = () => {
    return (
        <div className={'sm:max-w-[600px] sm:mx-auto md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]'}>
            <div className="flex gap-4 items-center p-4">
                <Link href="/tnt/cart" className={'flex items-center text-sm'}>
                    <ArrowLeftIcon className={'w-4 h-4'} />
                    Back to Cart
                </Link>
                <p className={'text-sm'}>
                    / Checkout
                </p>
            </div>

            {/* content */}
            <div className={'flex flex-col gap-8 px-4 lg:flex-row'}>
                <OrderDetails />
                <div className={'lg:pt-23'}>
                    <CheckoutSummary />
                </div>

            </div>
        </div>
    )
}

export default Checkout;