import { getPeerGroup, getUser, addUserToPeerGroup, verifyToken } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function PeerGroup({params}: {params: {title : string}}){
    if(cookies().get("session")?.value){
        try{
            const id = await verifyToken(cookies().get("session")?.value!)
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

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <div className="flex flex-row">
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
            </div>
        </main>
    )
}