import { z } from "zod";

// Khai báo schema mới cho Job
export const Job = z.object({
  jobId: z.number(),
  companyName: z.string(),              // Tên công ty
  numberOfEmployees: z.number(),        // Số lượng nhân viên
  companyWebsite: z.string().url(),     // Trang web của công ty
  companyOverview: z.string(), // Giới thiệu về công ty
  title: z.string(),                    // Tiêu đề công việc
  jobLocation: z.string(),   // Địa điểm công việc (có thể bỏ trống)
  salary: z.number(),                   // Lương
  numberOfRecruitment: z.number(),                   // Lương
  jobDescription: z.string(), // Mô tả công việc
  jobRequirements: z.string(),// Yêu cầu công việc
  benefits: z.string(),      // Lợi ích
  educationLevel: z.string(),// Trình độ học vấn
  // experienceLevel: z.string(),// Trình độ kinh nghiệm
  jobRank: z.string(),       // Cấp bậc công việc
  jobType: z.string(),                  // Loại công việc
  gender: z.string(),        // Giới tính
  contactPerson: z.string(),            // Người liên hệ
  contactPhone: z.string(),             // Số điện thoại liên hệ
  contactEmail: z.string().email(),     // Email liên hệ
  contactAddress: z.string(),// Địa chỉ liên hệ
  postingDate: z.string(),              // Ngày đăng bài (chuỗi)
  expirationDate: z.string(),           // Ngày hết hạn (chuỗi)
  views: z.number(),           // lượt xem
  status: z.number(),                   // Trạng thái
  employerId: z.number(),               // ID của nhà tuyển dụng
  techIds: z.array(z.number()), // Chỉ định techIds là mảng số
  levelId: z.number(),      // ID cấp độ
  levelName: z.string(),
});

// Khai báo schema cho yêu cầu tạo Job (JobCreateBody)
export const JobCreateBody = z.object({
  companyName: z.string(),
  numberOfEmployees: z.string(),
  companyWebsite: z.string(),
  companyOverview: z.string(),
  title: z.string(),
  jobLocation: z.string(),
  salary: z.string(),
  numberOfRecruitment: z.number(),
  jobDescription: z.string(),
  jobRequirements: z.string(),
  benefits: z.string(),
  educationLevel: z.string(),
  jobRank: z.string(),
  jobType: z.string(),
  gender: z.string(),
  contactPerson: z.string(),
  contactPhone: z.string(),
  contactEmail: z.string().email(),
  contactAddress: z.string(),
  postingDate: z.string(),
  expirationDate: z.string(),
  views: z.number(),           // lượt xem
  status: z.number(),
  employerId: z.number(),
  techIds: z.array(z.number()),
  levelId: z.number(),
  levelName:z.string(),
});

// Khai báo schema cho phản hồi của Job (JobRes)
export const JobRes = z.object({
    data: Job,                     // Sử dụng schema Job cho dữ liệu
    message: z.string(),          // Thông báo kết quả
});

// List JOB
export const JobListRes = z.object({
    data: z.array(Job), // Đây là danh sách các CV
    message: z.string(),
  });

  
  // Khai báo schema cho Level
export const Level = z.object({
  levelId: z.number(),     // ID cấp độ
  name: z.string().nullable(), // Tên cấp độ, có thể null
});

// Khai báo schema cho yêu cầu tạo Level (LevelCreateBody)
export const LevelCreateBody = z.object({
  name: z.string().nullable(), // Tên cấp độ, có thể null
});

// Khai báo schema cho phản hồi của Level (LevelRes)
export const LevelRes = z.object({
  data: Level,               // Sử dụng schema Level cho dữ liệu
  message: z.string(),       // Thông báo kết quả
});

// List Level
export const LevelListRes = z.object({
  data: z.array(Level),      // Đây là danh sách các cấp độ
  message: z.string(),       // Thông báo kết quả
});

// BỘ LỌC
export const Jobfilter = z.object({

  title: z.string().optional(),
  location :z.string().optional(),
  salaryMin : z.string().optional(),
  salaryMax: z.string().optional(),
  jobType :z.string().optional(),
  jobRank : z.string().optional(),
  companyName: z.string()
})
export type Job = z.infer<typeof Job>;

export type FilterJobListResType = z.TypeOf <typeof Jobfilter>;

// Định nghĩa type dựa trên schema mới
export type LevelResType = z.TypeOf<typeof LevelRes>;
export type LevelCreateBodyType = z.TypeOf<typeof LevelCreateBody>;
export type LevelListResType = z.TypeOf<typeof LevelListRes>;


// Định nghĩa type dựa trên schema mới
export type JobResType = z.infer<typeof JobRes>;
export type JobCreateBodyType = z.infer<typeof JobCreateBody>;
export type JobListResType = z.infer<typeof JobListRes>;