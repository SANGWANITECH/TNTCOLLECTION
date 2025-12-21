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
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        return <div>Error loading products</div>;
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
                    value={metrics.orders}
                    icon={<ShoppingCart className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#4b8e47]"
                />
                <MetricCard
                    title="Total Products"
                    value={metrics.products}
                    icon={<Package className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#3b85f4]"
                />
                <MetricCard
                    title="Total Searches"
                    value={metrics.searches.toLocaleString()}
                    icon={<Search className="w-5 h-5 text-white" />}
                    iconBgColor="bg-[#8b5cf6]"
                />
                <MetricCard
                    title="Total Admins"
                    value={metrics.admins}
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
            {/* Additional Info Section */}
            <div className="mt-6 bg-gray-300 dark:bg-[#0a0a0a] dark:border dark:border-[#2a2a2a] rounded-[5px] p-5">
                <h2 className="dark:text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] mb-3">
                    Quick Stats
                </h2>
                <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
                        <p className="text-[#888] font-['Inter:Regular',sans-serif] text-[12px]">
                            Pending Orders
                        </p>
                        <p className="dark:text-white font-['Inter:Medium',sans-serif] text-[12px]">
                            12
                        </p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
                        <p className="text-[#888] font-['Inter:Regular',sans-serif] text-[12px]">
                            Completed Orders
                        </p>
                        <p className="dark:text-white font-['Inter:Medium',sans-serif] text-[12px]">
                            10
                        </p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <p className="text-[#888] font-['Inter:Regular',sans-serif] text-[12px]">
                            Cancelled Orders
                        </p>
                        <p className="dark:text-white font-['Inter:Medium',sans-serif] text-[12px]">
                            2
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
