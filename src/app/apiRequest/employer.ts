// import { RegisterResType } from "../schemaValidations/auth.schema"
import { CandidateCreateBodyType, CandidateResType } from "../schemaValidations/candidate.schema"
import http from "../untils/http"

const employerApiRequest ={
    createCandidate:(body: CandidateCreateBodyType) =>
        http.post<CandidateResType>("candidate/create",body),
    
}
export default employerApiRequest