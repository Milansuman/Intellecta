'use server';
import { adminLogin } from "@/lib/db"
import { cookies } from "next/headers"
import { redirect} from "next/navigation"

export async function loginHandler(prevState: any, formData: FormData){
    try {
        const token = await adminLogin(formData.get("email") as string, formData.get("password") as string);
        cookies().set("session", token);
    } catch (error) {
        return {
            error: true
        }
    }
    redirect("/");
}