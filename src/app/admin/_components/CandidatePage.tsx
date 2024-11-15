"use client";
import React, { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";

export default function CandidateManagementPage() {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      phone: "0987654321",
      status: "Bị khóa",
    },
    // Thêm nhiều ứng viên hơn
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // State cho từ khóa tìm kiếm
  const [filterStatus, setFilterStatus] = useState("Tất cả"); // State cho bộ lọc trạng thái

  const handleToggleAccountStatus = (id: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              status: candidate.status === "Hoạt động" ? "Bị khóa" : "Hoạt động",
            }
          : candidate
      )
    );
  };

  // Hàm lọc ứng viên
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearchTerm =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone.includes(searchTerm);
    
    const matchesFilterStatus =
      filterStatus === "Tất cả" ||
      candidate.status === filterStatus;

    return matchesSearchTerm && matchesFilterStatus;
  });

  return (
    <div className="flex bg-gray-200">
      <div className="container mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-semibold"> Quản lý ứng viên ({filteredCandidates.length})</h1>
      </div>

        <div className="mb-4 flex space-x-2"> {/* Chỉnh sửa space-x thành space-x-2 */}
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-1/7" // Giảm kích thước
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Bị khóa">Bị khóa</option>
          </select>
        </div>

        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-4 px-6 text-left">Tên ứng viên</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Số điện thoại</th>
              <th className="py-4 px-6 text-left w-40">Trạng thái</th>
              <th className="py-4 px-6 text-left w-40">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="border-b hover:bg-gray-100 transition-colors">
                <td className="py-4 px-6 font-semibold">{candidate.name}</td>
                <td className="py-4 px-6">{candidate.email}</td>
                <td className="py-4 px-6">{candidate.phone}</td>
                <td className="py-4 px-6 w-40">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      candidate.status === "Hoạt động"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td className="py-4 px-6 w-40">
                  <button
                    className={`flex items-center px-3 py-1 rounded-lg text-white transition-colors ${
                      candidate.status === "Hoạt động"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleToggleAccountStatus(candidate.id)}
                  >
                    {candidate.status === "Hoạt động" ? (
                      <>
                        <FaLock className="mr-1" />
                        Khóa
                      </>
                    ) : (
                      <>
                        <FaUnlock className="mr-1" />
                        Mở khóa
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
