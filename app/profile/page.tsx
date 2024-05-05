import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { getUser, verifyToken, getProfile, addProfile } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Profile(){
    let user = {}
    let profile = {}

    async function updateHandler(formData: FormData){
        'use server';
        await addProfile(await verifyToken(cookies().get("session")?.value!), formData.get("email") as string, formData.get("dob") as string, formData.get("preference") as string, (formData.get("interests") as string));
        revalidatePath("/profile")
    }

    if(cookies().get("session")?.value){
		try{
			const id = await verifyToken(cookies().get("session")?.value!)
            user = await getUser(id);
		}catch(error){
			redirect("/login")
		}

        try{
            const id = await verifyToken(cookies().get("session")?.value!)
            profile = await getProfile(id)
            console.log(profile)
        }catch(error){
            console.log(error)
        }
	}
    return (
        <main className="flex flex-col justify-center items-center h-full">
            <form action={updateHandler} className="flex flex-col gap-4 p-6 bg-white min-w-96">
                <h1 className="text-2xl font-bold">Edit profile</h1>
                <Label>Email</Label>
                <Input type="email" name="email" defaultValue={user.email}/>
                <Label>Date of Birth</Label>
                <Input type="date" name="dob" defaultValue={user.dob}/>
                <Label>Academic Preference</Label>
                <Input name="preference" defaultValue={profile.academic_preference} placeholder="Academic Preference"/>
                <Label>Interests</Label>
                <Input name="interests" defaultValue={profile.interest?.join(", ")} placeholder="Enter your interest here(comma separated)"/>
                {
                    profile.interest &&
                    <div className="flex flex-row gap-2">
                        {
                            profile.interest?.map((interest) => (
                                <Badge className="rounded-md bg-neutral-300 text-neutral-900 hover:bg-neutral-300">{interest}</Badge>
                            ))
                        }
                    </div>
                }
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </main>
    );
}