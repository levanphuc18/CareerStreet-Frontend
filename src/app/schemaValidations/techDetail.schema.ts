import { z } from "zod";

// Khai báo schema cho Tech
export const TechDetail = z.object({
  jobId: z.number(),            
  techIds: z.array(z.number()),
});

// Khai báo schema cho Tech
export const TechDetailCreateBody = z.object({
  jobId: z.number(),            
  techIds: z.array(z.number()),
});

// Khai báo schema cho phản hồi của Tech (TechRes)
export const TechDetailRes = z.object({
  data: TechDetail,                  // Sử dụng schema Tech cho dữ liệu
  message: z.string(),         // Thông báo kết quả
});

// Định nghĩa type dựa trên schema mới
export type TechDetailResType = z.TypeOf<typeof TechDetailRes>;
export type TechDetailCreateBodyType = z.infer<typeof TechDetailCreateBody>;
