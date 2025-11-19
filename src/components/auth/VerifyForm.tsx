"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function VerifyForm() {
    const params = useSearchParams();
    const email = params.get('email');
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 8);
        setCode(value);
    };

    const verify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setStatus("Verifying...");

        if (code.length !== 8) {
            setError(true);
            setStatus("Please enter 8-digit code");
            return;
        }

        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, token: code }),
        });

        const json = await res.json();

        if (!res.ok) {
            setError(true);
            setStatus(json.error || "Invalid code");
            return;
        }

        setError(false);
        setStatus("Success! Redirecting...");
        router.push(`/admin`);
    };

    if (!email) {
        return (
            <div className="card w-full max-w-xl mx-auto">
                <p className="text-red-600">No email provided</p>
            </div>
        );
    }

    return (
        <form onSubmit={verify} className="card w-full max-w-xl mx-auto">
            <h2>Verify Your Email</h2>
            <p className="mb-2 text-sm text-gray-500">
                We sent an 8-digit code to <span className="font-medium">{email}</span>
            </p>

            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={code}
                onChange={handleChange}
                placeholder="Enter 8-digit code"
                className="w-full p-3 rounded border border-border-light dark:border-border-dark text-center text-lg mb-4"
            />

            {status && (
                <p className={`text-sm mb-2 ${error ? "text-red-600" : "text-green-600"}`}>
                    {status}
                </p>
            )}

            <Button
                variant={'primary'}
                type="submit" className="w-full">
                Verify
            </Button>
        </form>
    );
}