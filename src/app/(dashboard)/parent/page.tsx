// "use client";
import { auth } from "@clerk/nextjs/server";
import Announcement from "../../components/Announcment"
import BigCalendar from "../../components/BigCalender"
import EventCounter from "../../components/EventCounter"
import "react-big-calendar/lib/css/react-big-calendar.css"; 
import prisma from "../../../lib/prisma";
import BigCalendarContainer from "../../components/BigCalendarContainer";

const ParentPage = async () => {

    const {userId} = auth();
    const currentUserId = userId;

    const students = await prisma.student.findMany({
        where : {
            parentId : currentUserId
        }
    })

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            <div>
                {students.map((student) => (
                <div className="w-full xl:w-2/3" key={student.id}>
                    <div className="h-full bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold">
                            Schedule ({student.name + " " + student.surname})
                        </h1>
                        <BigCalendarContainer type="classId" id={student.classId} />
                    </div>
                </div>
            ))}

            </div>
            
            {/* <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Scedule (John Doe)  </h1>
                    <BigCalendar/>
                </div>
            </div> */}

             {/* Right */}
             <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcement />
            </div>
        </div>
    )
}

export default ParentPage