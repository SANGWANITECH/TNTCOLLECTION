import { createClient } from "@/utils/supabase/server";

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

    return (
        <div>
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

                    <div className="card p-4 opacity-60">
                        <p className="text-[#888] text-sm mb-1">
                            Avg Results
                        </p>
                        <p className="font-semibold text-lg">
                            —
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
