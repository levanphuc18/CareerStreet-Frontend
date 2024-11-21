import { ApplyCreateBodyType, ApplyResType } from "../schemaValidations/apply.schema"
import http from "../untils/http"

const applyApiRequest ={
    createApply:(body: ApplyCreateBodyType) =>
        http.post<ApplyResType>("apply/create",body),
    getAppliesByCandidateId: (candidateId: number) =>
      http.get<ApplyResType>(`apply/getAppliesByCandidateId/${candidateId}`),
    getAppliesByJobId: (jobId: number) =>
      http.get<ApplyResType>(`apply/getAppliesByJobId/${jobId}`),
    updateApplyStatus: (applyId: number, status: number) =>
      http.put<ApplyResType>(`/apply/update/${applyId}/applystatus/${status}`),
    checkApplicationStatus: (candidateId: number, jobId: number) => 
      http.get<boolean>(`apply/check-application?candidateId=${candidateId}&jobId=${jobId}`),
    getAppliesByEmployerId: (employerId: number) =>
      http.get<ApplyResType>(`apply/getAppliesByEmployerId/${employerId}`),
        
}
export default applyApiRequest