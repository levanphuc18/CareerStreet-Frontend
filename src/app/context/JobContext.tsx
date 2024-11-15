"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobListResType, LevelListResType } from '../schemaValidations/job.schema';
import jobApiRequest from '../apiRequest/job';

type JobContextType = {
  jobListContext: JobListResType["data"] | null;
  allJobListContext: JobListResType["data"] | null; // Thêm allJobListContext để lưu danh sách tất cả công việc
  setAllJobList: React.Dispatch<React.SetStateAction<JobListResType["data"] | null>> | null; // Thêm setAllJobList vào đây
  levelListContext: LevelListResType["data"] | null; // Thêm levelListContext vào context
};

const JobContext = createContext<JobContextType>({
  jobListContext: null,
  allJobListContext: null,
  setAllJobList: null,
  levelListContext: null, // Giá trị mặc định của levelListContext
});

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobListContext, setJobList] = useState<JobListResType["data"] | null>(null);
  const [allJobListContext, setAllJobList] = useState<JobListResType["data"] | null>(null); // State cho tất cả công việc
  const [levelListContext, setLevelList] = useState<LevelListResType["data"] | null>(null); // State cho danh sách Level

  useEffect(() => {
    const fetchJobsByStatus = async () => {
      try {
        const jobResult = await jobApiRequest.getAllJobByStatus(1);
  
        // Kiểm tra sự tồn tại của payload và data
        if (jobResult && jobResult.payload && Array.isArray(jobResult.payload.data)) {
          setJobList(jobResult.payload.data);
        } else {
          console.warn("jobResult hoặc payload.data không hợp lệ trong fetchJobsByStatus:", jobResult);
          setJobList([]); // Đặt về mảng rỗng nếu không có dữ liệu hợp lệ
        }
      } catch (error) {
        console.error("An error occurred in fetchJobsByStatus:", error);
      }
    };
  
    const fetchAllJobs = async () => {
      try {
        const allJobsResult = await jobApiRequest.getAllJob();
  
        // Kiểm tra sự tồn tại của payload và data
        if (allJobsResult && allJobsResult.payload && Array.isArray(allJobsResult.payload.data)) {
          setAllJobList(allJobsResult.payload.data);
        } else {
          console.warn("allJobsResult hoặc payload.data không hợp lệ trong fetchAllJobs:", allJobsResult);
          setAllJobList([]); // Đặt về mảng rỗng nếu không có dữ liệu hợp lệ
        }
      } catch (error) {
        console.error("An error occurred in fetchAllJobs:", error);
      }
    };

    const fetchAllLevels = async () => {
      try {
        const levelResult = await jobApiRequest.getAllLevel();

        if (levelResult && levelResult.payload && Array.isArray(levelResult.payload.data)) {
          setLevelList(levelResult.payload.data);
        } else if (levelResult.payload.data) {
          setLevelList([levelResult.payload.data]);
        } else {
          console.warn("levelResult hoặc payload.data không hợp lệ trong fetchAllLevels:", levelResult);
          setLevelList([]);
        }
      } catch (error) {
        console.error("An error occurred in fetchAllLevels:", error);
      }
    };
  
    fetchJobsByStatus();
    fetchAllJobs(); // Gọi API lấy tất cả công việc
    fetchAllLevels(); // Gọi API để lấy danh sách Level
  }, []);

  return (
    <JobContext.Provider value={{ jobListContext, allJobListContext, setAllJobList, levelListContext }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);