import { z } from "zod";

// subject schema
export const subjectSchema = z.object({
    id : z.coerce.number().optional(),
    name: z.string()
    .min(1, { message: 'Subject name is required!' }),
    teachers : z.array(z.string()), // teacher id's
  });

export type SubjectSchema = z.infer<typeof subjectSchema>;


// class schema
export const classSchema = z.object({
  id : z.coerce.number().optional(),
  name: z.string()
  .min(1, { message: 'class name is required!' }),
  capacity : z.coerce.number().min(1, {message : "Capacity is required!"}),
  gradeId : z.coerce.number().min(1, {message : "Capacity is required!"}),
  supervisorId : z.coerce.string().optional()
});

export type classSchema = z.infer<typeof classSchema>;


export const teacherSchema = z.object({
  id : z.string().optional(),
  username: z.string()
  .min(3, { message: 'Username must be at least 3 characters long!' })
  .max(8, { message: 'Username must be at most 8 characters long!' }),
  name : z.string().min(1, {message : 'First name is required!'}),
  surname : z.string().min(1, {message : 'Last name is required!'}),
  email: z.string().email({message : 'Invalid email address!'}).optional().or(z.literal("")),
  password: z.string().min(8, {message : 'Password must be 8 characters long!'}).optional().or(z.literal("")),
  phone : z.string().optional(),
  address : z.string(),
  img : z.string().optional(),
  birthday : z.coerce.date({message : 'Birthday is required!'}),
  bloodType : z.string({message : 'Blood type is required!'}),
  sex : z.enum(["MALE", "FEMALE"], {message : 'Sex is required!'}),
  subjects : z.array(z.string()).optional(), // subject ids
});

export type teacherSchema = z.infer<typeof teacherSchema>;


export const studentSchema = z.object({
  id : z.string().optional(),
  username: z.string()
  .min(3, { message: 'Username must be at least 3 characters long!' })
  .max(8, { message: 'Username must be at most 8 characters long!' }),
  name : z.string().min(1, {message : 'First name is required!'}),
  surname : z.string().min(1, {message : 'Last name is required!'}),
  email: z.string().email({message : 'Invalid email address!'}).optional().or(z.literal("")),
  password: z.string().min(8, {message : 'Password must be 8 characters long!'}).optional().or(z.literal("")),
  phone : z.string().optional(),
  address : z.string(),
  img : z.string().optional(),
  birthday : z.coerce.date({message : 'Birthday is required!'}),
  bloodType : z.string({message : 'Blood type is required!'}),
  sex : z.enum(["MALE", "FEMALE"], {message : 'Sex is required!'}),
  gradeId : z.coerce.number().min(1,{message : 'Grade is required!'}),
  classId : z.coerce.number().min(1,{message : 'Class is required!'}),
  parentId : z.coerce.string().min(1,{message : 'Parent Id is required!'}),

});

export type StudentSchema = z.infer<typeof studentSchema>;



export const examSchema = z.object({
  id : z.coerce.number().optional(),
  title: z.string().min(1, { message: 'Subject name is required!' }),
  startTime : z.coerce.date({message : 'Start time is required!'}),
  endTime : z.coerce.date({message : 'End time is required!'}),
  lessonId : z.coerce.number({message : 'Lesson is required!'}),

});

export type ExamSchema = z.infer<typeof examSchema>;