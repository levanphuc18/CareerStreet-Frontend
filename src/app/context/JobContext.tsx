"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobListResType } from '../schemaValidations/job.schema';
import jobApiRequest from '../apiRequest/job';

type JobContextType = {
  jobListContext: JobListResType["data"] | null;
};

const JobContext = createContext<JobContextType>({
  jobListContext: null,
});

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobListContext, setJobList] = useState<JobListResType["data"] | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobResult = await jobApiRequest.getAllJobByStatus(1);
        if (Array.isArray(jobResult.payload.data)) {
          setJobList(jobResult.payload.data);
        } else {
          setJobList([jobResult.payload.data]);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobListContext }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);