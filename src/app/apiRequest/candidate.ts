import { CandidateCreateBodyType, CandidateResType } from "../schemaValidations/candidate.schema"
import http from "../untils/http"

const candidateApiRequest ={
    createCandidate:(body: CandidateCreateBodyType) =>
        http.post<CandidateResType>("candidate/create",body),
    getCandidateByUsername:(username: string, sessionToken: string) =>
        http.get<CandidateResType>(`candidate/getbyusername/${username}`,{
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        }),
    getAllCandidate:(sessionToken: string) =>
        http.get<CandidateResType>("candidate/list/all",{
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        }),
    
    
}
export default candidateApiRequest