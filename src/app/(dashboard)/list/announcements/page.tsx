import TableSearchPage from "../../../components/TableSearch"
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import {  announcementsData, assignmentsData, examsData, lessonsData} from "../../../../lib/data";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Announcement, Class, Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/settings";
import { auth } from "@clerk/nextjs/server";
import { currentUserId, role } from "../../../../lib/util";

type AnnouncementsList = Announcement & {class : Class}


const AnnouncementsListPage = async({
    searchParams,
}:{
    searchParams : { [key : string ] : string } | undefined; 
}) =>{

    const { userId , sessionClaims } = auth();
    const role = (sessionClaims?.metadata as {role? : string})?.role
    const currentUserId = userId;

    const colums = [
        {
            header : "Info", accessor : "Info"
        },
        {
            header : "Title", accessor : "title", className : "hidden md:table-cell"
        },
        {
            header : "Class", accessor : "class", className : "hidden lg:table-cell"
        },
        {
            header : "Date", accessor : "Date", className : "hidden lg:table-cell"
        },
        ...(role === 'admin' ?[{
            header : "Action", accessor : "action", className : "hidden lg:table-cell"
        }] : []),
    ]

            
    const renderRow = (item : AnnouncementsList) =>(
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpuleLight">
            <td className="flex items-center gap-4 p-4">
                {/* <FaRegUserCircle className="w-7 h-7 md:hidden xl:block rounded-full object-cover"/> */}
                {/* <img src="{item.photo}" alt="" width={40} height={40} className="md:hidden xl:bolck w-10 h-10 rounded-full object-cover"/> */}
                <div className="flex-flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.description}</td>
            <td className="hidden md:table-cell">{item.class.name}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.date)}</td>


            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"><FaRegEdit /></button>
                    </Link>
                    {role === "admin" &&(
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurpuleLight"><RiDeleteBin6Line /></button>
                    )}
                </div>
            </td>
        </tr>
    )

    const {page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    const query : Prisma.AnnouncementWhereInput = {};

    // URL Conditions
    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "search" : 
                        query.title = { contains : value, mode : "insensitive" }
                        break;
                    default :
                        break;
                    
                }
            }
        }
    }


        // role conditions

        const roleConditions = {
            teacher : { lessons : { some : { teacherId : currentUserId! } } },
            student : { lessons : { some : { teacherId : currentUserId! } } },
            parent : { lessons : { some : { teacherId : currentUserId! } } },
        }
    
        query.OR = [
            { classId : null},
            { class : roleConditions[role as keyof typeof roleConditions]  || {}, }
        ]
    
    
    const [data, count ] = await prisma.$transaction([
         prisma.announcement.findMany({
            where : query,
            include :{
                // title : true,
                class : true
            },
            take : ITEM_PER_PAGE ,
            skip : ITEM_PER_PAGE * (p-1)
        }),
        prisma.announcement.count({where : query})
    ])
    


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearchPage />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <IoFilter />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaSortAmountDown />
                        </button>
                        { role === 'admin' && <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaPlus />
                        </button>}
                    </div>
                </div>
            </div>

            {/* List */}
            <Table columns={colums} renderRow={renderRow} data={data}/>

            {/* Pagination */}
            <Pagination page={p} count={count}/>
        </div>
    );
};

export default AnnouncementsListPage;