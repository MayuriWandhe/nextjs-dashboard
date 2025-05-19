"use server";

import { revalidatePath } from "next/cache";
import { classSchema, SubjectSchema } from "./formValidationSchema";
import prisma from "./prisma";
import { error } from "console";
import { connect } from "http2";

type CurrentState = { success : boolean, error: boolean}

// create subject
export const createSubject = async (currentState : CurrentState, data : SubjectSchema)=>{
    console.log(data.name + "in this server");
    try{
        await prisma.subject.create({
            data :{
                name : data.name,
                teachers : {
                    connect : data.teachers.map((teacherId) => ({id : teacherId})),
                }
            }
        })
        // revalidatePath("/list/subjects");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}

// update subject
export const updateSubject = async (currentState : CurrentState, data : SubjectSchema)=>{
    console.log(data.name + "in this server");
    try{
        await prisma.subject.update({
            where : {
                id : data.id
            },
            data :{
                name : data.name,
                teachers : {
                    set : data.teachers.map((teacherId) => ({id : teacherId}))
                }
            }
        })
        // revalidatePath("/list/subjects");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}


// delete subject
export const deleteSubject = async (currentState : CurrentState, data : FormData)=>{
    const id = data.get("id") as string;
    try{
        await prisma.subject.delete({
            where : {
                id : parseInt(id)
            },
        })
        // revalidatePath("/list/subjects");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}


// create class
export const createClass = async (currentState : CurrentState, data : classSchema)=>{
    try{
        await prisma.class.create({
            data
        })
        // revalidatePath("/list/class");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}

// update class
export const updateClass = async (currentState : CurrentState, data : classSchema)=>{
    console.log(data.name + "in this server");
    try{
        await prisma.class.update({
            where : {
                id : data.id
            },
            data :{
              
            }
        })
        // revalidatePath("/list/class");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}


// delete class
export const deleteClass = async (currentState : CurrentState, data : FormData)=>{
    const id = data.get("id") as string;
    try{
        await prisma.class.delete({
            where : {
                id : parseInt(id)
            },
        })
        // revalidatePath("/list/class");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}