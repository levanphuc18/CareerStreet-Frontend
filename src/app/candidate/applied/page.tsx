import { cookies } from "next/headers";
import AppliedJobsPage from "../_components/AppliedJobsPage";
import applyApiRequest from "@/app/apiRequest/apply";
import { ApplyListResType } from "@/app/schemaValidations/apply.schema";

export default async function AppliedPage() {
  const cookieTmp = cookies();
  const username = cookieTmp.get("username");
  const userIdString = cookieTmp.get("userId");

  // Chuyển đổi userId từ chuỗi thành số nếu có giá trị
  const userId = userIdString ? parseInt(userIdString.value, 10) : null;

  let appliesList: ApplyListResType["data"] | null = null; // Danh sách CV

  if (username && userId !== null) {
    try {
      const appliesResult = await applyApiRequest.getAppliesByCandidateId(
        userId,
      );
      appliesList = Array.isArray(appliesResult.payload.data)
        ? appliesResult.payload.data
        : [appliesResult.payload.data];
    } catch (error) {
      console.error("An error occurred while fetching Applies:", error);
    }
  }

  return (
    <>
      <AppliedJobsPage 
      appliesList = {appliesList}/>
    </>
  );
}
