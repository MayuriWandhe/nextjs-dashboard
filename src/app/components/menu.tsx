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
                href : '/'
            },
            {
                icon : 'PiChalkboardTeacherFill',
                label : "Teachers",
                href : '/teacher'
            },
            {
                icon : 'PiStudentBold',
                label : "Students",
                href : '/student'
            },
            {
                icon : 'RiParentLine',
                label : "Parents",
                href : '/parent'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
            {
                icon : 'FaHome',
                label : "Home",
                href : '/'
            },
        ]
    },
    {
        title : "OTHER",
        items : [
            {
                icon : 'IoPersonCircle',
                label : "Profile",
                href : '/profile'
            },
            {
                icon : 'IoIosSettings',
                label : "Setting",
                href : '/setting'
            },
            {
                icon : 'IoMdLogOut',
                label : "Logout",
                href : '/logout'
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
                    {i.items.map(item=>(
                        <Link href={item.href} key={item.label} className="flex items-center justify-content lg:justify-start gap-4 text-gray-500 py-2">
                            {/* {<item.icon/>} */}
                            <FaHome/>
                          {/* <Image src={item.icon} alt="" width={20} height={20} /> */}
                           <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Menu