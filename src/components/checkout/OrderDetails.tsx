'use client'
import  {NextPage} from "next";
import {useCart} from "@/context/CartContext";
import {ShoppingCartIcon} from "lucide-react";
import Link from "next/link";
import GoBackButton from "@/components/GoBackButton";
import React, {useState} from "react";
import BillingInfo from "@/components/checkout/BillingInfo";

const OrderDetails : NextPage = () => {
    const {cartItems} = useCart();
    const [terms, setAcceptedTerms] = useState(false);


    if(cartItems.length === 0){
        return(
            <div className="flex flex-col items-center mt-21 gap-4 mx-auto">
                <ShoppingCartIcon className="w-10 h-10"/>
                <h4 className="text-h4">Your cart is empty</h4>
                <p className="text-sm">Looks like you haven&apos;t added any items to your cart yet.</p>
                <div>
                    <Link href={'/'}>
                        <GoBackButton />
                    </Link>

                </div>
            </div>
        )
    }
    return (
        <div className={'flex flex-col gap-8'}>
            {/* Billing Information */}
           <BillingInfo />
           
           

            {/*terms and conditions*/}
            <div className="flex items-center gap-1 px-4">
                <input
                    type={'checkbox'}
                    id={'terms'}
                    className="w-4 h-4"
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm">
                    I agree to the
                    <span className="cursor-pointer">
                        &nbsp;Terms and Conditions
                    </span>
                </label>
            </div>
        </div>
    )
}

export default OrderDetails;