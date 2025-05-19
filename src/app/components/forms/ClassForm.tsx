"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import InputField from "../InputField";
import { IoCloudUploadOutline } from "react-icons/io5";
import { classSchema, subjectSchema, SubjectSchema } from "../../../lib/formValidationSchema";
import { createClass, createSubject, updateClass, updateSubject } from "../../../lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({type, data, setOpen, relatedData}:{type : "create" | "update"; data ?: any, setOpen : Dispatch<SetStateAction<boolean>>, relatedData ? : any}) =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<classSchema>({
        resolver: zodResolver(classSchema),
      });

    //   After react 19 it'll be useaction
    const [ state, formAction ] = useFormState(type === "create" ? createClass : updateClass, {success: false, error:false})

      const onSubmit = handleSubmit((data)=>{
        formAction(data)
      })

      const router = useRouter();

      useEffect(()=>{
        if(state.success){
            toast(`Subject has been ${type === 'create' ? 'created' : 'updated' }!`);
            setOpen(false);
            router.refresh();
        }else if(state.error){
            toast('Something went wrong!')
        }
      })

      const { teachers, grades } = relatedData;      

    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">{type === 'create' ? "Create a new class" : "Update the class"}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField label="Class name" name="name" defaultValue={data?.name} register={register} error={errors.name}  />
                <InputField label="Capacity" name="capacity" defaultValue={data?.capacity} register={register} error={errors.capacity}  />

                <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors.id}  hidden/>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">
                          Supervisor
                        </label>

                        <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" 
                          {...register("supervisorId")} defaultValue={data?.teachers}>
                            {teachers.map(
                              (teacher : { id: string; name : string; surname : string}) => (
                                <option value={teacher.id} key={teacher.id}>
                                {teacher.name + " " + teacher.surname}
                                </option>
                              )
                            )
                          }
                        </select>
                        {errors.supervisorId?.message && <p className="text-xs text-red-400">{errors.supervisorId?.message.toString()}</p> }    
                </div>


                <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">
                          Grades
                        </label>

                        <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" 
                          {...register("gradeId")} defaultValue={data?.gradeId}>
                            {grades.map(
                              (grade : { id: string; level: number}) => (
                                <option value={grade.id} key={grade.id}>
                                {grade.level}
                                </option>
                              )
                            )
                          }
                        </select>
                        {errors.gradeId?.message && <p className="text-xs text-red-400">{errors.gradeId?.message.toString()}</p> }    
                </div>
            </div>
            {state.error && <span className="text-red-500 text-xs">Something went wrong!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ClassForm;
