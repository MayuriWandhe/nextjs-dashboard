import TableSearchPage from "../../../components/TableSearch"
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import {  examsData, lessonsData, resultsData, role, } from "../../../../lib/data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Assignment, Exam, Prisma, Result, Student } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/settings";
import { title } from "process";

type ResultsList ={
    id : number;
    title : string;
    studentName : string;
    studentSurname : string;
    teacherName : string;
    teacherSurname : string;
    score : number;
    className : string;
    startTime : Date;
}

const colums = [
    {
        header : "Info", accessor : "Info"
    },
    {
        header : "Subject", accessor : "subject", className : "hidden md:table-cell"
    },
    {
        header : "Class", accessor : "class", className : "hidden lg:table-cell"
    },
    {
        header : "Teacher", accessor : "teacher", className : "hidden lg:table-cell"
    },
    {
        header : "Student", accessor : "student", className : "hidden lg:table-cell"
    },
    {
        header : "Type", accessor : "type", className : "hidden lg:table-cell"
    },
    {
        header : "Score", accessor : "score", className : "hidden lg:table-cell"
    },
    {
        header : "Date", accessor : "date", className : "hidden lg:table-cell"
    },

    {
        header : "Action", accessor : "action", className : "hidden lg:table-cell"
    }
]


const renderRow = (item : ResultsList) =>(
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpuleLight">
        <td className="flex items-center gap-4 p-4">
            {/* <FaRegUserCircle className="w-7 h-7 md:hidden xl:block rounded-full object-cover"/> */}
            {/* <img src="{item.photo}" alt="" width={40} height={40} className="md:hidden xl:bolck w-10 h-10 rounded-full object-cover"/> */}
            <div className="flex-flex-col">
                <h3 className="font-semibold">{item.title}</h3>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.studentName} {item.studentName}</td>
        <td className="hidden md:table-cell">{item.className}</td>
        <td className="hidden md:table-cell">{item.teacherName} {item.teacherSurname}</td>
        {/* <td className="hidden md:table-cell">{item.student}</td> */}
        <td className="hidden md:table-cell">{item.score}</td>
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

const ResultsListPage = async({
    searchParams,
}:{
    searchParams : { [key : string ] : string } | undefined; 
}) =>{
    const {page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    console.log(searchParams);

    const query : Prisma.ResultWhereInput = {};

    // URL Conditions
    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "sutudentId": 
                        query.studentId = value;
                    case "search" : 
                        query.OR = [
                            { exam : { title : { contains : value, mode : "insensitive" }}},
                            { student : { name : { contains : value, mode : "insensitive" }}}
                        ];
                        break;
                    default:
                        break;
                    
                            
                }
            }
        }
    }
    
    const [dataRes, count ] = await prisma.$transaction([
         prisma.result.findMany({
            where : query,
            include :{
                exam :{
                    include : {
                        lesson : {
                            select : {
                                class : {select : {name : true}},
                                teacher :   {select : {name : true}},
                            }
                        }
                    },
                },
                assignment :{
                    include : {
                        lesson : {
                            select : {
                                class : {select : {name : true}},
                                teacher :   {select : {name : true}},
                            }
                        }
                    },
                },
                student : {select : {name : true}},
            },
            take : ITEM_PER_PAGE ,
            skip : ITEM_PER_PAGE * (p-1)
        }),
        prisma.result.count({where : query})
    ])


    const data = dataRes.map((item)=>{
        const assessment = item.exam || item.assignment;
        if(!assessment) return null;
        const isExam = "startTime" in assessment;
        return {
            id : item.id,
            title : assessment.title,
            studentName : item.student.name,
            studentSurname : item.student.surname,
            teacherName : assessment.teacher,
            teacherSurame : assessment.teacher,
            score : item.score,
            className : assessment.lesson.class.name,
            startTime : isExam ? assessment.startTime : assessment.startDate
        }
    })

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
            <Pagination page={p} count={count} />
        </div>
    );
};

export default ResultsListPage;