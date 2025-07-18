import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps = {
    table : | "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type : "create" | "update" | "delete";
    data ? : any;
    id ? : number | string;
}

const FormContainer  = async ({table, type, data, id} : FormContainerProps) =>{

    let relatedData = {};

    if(type !== "delete"){
        switch (table) {
            case "subject":
                const subjectTechers = await prisma.teacher.findMany({
                    select : {id : true , name : true , surname : true},
                })
                relatedData = { teachers : subjectTechers}
                break;
            case "class":
                const classGrades = await prisma.grade.findMany({
                    select : {id : true , level : true},
                })
                const classTeachers = await prisma.teacher.findMany({
                    select : {id : true , name : true, surname : true},
                })
                relatedData = { teachers : classTeachers, grades : classGrades}
                break;
            case "teacher":
                const teacherSubject = await prisma.subject.findMany({
                    select : {id : true , name : true},
                })
                relatedData = { subjects : teacherSubject}                
                break;
            case "student":
                const studentGrades = await prisma.grade.findMany({
                    select : {id : true , level : true},
                })

                const studentClasses = await prisma.class.findMany({
                    include : {_count : {select : {students : true}}}
                })
                relatedData = { classes : studentClasses, grades : studentGrades }
                break;
            case "exam":
                const {userId , sessionClaims} = auth();
                const role = (
                    sessionClaims?.metadata as {
                        role? : "admin" | "teacher" | "student" | "parent"
                    }
                )?.role;
                
                const examLessons = await prisma.lesson.findMany({
                    where : {
                        ...(role === "teacher" ? {teacherId : userId!} : {}),
                    },
                    select : {id : true, name : true},
                });
                relatedData = { lessons : examLessons}
                break;
            default:
                break;
        }
    }

    return ( 
        <div className="">
            <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData}/>
        </div>
    )

}

export default FormContainer;