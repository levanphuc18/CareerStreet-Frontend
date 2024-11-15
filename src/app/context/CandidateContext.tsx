"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import candidateApiRequest from "@/app/apiRequest/candidate";
import { CandidateResType } from "@/app/schemaValidations/auth.schema";

type CandidateContextType = {
  candidateContext: CandidateResType["data"] | null; // Dữ liệu ứng viên
  setCandidate: React.Dispatch<React.SetStateAction<CandidateResType["data"] | null>> | null; // Hàm để cập nhật ứng viên
};

const CandidateContext = createContext<CandidateContextType>({
  candidateContext: null,
  setCandidate: null,
});

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [candidateContext, setCandidate] = useState<CandidateResType["data"] | null>(null);

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

    fetchCandidateData();
  }, []);

  return (
    <CandidateContext.Provider value={{ candidateContext, setCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => useContext(CandidateContext);