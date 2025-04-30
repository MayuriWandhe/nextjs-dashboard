import prisma from "../../lib/prisma";

const EventList = async ({dateParam}:{dateParam : string | undefined}) =>{
    const date = dateParam ? new Date(dateParam) : new Date();
    const data = await prisma.event.findMany({
        where : {
            startTime : {
                gte : new Date(date.setHours(0,0,0,0)),
                lte : new Date(date.setHours(23,59,59,999)),
            }
        }
    })

    // console.log('data', data, date);
    
    return data.map((event) => {
        return (
                <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurpule'
                    key={event.id}>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                        <span className='text-xs text-gray-300'>{event.startTime.toLocaleTimeString("en-UK", {
                            hour : "2-digit",
                            mintue : "2-digit",
                            hour12 : false,
                        })}</span>
                    </div>
                    <p className='text-sm mt-2 text-gray-400'>{event.description}</p>
                </div>
            );
        } 
    )
}

export default EventList;