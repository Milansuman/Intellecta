
import { Resource } from "@/components/custom/resource"
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

import { resourceUploadHandler } from "./actions"
import { getResources, verifyToken, getUser } from "@/lib/db"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Resources(){

    if(cookies().get("session")?.value){
		try{
			const id = await verifyToken(cookies().get("session")?.value!)
            await getUser(id);
		}catch(error){
			redirect("/login")
		}
    }else{
        redirect("/login")
    }

    const resources = await getResources()

    return (
        <main className="flex flex-col h-full items-start">
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
            <div className="flex flex-row gap-3 p-6 flex-wrap">
                {
                    resources.map(resource => (
                        <Resource name={resource.name} url={resource.url} size={resource.size} tags={resource.tags} key={resource.id}/>
                    ))
                }
            </div>
        </main>
    )
}