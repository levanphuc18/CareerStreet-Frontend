import { ApplyCreateBodyType, ApplyResType } from "../schemaValidations/apply.schema"
import http from "../untils/http"

const applyApiRequest ={
    createApply:(body: ApplyCreateBodyType) =>
        http.post<ApplyResType>("apply/create",body),
    getAppliesByCandidateId: (candidateId: number) =>
      http.get<ApplyResType>(`apply/getAppliesByCandidateId/${candidateId}`),
    
    // getAllJobById: (id: number, sessionToken: string) =>
    //     http.get<JobResType>(`/job/getJobByEmployer/${id}`, {
    //         headers: {
    //           Authorization: `Bearer ${sessionToken}`
    //         }
    //       }),
    // getAllJobByStatus: (status: number) =>
    //   http.get<JobResType>(`/job/getall/status/${status}`),
    // getJobById: (id: number) =>
    //   http.get<JobResType>(`/job/get/${id}`),
        
}
export default applyApiRequest