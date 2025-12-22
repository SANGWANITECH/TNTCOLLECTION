'use client'

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type SearchQuery = {
    id: string;
    query: string;
    results_count: number | null;
    created_at: string;
};

type TimeFilter = "today" | "week" | "month" | "all";


const PAGE_SIZE = 20;

export default function UserSearchTabs() {
    const supabase = createClient();

    const [page, setPage] = useState(1);
    const [data, setData] = useState<SearchQuery[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<TimeFilter>("today");

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    useEffect(() => {
        const fetchSearches = async () => {
            setLoading(true);

            let query = supabase
                .from("search_queries")
                .select("*")
                .order("created_at", { ascending: false });

            const fromDate = getFromDate(filter);

            if (fromDate) {
                query = query.gte("created_at", fromDate.toISOString());
            }

            const { data, error } = await query.range(from, to);

            if (!error) {
                setData(data ?? []);
            }

            setLoading(false);
        };

        fetchSearches();
    }, [page, filter]);


    useEffect(() => {
        setPage(1);
    }, [filter]);


    const getFromDate = (filter: TimeFilter) => {
        const now = new Date();

        if (filter === "today") {
            return new Date(now.setHours(0, 0, 0, 0));
        }

        if (filter === "week") {
            return new Date(now.setDate(now.getDate() - 7));
        }

        if (filter === "month") {
            return new Date(now.setMonth(now.getMonth() - 1));
        }

        return null; // all time
    };



    return (
        <div className="card p-4">
            <h2 className="font-semibold mb-4">Recent Searches</h2>

            <div className="space-y-3">
                {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

                {!loading && data.length === 0 && (
                    <p className="text-sm text-muted-foreground">No searches found</p>
                )}

                <div className="flex gap-2 mb-4">
                    {[
                        { key: "today", label: "Today" },
                        { key: "week", label: "This Week" },
                        { key: "month", label: "This Month" },
                        { key: "all", label: "All Time" },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key as TimeFilter)}
                            className={`px-3 py-1.5 rounded text-sm border transition
                ${filter === tab.key
                                ? "bg-accent border-accent"
                                : "border-border-light dark:border-border-dark text-muted-foreground hover:bg-accent/10"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>


                {data.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between text-sm border-b border-border-light dark:border-border-dark pb-2"
                    >
                        <span className="font-medium truncate">{item.query}</span>
                        <span className="text-muted-foreground">
                            {item.results_count ?? 0} results
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="text-sm px-3 py-1 border rounded disabled:opacity-40"
                >
                    Previous
                </button>

                <span className="text-sm text-muted-foreground">
                    Page {page}
                </span>

                <button
                    onClick={() => setPage(p => p + 1)}
                    className="text-sm px-3 py-1 border rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
