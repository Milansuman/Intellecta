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
import { getEvents, getColleges, getEvent, type Event as FireBaseEvent } from '@/lib/db'
import {addEventHandler} from "@/app/events/actions"
import { useState, useEffect, useRef } from 'react'

const localizer = momentLocalizer(moment)

type College = {
    created_at: number,
    delete_at: number | null,
    id: string,
    name: string,
    updated_at: number | null
}

export function EventsPage({isAdmin}: {isAdmin: boolean}){
    const [view, setView] = useState<View | undefined>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>();
    const [colleges, setColleges] = useState<College[]>();

    const [addOpen, setAddOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();

    const [viewOpen, setViewOpen] = useState(false);
    const [eventName, setEventName] = useState("")
    const [selectedEvent, setSelectedEvent] = useState<FireBaseEvent | null>(null);

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

    useEffect(() => {
        if(viewOpen){
            (async () => {
                setSelectedEvent(await getEvent(eventName))
            })()
        }
    }, [viewOpen, eventName])

    const selectSlotHandler = (info: SlotInfo) => {
        setAddOpen(true);
        setSelectedDate(info.end);
    }

    const selectEventHandler = (event: Event) => {
        setViewOpen(true);
        setEventName(event.title as string)
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
                onSelectEvent={(event: Event) => selectEventHandler(event)}
                selectable
                onNavigate={(date) => {
                    setDate(new Date(date));
                }}
            />
            </div>
            <Dialog open={addOpen && isAdmin} onOpenChange={(open) => setAddOpen(open)}>
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
            <Dialog open={viewOpen} onOpenChange={(open) => {
                if(!open){
                    setSelectedEvent(null)
                }
                setViewOpen(open)
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>View Event</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={() => setViewOpen(false)} className="flex flex-col gap-3">
                        <Label>Name</Label>
                        <Input name="name" placeholder="Event name" className="disabled:opacity-100" defaultValue={selectedEvent?.name as string} disabled={!isAdmin} required/>
                        <Label>Type</Label>
                        <Input name="type" placeholder="Event type" className="disabled:opacity-100" defaultValue={selectedEvent?.type} disabled={!isAdmin} required/>
                        <Label>Date & Time</Label>
                        <Input type="date" name="datetime" className="disabled:opacity-100" defaultValue={selectedEvent?.datetime} disabled={!isAdmin} required/>
                        <Label>College</Label>
                        <Select defaultValue={selectedEvent?.college_id as string} disabled={!isAdmin}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your college"/>
                            </SelectTrigger>
                            <SelectContent className="disabled:opacity-100">
                                {
                                    colleges?.map((college) => (
                                        <SelectItem value={college.id} key={college.id}>{college.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <div>
                            {
                                isAdmin && <Button type="submit">Update event</Button>
                            }
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    );
}