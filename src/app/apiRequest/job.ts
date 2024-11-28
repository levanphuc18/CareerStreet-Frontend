import { FilterJobListResType, JobCreateBodyType, JobResType, LevelResType } from "../schemaValidations/job.schema"
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
    getAllJob: () =>
      http.get<JobResType>(`/job/getall`),
    getJobById: (id: number) =>
      http.get<JobResType>(`/job/get/${id}`),
    updateJobStatus: (jobId: number, status: number) =>
      http.put<JobResType>(`/job/update/${jobId}/jobstatus/${status}`),
    getAllLevel: () =>
      http.get<LevelResType>("/level/getall"),

    FilterJob : (filter: FilterJobListResType) => { 
      const queryParams =  new URLSearchParams ();
     
      if (filter.title) queryParams.append('title', filter.title);
      if(filter.location) queryParams.append('location',filter.location)
      if(filter.salaryMin) queryParams.append('salaryMin', filter.salaryMin);
      if(filter.salaryMax) queryParams.append('salaryMax', filter.salaryMax);
      if(filter.jobType) queryParams.append('jobType', filter.jobType);
      if (filter.jobRank) queryParams.append('jobRank', filter.jobRank);
     return   http.get <JobResType> (`/job/filler? ${queryParams.toString()}`);
     },
    updateJob: (jobId: number, body: FormData) =>
      http.put<JobResType>(`/job/update/${jobId}`, body),
        
}
export default jobApiRequest