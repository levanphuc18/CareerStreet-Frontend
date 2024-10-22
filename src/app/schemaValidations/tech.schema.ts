import { z } from "zod";

// Khai báo schema cho Tech
export const Tech = z.object({
  techId: z.number(),           // ID công nghệ
  name: z.string(),             // Tên công nghệ
});

// Khai báo schema cho phản hồi của Tech (TechRes)
export const TechRes = z.object({
  data: Tech,                  // Sử dụng schema Tech cho dữ liệu
  message: z.string(),         // Thông báo kết quả
});

// List Tech
export const TechListRes = z.object({
  data: z.array(Tech),         // Đây là danh sách các công nghệ
  message: z.string(),         // Thông báo kết quả
});

// Định nghĩa type dựa trên schema mới
export type TechResType = z.TypeOf<typeof TechRes>;
export type TechListResType = z.TypeOf<typeof TechListRes>;
