import TableSearchPage from "../../../components/TableSearch"
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { parentsData, role, studentsData, subjectsData, teachersData } from "../../../../lib/data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/settings";
import FormModal from "../../../components/FormModal";
import FormContainer from "../../../components/FormContainer";

type SubjectList = Subject & {teacher : Teacher[]}


const colums = [
    {
        header : "Info", accessor : "Info"
    },
    {
        header : "Name", accessor : "studenament", className : "hidden md:table-cell"
    },
    {
        header : "Teachers", accessor : "teachers", className : "hidden lg:table-cell"
    },
]

const renderRow = (item : SubjectList) =>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpuleLight">
        <td className="flex items-center gap-4 p-4">
            {/* <FaRegUserCircle className="w-7 h-7 md:hidden xl:block rounded-full object-cover"/> */}
            {/* <img src="{item.photo}" alt="" width={40} height={40} className="md:hidden xl:bolck w-10 h-10 rounded-full object-cover"/> */}
            <div className="flex-flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                {/* <p className="text-xs text-gray-500">{item?.class}</p> */}
            </div>
        </td>
        <td className="hidden md:table-cell">{item.teachers.map(teacher=> teacher.name).join(", ")}</td>
        <td>
            <div className="flex items-center gap-2">
            <FormContainer table="subject" type="update" data={item} />
            <FormContainer table="subject" type="delete" data={item.id}/>
                {/* <Link href={`/list/teachers/${item.id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"><FaRegEdit /></button>
                </Link> */}
                {role === "admin" &&(
                     <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurpuleLight"><RiDeleteBin6Line /></button>
                )}
            </div>
        </td>
    </tr>
)


const SubjectListPage =  async({
    searchParams,
}:{
    searchParams : { [key : string ] : string } | undefined; 
}) =>{
    const {page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    console.log(searchParams);

    const query : Prisma.SubjectWhereInput = {};

    // URL Conditions
    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "teacherId": 
                        query.teachers = {
                            lessons : {
                                some: {
                                    teacherId : value
                                }
                            }
                        }
                    break;
                    case "search" : 
                        query.name = { contains : value, mode : "insensitive" }
                    
                }
            }
        }
    }
    
    const [data, count ] = await prisma.$transaction([
         prisma.subject.findMany({
            where : query,
            include :{
                teachers : true
            },
            take : ITEM_PER_PAGE ,
            skip : ITEM_PER_PAGE * (p-1)
        }),
        prisma.subject.count({where : query})
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearchPage />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <IoFilter />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaSortAmountDown />
                        </button>
                        { role === 'admin' && 
                        <FormModal table="subject" type="create"/>
                        // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        //     <FaPlus />

                        // </button>
                        }
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

export default SubjectListPage;