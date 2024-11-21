import React, { createContext, useContext, useState, useEffect } from "react";
import applyApiRequest from "@/app/apiRequest/apply";
import { ApplyListResType } from "@/app/schemaValidations/apply.schema";

type ApplyContextType = {
  appliesListByCandidateId: ApplyListResType["data"] | null;
  setAppliesListByCandidateId: React.Dispatch<
    React.SetStateAction<ApplyListResType["data"] | null>
  > | null;
  appliesListByEmployerId: ApplyListResType["data"] | null;
  setAppliesListByEmployerId: React.Dispatch<
    React.SetStateAction<ApplyListResType["data"] | null>
  > | null;
  checkApplicationStatus: (jobId: number) => Promise<boolean>; // Thêm hàm kiểm tra
};

const ApplyContext = createContext<ApplyContextType>({
  appliesListByCandidateId: null,
  setAppliesListByCandidateId: null,
  appliesListByEmployerId: null,
  setAppliesListByEmployerId: null,
  checkApplicationStatus: async () => false, // Default cho context
});

export const ApplyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appliesListByCandidateId, setAppliesListByCandidateId] = useState<
    ApplyListResType["data"] | null
  >(null);
  const [appliesListByEmployerId, setAppliesListByEmployerId] = useState<
    ApplyListResType["data"] | null
  >(null);

  useEffect(() => {
    const fetchAppliesByCandidate = async () => {
      const cookies = document.cookie;
      const userIdMatch = cookies.match(/userId=([^;]+)/);
      const userId = userIdMatch ? parseInt(userIdMatch[1], 10) : null;

      if (userId !== null) {
        try {
          const appliesResult = await applyApiRequest.getAppliesByCandidateId(
            userId
          );

          if (Array.isArray(appliesResult.payload.data)) {
            setAppliesListByCandidateId(appliesResult.payload.data);
          } else {
            setAppliesListByCandidateId([appliesResult.payload.data]);
          }
        } catch (error) {
          console.error("An error occurred while fetching Applies by Candidate:", error);
        }
      }
    };

    fetchAppliesByCandidate();
  }, []);

  useEffect(() => {
    const fetchAppliesByEmployer = async () => {
      const cookies = document.cookie;
      const employerIdMatch = cookies.match(/userId=([^;]+)/);
      const employerId = employerIdMatch ? parseInt(employerIdMatch[1], 10) : null;

      if (employerId !== null) {
        try {
          const appliesResult = await applyApiRequest.getAppliesByEmployerId(
            employerId
          );

          if (Array.isArray(appliesResult.payload.data)) {
            setAppliesListByEmployerId(appliesResult.payload.data);
          } else {
            setAppliesListByEmployerId([appliesResult.payload.data]);
          }
        } catch (error) {
          console.error("An error occurred while fetching Applies by Employer:", error);
        }
      }
    };

    fetchAppliesByEmployer();
  }, []);

  const checkApplicationStatus = async (jobId: number): Promise<boolean> => {
    const cookies = document.cookie;
    const userIdMatch = cookies.match(/userId=([^;]+)/);
    const userId = userIdMatch ? parseInt(userIdMatch[1], 10) : null;

    if (userId !== null) {
      try {
        const result = await applyApiRequest.checkApplicationStatus(userId, jobId);
        return result.payload === true;
      } catch (error) {
        console.error("Error while checking application status:", error);
      }
    }
    return false;
  };

  return (
    <ApplyContext.Provider
      value={{
        appliesListByCandidateId,
        setAppliesListByCandidateId,
        appliesListByEmployerId,
        setAppliesListByEmployerId,
        checkApplicationStatus,
      }}
    >
      {children}
    </ApplyContext.Provider>
  );
};

export const useApplyContext = () => useContext(ApplyContext);
