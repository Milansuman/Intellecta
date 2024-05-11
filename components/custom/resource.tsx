import { Button } from "../ui/button"
import Link from "next/link"
import { Badge } from "../ui/badge"

export function Resource({name, url, size, tags=[]}: {name: string, url: string, size: number, tags?: string[]}){
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
            <Link href={url} download={name} className="mt-auto">
                <Button variant="outline">
                    Download
                </Button>
            </Link>
        </div>
    )
}