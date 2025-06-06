"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import InputField from "../InputField";
import { IoCloudUploadOutline } from "react-icons/io5";
import { examSchema, ExamSchema } from "../../../lib/formValidationSchema";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createExam, updateExam } from "../../../lib/actions";

const ExamForm = ({type, data, setOpen, relatedData}:{type : "create" | "update"; data ?: any, setOpen : Dispatch<SetStateAction<boolean>>, relatedData ? : any}) =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<ExamSchema>({
        resolver: zodResolver(examSchema),
      });

    //   After react 19 it'll be useaction
    const [ state, formAction ] = useFormState(type === "create" ? createExam : updateExam, {success: false, error:false})

      const onSubmit = handleSubmit((data)=>{
        formAction(data)
      })

      const router = useRouter();

      useEffect(()=>{
        if(state.success){
            toast(`Exam has been ${type === 'create' ? 'created' : 'updated' }!`);
            setOpen(false);
            router.refresh();
        }else if(state.error){
            toast('Something went wrong!')
        }
      },[state, router, type, setOpen])

      const { lessons } = relatedData;   
      
      console.log(lessons, ": lessons");
      

    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">{type === 'create' ? "Create a new exam" : "Update the exam"}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField label="Exam title" name="title" defaultValue={data?.title} register={register} error={errors.title}  />
                <InputField label="Start Date" name="startTime" defaultValue={data?.startTime} register={register} error={errors.startTime} type="dateTime-local"  />
                <InputField label="End Dat" name="endTime" defaultValue={data?.endTime} register={register} error={errors.endTime} type="dateTime-local" />
                
                <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors.id}  hidden/>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">
                            Lessons
                        </label>
                        <select  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" 
                          {...register("lessonId")} defaultValue={data?.lessonId}>
                            {lessons.map(
                              (lesson : { id: string; name : string}) => (
                                <option value={lesson.id} key={lesson.id}>
                                    {lesson.name}
                                </option>
                              )
                            )
                          }
                        </select>
                        {errors.lessonId?.message && <p className="text-xs text-red-400">{errors.lessonId?.message.toString()}</p> }    
                </div>
            </div>
            {state.error && <span className="text-red-500 text-xs">Something went wrong! {state.error}</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ExamForm;
