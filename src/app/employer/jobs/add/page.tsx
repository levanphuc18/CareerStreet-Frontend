"use client"
import React, { useEffect, useState } from "react"; // Thêm import cho useEffect và useState
import { LevelListResType } from "@/app/schemaValidations/job.schema";
import AddJobPage from "../_components/AddJobPage";
import jobApiRequest from "@/app/apiRequest/job";
import { TechListResType } from "@/app/schemaValidations/tech.schema";
import techApiRequest from "@/app/apiRequest/tech";

export default function Home() {
  const [levelList, setLevelList] = useState<LevelListResType["data"] | null>(null); // Danh sách Level
  const [techList, setTechList] = useState<TechListResType["data"] | null>(null); // Danh sách Tech

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

        const techResult = await techApiRequest.getAllTech();
        // Kiểm tra nếu `data` là một mảng
        if (Array.isArray(techResult.payload.data)) {
          setTechList(techResult.payload.data); // Gán khi đúng là mảng
        } else if (techResult.payload.data) {
          setTechList([techResult.payload.data]); // Nếu là object, chuyển thành mảng
        }

        // In ra danh sách công nghệ
        techList?.forEach((tech) => {
          console.log("tech id: " + tech.techId + " tech Name: " + tech.name);
        });

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
    <>
      <AddJobPage levelList={levelList} techList={techList} />
    </>
  );
}
