import { z } from "zod";
import { EmployerRes } from "./auth.schema";
import { RegisterAccountBody } from "./candidate.schema";

export const Employer = z.object({
    employerId: z.number(),
    fullName: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.boolean(),
    avatar: z.string(),
    username: z.string(),
    company: z.string(),
    tax: z.string()
});

export const EmployerCreateBody = z.object({
    fullName: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.boolean(),
    avatar: z.string(),
    username: z.string(),
    company: z.string(),
    tax: z.string()
});

export type RegisterAccountBodyType = z.TypeOf<typeof RegisterAccountBody>
export type EmployerCreateBodyType = z.TypeOf<typeof EmployerCreateBody>
export type EmployerResType = z.TypeOf<typeof EmployerRes>