eventsData

import TableSearchPage from "../../../components/TableSearch"
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import {  eventsData, examsData, lessonsData, resultsData } from "../../../../lib/data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import FormModal from "../../../components/FormModal";
import { Class, Event, Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/settings";
import { role } from "../../../../lib/util";

type EventsList = Event & {class : Class}

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
        header : "Start Time", accessor : "startTime", className : "hidden lg:table-cell"
    },
    {
        header : "End Time", accessor : "endTime", className : "hidden lg:table-cell"
    },
   ...(role === 'admin' || role === 'teacher' ? [ {
        header : "Action", accessor : "action", className : "hidden lg:table-cell"
    }] : [])
]


const renderRow = (item : EventsList) =>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpuleLight">
        <td className="flex items-center gap-4 p-4">
            <div className="flex-flex-col">
                <h3 className="font-semibold">{item.title}</h3>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.class.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td className="hidden md:table-cell">{item.startTime.toLocaleDateString("en-US", {
            hour : "2-digit",
            minute : "2-digit",
            hour12 : false
        })}</td>
        <td className="hidden md:table-cell">{item.endTime.toLocaleDateString("en-US", {
            hour : "2-digit",
            minute : "2-digit",
            hour12 : false
        })}</td>
        <td>
            <div className="flex items-center gap-2">
                {/* <Link href={`/list/teachers/${item.id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"><FaRegEdit /></button>
                </Link> */}
                {role === "admin" &&(
                    //  <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurpuleLight"><RiDeleteBin6Line /></button>
                    <>
                        <FormModal table="event" type="update" data={item} />
                        <FormModal table="event" type="delete" id={item.id} />
                    </>
                    
                )}
            </div>
        </td>
    </tr>
)

const EventsListPage = async({
    searchParams,
}:{
    searchParams : { [key : string ] : string } | undefined; 
}) =>{
    const {page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    const query : Prisma.EventWhereInput = {};

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
    
    const [data, count ] = await prisma.$transaction([
         prisma.event.findMany({
            where : query,
            include :{
                // subject : true,
                class : true
            },
            take : ITEM_PER_PAGE ,
            skip : ITEM_PER_PAGE * (p-1)
        }),
        prisma.event.count({where : query})
    ])
    
   

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                            {/* <FaPlus /> */}
                            <FormModal table="event" type="create" />
                        </button>}
                    </div>
                </div>
            </div>

            {/* List */}
            <Table columns={colums} renderRow={renderRow} data={data}/>

            {/* Pagination */}
            <Pagination page={p} count={count} />
        </div>
    );
};

export default EventsListPage;