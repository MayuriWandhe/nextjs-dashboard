"use client";

import { useRouter } from 'next/navigation';
import { title } from 'process';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// const events = [
//     {
//         id : 1,
//         title : 'Lorem Ipsum dolor', 
//         time : "12:00 PM - 1:00 PM",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
//     },
//     {
//         id : 2,
//         title : 'Lorem Ipsum dolor', 
//         time : "12:00 PM - 1:00 PM",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
//     },
//     {
//         id : 3,
//         title : 'Lorem Ipsum dolor', 
//         time : "12:00 PM - 1:00 PM",
//         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
//     }
// ]

const EventCounter = () => {
    
    const [value, onChange] = useState<Value>(new Date());
    const router = useRouter();

    useEffect(() =>{
        if(value instanceof Date){
            router.push(`?date=${value}`);
        }
    }, [value, router]);
    return <Calendar onChange={onChange} value={value}/>
}


export default EventCounter