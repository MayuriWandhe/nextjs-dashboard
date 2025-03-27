"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';

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
    sex : z.enum(["male", "female"], {message : 'Sex is required!'}),
    // img : z.instanceof(File, {message : 'Image is required!'}),
  });

  

const TeacherForm = ({type, data}:{type : "create" | "update"; data ?: any}) =>{

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
      });

      const onSubmit = handleSubmit((data)=>{
        console.log(data);
        
      })

    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">Create a new teacher</h1>
            <span className="text-xs text-gray-400 font-medium flex text-start">Authentication information</span>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-400 flex text-start">Username</label>
                    <input type="text" {...register("username")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"/>
                    {errors.username?.message && <p className="text-xs text-red-400">{errors.username?.message.toString()}</p> }    
                </div>
             <span className="text-xs text-gray-400 font-medium flex text-start">Personal Information</span>
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm;

function handleSubmit(arg0: (data: any) => void) {
    throw new Error("Function not implemented.");
}
