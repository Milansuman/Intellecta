import {EventsPage} from "@/components/custom/eventsPage"
import { cookies } from "next/headers";
import { verifyToken, getUser } from "@/lib/db";
import Providers from "@/components/custom/provider";

export default async function Events(){
    let isAdmin = false;
    if(cookies().get("session")?.value){
        const id = await verifyToken(cookies().get("session")?.value!)
        isAdmin = (await getUser(id)).is_admin
    }

    return (
        <Providers>
            <EventsPage isAdmin={isAdmin}/>
        </Providers>
    )
}