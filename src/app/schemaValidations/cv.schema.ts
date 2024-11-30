import { z } from "zod";

// Khai báo schema cho CandidateCvResponse (giống với lớp CandidateCvResponse trong backend)
export const Cv = z.object({
  candidateCvId: z.number(),     // ID của CV
  fullName: z.string(),          // Họ tên
  address: z.string(),           // Địa chỉ
  phone: z.string(),             // Số điện thoại
  email: z.string(),             // Email
  school: z.string(),            // Trường học
  language: z.string(),          // Ngôn ngữ
  experience: z.string(),        // Kinh nghiệm
  title: z.string(),             // Chức danh hiện tại
  currentSalary: z.string(),     // Mức lương hiện tại
  preferenceSalary: z.string(),  // Mức lương mong muốn
  levelId: z.number(),      // ID cấp độ
  levelName: z.string(),
  positionType: z.string(),      // Loại vị trí (toàn thời gian, bán thời gian, etc.)
  workLocation: z.string(),      // Địa điểm làm việc mong muốn
  filePath: z.string(),          // Đường dẫn file đã tải lên
  candidate_id: z.number(),      // ID của ứng viên
});

// Khai báo schema cho CandidateCvRequest (giống với lớp CandidateCvRequest trong backend)
export const CvCreateBody = z.object({
  fullName: z.string(),         // Họ tên
  address: z.string(),          // Địa chỉ
  phone: z.string(),            // Số điện thoại
  email: z.string(),            // Email
  school: z.string(),           // Trường học
  language: z.string(),         // Ngôn ngữ
  experience: z.string(),       // Kinh nghiệm
  title: z.string(),            // Chức danh hiện tại
  currentSalary: z.string(),    // Mức lương hiện tại
  preferenceSalary: z.string(),  // Mức lương mong muốn
  levelId: z.number(),      // ID cấp độ
  levelName: z.string(),
  positionType: z.string(),     // Loại vị trí (toàn thời gian, bán thời gian, etc.)
  workLocation: z.string(),     // Địa điểm làm việc mong muốn
  file: z.union([z.instanceof(File), z.string()]), // File đính kèm (File hoặc string)
  candidate_id: z.number(),     // ID của ứng viên
});

// Khai báo schema cho CandidateCvResponse (giống với lớp CandidateCvResponse trong backend)
export const CvRes = z.object({
  data: Cv,                     // Sử dụng schema Cv cho dữ liệu
  message: z.string(),          // Thông báo kết quả
});

// List CV
export const CvListRes = z.object({
  data: z.array(Cv), // Đây là danh sách các CV
  message: z.string(),
});

export type CvListResType = z.TypeOf<typeof CvListRes>;
// Định nghĩa type dựa trên schema
export type CvResType = z.TypeOf<typeof CvRes>;
export type CvCreateBodyType = z.TypeOf<typeof CvCreateBody>;
