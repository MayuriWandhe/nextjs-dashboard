"use client";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { JSX, useState } from "react";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
import Image from "next/image";
import TeacherForm from "./forms/TeacherForm";




const FormModal = ({table, type, data, id} : {
    table : | "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type : "create" | "update" | "delete";
    data ? : any;
    id ? : number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" :  type === "delete" ? "lamaPurpule" : 'red';
    const [open, setOpen] = useState(false);
    const Form = () =>{
        return type === "delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete his {table}</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
            </form>
        ) : type === "create" || type === "update" ? (
            <TeacherForm type="create" />
          ) : (
            "Form not found!"
          );
    }
    return (
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                {type === 'create' && (
                    <IoMdAdd />
                )}
                {type === 'update' && (
                    <IoCreateOutline />
                )}
                {type === 'delete' && (
                    <RiDeleteBin6Line />
                )}
            </button>

                {/* <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                </button>
                <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                </button> */}
            
            {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                    <Form />
                    <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                        <IoMdClose />
                    </div>    
                </div>
            </div>}
        </>
    )
}

export default FormModal