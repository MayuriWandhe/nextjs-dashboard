import { IoIosMore } from "react-icons/io";
import Calendar from 'react-calendar';
import EventList from "./EventList";
import EventCounter from "./EventCounter";

const EventCalendarContainer = async ({
    searchParams,
}: {
    searchParams : {
      [  keys : string ] : string | undefined  
    };
}) =>{
    const { date } = searchParams;
    console.log('searchParams', searchParams);
    
    return(
        <div className='bg-white p-4 rounded-md'>
            <EventCounter />
            {/* <Calendar onChange={onChange} value={value} /> */}
            <div className='flex justify-between items-cnter'>
                <h1 className='text-xl font-semibold my-4'>Events</h1>
                <IoIosMore />
            </div>
            <div className='flex flex-col gap-4'>
                <EventList dateParam={date} />
            </div>
        </div>
    )
}

export default EventCalendarContainer;