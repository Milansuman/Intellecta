"use client"
import Link from "next/link";
import { Button } from "../ui/button";

export function NavBar({loggedIn, invalidateSession}: {loggedIn: boolean,  invalidateSession: () => void}){
    
    return (
        <nav className="flex flex-row w-full px-6 py-4 border-b border-neutral-300">
            <h1 className="font-bold text-3xl">Intellecta</h1>
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