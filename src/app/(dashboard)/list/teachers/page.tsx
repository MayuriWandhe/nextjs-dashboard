import TableSearchPage from "../../../components/TableSearch"
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { role, teachersData } from "../../../../lib/data";
import { RiDeleteBin6Line } from "react-icons/ri";
import FormModal from "../../../components/FormModal";
import { Class, Subject, Teacher } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/settings";

type TeacherList = Teacher & { subjects : Subject[] } & { classes : Class[] }
const colums = [
    {
        header : "Info", accessor : "Info"
    },
    {
        header : "Teacher ID", accessor : "teacherId", className : "hidden md:table-cell"
    },
    {
        header : "Students", accessor : "students", className : "hidden md:table-cell"
    },
    {
        header : "Classes", accessor : "classes", className : "hidden md:table-cell"
    },
    {
        header : "Phone", accessor : "phone", className : "hidden lg:table-cell"
    },
    {
        header : "Addess", accessor : "address", className : "hidden lg:table-cell"
    },
    {
        header : "Action", accessor : "action", className : "hidden lg:table-cell"
    }
]

const renderRow = (item : TeacherList) =>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpuleLight">
        <td className="flex items-center gap-4 p-4">
            <FaRegUserCircle className="w-7 h-7 md:hidden xl:block rounded-full object-cover"/>
            <img src="{item.img}" alt="" width={40} height={40} className="md:hidden xl:bolck w-10 h-10 rounded-full object-cover"/>
            <div className="flex-flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">{item?.email}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.username}</td>
        <td className="hidden md:table-cell">{item.subjects.map(subject => subject.name).join(",")}</td>
        <td className="hidden md:table-cell">{item.classes.map(data=> data.name).join(",")}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/teachers/${item.id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"><FaEye /></button>
                </Link>
                {role === "admin" &&(
                    //  <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurpuleLight"><RiDeleteBin6Line /></button>
                    <FormModal table="teacher" type="delete" id={item.id} />
                )}
            </div>
        </td>
    </tr>
)

const TeacherListPage = async({
    searchParams,
}:{
    searchParams : { [key : string ] : string } | undefined; 
}) =>{
    const {page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    console.log(searchParams);
    
    const [data, count ] = await prisma.$transaction([
         prisma.teacher.findMany({
            include :{
                subjects : true,
                classes : true
            },
            take : ITEM_PER_PAGE ,
            skip : ITEM_PER_PAGE * (p-1)
        }),
        prisma.teacher.count()
    ])
    
    console.log(data, count);
    
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearchPage />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <IoFilter />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaSortAmountDown />
                        </button>
                       {role === 'admin'  &&( <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            {/* <FaPlus /> */}
                            <FormModal table="teacher" type="create"/>
                        </button>)}
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

export default TeacherListPage;