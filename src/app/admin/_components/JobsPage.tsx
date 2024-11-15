"use client";
import jobApiRequest from "@/app/apiRequest/job";
import { useJobContext } from "@/app/context/JobContext";
import React, { useState } from "react";
import {
  FaCheck,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function JobPostsManagementPage() {
  const { allJobListContext, setAllJobList } = useJobContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(3); // mặc định 3 là xem tất cả
  const [filterTimeframe, setFilterTimeframe] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const renderStatusIcon = (status: number) => {
    switch (status) {
      case 1:
        return <FaCheck className="text-green-600 mr-2" />;
      case -1:
        return <FaTimesCircle className="text-red-600 mr-2" />;
      case 2:
        return <FaExclamationTriangle className="text-gray-600 mr-2" />;
      default:
        return <FaClock className="text-yellow-600 mr-2" />;
    }
  };

  const filteredJobPosts = allJobListContext
    ? allJobListContext
        .filter((post) => {
          const matchesSearchTerm =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.companyName.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesFilterStatus =
            filterStatus === 3 ? true : post.status === filterStatus;

          const matchesTimeframe = () => {
            const postingDate = new Date(post.postingDate);
            const today = new Date();

            switch (filterTimeframe) {
              case "1":
                return (
                  postingDate >= new Date(today.setDate(today.getDate() - 1))
                );
              case "3":
                return (
                  postingDate >= new Date(today.setDate(today.getDate() - 3))
                );
              case "5":
                return (
                  postingDate >= new Date(today.setDate(today.getDate() - 5))
                );
              case "7":
                return (
                  postingDate >= new Date(today.setDate(today.getDate() - 7))
                );
              case "15":
                return (
                  postingDate >= new Date(today.setDate(today.getDate() - 15))
                );
              case "1 tháng":
                return (
                  postingDate >= new Date(today.setMonth(today.getMonth() - 1))
                );
              default:
                return true;
            }
          };

          return matchesSearchTerm && matchesFilterStatus && matchesTimeframe();
        })
        .sort((a, b) => {
          const dateA = new Date(a.postingDate);
          const dateB = new Date(b.postingDate);
          return sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        })
    : [];

  const handleStatusChange = async (id: number, newStatus: number) => {
    try {
      await jobApiRequest.updateJobStatus(id, newStatus);

      if (allJobListContext && setAllJobList) {
        const updatedJobPosts = allJobListContext.map((post) =>
          post.jobId === id ? { ...post, status: newStatus } : post
        );
        setAllJobList(updatedJobPosts);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex-grow h-screen overflow-y-auto hide-scrollbar text-xs p-0">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-semibold">
          Quản lý các bài đăng công việc
        </h1>
        <p className="text-lg mt-2">
          Kiểm tra và duyệt các bài đăng từ nhà tuyển dụng
        </p>
      </div>

      <div className="container mx-auto overflow-hidden">
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm công việc hoặc nhà tuyển dụng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-1/4"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value={3}>Xem tất cả</option>
            <option value={0}>Đang chờ duyệt</option>
            <option value={1}>Đã duyệt</option>
            <option value={-1}>Bị từ chối</option>
            <option value={2}>Công việc đã hết hạn</option>
          </select>
          <select
            value={filterTimeframe}
            onChange={(e) => setFilterTimeframe(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="all">Tất cả thời gian</option>
            <option value="1">Trong 1 ngày</option>
            <option value="3">Trong 3 ngày</option>
            <option value="5">Trong 5 ngày</option>
            <option value="7">Trong 7 ngày</option>
            <option value="15">Trong 15 ngày</option>
            <option value="1 tháng">Trong 1 tháng</option>
          </select>
        </div>

        <div className="overflow-y-auto hide-scrollbar max-h-[calc(100vh-200px)]">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-fixed">
              <thead>
                <tr className="bg-blue-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left w-1/3">Tên công việc</th>
                  <th className="py-3 px-4 text-left w-1/4">Nhà tuyển dụng</th>
                  <th
                    className="py-3 px-4 text-left w-1/6 cursor-pointer"
                    onClick={toggleSortOrder}
                  >
                    Ngày đăng {sortOrder === "asc" ? "↑" : "↓"}
                  </th>
                  <th className="py-3 px-4 text-left w-1/5">Trạng thái</th>
                  <th className="py-3 px-4 text-left w-1/6">Duyệt bài</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobPosts.map((post) => (
                  <tr key={post.jobId} className="border-b hover:bg-blue-50">
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {post.title}
                    </td>
                    <td className="py-3 px-4">{post.companyName}</td>
                    <td className="py-3 px-4">{post.postingDate}</td>
                    <td className="py-3 px-4 flex items-center">
                      {renderStatusIcon(post.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          post.status === 1
                            ? "bg-green-200 text-green-800"
                            : post.status === -1
                            ? "bg-red-200 text-red-800"
                            : post.status === 2
                            ? "bg-gray-200 text-gray-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {post.status === 1
                          ? "Đã duyệt"
                          : post.status === -1
                          ? "Bị từ chối"
                          : post.status === 2
                          ? "Công việc đã hết hạn"
                          : "Đang chờ duyệt"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {/* Nếu công việc đã hết hạn, không cho phép thay đổi trạng thái */}
                      <select
                        value={post.status === 2 ? 2 : post.status} // Nếu trạng thái là hết hạn, không cho phép thay đổi
                        onChange={
                          (e) =>
                            post.status !== 2 &&
                            handleStatusChange(
                              post.jobId,
                              Number(e.target.value)
                            ) // Nếu không phải hết hạn, cho phép thay đổi trạng thái
                        }
                        className="border border-gray-300 rounded-md p-2"
                        disabled={post.status === 2 || post.status === 1 || post.status === -1} // Vô hiệu hóa nếu công việc đã hết hạn
                      >
                        <option value={1}>Đã duyệt</option>
                        <option value={0}>Đang chờ duyệt</option>
                        <option value={-1}>Bị từ chối</option>
                        {/* Không cho phép chọn hết hạn */}
                        {/* <option value={2}>Công việc đã hết hạn</option> */}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
