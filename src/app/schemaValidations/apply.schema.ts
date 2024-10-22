import { z } from "zod";

// Tạo các trạng thái
export const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0:
      return "Từ chối"; // Trạng thái 0: Từ chối
    case 1:
      return "Chưa xem"; // Trạng thái 1: Chưa xem
    case 2:
      return "Đã xem"; // Trạng thái 2: Đã xem
    case 3:
      return "Đã duyệt"; // Trạng thái 4: Đã duyệt
    case 4:
      return "Đã mời phỏng vấn"; // Trạng thái 5: Đã mời phỏng vấn
    case 5:
      return "Đã mời nhận việc"; // Trạng thái 6: Đã mời nhận việc
    default:
      return "Chưa xác định"; // Trạng thái mặc định
  }
};

// Khai báo schema cho đơn ứng tuyển
export const Apply = z.object({
  applyId: z.number(), // ID của đơn ứng tuyển
  candidateCvId: z.number(), // ID của CV ứng viên
  jobId: z.number(), // ID của công việc
  date: z.string(), // Ngày nộp đơn (chuỗi)
  coverLetter: z.string(), // Thư xin việc
  status: z.number(), // Trạng thái đơn
});

// Khai báo schema cho yêu cầu tạo đơn ứng tuyển (ApplyCreateBody)
export const ApplyCreateBody = z.object({
  candidateCvId: z.number(), // ID của CV ứng viên
  jobId: z.number(), // ID của công việc
  coverLetter: z.string(), // Thư xin việc
  status: z.number(), // Trạng thái đơn
});

// Khai báo schema cho phản hồi của đơn ứng tuyển (ApplyRes)
export const ApplyRes = z.object({
  data: Apply, // Sử dụng schema Apply cho dữ liệu
  message: z.string(), // Thông báo kết quả
});

// Danh sách đơn ứng tuyển
export const ApplyListRes = z.object({
  data: z.array(Apply), // Đây là danh sách các đơn ứng tuyển
  message: z.string(), // Thông báo kết quả
});

// Định nghĩa type dựa trên schema mới
export type ApplyResType = z.TypeOf<typeof ApplyRes>;
export type ApplyCreateBodyType = z.TypeOf<typeof ApplyCreateBody>;
export type ApplyListResType = z.TypeOf<typeof ApplyListRes>;
