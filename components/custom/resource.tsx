import { Button } from "../ui/button"
import Link from "next/link"
import { Badge } from "../ui/badge"

import {deleteAction} from "../../app/resources/actions"

export function Resource({name, url, size, isAdmin, tags=[]}: {name: string, url: string, isAdmin: boolean,size: number, tags?: string[]}){

    return (
        <div className="flex flex-col rounded-md border border-neutral-300 p-3 gap-5 w-72">
            <div className="flex flex-row justify-between flex-1">
                <h1>{name}</h1>
                <p>{size} MB</p>
            </div>
            <div className="flex flex-row gap-2 flex-wrap mt-auto">
                {
                    tags.filter(tag => tag !== "").map(tag => (
                        <Badge className="rounded-md" key={tag}>{tag}</Badge>
                    ))
                }
            </div>
            <div className="flex flex-row gap-3 mt-auto">
                <Link href={url} download={name} className="mt-auto">
                    <Button variant="outline">
                        Download
                    </Button>
                </Link>
                {
                    isAdmin && 
                    <form action={deleteAction}>
                        <input name="url" className="hidden" value={url}/>
                        <Button variant="destructive">
                            Delete
                        </Button>
                    </form>
                }
            </div>
        </div>
    )
}