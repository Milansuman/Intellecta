
import ResourcePage from "@/components/custom/resourcePage"
import { getResources, verifyToken, getUser } from "@/lib/db"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Providers from "@/components/custom/provider"

export default async function Resources(){
    let isAdmin = false;
    if(cookies().get("session")?.value){
		try{
			const id = await verifyToken(cookies().get("session")?.value!)
            const user = await getUser(id);
            isAdmin = user.is_admin;
		}catch(error){
			redirect("/login")
		}
    }else{
        redirect("/login")
    }

    const resources = await getResources()

    return (
        <Providers>
            <ResourcePage resources={resources.map((resource) => {
                return {
                    name: resource.name,
                    url: resource.url,
                    id: resource.id,
                    tags: resource.tags,
                    size: resource.size
                }
            })} isAdmin={isAdmin}/>
        </Providers>
    )
}