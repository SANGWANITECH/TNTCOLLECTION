'use client'

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type SearchQuery = {
    id: string;
    query: string;
    results_count: number | null;
    created_at: string;
};

const PAGE_SIZE = 20;

export default function UserSearchTabs() {
    const supabase = createClient();

    const [page, setPage] = useState(1);
    const [data, setData] = useState<SearchQuery[]>([]);
    const [loading, setLoading] = useState(false);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    useEffect(() => {
        const fetchSearches = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("search_queries")
                .select("*")
                .order("created_at", { ascending: false })
                .range(from, to);

            if (!error) {
                setData(data ?? []);
            }

            setLoading(false);
        };

        fetchSearches();
    }, [page]);
    return (
        <div className="card p-4">
            <h2 className="font-semibold mb-4">Recent Searches</h2>

            <div className="space-y-3">
                {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

                {!loading && data.length === 0 && (
                    <p className="text-sm text-muted-foreground">No searches found</p>
                )}

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
