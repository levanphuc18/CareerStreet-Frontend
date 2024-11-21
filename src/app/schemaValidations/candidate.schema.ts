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

  // List Candidate
export const CandidateListRes = z.object({
    data: z.array(Candidate), // Đây là danh sách các CV
    message: z.string(),
  });
  
  export type CandidateListResType = z.TypeOf<typeof CandidateListRes>;
  export type RegisterAccountBodyType = z.TypeOf<typeof RegisterAccountBody>
  export type CandidateCreateBodyType = z.TypeOf<typeof CandidateCreateBody>
  export type CandidateResType = z.TypeOf<typeof CandidateRes>