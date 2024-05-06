"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}){
    return (
        <main className="flex flex-col justify-center items-center h-full gap-4">
            <h1 className="text-2xl font-bold">An error occurred!</h1>
            <p>{error.message}</p>
            <Link href="/groups">
                <Button>Go Back</Button>
            </Link>
        </main>
    )
}