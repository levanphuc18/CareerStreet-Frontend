// import jobApiRequest from "../apiRequest/job";
// import { JobListResType } from "../schemaValidations/job.schema";
// import HomePage from "./HomePage";

// export default async function home() {
//   type JobListDataType = JobListResType["data"];
//   let jobList: JobListDataType | null = null; // Danh sách CV

//   try {
//     // Nếu có userId, lấy danh sách CV
//     const jobResult = await jobApiRequest.getAllJobByStatus(1);
//     // Kiểm tra nếu `data` là một mảng
//     if (Array.isArray(jobResult.payload.data)) {
//       jobList = jobResult.payload.data; // Gán khi đúng là mảng
//     } else {
//       jobList = [jobResult.payload.data]; // Nếu là object, chuyển thành mảng
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     if (error instanceof Error) {
//       console.error("Error message:", error.message);
//       console.error("Stack trace:", error.stack);
//     } else {
//       console.error("Unknown error:", error);
//     }
//   }
//   if (jobList) {
//     jobList.forEach((job) => {
//       console.log("Website: " + job.companyWebsite);
//     });
//   }

//   return (
//     <>
//       <HomePage jobList={jobList} />
//     </>
//   );
// }
