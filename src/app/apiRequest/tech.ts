import { TechListResType, TechResType } from "../schemaValidations/tech.schema";
import {
  TechDetailCreateBodyType,
  TechDetailResType,
} from "../schemaValidations/techDetail.schema";
import http from "../untils/http";

const techApiRequest = {
  getAllTech: () => http.get<TechResType>("tech/getall"),

  createTechDetail: (body: TechDetailCreateBodyType) =>
    http.post<TechDetailResType>("tech-detail/create", body),
  getTechByJobId: (jobId: number) =>
    http.get<TechListResType>(`/tech-detail/get-tech/${jobId}`),
};
export default techApiRequest;
