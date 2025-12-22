// Import the server Supabase client
import { supabaseServer } from "@/utils/supabase/supabase-server";
import { ShoppingCart, Package, Search, Users, Bell } from "lucide-react";


interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    iconBgColor: string;
}

function MetricCard({ title, value, icon, iconBgColor }: MetricCardProps) {
    return (
        <div className="bg-gray-300 dark:bg-[#0a0a0a]  dark:border dark:border-[#2a2a2a] rounded-[5px] p-5 dark:hover:border-[#3a3a3a] transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-[#888] font-['Inter:Regular',sans-serif] text-[11px] mb-2">
                        {title}
                    </p>
                    <p className="dark:text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px]">
                        {value}
                    </p>
                </div>
                <div className={`${iconBgColor} rounded-[5px] p-2.5 flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function StatRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
            <p className="text-[#888] text-[12px]">{label}</p>
            <p className="dark:text-white text-[12px]">{value}</p>
        </div>
    );
}
    export default async function AdminDashboardPage() {
    // Mock data - will be replaced with real Supabase data
    const metrics = {
        orders: 24,
        products: 156,
        searches: 1_243,
        admins: 3,
        notifications: 0
    };

    const supabase = supabaseServer();

    // 1. Fetch Total Products Count
    const { count: productsCount, error: productsError } = await supabase
        .from("products")
        .select("*", { count: 'exact', head: true });

    // 2. Fetch Total Orders Count
    const { count: ordersCount, error: ordersError } = await supabase
        .from("orders")
        .select("*", { count: 'exact', head: true });

    // 3. Fetch Specific Order Stats (Quick Stats)
    const { count: pendingCount } = await supabase
        .from("orders")
        .select("*", { count: 'exact', head: true })
        .eq("status", "pending");

    const { count: soldCount } = await supabase
        .from("orders")
        .select("*", { count: 'exact', head: true })
        .eq("status", "sold");

    const { count: cancelledCount } = await supabase
        .from("orders")
        .select("*", { count: 'exact', head: true })
        .eq("status", "cancelled");

    // 4. Fetch Total Admins
    const { count: adminsCount } = await supabase
        .from("admins") // or your users table
        .select("*", { count: 'exact', head: true });


    // fetch search queries
    const { count: searchesCount, error: searchesError } = await supabase
        .from("search_queries")
        .select("*", { count: "exact", head: true });


        if (productsError || ordersError) {
        console.error(productsError || ordersError);
        return <div>Error loading metrics</div>;
    }


    return (
        <div className="pb-10 pt-6 lg:pt-16 w-full max-w-7xl mx-auto">
            <div className={'mb-4'}>
                <h2 className={'text-xl'}>Dashboard</h2>
                <p className="text-[#888] text-sm">
                    Overview of your ecommerce platform
                </p>
            </div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard
                    title="Total Orders"
                    value={ordersCount ?? 0}
                    icon={<ShoppingCart className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#4b8e47]"
                />
                <MetricCard
                    title="Total Products"
                    value={productsCount ?? 0}
                    icon={<Package className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#3b85f4]"
                />
                <MetricCard
                    title="Total Searches"
                    value={searchesCount ?? 0}
                    icon={<Search className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#8b5cf6]"
                />
                <MetricCard
                    title="Total Admins"
                    value={adminsCount ?? 0}
                    icon={<Users className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#f59e0b]"
                />
                <MetricCard
                    title="Notifications"
                    value={metrics.notifications === 0 ? "No notifications" : metrics.notifications}
                    icon={<Bell className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#6b7280]"
                />
            </div>
            <div className="mt-6 bg-gray-300 dark:bg-[#0a0a0a] dark:border dark:border-[#2a2a2a] rounded-[5px] p-5">
                <h2 className="...">Quick Stats</h2>
                <div className="space-y-2">
                    <StatRow label="Pending Orders" value={pendingCount ?? 0} />
                    <StatRow label="Completed Orders" value={soldCount ?? 0} />
                    <StatRow label="Cancelled Orders" value={cancelledCount ?? 0} />
                </div>
            </div>
        </div>
    );
}
