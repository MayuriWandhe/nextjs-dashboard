"use client";

import { currentUser } from "@clerk/nextjs/server";
import { title } from "process"

import { FaHome } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { PiStudentBold } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaBookSolid } from "react-icons/lia";
import { PiExamLight } from "react-icons/pi";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { PiMedalLight } from "react-icons/pi";
import { TbTimelineEvent } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { TfiAnnouncement } from "react-icons/tfi";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { role } from "../../lib/data";
import { useUser } from "@clerk/nextjs";

const iconMap: { [key: string]: React.ComponentType } = {
    FaHome,
    PiChalkboardTeacherFill,
    PiStudentBold,
    RiParentLine,
    IoPersonCircle,
    IoIosSettings,
    IoMdLogOut,
  };

  
const menuItems = [
    {
        title : 'MENU',
        items : [
            {
                icon : <FaHome/>,
                label : "Home",
                href : '/',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <PiChalkboardTeacherFill/>,
                label : "Teachers",
                href : '/list/teachers',
                visible : ['admin', 'teacher'],
            },
            {
                icon : <PiStudentBold/>,
                label : "Students",
                href : '/list/students',
                visible : ['admin', 'teacher'],
            },
            {
                icon : <RiParentLine/>,
                label : "Parents",
                href : '/list/parents',
                visible : ['admin', 'teacher'],
            },
            {
                icon : <RiParentLine />,
                label : "Subjects",
                href : '/list/subjects',
                visible : ['admin', 'teacher'],
            },
            {
                icon : <SiGoogleclassroom />,
                label : "Classes",
                href : '/list/classes',
                visible : ['admin', 'teacher'],
            },
            {
                icon : <LiaBookSolid />,
                label : "Lessons",
                href : '/list/lessons',
                visible : ['admin', 'teacher'],
            },
            {
                icon : <PiExamLight />,
                label : "Exams",
                href : '/list/exams',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <MdOutlineAssignmentTurnedIn />,
                label : "Assignments",
                href : '/list/assignments',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <PiMedalLight />,
                label : "Results",
                href : '/list/results',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            // {
            //     icon : 'FaHome',
            //     label : "Attendance",
            //     href : '/list/Attendance',
            //     visible : ['admin', 'teacher', 'student','parent'],
            // },
            {
                icon : <TbTimelineEvent />,
                label : "Events",
                href : '/list/events',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <TiMessages />,
                label : "Messages",
                href : '/',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <TfiAnnouncement />,
                label : "Announcements",
                href : '/list/announcements',
                visible : ['admin', 'teacher', 'student','parent'],
            },
        ]
    },
    {
        title : "OTHER",
        items : [
            {
                icon : <IoPersonCircle/>,
                label : "Profile",
                href : '/profile',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <IoIosSettings/>,
                label : "Setting",
                href : '/setting',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : <IoMdLogOut/>,
                label : "Logout",
                href : '/logout',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            
        ]
    }
]

const Menu = () =>{
    const { user } = useUser()
    // const {  user } = useUser();
    // const user =  await currentUser();
    const role = user?.publicMetadata.role as string;

    return (
        <div className="mt-4 text-sm">
            {menuItems.map(i=>(
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>

                    {i.items.map((item) =>{
                        if(item.visible.includes(role)){
                            {item.label}
                            return(
                                <Link href={item.href} key={item.label} className="flex items-center justify-content lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight">
                                {item.icon}
                                    <span className="hidden lg:block">{item.label}</span>
                                </Link>
                            )
                          
                        }
                    })}    
                </div>
            ))}
        </div>
    )
}

export default Menu;
