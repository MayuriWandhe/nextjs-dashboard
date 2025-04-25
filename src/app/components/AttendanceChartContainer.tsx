import prisma from "../../lib/prisma";
import AttendanceChart from "./AttendanceChart"
import { IoIosMore } from "react-icons/io";

const AttendanceChartContainer = async () =>{

    const today = new Date();
    const dayOfWeek = today.getDate();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today);

    lastMonday.setDate(today.getDate() - daysSinceMonday);

    const resData = await prisma.attendance.findMany({
        where : {
            date : {
                gte : lastMonday,
            }
        }, 
        select : {
            date : true,
            present : true
        }
    })
    
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thue", "Fri"];

    const attendanceMap : {[key : string] : {present :number, absent : number}} = {
        Mon : {present:0, absent : 0},
        Tue : {present:0, absent : 0},
        Wed : {present:0, absent : 0},
        Thue : {present:10, absent : 0},
        Fri : {present:0, absent : 0},
    }


    const data = daysOfWeek.map((day) => ({
        name : day,
        present : attendanceMap[day].present,
        absent : attendanceMap[day].absent,
    }))

    console.log(dayOfWeek, lastMonday, resData, attendanceMap);

    resData.forEach(item => {
        const date = new Date(item.date);

        if(dayOfWeek >= 1 &&  dayOfWeek <= 5){
            const dayName = dayOfWeek[dayOfWeek - 1] ;

            if(item.present){
                attendanceMap[dayName].present =+ 1;
            }else{
                attendanceMap[dayName].absent =+ 1;
            }
        }
    });

    return (
        <div className="bg-white rounded-lg p-4 h-full w-full">
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <IoIosMore />
            </div>
            <AttendanceChart data={data} />
        </div>
    )

}

export default AttendanceChartContainer;