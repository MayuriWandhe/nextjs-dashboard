"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import InputField from "../InputField";
import { IoCloudUploadOutline } from "react-icons/io5";
import { subjectSchema, SubjectSchema } from "../../../lib/formValidationSchema";
import { createSubject } from "../../../lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SubjectForm = ({type, data}:{type : "create" | "update"; data ?: any}) =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
      });

    //   After react 19 it'll be useaction

    const [ state, formAction ] = useFormState(createSubject, {success: false, error:false})

      const onSubmit = handleSubmit((data)=>{
        console.log(data);
        formAction(data)
      })

      useEffect(()=>{
        if(state.success){
            toast(`Subject has been ${type === 'create' ? 'created' : 'updated' }!`);
        }else{
            toast('Something went wrong!')
        }
      })

    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">{type === 'create' ? "Create a new subject" : "Update the subject"}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField label="Subject name" name="name" defaultValue={data?.name} register={register} error={errors.name}  />
            </div>
            {state.error && <span className="text-red-500 text-xs">Something went wrong!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default SubjectForm;
