import { cookies } from "next/headers";
import CvsPage from "../_components/CvsPage";
import { CvListResType } from "@/app/schemaValidations/cv.schema";
import cvApiRequest from "@/app/apiRequest/cv";

export default async function CvPage() {
  const cookieTmp = cookies();
  const sessionToken = cookieTmp.get("sessionToken");

  // type CvDataType = CvResType["data"];
  // let cv: CvDataType | null = null;

  type CvListDataType = CvListResType["data"];
  let cvList: CvListDataType | null = null; // Danh sách CV

  const username = cookieTmp.get("username");
  const userIdString = cookieTmp.get("userId");

  // Chuyển đổi userId từ chuỗi thành số nếu có giá trị
  const userId = userIdString ? parseInt(userIdString.value, 10) : null;

  if (username && sessionToken) {
    try {
      // Nếu có userId, lấy danh sách CV
      if (userId !== null) {
        const cvResult = await cvApiRequest.getAllCvById(
          userId,
          sessionToken.value
        );
        // Kiểm tra nếu `data` là một mảng
        if (Array.isArray(cvResult.payload.data)) {
          cvList = cvResult.payload.data; // Gán khi đúng là mảng
        } else {
          cvList = [cvResult.payload.data]; // Nếu là object, chuyển thành mảng
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Stack trace:", error.stack);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }
  if (cvList) {
    cvList.forEach((cv) => {
      console.log("dia chi: " + cv.address);
      console.log("title: " + cv.title);
    });
  }

  return (
    <>
      <CvsPage 
        cvList = {cvList}/>
    </>
  );
}
