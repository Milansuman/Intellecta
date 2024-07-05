import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Link from "next/link"

import { register } from "@/lib/db"
import { redirect } from "next/navigation"

export default function SignUp(){
    async function registrationHandler(formData: FormData){
        'use server';

        try{
            await register(formData.get("email") as string, formData.get("password") as string, formData.get("dob") as string);
        }catch(error){
            throw error;
        }
        redirect("/login");
    }

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <form method="POST" action={registrationHandler} className="flex flex-col gap-4 shadow-md rounded-md p-6 bg-white min-w-96">
                <h1 className="font-bold text-3xl">Sign Up</h1>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Enter your email"/>
                    <Label>Password</Label>
                    <Input type="password" name="password" placeholder="Enter your password"/>
                    <Label>DOB</Label>
                    <Input type="date" name="dob"/>
                    <Button type="submit">Sign Up</Button>
                    <Link href="/login" className="flex flex-col">
                        <Button variant="secondary">Login</Button>
                    </Link>
                </div>
            </form>
        </main>
    );
}