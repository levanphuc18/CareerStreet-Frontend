"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import candidateApiRequest from "@/app/apiRequest/candidate";
import { CandidateResType } from "@/app/schemaValidations/auth.schema";
import { CandidateListResType } from "../schemaValidations/candidate.schema";

type CandidateContextType = {
  candidateContext: CandidateResType["data"] | null; // Dữ liệu ứng viên
  setCandidate: React.Dispatch<React.SetStateAction<CandidateResType["data"] | null>> | null; // Hàm để cập nhật ứng viên
  allCandidateListContext: CandidateListResType["data"] | null; // Thêm allJobListContext để lưu danh sách tất cả công việc
  setAllCandidateList: React.Dispatch<React.SetStateAction<CandidateListResType["data"] | null>> | null; // Thêm setAllJobList vào đây
};

const CandidateContext = createContext<CandidateContextType>({
  candidateContext: null,
  setCandidate: null,
  allCandidateListContext: null,
  setAllCandidateList: null, // Giá trị mặc định của levelListContext
});

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [candidateContext, setCandidate] = useState<CandidateResType["data"] | null>(null);
  const [allCandidateListContext, setAllCandidateList] = useState<CandidateListResType["data"] | null>(null); // State cho tất cả công việc

  useEffect(() => {
    const fetchCandidateData = async () => {
      const cookies = document.cookie.split("; ").reduce((acc, current) => {
        const [key, value] = current.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  
      const sessionToken = cookies["sessionToken"];
      const username = cookies["username"];
  
      if (sessionToken && username) {
        try {
          const candidateResult = await candidateApiRequest.getCandidateByUsername(
            username,
            sessionToken
          );
  
          // Kiểm tra dữ liệu từ API và gán vào state
          if (
            candidateResult &&
            candidateResult.payload &&
            candidateResult.payload.data
          ) {
            setCandidate(candidateResult.payload.data);
          } else {
            console.warn(
              "candidateResult hoặc payload.data không hợp lệ:",
              candidateResult
            );
            setCandidate(null); // Đặt null nếu dữ liệu không hợp lệ
          }
        } catch (error) {
          console.error("An error occurred in fetchCandidateData:", error);
        }
      }
    };
  
    const fetchAllCandidates = async (sessionToken: string) => {
      try {
        const allCandidatesResult = await candidateApiRequest.getAllCandidate(
          sessionToken
        );
        console.log("dadtaa contextCandidate: "+allCandidateListContext)
  
        // Kiểm tra sự tồn tại của payload và data
        if (
          allCandidatesResult &&
          allCandidatesResult.payload &&
          Array.isArray(allCandidatesResult.payload.data)
        ) {
          setAllCandidateList(allCandidatesResult.payload.data);
        } else {
          console.warn(
            "allCandidatesResult hoặc payload.data không hợp lệ:",
            allCandidatesResult
          );
          setAllCandidateList([]); // Đặt về mảng rỗng nếu không có dữ liệu hợp lệ
        }
      } catch (error) {
        console.error("An error occurred in fetchAllCandidates:", error);
      }
    };
  
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  
    const sessionToken = cookies["sessionToken"];
  
    if (sessionToken) {
      fetchAllCandidates(sessionToken); // Truyền sessionToken vào hàm fetchAllCandidates
    }
  
    fetchCandidateData();
  }, []);
  

  return (
    <CandidateContext.Provider value={{ candidateContext, setCandidate, allCandidateListContext, setAllCandidateList}}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => useContext(CandidateContext);