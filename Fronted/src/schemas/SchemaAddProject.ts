import { z } from 'zod';

export const SchemaAddProject = z.object({
  nameProject: z.string().min(2, {message: "Name must contain at least 2 characters." }),
  description: z.string().min(2, {  message: "Description must contain at least 2 characters." }).or(z.literal('')),
  dateStart: z.string().transform((dateString) => new Date(dateString)).pipe(z.date().min(new Date(), {message: "Date must be today or later." })),
  countDayToDeadLine: z.string().transform((dayString) => Number(dayString)).pipe(z.number().positive({ message: "Count must be a positive number." })),
  employees: z.array(
    z.object({
      username: z.string().min(2, { message: "Username must contain at least 2 characters." }),
      password: z.string().min(6, { message: "A password must contain at least 6 characters." }),
    })
  ).optional(),
});

export type ProjectData = z.infer<typeof SchemaAddProject>;