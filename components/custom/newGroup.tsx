
import Link from "next/link"
import { Plus } from "lucide-react"

export function NewPeerGroup(){
    return (
        <Link href="/groups/new" className="flex flex-col gap-5 justify-center items-center w-96 rounded-md border border-neutral-400">
            <Plus size={70}/>
            <p>New peer group</p>
        </Link>
    )
}