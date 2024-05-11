"use client"

import { getUser, suggestMatches, addMatches, getProfile, getChat, addChat, type User, type Message, getMessage, addMessage } from "@/lib/db"
import { useState, useEffect, FormEvent } from "react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatPage({userId, profileId}: {userId: string, profileId: string}){
    const [matches, setMatches] = useState<Partial<User>[]>([]);
    const [suggestedMatches, setSuggestedMatches] = useState<Partial<User>[]>([]);
    const [update, setUpdate] = useState(0)
    const [currentUser, setCurrentUser] = useState<string>();
    const [updateMessageCounter, setUpdateMessageCounter] = useState(0);
    const [messages, setMessages] = useState<{
        user: string,
        content: string
    }[]>();

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

    useEffect(() => {
        if(currentUser){
            (async () => {
                try {
                    const chat = await getChat([userId, currentUser!]);
                    const firebaseMessages = [];
                    for(let messageId of chat.messages){
                        const message = await getMessage(messageId)
                        firebaseMessages.push({
                            user: (await getUser(message.userid)).email,
                            content: message.content
                        });
                    }
    
                    setMessages(firebaseMessages);
                } catch (error) {
                    await addChat([userId, currentUser!])
                    const chat = await getChat([userId, currentUser!]);
                    const firebaseMessages = [];
                    for(let messageId of chat.messages){
                        const message = await getMessage(messageId)
                        firebaseMessages.push({
                            user: (await getUser(message.userid)).email,
                            content: message.content
                        });
                    }
    
                    setMessages(firebaseMessages);
                }
    
            })()
        }
    }, [currentUser, updateMessageCounter])

    const addMatchHandler = async (userId: string) => {
        const newMatchesSet = (new Set(matches.map(match => match.id!).concat([userId])))
        const newMatches: string[] = []
        newMatchesSet.forEach((value) => {
            newMatches.push(value)
        })
        await addMatches(profileId, [...newMatches]);
        setUpdate(update+1);
    }

    const openChat = async (userId: string) => {
        setCurrentUser(userId)
    }

    const sendMessage = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const formData = new FormData(ev.target as HTMLFormElement)
        await addMessage([userId, currentUser!], userId, formData.get("message") as string);
        (ev.target as HTMLFormElement).reset();
        setUpdateMessageCounter(updateMessageCounter+1);
    }


    return (
        <>
            <div className="flex flex-col p-6 border-r border-neutral-300 min-w-1/5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-neutral-600">Matches</h2>
                    {
                        matches?.length === 0 ? <p className="py-3 text-neutral-400">No matches yet</p> : <></>
                    }
                    {
                        matches?.map(match => (
                            <p className={cn("p-2 rounded-md hover:bg-neutral-100 text-ellipsis", match.id === currentUser ? "bg-neutral-100" : "")} key={match.id} onClick={() => openChat(match.id!)}>{match.email}</p>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-2">
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
            <div className="flex flex-col w-full p-3">
                <div className="flex flex-col h-full gap-2">
                    {
                        messages?.map((message) => (
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm">{message.user}</h3>
                                <p>{message.content}</p>
                            </div>
                        ))
                    }
                </div>
                <form className="flex flex-row gap-2 w-full" onSubmit={(ev) => sendMessage(ev)}>
                    <Input name="message" placeholder="Type a message"/>
                    <Button type="submit">
                        <Send/>
                    </Button>
                </form>
            </div>
        </>
    )
}