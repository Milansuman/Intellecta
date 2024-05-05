'use server';

import { addEvent } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addEventHandler(formData: FormData){
    await addEvent(formData.get("name") as string, formData.get("type") as string, formData.get("datetime") as string, formData.get("college") as string);
    revalidatePath("/events")
    redirect("/events")
}