import { getPeerGroup, getUser, addUserToPeerGroup, verifyToken, getChat, addMessage, getMessage } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function PeerGroup({params}: {params: {title : string}}){
    let id: string;
    if(cookies().get("session")?.value){
        try{
            id = await verifyToken(cookies().get("session")?.value!)
            await addUserToPeerGroup(decodeURI(params.title), id)
        }catch(error){
            throw error;
        }
    }else{
        redirect("/login")
    }

    const peerGroup = await getPeerGroup(decodeURI(params.title));

    const users = [];
    for(let userId of peerGroup?.users! as string[]){
        users.push(await getUser(userId))
    }

    let chat;
    chat = await getChat(peerGroup?.users! as string[]);

    const messages = [];
    for(const messageId of chat?.messages!){
        const message = await getMessage(messageId);
        messages.push({
            user: (await getUser(message.userid)).email,
            content: message.content
        });
    }

    async function sendMessage(formData: FormData){
        "use server";
        await addMessage(peerGroup?.users! as string[], id, formData.get("message") as string);
        revalidatePath(`/groups/${params.title}`);
    }

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-3 w-96">
                    <h1 className="text-xl font-bold">{peerGroup.name as string}</h1>
                    <Image src={peerGroup.image as string} width={400} height={400} alt={peerGroup.name as string} className="w-96 h-64 rounded-md"/>
                    <p>{peerGroup.description as string}</p>
                    <div className="flex flex-row gap-3 max-w-96 flex-wrap">
                        {
                            users.map(user => (
                                <Badge className="w-fit h-fit rounded-md" key={user.email}>{user.email}</Badge>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col w-96 rounded-md border border-neutral-300">
                    <h1 className="flex p-2 border-b border-neutral-300 w-full text-xl font-bold">Group Chat</h1>
                    <div className="flex-grow p-2">
                        {
                            messages?.map((message, index) => (
                                <div className="flex flex-col" key={message.content + String(index)}>
                                    <h3 className="font-bold text-sm">{message.user}</h3>
                                    <p>{message.content}</p>
                                </div>
                            ))
                        }
                    </div>
                    <form className="flex flex-row gap-2 w-full p-3" action={sendMessage}>
                        <Input name="message" placeholder="Type a message"/>
                        <Button type="submit">
                            <Send/>
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    )
}