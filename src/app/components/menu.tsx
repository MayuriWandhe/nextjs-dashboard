import { title } from "process"
import { FaHome } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { PiStudentBold } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { role } from "../../lib/data";

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
                icon : 'FaHome',
                label : "Home",
                href : '/',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'PiChalkboardTeacherFill',
                label : "Teachers",
                href : '/list/teacher',
                visible : ['admin', 'teacher'],
            },
            {
                icon : 'PiStudentBold',
                label : "Students",
                href : '/list/student',
                visible : ['admin', 'teacher'],
            },
            {
                icon : 'RiParentLine',
                label : "Parents",
                href : '/list/parent',
                visible : ['admin', 'teacher'],
            },
            {
                icon : 'RiParentLine',
                label : "Subjects",
                href : '/list/subject',
                visible : ['admin', 'teacher'],
            },
            {
                icon : 'FaHome',
                label : "Classes",
                href : '/list/classes',
                visible : ['admin', 'teacher'],
            },
            {
                icon : 'FaHome',
                label : "Lessons",
                href : '/list/lessons',
                visible : ['admin', 'teacher'],
            },
            {
                icon : 'FaHome',
                label : "Exams",
                href : '/list/exams',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'FaHome',
                label : "Assignments",
                href : '/list/assignments',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'FaHome',
                label : "Results",
                href : '/list/results',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'FaHome',
                label : "Attendance",
                href : '/list/Attendance',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'FaHome',
                label : "Events",
                href : '/list/events',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'FaHome',
                label : "Messages",
                href : '/',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'FaHome',
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
                icon : 'IoPersonCircle',
                label : "Profile",
                href : '/profile',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'IoIosSettings',
                label : "Setting",
                href : '/setting',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            {
                icon : 'IoMdLogOut',
                label : "Logout",
                href : '/logout',
                visible : ['admin', 'teacher', 'student','parent'],
            },
            
        ]
    }
]

const Menu = () =>{
    return (
        <div className="mt-4 text-sm">
            {menuItems.map(i=>(
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>

                    {i.items.map((item) =>{
                        if(item.visible.includes(role)){
                            {item.label}
                            console.log(item.label);
                            return(
                                <Link href={item.href} key={item.label} className="flex items-center justify-content lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight">
                                {<item.icon/>}
                                <FaHome/>
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

export default Menu