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
