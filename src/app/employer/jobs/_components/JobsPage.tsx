"use client";
import { JobListResType } from "@/app/schemaValidations/job.schema";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function JobsPage({
  jobList,
}: {
  jobList: JobListResType["data"] | null;
}) {
  const [selectedStatus, setSelectedStatus] = useState(3); // Mặc định là tất cả công việc
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filteredJobs, setFilteredJobs] = useState<JobListResType["data"] | null>(jobList);

  // Kiểm tra nếu không có công việc nào trong jobList
  if (!jobList) {
    return (
      <div className="text-center text-red-500">Không có công việc nào.</div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const filterJobsByStatus = () => {
      if (selectedStatus === 3) {
        // Nếu selectedStatus là 3, không lọc trạng thái, giữ tất cả công việc
        setFilteredJobs(jobList);
      } else {
        // Nếu selectedStatus khác 3, lọc các công việc theo trạng thái
        const filtered = jobList?.filter(job => job.status === selectedStatus);
        setFilteredJobs(filtered);
      }
    };

    filterJobsByStatus(); // Lọc lại khi selectedStatus thay đổi

  }, [selectedStatus, jobList]);

  // Hàm xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Lọc công việc theo từ khóa tìm kiếm
  const filteredJobsList = filteredJobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Đếm số lượng công việc theo trạng thái
  const activeJobsCount = filteredJobsList?.filter((job) => job.status === 1).length;
  const cancelJobsCount = filteredJobsList?.filter((job) => job.status === -1).length;
  const pendingJobsCount = filteredJobsList?.filter((job) => job.status === 0).length;
  const expiredJobsCount = filteredJobsList?.filter((job) => job.status === 2).length;

  return (
    <div className="flex scroll-auto bg-gray-100">
      <div className="container mx-auto overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b-4 border-gray-300">
          <h3 className="text-xs text-blue-600 font-bold mb-4">
            Công việc của tôi ({filteredJobsList?.length || 0})
          </h3>
          <div className="flex space-x-2 text-xs">
            <Link
              href="/employer/jobs/add"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Đăng công việc
            </Link>
          </div>
        </div>

        {/* Phần tìm kiếm và trạng thái nằm trên bảng */}
        <div className="flex items-center mb-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <AiOutlineSearch className="p-2 text-gray-600" />
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              className="p-2 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="relative inline-block text-left ml-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value={3}>Tất cả ({filteredJobsList?.length || 0})</option>
              <option value={0}>Chưa duyệt ({pendingJobsCount || 0})</option>
              <option value={1}>Đã duyệt ({activeJobsCount || 0})</option>
              <option value={-1}>Không duyệt ({cancelJobsCount || 0})</option>
              <option value={2}>
                Công việc đã hết hạn ({expiredJobsCount || 0})
              </option>
            </select>
          </div>
        </div>

        {/* Bảng dữ liệu */}
        <div className="overflow-y-auto hide-scrollbar max-h-[calc(100vh-200px)]">
          <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Trạng thái</th>
                <th className="py-2 px-4 text-left">Công việc</th>
                <th className="py-2 px-4 text-left">Số đơn ứng tuyển</th>
                <th className="py-2 px-4 text-left">Lượt xem</th>
                <th className="py-2 px-4 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobsList?.map((job) => (
                <tr key={job.jobId} className="border-b">
                  <td className="py-2 px-4 font-bold">
                    <span
                      className={`border border-gray-400 rounded-md px-1 ${
                        job.status === 0
                          ? "bg-yellow-500 text-white"
                          : job.status === 1
                          ? "bg-green-500 text-white"
                          : job.status === -1
                          ? "bg-red-500 text-white"
                          : job.status === 2
                          ? "bg-gray-500 text-white"
                          : ""
                      }`}
                    >
                      {job.status === 0
                        ? "Chưa duyệt"
                        : job.status === 1
                        ? "Đã duyệt"
                        : job.status === -1
                        ? "Không duyệt"
                        : job.status === 2
                        ? "Công việc đã hết hạn"
                        : ""}
                    </span>
                  </td>

                  <td className="py-2 px-4 font-bold">
                    <Link
                      href={`/employer/jobs/${job.jobId}/applies`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.title}
                    </Link>
                    <br />
                    <p className="font-normal">
                      {job.postingDate} - {job.expirationDate}
                    </p>
                  </td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 px-4">{job.views}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/employer/jobs/${job.jobId}/edit`}
                      className="text-blue-500 hover:underline"
                    >
                      Sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
