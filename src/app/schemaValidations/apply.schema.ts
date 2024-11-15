import { z } from "zod";

// Tạo các trạng thái
export function getStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return "Chờ xét duyệt";
    case 1:
      return "Đang được xem xét";
    case 2:
      return "Đang chờ phỏng vấn";
    case 3:
      return "Phỏng vấn xong";
    case 4:
      return "Đang chờ quyết định";
    case 5:
      return "Đã tuyển dụng";
    case -1:
      return "Bị từ chối";
    default:
      return "Chưa xác định";
  }
}

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
