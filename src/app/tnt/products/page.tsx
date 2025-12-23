import { NextPage } from "next";
import { Metadata } from "next";
import FeaturedContent from "@/components/home/FeaturedContent";

export const metadata: Metadata = {
    title: "Shop All Products",
    description: "Browse our curated collection of modern essentials. From clean designs to everyday style, find the perfect addition to your lifestyle with free shipping on select orders.",
    openGraph: {
        title: "Shop the TNT COLLECTION",
        description: "Discover simplicity and style in our latest product drop.",
        images: [
            {
                url: "/shop banner.jpg", // A specific banner for your shop page
                width: 1200,
                height: 630,
                alt: "TNT COLLECTION Shop Page",
            },
        ],
    },
};



const Products: NextPage = () => {
    return(
  
        <div>
        <FeaturedContent />
        </div>
    )
}

export default Products;