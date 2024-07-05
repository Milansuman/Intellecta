'use server';

import { addEvent, deleteEvent, updateEvent } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addEventHandler(formData: FormData){
    await addEvent(formData.get("name") as string, formData.get("type") as string, formData.get("datetime") as string, formData.get("college") as string, formData.get("url") as string);
    revalidatePath("/events")
    redirect("/events")
}

export async function updateEventHandler(formData: FormData){
    await updateEvent(formData.get("id") as string, formData.get("name") as string, formData.get("type") as string, formData.get("datetime") as string, formData.get("college") as string, formData.get("url") as string);
    revalidatePath("/events")
    redirect("/events")
}

export async function deleteEventHandler(id: string){
    await deleteEvent(id);
    revalidatePath("/events")
    redirect("/events")
}