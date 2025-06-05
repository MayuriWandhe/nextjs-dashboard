"use server";

import { revalidatePath } from "next/cache";
import { classSchema, StudentSchema, studentSchema, SubjectSchema, teacherSchema } from "./formValidationSchema";
import prisma from "./prisma";
import { error } from "console";
import { connect } from "http2";
import { clerkClient } from "@clerk/nextjs/server";

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
        console.log( data);
        // revalidatePath("/list/class");
        return { success : true, error: false}
    }catch (err){
        console.log(err, data);
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
            data
            
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




// create teacher
export const createTeacher = async (currentState : CurrentState, data : teacherSchema)=>{
    try{

        const user = await clerkClient.users.createUser({
            username : data.username,
            password : data.password,
            firstName : data.name,
            lastName : data.surname,
            publicMetadata : {role:'teacher'}
        })

        await prisma.teacher.create({
            data : {
                id : user.id,
                username : data.name,
                name : data.name,
                surname : data.surname,
                email : data.email,
                phone : data.phone,
                address : data.address,
                img : data.img,
                bloodType : data.bloodType,
                sex : data.sex,
                birthday : data.birthday,
                subjects : {
                    connect : data.subjects?.map((subjectId : string)=>({
                        id : parseInt(subjectId)
                    }))
                }
            }
        })
        console.log( data);
        // revalidatePath("/list/teacher");
        return { success : true, error: false}
    }catch (err){
        console.log(err, data);
        return { success : false, error: true}
    }
}

// update teacher
export const updateTeacher = async (currentState : CurrentState, data : teacherSchema)=>{
    console.log(data.name + "in this server");

    if(!data.id){
        return {success : false, error : true}
    }
    try{
        const user = await clerkClient.users.updateUser( data.id ,  {
            username : data.username,
            ...(data.password !== "" && {password : data.password}),
            firstName : data.name,
            lastName : data.surname,
            publicMetadata : {role:'teacher'}
        })

        await prisma.teacher.update({
            where : {
                id : data.id
            },
            data : {
                ...(data.password !== "" && {password : data.password}),
                username : data.name,
                name : data.name,
                surname : data.surname,
                email : data.email,
                phone : data.phone,
                address : data.address,
                img : data.img,
                bloodType : data.bloodType,
                sex : data.sex,
                birthday : data.birthday,
                subjects : {
                    set : data.subjects?.map((subjectId : string)=>({
                        id : parseInt(subjectId)
                    }))
                }
            }
        })
        // revalidatePath("/list/teacher");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}


// delete teacher
export const deleteTeacher = async (currentState : CurrentState, data : FormData)=>{
    const id = data.get("id") as string;
    try{
        await clerkClient.users.deleteUser(id);

        await prisma.teacher.delete({
            where : {
                id : id
            },
        })
        // revalidatePath("/list/teacher");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}




// create Student
export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema
  ) => {
    console.log(data);
    try {
      const classItem = await prisma.class.findUnique({
        where: { id: data.classId },
        include: { _count: { select: { students: true } } },
      });
  
      if (classItem && classItem.capacity === classItem._count.students) {
        return { success: false, error: true };
      }
    //   const clerkClient = await getClerkClient() // ✅ Call and await
      const user = await clerkClient.users.createUser({
        username: data.username,
        password: data.password,
        firstName: data.name,
        lastName: data.surname,
        publicMetadata:{role:"student"}
      });

      console.log(user);
      
  
      await prisma.student.create({
        data: {
          id: user.id,
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          address: data.address,
          img: data.img || null,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          gradeId: data.gradeId,
          classId: data.classId,
          parentId: data.parentId,
        },
      });
  
      // revalidatePath("/list/students");
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
// update Student
export const updateStudent = async (currentState : CurrentState, data : StudentSchema)=>{
    console.log(data.name + "in this server");

    if(!data.id){
        return {success : false, error : true}
    }
    try{
        const user = await clerkClient.users.updateUser( data.id ,  {
            username : data.username,
            ...(data.password !== "" && {password : data.password}),
            firstName : data.name,
            lastName : data.surname,
            publicMetadata : {role:'student'}
        })

        await prisma.student.update({
            where : {
                id : data.id
            },
            data : {
                ...(data.password !== "" && {password : data.password}),
                username : data.name,
                name : data.name,
                surname : data.surname,
                email : data.email,
                phone : data.phone,
                address : data.address,
                img : data.img,
                bloodType : data.bloodType,
                sex : data.sex,
                birthday : data.birthday,
                gradeId :  data.gradeId,
                classId :  data.classId,
                parentId :  data.parentId,
            }
        })
        // revalidatePath("/list/students");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}


// delete Student
export const deleteStudent = async (currentState : CurrentState, data : FormData)=>{
    const id = data.get("id") as string;
    try{

        await clerkClient.users.deleteUser(id);

        await prisma.student.delete({
            where : {
                id : id
            },
        })
        // revalidatePath("/list/students");
        return { success : true, error: false}
    }catch (err){
        console.log(err);
        return { success : false, error: true}
    }
}