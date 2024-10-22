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
    getJobById: (id: number) =>
      http.get<JobResType>(`/job/get/${id}`),
    getAllLevel: () =>
      http.get<LevelResType>("/level/getall"),
        
}
export default jobApiRequest