"use client";
import React, { useState, useEffect } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useAccountContext } from "@/app/context/AccountContext";
import authApiRequest from "@/app/apiRequest/auth";

export default function CandidateManagementPage() {
  const [sessionToken, setSessionToken] = useState<string>("");

  // Lấy sessionToken từ cookies
  useEffect(() => {
    const cookies = document.cookie;
    const sessionTokenMatch = cookies.match(/sessionToken=([^;]+)/);
    if (sessionTokenMatch) {
      setSessionToken(sessionTokenMatch[1]);
    }
    console.log("sessionToken:", sessionTokenMatch ? sessionTokenMatch[1] : "Không có token");
  }, []); // Chạy 1 lần khi component mount

  const { getAccountsListByRoleId, accountsList, setAccountsList } = useAccountContext();

  const [searchTerm, setSearchTerm] = useState(""); // State cho từ khóa tìm kiếm
  const [filterStatus, setFilterStatus] = useState("Tất cả"); // State cho bộ lọc trạng thái
  const [roleId] = useState(3); // RoleId mặc định (có thể tùy chỉnh)

  useEffect(() => {
    console.log("roleId:", roleId);
    console.log("sessionToken:", sessionToken);
    if (roleId && sessionToken) {
      console.log("Gọi API để lấy danh sách tài khoản");
      getAccountsListByRoleId(roleId, sessionToken);
    }
  }, [roleId, sessionToken, getAccountsListByRoleId]);

  // Lấy danh sách tài khoản theo roleId từ context
  const candidates = accountsList[roleId] || [];

  // Hàm lọc ứng viên
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearchTerm =
      candidate.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilterStatus =
      filterStatus === "Tất cả" ||
      (filterStatus === "Hoạt động" && candidate.active === true) ||
      (filterStatus === "Bị khóa" && candidate.active !== true);

    return matchesSearchTerm && matchesFilterStatus;
  });

  const handleUpdateIsActive = async (username: string, isActive: boolean) => {
    // Kiểm tra sessionToken trước khi gọi API
    if (!sessionToken) {
      console.error("Session token không tồn tại hoặc không hợp lệ.");
      return; // Dừng hàm nếu sessionToken không hợp lệ
    }
  
    try {
      console.log("sessionToken:", sessionToken);
      // Gọi API để cập nhật trạng thái isActive
      await authApiRequest.updateIsActive(username, isActive, sessionToken);
      console.log("Cập nhật trạng thái thành công");
  
      // Cập nhật danh sách ứng viên trong state
      const updatedCandidates = candidates.map((candidate) =>
        candidate.username === username
          ? { ...candidate, active: isActive } // Cập nhật trạng thái của ứng viên
          : candidate
      );
  
      // Thay đổi state trong context hoặc local state
      const updatedAccountsList = { ...accountsList, [roleId]: updatedCandidates };
      setAccountsList(updatedAccountsList); // Thay hàm này bằng hàm cập nhật context nếu cần
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
    }
  };
  

  return (
    <div className="flex bg-gray-200">
      <div className="container mx-auto p-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-semibold">Quản lý ứng viên</h1>
        </div>
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-1/7"
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
              <th className="py-4 px-6 text-left">Tên tài khoản</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left w-40">Trạng thái</th>
              <th className="py-4 px-6 text-left w-40">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.username}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-4 px-6">{candidate.username}</td>
                  <td className="py-4 px-6">{candidate.email}</td>
                  <td className="py-4 px-6 w-40">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        candidate.active
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {candidate.active ? "Hoạt động" : "Bị khóa"}
                    </span>
                  </td>
                  <td className="py-4 px-6 w-40">
                    <button
                      className={`flex items-center px-3 py-1 rounded-lg text-white transition-colors ${
                        candidate.active
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      onClick={() =>
                        handleUpdateIsActive(
                          candidate.username,
                          !candidate.active
                        )
                      }
                    >
                      {candidate.active ? (
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
                  Không có ứng viên nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}