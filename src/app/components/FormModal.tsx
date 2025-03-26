"use client";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const FormModal = ({table, type, data, id} : {
    table : | "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type : "create" | "update" | "delete";
    data ? : any;
    id ? : number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" :  type === "delete" ? "lamaPurpule" : 'red';
    const [open, setOpen] = useState(false);

    return (
        <>
            {type === 'create' && (
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                    <IoMdAdd />
                </button>
             )}

            {type === 'update' && (
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                    <IoCreateOutline />
                </button>
             )}

            {type === 'delete' && (
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                    <RiDeleteBin6Line />
                </button>
             )}

            {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                            <IoMdClose />
                        </div>    
                     </div>
            </div>}
        </>
    )
}

export default FormModal