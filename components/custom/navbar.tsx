"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function NavBar({loggedIn, isAdmin, invalidateSession}: {loggedIn: boolean, isAdmin: boolean, invalidateSession: () => void}){
    
    return (
        <nav className={cn("flex flex-row w-full px-6 py-4 border-b gap-4 items-center border-neutral-300")}>
            <h1 className="font-bold text-3xl">Intellecta</h1>
            {
                isAdmin && <Badge className="bg-neutral-300 hover:bg-neutral-200 text-neutral-800">Admin Mode</Badge>
            }
            <div className="ml-auto flex flex-row gap-8 items-center text-lg font-medium">
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                {
                    loggedIn ? 
                    <>
                        <Link href="/groups">Peer Groups</Link>
                        <Link href="/resources">Resources</Link>
                        <Link href="/chat">Chat</Link>
                        <Link href="/profile">Profile</Link>
                        <Button onClick={() => invalidateSession()}>Log Out</Button>
                    </>
                    :
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/signup">Sign Up</Link>
                    </>
                }
            </div>
        </nav>
    );
}