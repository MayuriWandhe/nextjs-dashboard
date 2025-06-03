// "use client";
import Image from "next/image";
import { MdOutlineBloodtype } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { FcDataSheet } from "react-icons/fc";
import { FcMindMap } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import BigCalendar from "../../../../components/BigCalender";
import "react-big-calendar/lib/css/react-big-calendar.css"; 
import Announcement from "../../../../components/Announcment";
import Link from "next/link";
import Performance from "../../../../components/Performance";
import FormModal from "../../../../components/FormModal";
import BigCalendarContainer from "../../../../components/BigCalendarContainer";
import { Teacher } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { notFound } from "next/navigation";
import FormContainer from "../../../../components/FormContainer";
import { role } from "../../../../../lib/util";
import { auth } from "@clerk/nextjs/server";

const SingleTeacherPage = async ( 
    { params : {id},
}:{
    params : {id: string};
}) =>{


const { userId, sessionClaims } = auth();
const role = ( sessionClaims?.metadata as {role? : string})?.role

    const teacher : 
       | (Teacher &  {
            _count : { subjects: number; lessons : number; classes : number}
        }) 
       | null = await prisma.teacher.findUnique({
        where : {id},
        include : {
            _count : {
                select : {
                    subjects : true,
                    classes : true,
                    lessons : true
                }
            }
        }
    })

    console.log(teacher);
    
    if(!teacher){
        return notFound();
    }
    return (
        <div className="flex p-4 flex-col xl:flex-row gap-4">
            {/* Left */}
            <div className="w-full xl:w-2/3">
                {/* Top */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* User info card */}
                    <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image src={teacher.img || '/noAvatar.png'} alt={''} 
                            width={144} height={144} className=''/>
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                        <div className="flex ietms-center gap-4">
                            <h1 className="text-xl font-semibold">{teacher.name + " " + teacher.surname}</h1>
                          {/* {role === 'admin' && ( */}
                            <FormContainer table="teacher" type="update" data={teacher}/>
                          {/* )}   */}
                        </div>
                            <p className="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <div className="flex item-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <MdOutlineBloodtype width={40} hanging={40}/>
                                    {/* <span>{teacher.bloodType}</span> */}
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <BsCalendarEvent width={40} hanging={40}/>
                                    <span>{new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <TfiEmail width={40} hanging={40}/>
                                    <span>{teacher.email || '-'}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <FiPhone width={40} hanging={40}/>
                                    <span>{teacher.phone || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* small cards */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/* Cards */}
                        <div className="bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <FcDataSheet width={24} height={24} />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>

                        <div className="bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <FcMindMap width={24} height={24} />
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher._count.subjects}</h1>
                                <span className="text-sm text-gray-400">Breanches</span>
                            </div>
                        </div>

                        <div className="bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <FcRules width={24} height={24} />
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher._count.lessons}</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>

                        <div className="bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <FcReading width={24} height={24} />
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher._count.classes}</h1>
                                <span className="text-sm text-gray-400">Classes</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Teacher's Schedule</h1>
                    {/* <BigCalendarContainer type="teacherId" id="1"  /> */}
                </div>
            </div>
            {/* Left */}
            <div className="w-full xl:w-1/3">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/classes?supervisorId=${'teacher2'}`}>Teacher's Classes</Link>
                        <Link className="p-3 rounded-md bg-lamaPurpuleLight" href={`/list/students?teacherId=${'teacher2'}`}>Teacher's Students</Link>
                        <Link className="p-3 rounded-md bg-lamaYellowLight" href={`/list/exams?teacherId=${'teacher2'}`}>Teacher's Exams</Link>
                        <Link className="p-3 rounded-md bg-pink-50" href={`/list/lessons?teacherId=${'teacher2'}`}>Teacher's Lessons</Link>
                        <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/assignments?teacherId=${'teacher2'}`}>Teacher's Assignments</Link>
                    </div>
                </div>
                    <Performance />
                    <Announcement />
            </div>
        </div>
    )
}

export default SingleTeacherPage