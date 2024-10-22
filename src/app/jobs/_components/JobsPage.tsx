"use client"
import { useJobContext } from "@/app/context/JobContext";
import Link from "next/link";

export default function JobsPage() {
  const { jobListContext } = useJobContext();

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 p-6 sm:p-12">
      {/* Sắp xếp */}
      <div className="flex items-center mb-6 ml-14">
        <span className="text-sm text-gray-600 mr-2">Sắp xếp theo: </span>
        <select className="border rounded-md p-1">
          <option value="newest">Mới cập nhật</option>
          <option value="salary">Mức lương cao nhất</option>
          <option value="relevance">Liên quan nhất</option>
        </select>
      </div>

      {/* Kiểm tra và hiển thị danh sách công việc */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-screen-xl">
          {/* Cột công việc */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col gap-4 p-6 rounded-md">
            {jobListContext ? (
              jobListContext.map(job => (
                <Link key={job.jobId} href={`/jobs/${job.jobId}`} className="flex justify-between items-start mt-4">
                  <div className="flex flex-col">
                    <span className="text-purple-800 text-sm">{job.title}</span>
                    {/* <h3 className="font-bold mt-px">{job.salary} Vnđ</h3> */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`bg-${job.jobType === 'Full-time' ? 'purple' : 'blue'}-100 text-purple-700 rounded-full px-3 py-1 text-sm`}>
                        {job.jobType}
                      </span>
                      <span className="text-slate-600 text-sm flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.jobLocation}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
                      Apply Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600">Không có công việc nào để hiển thị.</p>
            )}
          </div>

          {/* Cột danh sách công việc đề xuất */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xs p-6 rounded-md">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">Đề xuất công việc</h2>
            <ul className="space-y-4">
              {/* Các công việc đề xuất */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
