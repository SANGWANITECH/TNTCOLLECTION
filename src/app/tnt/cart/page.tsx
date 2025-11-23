import CartProducts from "@/components/cart/CartProducts";
import { NextPage } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon} from "lucide-react";
import OrderSummary from "@/components/cart/OrderSummary";

const Cart: NextPage = () => {
    return(
        <div className="sm:max-w-[600px] sm:mx-auto md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px]">
            <div>
                <Link href={'/tnt/products'}>
                    <Button className="text-sm">
                        <ArrowLeftIcon className="w-3 h-3"/>
                        Continue Shopping
                    </Button>
                </Link>
            </div>
            <div className={'flex flex-col gap-8 lg:flex-row mx-auto w-full max-w-[1500px]'}>
                <CartProducts />
                {/* order summary */}
                <OrderSummary />
            </div>
        </div>
    )
}

export default Cart;