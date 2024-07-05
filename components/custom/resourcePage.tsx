"use client"

import {Resource} from "./resource"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { resourceUploadHandler } from "@/app/resources/actions"
import { useState } from "react"
import { getResources } from "@/lib/db"
import { useQuery } from "@tanstack/react-query"

export default function ResourcePage({resources, isAdmin}: {resources: any[], isAdmin: boolean}){
    const [search, setSearch] = useState("");
    const clientResources = useQuery({
        queryKey: ["resources"],
        queryFn: async () => {
            return await getResources()
        },
        refetchInterval: 1500
    })

    return (
        <main className="flex flex-col h-full items-start">
            <div className="flex flex-row gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mx-6 mt-6">Upload Resource</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload a document/resource</DialogTitle>
                        </DialogHeader>
                        <form action={resourceUploadHandler} className="flex flex-col gap-3">
                            <Label>Document Upload</Label>
                            <Input type="file" name="resource"/>
                            <Label>Tags</Label>
                            <Input name="tags" placeholder="Ai, DS, etc..."/>
                            <div>
                                <DialogClose asChild>
                                    <Button type="submit">Upload</Button>
                                </DialogClose>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                <Input placeholder="Search.." className="mt-6" onChange={(event) => setSearch(event.target.value)}/>
            </div>
            <div className="flex flex-row gap-3 p-6 flex-wrap">
                {
                    clientResources.data?.filter((resource) => resource.name.includes(search)).map(resource => (
                        <Resource isAdmin={isAdmin} name={resource.name} url={resource.url} size={resource.size} tags={resource.tags} key={resource.id}/>
                    ))
                }
            </div>
        </main>
    )
}