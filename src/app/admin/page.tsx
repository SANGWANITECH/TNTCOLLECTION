// app/admin/page.tsx
import {productsData} from "@/app/admin/lib/products";


export default function AdminPage() {
   const product = productsData[0];

    return (
        <div>
            {product.name}
        </div>
    );
}