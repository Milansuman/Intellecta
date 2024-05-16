import { cookies } from "next/headers";
import { verifyToken, getProfile, getUser, suggestMatches, addMatches, type Profile, type User} from "@/lib/db";
import { redirect } from "next/navigation";
import { ChatPage } from "@/components/custom/chatPage";

export default async function Chat(){
    let profile: Profile;
    let user: Partial<User>;
    if(cookies().get("session")?.value){
        try{
            const id = await verifyToken(cookies().get("session")?.value!);
            profile = await getProfile(id);
            user = await getUser(id);
        }catch(error){
            throw error;
        }
    }else{
        redirect("/login")
    }

    return (
        <main className="flex flex-row h-full overflow-hidden">
            <ChatPage userId={profile.userid!} profileId={profile.id!}/>
        </main>
    )
}