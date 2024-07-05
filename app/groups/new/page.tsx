
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { addPeerGroup, verifyToken, getUser } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewGroup(){

    if(cookies().get("session")?.value){
        let isAdmin = false;
        try{
            const id = await verifyToken(cookies().get("session")?.value!)
            isAdmin = (await getUser(id)).is_admin
        }catch(error){
            redirect("/login");
        }

        if(!isAdmin){
            redirect("/groups");
        }
    }else{
        redirect("/login");
    }

    async function handleAddPeer(formData: FormData){
        "use server"
        await addPeerGroup(formData.get("thumbnail") as File, formData.get("title") as string, formData.get("description") as string)
        redirect("/groups/new")
    }

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <form action={handleAddPeer} className="flex flex-col gap-4 w-96">
                <h1 className="text-3xl font-bold">Add a new peer group</h1>
                <Label>Thumbnail</Label>
                <Input type="file" name="thumbnail"/>
                <Label>Title</Label>
                <Input name="title" placeholder="Enter a title"/>
                <Label>Description</Label>
                <Textarea name="description" placeholder="Explain the peer group"/>
                <div>
                    <Button type="submit">New Peer Group</Button>
                </div>
            </form>
        </main>
    );
}