'use client'

import { NextPage } from "next"
import { Button } from "./ui/button"
import { ShoppingCartIcon } from "lucide-react"
import { useCart } from "@/context/CartContext"


interface Props {
    product: {
        id: number;
        image: string;
        title: string;
        price: number;
        category: string;
        description: string;
    }
}

const AddCart: NextPage <Props>= ({product}) => {
    const {addToCart} = useCart();

    const handleAddToCart = async() =>{
        try{
            await fetch("/api/add-to-cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, userId: 1 }),
            });

            //add product to context
            addToCart({
                id:product.id,
                title:product.title,
                price: product.price,
                image:product.image,
                quantity:1,
                category:product.category,
            });

        }catch(err){
            console.log('Error adding to cart:',err);
        }
    }

    return(
        <Button
            variant={"primary"}
            className="p-2"
            onClick={handleAddToCart}
        >
        <ShoppingCartIcon className="w-4 h-4"/>
        Add to cart
        </Button>
    )
}

export default AddCart;