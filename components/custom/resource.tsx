import { Button } from "../ui/button"
import Link from "next/link"
import { Badge } from "../ui/badge"

import { deleteResource, verifyToken, getUser } from "@/lib/db"
import { cookies } from "next/headers"

export async function Resource({name, url, size, tags=[]}: {name: string, url: string, size: number, tags?: string[]}){

    async function deleteAction(_: FormData){
        "use server";
        await deleteResource(url);
    }

    let isAdmin = false;
	if(cookies().get("session")?.value){
		try{
			const id = await verifyToken(cookies().get("session")?.value!)
			isAdmin = (await getUser(id)).is_admin
		}catch(error){
            console.log("error");
		}
	}

    return (
        <div className="flex flex-col rounded-md border border-neutral-300 p-3 gap-5 w-72">
            <div className="flex flex-row justify-between">
                <h1>{name}</h1>
                <p>{size} MB</p>
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
                {
                    tags.filter(tag => tag !== "").map(tag => (
                        <Badge className="rounded-md" key={tag}>{tag}</Badge>
                    ))
                }
            </div>
            <div className="flex flex-row gap-3">
                <Link href={url} download={name} className="mt-auto">
                    <Button variant="outline">
                        Download
                    </Button>
                </Link>
                {
                    isAdmin && 
                    <form action={deleteAction}>
                        <Button variant="destructive">
                            Delete
                        </Button>
                    </form>
                }
            </div>
        </div>
    )
}