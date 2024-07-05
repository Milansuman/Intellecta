"use server";

import { addResource, deleteResource } from "@/lib/db";

export async function resourceUploadHandler(formData: FormData){
    await addResource(formData.get("resource") as File, (formData.get("tags") as string).split(",").map(tag => tag.trim()))
}

export async function deleteAction(formData: FormData){
    "use server";
    await deleteResource(formData.get("url") as string);
}