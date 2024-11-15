// pages/candidate/cvs/[id].tsx
import { Metadata } from "next";
import DetailCvPage from "../_components/DetailCvPage"; // Đường dẫn đến component DetailCvPage
import { cookies } from "next/headers"; // Lấy cookies từ headers
import cvApiRequest from "@/app/apiRequest/cv"; // Đường dẫn đến API request cho CV
import { CvResType } from "@/app/schemaValidations/cv.schema"; // Kiểu dữ liệu cho CV


export const metadata: Metadata = {
  title: "CV Details",
};

export default async function CvViewer({
  params,
}: {
  params: { id: string }; // Nhận id từ params
}) {
  const cvId = parseInt(params.id); // Chuyển đổi id thành số
  const cookieStore = cookies(); // Lấy cookie
  let cv: CvResType["data"] | null = null; // Khai báo biến để lưu dữ liệu CV
  const sessionToken = cookieStore.get("sessionToken"); // Lấy sessionToken từ cookie

  if (sessionToken) {
    try {
      // Nếu có sessionToken, gọi API để lấy thông tin CV
      const result = await cvApiRequest.getCvById(cvId, sessionToken.value);
      cv = result.payload.data; // Gán dữ liệu CV cho biến cv
    } catch (error) {
      console.error("An error occurred while fetching CV details:", error);
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <DetailCvPage cv={cv} /> {/* Render component DetailCvPage với dữ liệu CV */}
    </div>
  );
}
