"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Calendar, momentLocalizer, Views, type View, type Event, type SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { getEvents, getColleges } from '@/lib/db'
import {addEventHandler} from "./actions"
import { useState, useEffect } from 'react'

const localizer = momentLocalizer(moment)

type College = {
    created_at: number,
    delete_at: number | null,
    id: string,
    name: string,
    updated_at: number | null
}

export default function Events(){
    const [view, setView] = useState<View | undefined>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>();
    const [colleges, setColleges] = useState<College[]>();

    const [addOpen, setAddOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();

    useEffect(() => {
        const getEventsAction = async () => {
            const firebaseEvents = await getEvents() as {
                id: string,
                college_id: string,
                datetime: string,
                name: string,
                type: string
            }[];

            const eventsList = []
            for(let event of firebaseEvents){
                eventsList.push({
                    title: event.name,
                    start: new Date(event.datetime),
                    end: new Date(event.datetime)
                })
            }
            setEvents(eventsList)
        }

        const getCollegesList = async () => {
            setColleges(await getColleges() as College[]);
        }

        if(!addOpen){
            getCollegesList();
            getEventsAction();   
        }
    }, [addOpen]);

    const selectSlotHandler = (info: SlotInfo) => {
        setAddOpen(true);
        setSelectedDate(info.end);
    }

    return (
        <main className='flex flex-col h-full'>
            <div className='h-full p-6'>
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                defaultView={view}
                events={events}
                view={view} // Include the view prop
                date={date} // Include the date prop
                onView={(view: View): void => setView(view)}
                onSelectSlot={(info: SlotInfo) => selectSlotHandler(info)}
                selectable
                onNavigate={(date) => {
                    setDate(new Date(date));
                }}
            />
            </div>
            <Dialog open={addOpen} onOpenChange={(open) => setAddOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add an event</DialogTitle>
                    </DialogHeader>
                    <form method="POST" action={addEventHandler} onSubmit={() => setAddOpen(false)} className="flex flex-col gap-3">
                        <Label>Name</Label>
                        <Input name="name" placeholder="Event name" required/>
                        <Label>Type</Label>
                        <Input name="type" placeholder="Event type" required/>
                        <Label>Date & Time</Label>
                        <Input type="date" name="datetime" defaultValue={selectedDate?.toISOString().substring(0,10)} required/>
                        <Label>College</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your college"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    colleges?.map((college) => (
                                        <SelectItem value={college.id} key={college.id}>{college.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <div>
                            <Button type="submit">Add event</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    );
}