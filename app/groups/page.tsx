import { PeerGroup } from "@/components/custom/group";
import { NewPeerGroup } from "@/components/custom/newGroup";
import { Button } from "@/components/ui/button";
import { getPeerGroups, getUser, verifyToken } from "@/lib/db";
import { cookies } from "next/headers";

import Link from "next/link";

export default async function Groups(){

    const peerGroups = await getPeerGroups();
    let isAdmin = false;
    if(cookies().get("session")?.value){
        const id = await verifyToken(cookies().get("session")?.value!)
		isAdmin = (await getUser(id)).is_admin;
    }

    return (
        <main className="flex flex-col h-full">
            {
                peerGroups.length == 0 ? <div className="flex h-full justify-center items-center">
                    {
                        isAdmin ? <Link href="/groups/new"><Button>Create new peer group</Button></Link> : <p>No peer groups found</p>
                    }
                </div> :
                <div className="flex flex-row p-6 gap-4">
                    {
                        isAdmin && <NewPeerGroup/>
                    }
                    {
                        peerGroups.map(group => (
                            <PeerGroup name={group.name} description={group.description} image={group.image} key={group.name} isAdmin={isAdmin}/>
                        ))
                    }
                </div>
            }
        </main>
    );
}