"use client";
import { useAccountContext } from "@/app/context/AccountContext";
import React, { useEffect, useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import authApiRequest from "@/app/apiRequest/auth";  // Thêm import API nếu chưa có

export default function EmployerManagementPage({
  sessionToken,
}: {
  sessionToken: string;
}) {
  const { getAccountsListByRoleId, accountsList, setAccountsList } = useAccountContext();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterStatus, setFilterStatus] = useState("Tất cả"); 
  const [roleId] = useState(2); 

  useEffect(() => {
    if (roleId && sessionToken) {
      getAccountsListByRoleId(roleId, sessionToken); 
    }
  }, [roleId, sessionToken, getAccountsListByRoleId]);

  const employers = accountsList[roleId] || [];

  const filteredEmployers = employers.filter((employer) => {
    const matchesSearchTerm =
      employer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilterStatus =
      filterStatus === "Tất cả" ||
      (filterStatus === "Hoạt động" && employer.active === true) ||
      (filterStatus === "Bị khóa" && employer.active !== true);

    return matchesSearchTerm && matchesFilterStatus;
  });

  const handleUpdateIsActive = async (username: string, isActive: boolean) => {
    if (!sessionToken) {
      console.error("Session token không tồn tại hoặc không hợp lệ.");
      return;
    }

    try {
      await authApiRequest.updateIsActive(username, isActive, sessionToken);
      
      const updatedEmployers = employers.map((employer) =>
        employer.username === username
          ? { ...employer, active: isActive }
          : employer
      );

      const updatedAccountsList = { ...accountsList, [roleId]: updatedEmployers };
      setAccountsList(updatedAccountsList);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
    }
  };

  return (
    <div className="flex bg-gray-200">
      <div className="container mx-auto p-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-semibold">
            Quản lý nhà tuyển dụng ({filteredEmployers.length})
          </h1>
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
              <th className="py-4 px-6 text-left">Tên tài khoản</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left w-40">Trạng thái</th>
              <th className="py-4 px-6 text-left w-40">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployers.map((employer) => (
              <tr
                key={employer.username}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-4 px-6 font-semibold">{employer.username}</td>
                <td className="py-4 px-6">{employer.email}</td>

                <td className="py-4 px-6 w-40">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      employer.active === true
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {employer.active === true ? "Hoạt động" : "Bị khóa"}
                  </span>
                </td>
                <td className="py-4 px-6 w-40">
                  <button
                    className={`flex items-center px-3 py-1 rounded-lg text-white transition-colors ${
                      employer.active === true
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() =>
                      handleUpdateIsActive(employer.username, !employer.active)
                    }
                  >
                    {employer.active === true ? (
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