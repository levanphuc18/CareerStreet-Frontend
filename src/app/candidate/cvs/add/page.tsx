"use client"
import { LevelListResType } from "@/app/schemaValidations/job.schema";
import AddCvPage from "../_components/AddCvPage";
import { useEffect, useState } from "react";
import jobApiRequest from "@/app/apiRequest/job";

const AddPage = () => {
  const [levelList, setLevelList] = useState<LevelListResType["data"] | null>(null); // Danh sách Level
  useEffect(() => {
    const fetchData = async () => {
      try {
        const levelResult = await jobApiRequest.getAllLevel();
        // Kiểm tra nếu `data` là một mảng
        if (Array.isArray(levelResult.payload.data)) {
          setLevelList(levelResult.payload.data); // Gán khi đúng là mảng
        } else if (levelResult.payload.data) {
          setLevelList([levelResult.payload.data]); // Nếu là object, chuyển thành mảng
        }
        // In ra danh sách level
        levelList?.forEach((level) => {
          console.log("level Name: " + level.name);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Gọi hàm fetchData
  }, []); // [] nghĩa là effect này chỉ chạy một lần khi component được mount
    return (
      <div>
        {/* <h1 className="text-xl font-semibold text-center mt-8">Đăng nhập</h1> */}
        <div>
          <AddCvPage levelList={levelList}/>
        </div>
      </div>
    );
  }

  export default AddPage;