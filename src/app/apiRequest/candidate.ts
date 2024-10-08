import { CandidateCreateBodyType, CandidateResType } from "../schemaValidations/candidate.schema"
import http from "../untils/http"

const candidateApiRequest ={
    createCandidate:(body: CandidateCreateBodyType) =>
        http.post<CandidateResType>("candidate/create",body),
    
}
export default candidateApiRequest