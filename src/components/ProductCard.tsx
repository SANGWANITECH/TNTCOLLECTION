"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import AddCart from "./AddCart";

interface Props {
  product: {
    id: number;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
    available?: boolean;
  };
}

const ProductCard = ({ product }: Props) => {
  const isAvailable = product.available ?? true;

  return (
    <div
      key={product.id}
      className="flex flex-col gap-2 p-4 border border-border-light dark:border-border-dark rounded-2xl w-full sm:max-w-[250px] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square rounded-xl overflow-hidden group">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 250px"
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAH0lEQVR42mP8/5+hP6VQwMDA8J+FhwMDgYGjAwAIHhCqZ8b2swAAAABJRU5ErkJggg=="
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* AVAILABILITY BADGE */}
        <div
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm ${
            isAvailable
              ? "bg-green-600/80 text-white border border-green-400/50"
              : "bg-red-600/80 text-white border border-red-400/50"
          }`}
        >
          {isAvailable ? "Available" : "Out of Stock"}
        </div>
      </div>

      {/* INNER CONTENT BOX */}
      <div className="border border-border-light dark:border-border-dark rounded-xl p-3 flex flex-col gap-3">
        
        {/* CATEGORY & RATING */}
        <div className="flex items-center space-x-2">
          <p className="text-sm bg-gray-100 rounded-full dark:bg-background-color-dark px-2 border border-border-light dark:border-border-dark">
            {product.category}
          </p>

          <div className="flex items-center ml-auto">
            <Star className="w-4 h-4 fill-amber-400 dark:fill-amber-300" />
            <p className="text-sm ml-1">7.7</p>
          </div>
        </div>

        {/* TITLE */}
        <p className="text-body line-clamp-2 font-medium">{product.title}</p>

        {/* PRICE + ADD TO CART */}
        <div className="flex items-center justify-between">
          <p className="text-body font-bold">MK{product.price}</p>

          <div className="transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
            <AddCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
