"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema } from "./formValidationSchema";
import prisma from "./prisma";
import { error } from "console";

type CurrentState = { success : boolean, error: boolean}

export const createSubject = async (currentState : CurrentState, data : SubjectSchema)=>{
    console.log(data.name + "in this server");
    try{
        await prisma.subject.create({
            data :{
                name : data.name
            }
        })
        // revalidatePath("/list/subjects");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}