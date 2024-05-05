
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { addPeerGroup } from "@/lib/db";

export default function NewGroup(){

    async function handleAddPeer(formData: FormData){
        "use server"
        await addPeerGroup(formData.get("thumbnail") as File, formData.get("title") as string, formData.get("description") as string)
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