"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"

import Link from "next/link"

import { loginHandler } from "./actions"
import { useFormState } from "react-dom";
import { useEffect} from "react";

export default function Login(){
    const [state, formAction] = useFormState(loginHandler, { error: false })

    useEffect(() => {
        if(state.error){
            toast.error("An error occurred")
        }
    }, [state])    

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <form action={formAction} className="flex flex-col gap-4 shadow-md rounded-md p-6 bg-white min-w-96">
                <h1 className="font-bold text-3xl">Login</h1>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Enter your email" required/>
                    <Label>Password</Label>
                    <Input type="password" name="password" placeholder="Enter your password" required/>
                    <Button type="submit">Login</Button>
                    <Link href="/admin" className="flex flex-col">
                        <Button variant="secondary">Admin Login</Button>
                    </Link>
                    <Link href="/signup" className="flex flex-col">
                        <Button variant="secondary">Sign Up</Button>
                    </Link>
                </div>
            </form>
            <Toaster/>
        </main>
    )
}