// import { RegisterResType } from "../schemaValidations/auth.schema"
import { EmployerResType } from "../schemaValidations/auth.schema"
import { EmployerCreateBodyType } from "../schemaValidations/employer.schema"
import http from "../untils/http"

const employerApiRequest ={
    createEmployer:(body: EmployerCreateBodyType) =>
        http.post<EmployerResType>("employer/create",body),
    
}
export default employerApiRequest