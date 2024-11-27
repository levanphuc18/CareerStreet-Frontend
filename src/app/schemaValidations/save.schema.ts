import { z } from "zod";

export const Save = z.object({
    saveId: z.number().int(), // Mã định danh duy nhất cho mục lưu
    candidateId: z.number().int(), // ID của ứng viên đã lưu công việc
    jobId: z.number().int(), // ID của công việc được lưu
    Date: z.string().datetime(), // Thời gian khi công việc được lưu
});


// export const ListSaveJob = z.object({
//     data: z.array(Save),
//     message: z.string(),
// });


// Schema cho một công việc
export const Jobforsave = z.object({
    jobId: z.number(),
    title: z.string(),
    jobType: z.string(),
    jobLocation: z.string(),
    levelName: z.string(),
});

export const CreateSavesave = z.object({
   
    candidateId: z.number().int(), // ID của ứng viên đã lưu công việc
    jobId: z.number().int(), // ID của công việc được lưu
    Date: z.string().datetime()
});

// Schema cho response từ API
export const ListSaveJob = z.object({
    code: z.string(),
    message: z.string(),
    data: z.array(Jobforsave)
});

export const SaveRes = z.object({
    data: Save,                     // Sử dụng schema Job cho dữ liệu
    message: z.string(),          // Thông báo kết quả
});
// Export types từ schema
export type SaveresType = z.infer<typeof SaveRes>
export type CreateSavejobs = z.infer<typeof  CreateSavesave >;
export type JobType = z.infer<typeof Jobforsave>;
export type ListSaveJobType = z.infer<typeof ListSaveJob>;