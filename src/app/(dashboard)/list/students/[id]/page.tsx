"use server";
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
import { auth } from "@clerk/nextjs/server";
import { Class, Student } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { notFound } from "next/navigation";

const SingleStudentPage = async (
    {
        params : {id}
    } : {
        params : {id : string}
    }
) =>{

    const {userId, sessionClaims } = auth();
    const role = ( sessionClaims?.metadata as {role? : string})?.role


    const student : 
       | (Student &  {
            class : (Class & {_count : {lessons : number}})
        }) 
       | null = await prisma.student.findUnique({
        where : {id},
        include : {
               class : {include : {_count : {select :{lessons : true}}}}
            }
        }
       )

    
    if(!student){
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
                            <Image src={student.img || '/noAvatar.png'} alt={''} 
                            width={144} height={144} className=''/>
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <h1 className="text-xl font-semibold">{student.name + " " + student.surname}</h1>
                            <p className="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <div className="flex item-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <MdOutlineBloodtype width={40} hanging={40}/>
                                    <span>{student.bloodType}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <BsCalendarEvent width={40} hanging={40}/>
                                    <span>{new Intl.DateTimeFormat("en-GB").format(student.birthday)}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <TfiEmail width={40} hanging={40}/>
                                    <span>{student.email || '-'}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <FiPhone width={40} hanging={40}/>
                                    <span>{student.phone}</span>
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
                                <h1 className="text-xl font-semibold">{student.class.name.charAt(0)}th</h1>
                                <span className="text-sm text-gray-400">Grade</span>
                            </div>
                        </div>

                        <div className="bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <FcRules width={24} height={24} />
                            <div className="">
                                <h1 className="text-xl font-semibold">{student.class._count.lessons}</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>

                        <div className="bg-white w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <FcReading width={24} height={24} />
                            <div className="">
                                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                                <span className="text-sm text-gray-400">Classes</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Student's Schedule</h1>
                    {/* <BigCalendar /> */}
                </div>
            </div>
            {/* Left */}
            <div className="w-full xl:w-1/3">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">Student's Lessons</Link>
                        <Link className="p-3 rounded-md bg-lamaPurpuleLight" href={`/list/teachers?classId=2`}>Student's Teachers</Link>
                        <Link className="p-3 rounded-md bg-lamaYellowLight" href={`/list/exam?classId=2`}>Student's Exams</Link>
                        <Link className="p-3 rounded-md bg-pink-50" href="/">Student's Results</Link>
                        <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/assignments?classId=2`}>Student's Assignments</Link>
                    </div>
                </div>
                    <Performance />
                    <Announcement />
            </div>
        </div>
    )
}

export default SingleStudentPage