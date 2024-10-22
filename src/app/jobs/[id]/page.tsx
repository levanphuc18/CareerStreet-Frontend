import { cookies } from "next/headers";
import { Metadata } from 'next';
import JobDetailPage from '../_components/JobDetailPage';
import { JobResType } from '@/app/schemaValidations/job.schema';
import jobApiRequest from '@/app/apiRequest/job';
import cvApiRequest from '@/app/apiRequest/cv';
import { CvListResType } from "@/app/schemaValidations/cv.schema";
import techApiRequest from "@/app/apiRequest/tech";
import { TechListResType } from "@/app/schemaValidations/tech.schema";

export const metadata: Metadata = {
    title: "Job detail",
};

export default async function jobDetail({
    params,
}: {
    params: { id: string };
}) {
    const jobId = parseInt(params.id); // Chuyển đổi id thành số
    let job: JobResType["data"] | null = null; // Khai báo biến để lưu dữ liệu Job
    let cvList: CvListResType["data"] | null = null; // Danh sách CV
    let tech: TechListResType["data"] | null = null; // Khai báo biến để lưu dữ liệu Job

    const cookieTmp = cookies();
    const sessionToken = cookieTmp.get("sessionToken");
    const userIdString = cookieTmp.get("userId");
    const userId = userIdString ? parseInt(userIdString.value, 10) : null;
    

    try {
        // Gọi API để lấy thông tin Job mà không kiểm tra sessionToken
        const result = await jobApiRequest.getJobById(jobId);
        const resultTech = await techApiRequest.getTechByJobId(jobId);
        job = result.payload.data; // Gán dữ liệu Job cho biến job
        tech = resultTech.payload.data; // Gán dữ liệu Job cho biến job

        // Nếu có userId và sessionToken, lấy danh sách CV
        if (userId !== null && sessionToken) {
            const cvResult = await cvApiRequest.getAllCvByCandidateId(userId, sessionToken.value);
            cvList = Array.isArray(cvResult.payload.data) ? cvResult.payload.data : [cvResult.payload.data];
        }
    } catch (error) {
        console.error("An error occurred while fetching job details or CVs:", error);
    }

    // if(tech){
    //     console.log(tech.name + "3123")
    // }

    return (
        <JobDetailPage
            job={job}
            cvList={cvList} // Truyền danh sách CV vào JobDetailPage
            candidateId={userId}
            tech={tech}
        />
    );
}
