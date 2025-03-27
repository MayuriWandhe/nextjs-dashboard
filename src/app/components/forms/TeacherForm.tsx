"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import InputField from "../InputField";

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
    // img : z.instanceof(File, {message : 'Image is required!'}),
  });

  type Inputs = z.infer<typeof schema>;

const TeacherForm = ({type, data}:{type : "create" | "update"; data ?: any}) =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({
        resolver: zodResolver(schema),
      });
      const onSubmit = handleSubmit((data)=>{
        console.log(data);
        
      })
    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold flex text-start">Create a new teacher</h1>
            <span className="text-xs text-gray-400 font-medium flex text-start">Authentication information</span>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors.username}  />
                <InputField label="Email" name="email" type="email" defaultValue={data?.email} register={register} error={errors.email}  />
                <InputField label="password" name="password" type="password" defaultValue={data?.password} register={register} error={errors.password}  />
            </div>
                <span className="text-xs text-gray-400 font-medium flex text-start">Personal Information</span>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <InputField label="firstName" name="firstName" defaultValue={data?.firstName} register={register} error={errors.firstName}  />
                    <InputField label="lastName" name="lastName"  defaultValue={data?.lastName} register={register} error={errors.lastName}  />
                    <InputField label="phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone}  />

                    <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address}  />
                    <InputField label="birthday" name="birthday" type="date" defaultValue={data?.birthday} register={register} error={errors.birthday}  />
                    <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType}  />
                </div>
                

            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm;

function handleSubmit(arg0: (data: any) => void) {
    throw new Error("Function not implemented.");
}
