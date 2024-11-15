import { MessageResType } from "../schemaValidations/auth.schema"
import {  CvResType } from "../schemaValidations/cv.schema"
import http from "../untils/http"

const cvApiRequest = {
    createCv: (body: FormData) => 
        http.post<CvResType>("candidate-cv/create", body),
    getAllCvByCandidateId: (candidateId: number, sessionToken: string) =>
        http.get<CvResType>(`/candidate-cv/by-candidate/${candidateId}`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`
            }
          }),
    getCvById: (id: number, sessionToken: string) =>
        http.get<CvResType>(`/candidate-cv/get/${id}`, {
            headers: {
            Authorization: `Bearer ${sessionToken}`
            }
        }),
    deleteCv: (cvId : number) =>
        http.delete<MessageResType>(`/candidate-cv/delete/${cvId}`),
    updateCv: (cvId: number, body: FormData) =>
        http.put<CvResType>(`/candidate-cv/update/${cvId}`, body),
}

  
export default cvApiRequest