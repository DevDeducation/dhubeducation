import { z } from "zod";
export const courseFormSchema = z.object({
  fullname: z.string().min(2),
  dateofbirth: z.string().min(2),
  gender: z.string().min(2),
  country: z.string().min(2),
  city: z.string().min(2),
  contactnumber: z.string().min(2),
  email: z.string().min(2),
  education: z.string().min(2),
  employer: z.string().min(2),
  jobtitle: z.string().min(2),
  experience: z.string().min(2),
  preferredday: z.string().min(2),
  courseformat: z.string().min(2),
  paymentmethod: z.string().min(2)
});
export type CourseFormSchema = typeof courseFormSchema;