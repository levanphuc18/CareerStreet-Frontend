"use client";

import jobApiRequest from "@/app/apiRequest/job";
import { useApplyContext } from "@/app/context/ApplyContext";
import { useCandidateContext } from "@/app/context/CandidateContext";
import { getStatusLabel } from "@/app/schemaValidations/apply.schema";
import { JobResType } from "@/app/schemaValidations/job.schema";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CandidatePage() {
  const { candidateContext } = useCandidateContext();
  const { appliesListByCandidateId } = useApplyContext();

  // State để lưu trữ thông tin công việc từ API
  const [jobDetails, setJobDetails] = useState<JobResType | null>(null);

  // Lọc và sắp xếp 5 công việc gần nhất theo ngày nộp (có thể thay đổi trường dateApplied theo cấu trúc dữ liệu thực tế)
  const sortedApplies = appliesListByCandidateId
    ? [...appliesListByCandidateId] // Sao chép mảng để không làm thay đổi dữ liệu gốc
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sắp xếp theo ngày nộp giảm dần
        .slice(0, 2) // Lấy 5 công việc gần nhất
    : [];

  // Gọi API jobApiRequest.getJobById với jobId từ apply
  useEffect(() => {
    if (appliesListByCandidateId && appliesListByCandidateId.length > 0) {
      const latestApply = appliesListByCandidateId[0]; // Get the most recent apply

      if (latestApply && latestApply.jobId) {
        const jobId = latestApply.jobId; // Extract the jobId from the apply object

        // Fetch job details using the jobId
        jobApiRequest
          .getJobById(jobId)
          .then((response) => {
            setJobDetails(response.payload); // Assuming the API returns data in 'data' property
          })
          .catch((error) => {
            console.error("Error fetching job details:", error);
          });
      }
    }
  }, [appliesListByCandidateId]); // Trigger useEffect when appliesListByCandidateId changes

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Thêm div này để căn giữa hai cột */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-6">
          {" "}
          {/* Thêm ml-6 ở đây */}
          {/* Cột công việc */}
          <div className="text-xs bg-white shadow-xl shadow-gray-100 w-full sm:w-1/3 flex flex-col gap-4 p-6 rounded-md">
            {" "}
            {/* Thay max-w-xs bằng sm:w-1/3 */}
            {/* Phần Thông tin tài khoản */}
            <div className="mb-6 border border-gray-300 rounded-lg p-4 flex flex-col h-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {/* Avatar */}
                  <img
                    src="/images/logo.png" // Thay đường dẫn ảnh đại diện
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-2">
                    {" "}
                    {/* Giảm khoảng cách bên trái */}
                    <h2 className="font-bold text-lg">
                      {" "}
                      {candidateContext?.fullName}
                    </h2>
                    <span className="text-xs text-gray-500">
                      {candidateContext?.phone}
                    </span>
                    <p className="text-xs text-gray-500">
                      {candidateContext?.address}
                    </p>
                  </div>
                </div>
              </div>
              {/* Icon sửa và nút Sign out */}
              <div className="flex justify-end mt-2">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <span className="mr-2 text-sm">Sign out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Phần My Resumes */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Hồ sơ của tôi</h3>
                <Link
                  href="/candidate/cvs"
                  className="ml-2 text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="flex justify-center">
                <button className="mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100">
                  <Link
                    href="/candidate/cvs/add"
                    className="ml-2 text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    Create new
                  </Link>
                </button>
              </div>
            </div>
          </div>
          {/* Cột danh sách công việc đề xuất */}
          <div className="flex-grow p-4 max-w-xl sm:w-2/3">
            {" "}
            {/* Thay đổi chiều rộng cho cột danh sách công việc */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-purple-100 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-gray-500"></div>
              </div>
              <div className="bg-yellow-100 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-gray-500">Việc đã lưu</div>
              </div>
              <div className="bg-red-200 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">
                  {appliesListByCandidateId?.length}
                </div>
                <Link href="/candidate/applied">
                  <div className="text-gray-500 cursor-pointer">
                    Việc đã ứng tuyển
                  </div>
                </Link>
              </div>
              <div className="bg-green-200 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-gray-500"></div>
              </div>
            </div>
            <div className="bg-white shadow rounded mb-4">
              <div className="border-b p-4 flex justify-between items-center">
                <div className="font-bold">Công việc đã ứng tuyển gần đây</div>
                <Link
                  href="/candidate/applied"
                  className="text-blue-500 text-xs hover:underline"
                >
                  Xem tất cả công việc đã ứng tuyển
                </Link>
              </div>
              <div className="p-4">
                {sortedApplies.map((apply, index) => (
                  <Link
                    key={index}
                    href={`/jobs/${apply.jobId}`}
                    className="bg-gray-100 p-4 rounded mb-4 flex justify-between items-center block hover:bg-gray-200 transition"
                  >
                    <div>
                      <div className="text-l font-bold">
                        {jobDetails?.data.title}
                      </div>
                      <div className="text-gray-500 text-xs">
                        Công ty: {jobDetails?.data.companyName}
                      </div>
                      <div className="text-gray-500 text-xs">
                        Ngày nộp: {apply.date}
                      </div>
                      <div className="text-gray-500 text-xs">
                        Ngày hết hạn: {jobDetails?.data.expirationDate}
                      </div>
                    </div>
                    <div className="text-center">
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
                ))}
              </div>
            </div>
            <div className="bg-white shadow rounded">
              <div className="border-b p-4 font-bold">Recommended jobs</div>
              <div>
                <Link href="/jobs/123" className="border-b p-4 block">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-l font-bold">
                        HÀ NỘI NHÂN VIÊN TESTER
                      </div>
                      <div className="text-gray-500 text-xs">
                        CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ĐIỆN TỬ BÌNH AN
                      </div>
                      <div className="text-gray-500 text-xs">
                        {" "}
                        40,000,000 VND - 40,000,000 VND
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                        ❤️
                      </span>
                    </div>
                  </div>
                </Link>

                <Link href="/jobs/123" className="border-b p-4 block">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-l font-bold">
                        Training Manager (Net Upto 40M ++)
                      </div>
                      <div className="text-gray-500 text-xs">
                        Tập Đoàn Giáo Dục Quốc Tế
                      </div>
                      <div className="text-gray-500 text-xs">
                        {" "}
                        20,000,000 VND - 40,000,000 VND
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                        ❤️
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
