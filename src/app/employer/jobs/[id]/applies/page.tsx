"use client";

import { ApplyListResType } from "@/app/schemaValidations/apply.schema";
import AppliesPage from "../_components/AppliesPage";
import {useEffect, useState } from "react";
import applyApiRequest from "@/app/apiRequest/apply";
import { useParams } from "next/navigation"; // Import useParams
// import { useDataContext } from "@/app/context/userContext";

export default function Applies() {
  const [applyList, setApplyList] = useState<ApplyListResType["data"] | null>(
    null
  ); // Danh sách Level
  const { id } = useParams(); // Lấy id từ URL

  // const { setApplyListLength } = useDataContext(); // Lấy hàm setApplyListLength từ context

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kiểm tra nếu id là chuỗi
        if (typeof id === "string") {
          const jobId = parseInt(id); // Chuyển đổi id sang number
          
          if (!isNaN(jobId)) {
            const applyResult = await applyApiRequest.getAppliesByJobId(jobId); // Gọi API với jobId là số
            console.log("API result: ", applyResult); 

            // Kiểm tra nếu `data` là một mảng
            if (Array.isArray(applyResult.payload.data)) {
              setApplyList(applyResult.payload.data); // Gán khi đúng là mảng
              // setApplyListLength(applyResult.payload.data.length); // Lưu độ dài của applyList vào context
            } else if (applyResult.payload.data) {
              setApplyList([applyResult.payload.data]); // Nếu là object, chuyển thành mảng
              // setApplyListLength(1); // Nếu chỉ có một đối tượng, độ dài là 1
            }
          } else {
            console.error("Invalid job id: ", id);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được mount
  }, [id]);

  if (applyList) {
    console.log(applyList.length + " size");
  }

  return (
    <>
      <AppliesPage 
      applyList ={applyList}/>
    </>
  );
}
