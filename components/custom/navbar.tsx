"use client"
import Link from "next/link";
import { Button } from "../ui/button";

export function NavBar({loggedIn, isAdmin, invalidateSession}: {loggedIn: boolean, isAdmin: boolean, invalidateSession: () => void}){
    
    return (
        <nav className="flex flex-row w-full px-6 py-4 border-b border-neutral-300">
            <h1 className="font-bold text-3xl">Intellecta</h1>
            <div className="ml-auto flex flex-row gap-8 items-center text-lg font-medium">
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                <Link href="/groups">Peer Groups</Link>
                {
                    isAdmin && <Link href="/admin">Admin</Link>
                }
                {
                    loggedIn ? 
                    <>
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