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
        
}
export default applyApiRequest