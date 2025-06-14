"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, number, z } from 'zod';
import { useForm } from 'react-hook-form';
import InputField from "../InputField";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { studentSchema, StudentSchema, } from "../../../lib/formValidationSchema";
import { createStudent, updateStudent } from "../../../lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { CldUploadWidget } from 'next-cloudinary';




    const StudentForm = ({type, data, setOpen, relatedData}:{type : "create" | "update"; data ?: any, setOpen : Dispatch<SetStateAction<boolean>>, relatedData : any}) =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<StudentSchema>({
        resolver: zodResolver(studentSchema),
      });

    
    const [img, setImg] = useState<any>()

    console.log(img, 'img');
    
    const [ state, formAction ] = useFormState(type === "create" ? createStudent : updateStudent, { success: false, error:false } )

    const onSubmit = handleSubmit((data)=>{
    formAction({...data, img : img?.secure_url});
    
    })

    const router = useRouter();

    useEffect(()=>{
    if(state.success){
        toast(`Student has been ${type === 'create' ? 'created' : 'updated' }!`);
        setOpen(false);
        router.refresh();
    }else if(state.error){
        toast('Something went wrong!', state.error)
    }
    },[state, router, type, setOpen])

    const { grades, classes } = relatedData;     

    
    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">{type === 'create' ? 'Create a new student' : 'Update the student'}</h1>
            <span className="text-xs text-gray-400 font-medium flex text-start">Authentication information</span>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors.username}  />
                <InputField label="Email" name="email" type="email" defaultValue={data?.email} register={register} error={errors.email}  />
                <InputField label="password" name="password" type="password" defaultValue={data?.password} register={register} error={errors.password}  />
            </div>
                <span className="text-xs text-gray-400 font-medium flex text-start">Personal Information</span>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    
                    <InputField label="First Name" name="name" defaultValue={data?.name} register={register} error={errors.name}  />
                    <InputField label="Last Name" name="surname"  defaultValue={data?.surname} register={register} error={errors.surname}  />
                    <InputField label="phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone}  />
                    <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address}  />
                    <InputField label="ParentId" name="parentId" defaultValue={data?.parentId} register={register} error={errors.parentId}  />

                    {/* <InputField label="Birthday" name="birth day" type="date" defaultValue={data?.birthday} register={register} error={errors.birthday}  /> */}
                    <InputField
                        label="Birthday"
                        name="birthday"
                        defaultValue={data?.birthday.toISOString().split("T")[0]}
                        register={register}
                        error={errors.birthday}
                        type="date"
                    />
                    <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType}  />
                    <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden />
                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">Grade</label>
                        <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("gradeId")} defaultValue={data?.gradeId}>
                            {grades.map((grade : { id : number; level : string }) => (
                                <option value={grade.id} key={grade.id}>{grade.level}</option>
                        ))}
                        </select>
                        {errors.gradeId?.message && <p className="text-xs text-red-400">{errors.gradeId?.message.toString()}</p> }    
                    </div>


                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">Class</label>
                        <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("classId")} defaultValue={data?.class}>
                            {classes.map((classItem : { id : number; name : string; capacity : number; _count : {students : number} }) => (
                                <option value={classItem.id} key={classItem.id}>
                                    (
                                    {classItem.name} - {classItem._count.students + "/" + classItem.capacity} {" "}Capacity
                                    )
                                    </option>
                        ))}
                        </select>
                        {errors.gradeId?.message && <p className="text-xs text-red-400">{errors.gradeId?.message.toString()}</p> }    
                    </div>
                            

                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">Sex</label>
                        <select name="" id="" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("sex")} defaultValue={data?.sex}>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex?.message.toString()}</p> }    
                    </div>
                            


                    {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                        <label className="text-md text-gray-800 flex text-start flex items-center gap-2 cursor-pointer" htmlFor="img">
                            <IoCloudUploadOutline />
                            <span>Upload Image</span>
                        </label>
                        <input type="file" id="img" {...register("img")} className="hidden"/>
                            
                        {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex?.message.toString()}</p> }    
                    </div> */}

                    <CldUploadWidget uploadPreset="school" onSuccess={(result,{widget}) => {
                        setImg(result.info)
                        widget.close()
                        }}>
                        {({ open }) =>{
                            return(
                                <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center" onClick={() => open()}>
                                    <label className="text-md text-gray-800 flex text-start flex items-center gap-2 cursor-pointer" htmlFor="img">
                                        <IoCloudUploadOutline />
                                        <span>Upload Image</span>
                                    </label>
                                    {/* <input type="file" id="img" {...register("img")} className="hidden"/> */}
                                </div>
                            )
                        }}                    
                    </CldUploadWidget>
                    {img !== undefined && <img src={img?.secure_url} alt={img?.secure_url} width={50} height={50}/> }

                </div>
                {state.error && (
                    <span className="text-red-500">Something went Wrong!</span>
                )}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default StudentForm;
