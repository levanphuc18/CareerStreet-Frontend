import { JobCreateBodyType, JobResType, LevelResType } from "../schemaValidations/job.schema"
import http from "../untils/http"

const jobApiRequest ={
    createJob:(body: JobCreateBodyType) =>
        http.post<JobResType>("job/create",body),
    getAllJobById: (id: number, sessionToken: string) =>
        http.get<JobResType>(`/job/getJobByEmployer/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`
            }
          }),
    getAllJobByStatus: (status: number) =>
      http.get<JobResType>(`/job/getall/status/${status}`),
    getAllJob: () =>
      http.get<JobResType>(`/job/getall`),
    getJobById: (id: number) =>
      http.get<JobResType>(`/job/get/${id}`),
    updateJobStatus: (jobId: number, status: number) =>
      http.put<JobResType>(`/job/update/${jobId}/jobstatus/${status}`),
    getAllLevel: () =>
      http.get<LevelResType>("/level/getall"),
        
}
export default jobApiRequest