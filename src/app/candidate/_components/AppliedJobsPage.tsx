"use client";
import jobApiRequest from "@/app/apiRequest/job";
import {
  ApplyListResType,
  getStatusLabel,
} from "@/app/schemaValidations/apply.schema";
import { JobResType } from "@/app/schemaValidations/job.schema";
import Link from "next/link"; // Nhớ import Link từ next/link
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

export default function AppliedJobsPage({
  appliesList = [],
}: {
  appliesList: ApplyListResType["data"] | null;
}) {
  // State để lưu trữ thông tin công việc từ API
  const [jobDetails, setJobDetails] = useState<JobResType | null>(null);

  useEffect(() => {
    if (appliesList && appliesList.length > 0) {
      const latestApply = appliesList[0];
      if (latestApply && latestApply.jobId) {
        jobApiRequest
          .getJobById(latestApply.jobId)
          .then((response) => {
            setJobDetails(response.payload);
          })
          .catch((error) => {
            console.error("Error fetching job details:", error);
          });
      }
    }
  }, [appliesList]);

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 p-6 sm:p-12">
      <div className="flex items-center mb-6 ml-14">
        <span className="text-sm text-gray-600 mr-auto">
          Công việc đã ứng tuyển ({appliesList ? appliesList.length : 0})
        </span>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-screen-xl">
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col gap-4 p-6 rounded-md">
            {appliesList && appliesList.length > 0 ? (
              appliesList.map((apply) => (
                <Link
                  href={`/jobs/${apply.jobId}`}
                  key={apply.jobId}
                  className="flex justify-between items-start border p-4 rounded-md border-gray-300 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col">
                    <h3 className="font-bold mt-px text-sm">
                      {jobDetails?.data.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                        Công ty: {jobDetails?.data.companyName}
                      </span>
                    </div>
                    <p>
                      <span className="text-slate-600 text-sm flex gap-1 items-center">
                        <FiUser className="h-4 w-4" />{" "}
                        {/* Sử dụng icon React */}
                        Đã nộp: {apply.date}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <span
                      className={`px-4 py-2 text-xs font-medium ${
                        apply.status === 0
                          ? "bg-yellow-200 text-yellow-700" // Màu cho trạng thái "Chờ xét duyệt"
                          : apply.status === 1
                          ? "bg-blue-200 text-blue-700" // Màu cho trạng thái "Đang được xem xét"
                          : apply.status === 2
                          ? "bg-green-200 text-green-700" // Màu cho trạng thái "Đang chờ phỏng vấn"
                          : apply.status === 3
                          ? "bg-orange-200 text-orange-700" // Màu cho trạng thái "Phỏng vấn xong"
                          : apply.status === 4
                          ? "bg-gray-200 text-gray-700" // Màu cho trạng thái "Đang chờ quyết định"
                          : apply.status === 5
                          ? "bg-teal-200 text-teal-700" // Màu cho trạng thái "Đã tuyển dụng"
                          : "bg-red-200 text-red-700" // Màu mặc định cho trạng thái "Bị từ chối"
                      }`}
                    >
                      {getStatusLabel(apply.status)}{" "}
                      {/* Gọi hàm ánh xạ để lấy nhãn trạng thái */}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Không có công việc nào đã ứng tuyển.</p>
            )}
          </div>

          {/* Đề xuất công việc */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xs p-6 rounded-md">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Đề xuất công việc
            </h2>
            <ul className="space-y-4">
              <li className="border-b pb-2">
                <Link
                  href="/jobs/frontend-developer"
                  className="hover:underline"
                >
                  <h4 className="font-bold">Frontend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, US</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Part-time
                  </span>
                </Link>
              </li>
              {/* Các công việc khác */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
