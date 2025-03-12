"use client";

import { title } from 'process';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosMore } from "react-icons/io";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id : 1,
        title : 'Lorem Ipsum dolor', 
        time : "12:00 PM - 1:00 PM",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id : 2,
        title : 'Lorem Ipsum dolor', 
        time : "12:00 PM - 1:00 PM",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id : 3,
        title : 'Lorem Ipsum dolor', 
        time : "12:00 PM - 1:00 PM",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
]

const EventCounter = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className='bg-white p-4 rounded-md'>
            <Calendar onChange={onChange} value={value} />
            <div className='flex justify-between items-cnter'>
                <h1 className='text-xl font-semibold my-4'>Events</h1>
                <IoIosMore />
            </div>
            <div className='flex flex-col gap-4'>

                {events.map((event) => {
                    return (
                        <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurpule'
                         key={event.id}>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                                <span className='text-xs text-gray-300'>{event.time}</span>
                            </div>
                            <p className='text-sm mt-2 text-gray-400'>{event.description}</p>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}


export default EventCounter