import React, { createContext, useContext, useState, useEffect } from "react";
import applyApiRequest from "@/app/apiRequest/apply";
import { ApplyListResType } from "@/app/schemaValidations/apply.schema";

type ApplyContextType = {
  appliesListByCandidateId: ApplyListResType["data"] | null;
  setAppliesListByCandidateId: React.Dispatch<React.SetStateAction<ApplyListResType["data"] | null>> | null;
};

const ApplyContext = createContext<ApplyContextType>({
  appliesListByCandidateId: null,
  setAppliesListByCandidateId: null,
});

export const ApplyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliesListByCandidateId, setAppliesListByCandidateId] = useState<ApplyListResType["data"] | null>(null);

  useEffect(() => {
    const fetchApplies = async () => {
      // Thay vì dùng cookies từ next/headers, ta lấy cookies từ document.cookie (client-side)
      const cookies = document.cookie;
      const usernameMatch = cookies.match(/username=([^;]+)/);
      const userIdMatch = cookies.match(/userId=([^;]+)/);

      const username = usernameMatch ? usernameMatch[1] : null;
      const userIdString = userIdMatch ? userIdMatch[1] : null;
      const userId = userIdString ? parseInt(userIdString, 10) : null;

      if (username && userId !== null) {
        try {
          const appliesResult = await applyApiRequest.getAppliesByCandidateId(userId);

          if (Array.isArray(appliesResult.payload.data)) {
            setAppliesListByCandidateId(appliesResult.payload.data);
          } else {
            setAppliesListByCandidateId([appliesResult.payload.data]);
          }
        } catch (error) {
          console.error("An error occurred while fetching Applies:", error);
        }
      }
    };

    fetchApplies();
  }, []); // Chạy khi component mount

  return (
    <ApplyContext.Provider value={{ appliesListByCandidateId, setAppliesListByCandidateId }}>
      {children}
    </ApplyContext.Provider>
  );
};

export const useApplyContext = () => useContext(ApplyContext);
