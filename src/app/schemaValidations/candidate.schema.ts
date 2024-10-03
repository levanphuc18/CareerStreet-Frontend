import { z } from "zod";
import { CandidateRes } from "./auth.schema";

export const Candidate = z.object({
    candidateId: z.number(),
    fullName: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.boolean(),
    avatar: z.string(),
    username: z.string(),
    birthday: z.string() // Sử dụng optional nếu giá trị có thể là null hoặc undefined
});

export const CandidateCreateBody = z.object({
    fullName: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.boolean(),
    avatar: z.string(),
    username: z.string(),
    birthday: z.string() // Sử dụng optional nếu giá trị có thể là null hoặc undefined
  
});

export const RegisterAccountBody = z.object({
    username: z.string(),
    password: z.string().min(3),
    email: z.string(),
    role: z.number()
  
  })
  
  export type RegisterAccountBodyType = z.TypeOf<typeof RegisterAccountBody>
  export type CandidateCreateBodyType = z.TypeOf<typeof CandidateCreateBody>
  export type CandidateResType = z.TypeOf<typeof CandidateRes>