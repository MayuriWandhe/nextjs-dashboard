"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import InputField from "../InputField";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
    username: z.string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(8, { message: 'Username must be at most 8 characters long!' }),
    email: z.string().email({message : 'Invalid email address!'}),
    password: z.number().min(8, {message : 'Password must be 8 characters long!'}),
    firstName : z.string().min(1, {message : 'First name is required!'}),
    lastName : z.string().min(1, {message : 'Last name is required!'}),
    phone : z.string().min(10, {message : 'Phone no. is required!'}),
    address : z.string().min(1, {message : 'Address is required!'}),
    birthday : z.date({message : 'Birthday is required!'}),
    bloodType : z.string({message : 'Blood type is required!'}),
    sex : z.enum(["male", "female"], {message : 'Sex is required!'}),
    img : z.instanceof(File, {message : 'Image is required!'}),
  });

  type Inputs = z.infer<typeof schema>;

const StudentForm = ({type, data, setOpen, relatedData}:{type : "create" | "update"; data ?: any, setOpen : Dispatch<SetStateAction<boolean>>, relatedData? : any}) =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({
        resolver: zodResolver(schema),
      });
      const onSubmit = handleSubmit((data)=>{
        
      })
    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">Create a new Student</h1>
            <span className="text-xs text-gray-400 font-medium flex text-start">Authentication information</span>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors.username}  />
                <InputField label="Email" name="email" type="email" defaultValue={data?.email} register={register} error={errors.email}  />
                <InputField label="password" name="password" type="password" defaultValue={data?.password} register={register} error={errors.password}  />
            </div>
                <span className="text-xs text-gray-400 font-medium flex text-start">Personal Information</span>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    
                    <InputField label="First Name" name="firstName" defaultValue={data?.firstName} register={register} error={errors.firstName}  />
                    <InputField label="Last Name" name="lastName"  defaultValue={data?.lastName} register={register} error={errors.lastName}  />
                    <InputField label="phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone}  />

                    <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address}  />
                    <InputField label="Birthday" name="birthday" type="date" defaultValue={data?.birthday} register={register} error={errors.birthday}  />
                    <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType}  />
             

                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-400 flex text-start">Sex</label>
                        <select name="" id="" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("sex")} defaultValue={data?.sex}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex?.message.toString()}</p> }    
                    </div>
                            

                    <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                        <label className="text-md text-gray-800 flex text-start flex items-center gap-2 cursor-pointer" htmlFor="img">
                            <IoCloudUploadOutline />
                            <span>Upload Image</span>
                        </label>
                        <input type="file" id="img" {...register("img")} className="hidden"/>
                            
                        {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex?.message.toString()}</p> }    
                    </div>
                </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default StudentForm;

function handleSubmit(arg0: (data: any) => void) {
    throw new Error("Function not implemented.");
}
