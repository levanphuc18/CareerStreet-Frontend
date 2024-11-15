import React from "react";
import EditCvPage from "../../_components/EditCvPage";
// pages/candidate/cvs/[id].tsx
import { Metadata } from "next";
import { cookies } from "next/headers"; // Lấy cookies từ headers
import cvApiRequest from "@/app/apiRequest/cv"; // Đường dẫn đến API request cho CV
import { CvResType } from "@/app/schemaValidations/cv.schema"; // Kiểu dữ liệu cho CV

export const metadata: Metadata = {
  title: "Edit Cv",
};

export default async function EditPage({
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
    <>
      <EditCvPage cv={cv}
      cvId={cvId} 
      />
    </>
  );
}
