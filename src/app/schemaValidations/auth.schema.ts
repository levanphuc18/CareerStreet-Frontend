import z from "zod";

export const RegisterBody = z
  .object({
    username: z.string(),
    password: z.string().min(3).max(100),
    email: z.string().email(),
    // role: z.number().default(3),
    role: z.number(),
  })
  .strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    username: z.string(),
    userId: z.number(),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string().min(3).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;

// Định nghĩa schema cho CandidateRes
export const CandidateRes = z.object({
  data: z.object({
    candidateId: z.number(),
    fullName: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.boolean(),
    avatar: z.string(),
    username: z.string(),
    birthday: z.string(), // Sử dụng optional nếu giá trị có thể là null hoặc undefined
  }),
  message: z.string(),
});
export type CandidateResType = z.infer<typeof CandidateRes>;

// Định nghĩa schema cho Employer
export const EmployerRes = z.object({
  data: z.object({
    employerId: z.number(),
    fullName: z.string(),
    address: z.string(),
    phone: z.string(),
    gender: z.boolean(),
    avatar: z.string(),
    username: z.string(),
    birthday: z.string(), // Sử dụng optional nếu giá trị có thể là null hoặc undefined
  }),
  message: z.string(),
});
export type EmployerResType = z.infer<typeof EmployerRes>;

export const RoleRes = z
  .object({
    data: z.number(),
    message: z.string(),
  })
  .strict();
export type RoleResType = z.TypeOf<typeof RoleRes>;

export const MessageRes = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;
