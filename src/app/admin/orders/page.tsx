import { createClient } from "@/utils/supabase/server";
import OrdersTabs from "@/app/admin/components/OrdersTabs";

export default async function OrdersPage() {

    const supabase = await createClient();

    const { data:orders, error:fetchError } = await supabase
        .from("orders")
        .select('*')

    if(fetchError){
        throw fetchError;
    }

    if(!orders){
        return <p>No orders found.</p>;
    }

    return (
        <div className={'pb-10 pt-2'}>
            <OrdersTabs orders={orders} />
        </div>
    )
}