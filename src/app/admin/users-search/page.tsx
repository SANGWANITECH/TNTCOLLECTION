import { createClient } from "@/utils/supabase/server";
import UserSearchTabs from "@/app/admin/components/UserSearchTabs";

export default async function UserSearchPage() {
    const supabase = await createClient();

    // Total searches
    const { count: totalSearches } = await supabase
        .from("search_queries")
        .select("*", { count: "exact", head: true });

    // Unique queries
    const { data: uniqueData } = await supabase
        .from("search_queries")
        .select("query");

    const uniqueQueries = new Set(uniqueData?.map(q => q.query)).size;

    // Average Results
    const { data: avgData } = await supabase
        .from("search_queries")
        .select("results_count");

    // Top Searches (All Time)
// Top Searches (All Time) - Fetching from the new View
    const { data: topSearches } = await supabase
        .from("top_search_queries")
        .select("*")
        .limit(10);



    const avgResults =
        avgData && avgData.length > 0
            ? Math.round(
                avgData.reduce((sum, row) => sum + (row.results_count ?? 0), 0) /
                avgData.length
            )
            : 0;


    return (
        <div className={'w-full max-w-7xl mx-auto pt-8'}>
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="font-semibold text-[24px] mb-1">
                        Search Analytics
                    </h1>
                    <p className="text-[#888] text-sm">
                        Track what users are searching for on your platform
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="card p-4">
                        <p className="text-[#888] text-sm mb-1">
                            Total Searches
                        </p>
                        <p className="font-semibold text-lg">
                            {totalSearches ?? 0}
                        </p>
                    </div>

                    <div className="card p-4">
                        <p className="text-[#888] text-sm mb-1">
                            Unique Queries
                        </p>
                        <p className="font-semibold text-lg">
                            {uniqueQueries}
                        </p>
                    </div>

                    <div className="card p-4">
                        <p className="text-[#888] text-sm mb-1">
                            Avg Results
                        </p>
                        <p className="font-semibold text-lg">
                            {avgResults}
                        </p>
                    </div>
                </div>
                {/* Recent Searches */}
                <UserSearchTabs topSearches={topSearches ?? []} />
            </div>
        </div>
    );
}
