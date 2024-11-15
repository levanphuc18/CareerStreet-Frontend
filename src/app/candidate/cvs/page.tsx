import { cookies } from "next/headers";
import CvsPage from "./_components/CvsPage";
import { CvListResType } from "@/app/schemaValidations/cv.schema";
import cvApiRequest from "@/app/apiRequest/cv";

export default async function CvPage() {
  const cookieTmp = cookies();
  const sessionToken = cookieTmp.get("sessionToken");
  const username = cookieTmp.get("username");
  const userIdString = cookieTmp.get("userId");

  // Chuyển đổi userId từ chuỗi thành số nếu có giá trị
  const userId = userIdString ? parseInt(userIdString.value, 10) : null;

  let cvList: CvListResType["data"] | null = null; // Danh sách CV

  if (username && sessionToken && userId !== null) {
    try {
      const cvResult = await cvApiRequest.getAllCvByCandidateId(userId, sessionToken.value);
      cvList = Array.isArray(cvResult.payload.data) ? cvResult.payload.data : [cvResult.payload.data];
    } catch (error) {
      console.error("An error occurred while fetching CVs:", error);
    }
  }

  return (
    <>
      <CvsPage cvList={cvList} />
    </>
  );
}
