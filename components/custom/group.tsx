import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

import { deletePeerGroup } from "@/lib/db";
import { redirect } from "next/navigation";

export function PeerGroup({name, description, image, isAdmin}: {name:string, description: string, image: string, isAdmin: boolean}){
    
    async function deleteHandler(){
        "use server";
        deletePeerGroup(name);
        redirect("/groups");
    }

    return (
        <div className="flex flex-col w-96 gap-2">
            <Image src={image} alt={name} width={400} height={400} className="rounded-lg w-96 h-64"/>
            <h2 className="text-lg font-bold">{name}</h2>
            <p>{description}</p>
            <div className="flex flex-row gap-2">
                <Link href={`/groups/${name}`}>
                    <Button>Join Group</Button>
                </Link>
                {
                    isAdmin && 
                    <form action={deleteHandler}>
                        <Button variant="destructive">Delete Group</Button>
                    </form>
                }
            </div>
        </div>
    )
}