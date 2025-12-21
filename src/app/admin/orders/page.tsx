import { createClient } from "@/utils/supabase/server";
import OrdersClient from "@/app/admin/components/OrdersRealtime";
import {getUser} from "@/utils/supabase/auth";

export default async function OrdersPage() {
    const supabase = await createClient();

    const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("order_date", { ascending: false });

    if (error) throw error;

    const user = await getUser();
    const userId = user?.id;

    return (
        <div className="pb-10 pt-2">
            <OrdersClient initialOrders={orders ?? []} />
        </div>
    );
}
