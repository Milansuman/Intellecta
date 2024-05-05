import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Link from "next/link"

import { login } from "@/lib/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Login(){
    async function loginHandler(formData: FormData){
        'use server';

        try {
            const token = await login(formData.get("email") as string, formData.get("password") as string);
            cookies().set("session", token);
            
        } catch (error) {
            throw error;
        }
        redirect("/");
    }

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <form method="POST" action={loginHandler} className="flex flex-col gap-4 shadow-md rounded-md p-6 bg-white min-w-96">
                <h1 className="font-bold text-3xl">Login</h1>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Enter your email" required/>
                    <Label>Password</Label>
                    <Input type="password" name="password" placeholder="Enter your password" required/>
                    <Button type="submit">Login</Button>
                    <Link href="/signup" className="flex flex-col">
                        <Button variant="secondary">Sign Up</Button>
                    </Link>
                </div>
            </form>
        </main>
    )
}