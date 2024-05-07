"use client"

import { getUser, suggestMatches, addMatches, getProfile, type User } from "@/lib/db"
import { useState, useEffect } from "react"

export function ChatPage({userId, profileId}: {userId: string, profileId: string}){
    const [matches, setMatches] = useState<Partial<User>[]>([]);
    const [suggestedMatches, setSuggestedMatches] = useState<Partial<User>[]>([]);
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        (async () =>{
            const profile = await getProfile(userId);
            const matchesNetwork = []
            for(let match of profile.matches){
                matchesNetwork.push(await getUser(match));
            }
            setMatches(matchesNetwork)

            setSuggestedMatches(await suggestMatches(userId));
        })()
    }, [update])

    const addMatchHandler = async (userId: string) => {
        await addMatches(profileId, matches.map(match => match.id!).concat([userId]));
        setUpdate(update+1);
    }

    return (
        <>
            <div className="flex flex-col p-6 border-r border-neutral-300 min-w-1/5">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-neutral-600">Matches</h2>
                    {
                        matches?.length === 0 ? <p className="py-3 text-neutral-400">No matches yet</p> : <></>
                    }
                    {
                        matches?.map(match => (
                            <p className="p-2 rounded-md hover:bg-neutral-100 text-ellipsis" key={match.id}>{match.email}</p>
                        ))
                    }
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-neutral-600">Suggested Matches</h2>
                    {
                        suggestedMatches?.length === 0 ? <p className="py-3 text-neutral-400">No matches yet</p> : <></>
                    }
                    {
                        suggestedMatches?.map(match => (
                            <p className="p-2 rounded-md hover:bg-neutral-100 text-ellipsis" key={match.id} onClick={() => addMatchHandler(match.id!)}>{match.email}</p>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col">
            </div>
        </>
    )
}