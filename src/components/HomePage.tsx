"use client";
import { JobListResType } from "@/app/schemaValidations/job.schema";
import Link from "next/link";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"; // Thêm AiOutlineLeft
import { useState } from "react";

export default function HomePage({
  jobList,
}: {
  jobList: JobListResType["data"] | null;
}) {
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const jobsPerPage = 9; // Số công việc trên mỗi trang

  if (!jobList) {
    return (
      <div className="text-center text-red-500">Không có công việc nào.</div>
    );
  }

  // Tính toán tổng số trang
  const totalPages = Math.ceil(jobList.length / jobsPerPage);

  // Tính toán công việc hiển thị trên trang hiện tại
  const currentJobs = jobList.slice(
    currentPage * jobsPerPage,
    (currentPage + 1) * jobsPerPage
  );

  // Hàm chuyển sang trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm quay lại trang trước
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[40px]">
      <div className="container mx-auto">
        {/* Tiêu đề và nút Xem tất cả */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl font-bold leading-tight sm:text-xl">
            Việc làm hấp dẫn
          </h2>
          <Link href="/jobs">
            <button className="text-sm text-blue-500 hover:underline flex items-center">
              Xem tất cả
              <AiOutlineRight className="ml-1" />
            </button>
          </Link>
        </div>

        {/* Danh sách công việc */}
        <div className="flex flex-wrap justify-center -mx-4">
          {currentJobs.map((job) => (
            <div
              key={job.jobId}
              className="w-full px-4 sm:w-1/2 lg:w-1/3 xl:w-1/3 relative mb-6"
            >
              <Link href={`/jobs/${job.jobId}`}>
                <div className="block bg-white group rounded-xl shadow-testimonial dark:bg-dark dark:shadow-none relative border border-yellow-900 rounded-lg cursor-pointer">
                  <div className="flex">
                    <div className="flex-shrink-0 p-4">
                      <img
                        src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-01.png"
                        alt="team image"
                        className="h-[60px] w-[60px] rounded-full"
                      />
                    </div>
                    <div className="flex-1 p-4 mx-2 min-w-0">
                      <div className="text-left">
                        <p
                          className="text-sm mb-2 font-bold text-dark dark:text-black truncate"
                          title={job.title}
                        >
                          {job.title}
                        </p>
                        <p
                          className="text-sm mb-2 font-normal text-dark dark:text-black truncate"
                          title={job.companyName}
                        >
                          {job.companyName}
                        </p>
                        <p
                          className="text-xs mb-2 font-normal text-dark dark:text-black truncate"
                          title={job.jobLocation}
                        >
                          {job.jobLocation}
                        </p>
                        <p className="text-xs mb-2 font-normal text-dark dark:text-black truncate">
                          {job.salary
                            ? `${job.salary} Vnđ`
                            : "Mức lương không xác định"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Nút lưu */}
                  <div className="absolute top-2 right-2">
                    <button className="bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Nút phân trang nằm ngoài danh sách công việc nhưng trong container */}
        <div className="flex justify-between items-center mb-6 mt-4">
          <button
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <AiOutlineLeft className="inline-block mr-1" />{" "}
            {/* Icon mũi tên trái */}
            Trang trước
          </button>

          {/* Div để giữ cho thông tin trang nằm giữa */}
          <div className="flex-1 text-center">
            <p className="text-sm">
              Trang {currentPage + 1} / {totalPages}
            </p>
          </div>

          <button
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Trang sau
            <AiOutlineRight className="inline-block ml-1" />{" "}
            {/* Icon mũi tên phải */}
          </button>
        </div>
      </div>

      <hr></hr>
      {/* // Việc làm theo ngành nghềeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
      <div className="container mx-auto">
        {/* Tiêu đề và nút Xem tất cả */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl font-bold leading-tight sm:text-xl">
            Việc làm hấp dẫn
          </h2>
          <Link href="/jobs">
            <button className="text-sm text-blue-500 hover:underline flex items-center">
              Xem tất cả
              <AiOutlineRight className="ml-1" />
            </button>
          </Link>
        </div>

        {/* Danh sách công việc */}
        <div className="flex flex-wrap justify-center -mx-4">
          {currentJobs.map((job) => (
            <div
              key={job.jobId}
              className="w-full px-4 sm:w-1/2 lg:w-1/3 xl:w-1/3 relative mb-6"
            >
              <Link href={`/jobs/${job.jobId}`}>
                <div className="block bg-white group rounded-xl shadow-testimonial dark:bg-dark dark:shadow-none relative border border-yellow-900 rounded-lg cursor-pointer">
                  <div className="flex">
                    <div className="flex-shrink-0 p-4">
                      <img
                        src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-01.png"
                        alt="team image"
                        className="h-[60px] w-[60px] rounded-full"
                      />
                    </div>
                    <div className="flex-1 p-4 mx-2 min-w-0">
                      <div className="text-left">
                        <p
                          className="text-sm mb-2 font-bold text-dark dark:text-black truncate"
                          title={job.title}
                        >
                          {job.title}
                        </p>
                        <p
                          className="text-sm mb-2 font-normal text-dark dark:text-black truncate"
                          title={job.companyName}
                        >
                          {job.companyName}
                        </p>
                        <p
                          className="text-xs mb-2 font-normal text-dark dark:text-black truncate"
                          title={job.jobLocation}
                        >
                          {job.jobLocation}
                        </p>
                        <p className="text-xs mb-2 font-normal text-dark dark:text-black truncate">
                          {job.salary
                            ? `${job.salary} Vnđ`
                            : "Mức lương không xác định"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Nút yêu thích */}
                  <div className="absolute top-2 right-2">
                    <button className="bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Nút phân trang nằm ngoài danh sách công việc nhưng trong container */}
        <div className="flex justify-between items-center mb-6 mt-4">
          <button
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <AiOutlineLeft className="inline-block mr-1" />{" "}
            {/* Icon mũi tên trái */}
            Trang trước
          </button>

          {/* Div để giữ cho thông tin trang nằm giữa */}
          <div className="flex-1 text-center">
            <p className="text-sm">
              Trang {currentPage + 1} / {totalPages}
            </p>
          </div>

          <button
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Trang sau
            <AiOutlineRight className="inline-block ml-1" />{" "}
            {/* Icon mũi tên phải */}
          </button>
        </div>
      </div>
    </div>
  );
}
