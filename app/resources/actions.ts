"use server";

import { addResource } from "@/lib/db";
import {redirect} from "next/navigation"

export async function resourceUploadHandler(formData: FormData){
    await addResource(formData.get("resource") as File, (formData.get("tags") as string).split(",").map(tag => tag.trim()))
    redirect("/resources");
}