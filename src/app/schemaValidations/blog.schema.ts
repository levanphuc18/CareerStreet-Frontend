import { z } from "zod";

// Khai báo schema mới cho Cv (thay đổi theo yêu cầu của bạn)
export const Blog = z.object({
  author: z.string(),           // Tác giả
  title: z.string(),            // Tiêu đề
  content: z.string(),          // Nội dung
  date: z.string(),             // Ngày tạo bài viết (dạng chuỗi để dễ quản lý định dạng LocalDate)
  origin: z.string(),           // Nguồn gốc bài viết
  admin_id: z.number(),         // ID của Admin
});

// Khai báo schema mới cho CandidateCvRequest (phù hợp với lớp mới)
export const BlogCreateBody = z.object({
  author: z.string(),           // Tác giả
  title: z.string(),            // Tiêu đề
  content: z.string(),          // Nội dung
  date: z.string(),             // Ngày tạo bài viết (chuỗi)
  origin: z.string(),           // Nguồn gốc bài viết
  admin_id: z.number(),         // ID của Admin
});

// Khai báo schema mới cho CandidateCvResponse (phù hợp với lớp mới)
export const BlogRes = z.object({
  data: z.object({
    author: z.string(),           // Tác giả
    title: z.string(),            // Tiêu đề
    content: z.string(),          // Nội dung
    date: z.string(),             // Ngày tạo bài viết (chuỗi)
    origin: z.string(),           // Nguồn gốc bài viết
    admin_id: z.number(),         // ID của Admin
  }),
  message: z.string(),             // Thông báo kết quả
});

// Định nghĩa type dựa trên schema mới
export type BlogResType = z.TypeOf<typeof BlogRes>;
export type BlogCreateBodyType = z.TypeOf<typeof BlogCreateBody>;
