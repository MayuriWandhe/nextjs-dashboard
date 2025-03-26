"use client";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const FormModal = ({table, type, data, id} : {
    table : | "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type : "create" | "update" | "delete";
    data ? : any;
    id ? : number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" :  type === "delete" ? "lamaPurpule": '';

    return (
        <>
           
            {type === 'create' && (
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
                    <IoMdAdd />
                </button>
             )}

            {type === 'update' && (
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
                    <IoCreateOutline />
                </button>
             )}

            {type === 'delete' && (
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
                    <RiDeleteBin6Line />
                </button>
             )}
        </>
    )
}

export default FormModal