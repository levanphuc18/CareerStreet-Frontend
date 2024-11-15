"use client";
import React, { useState } from "react";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";

export default function EmployerManagementPage() {
  const [employers, setEmployers] = useState([
    {
      id: 1,
      name: "Công ty A",
      email: "contact@congtya.com",
      phone: "0123 456 789",
      canPost: true,
      isAccountLocked: false,
    },
    {
      id: 2,
      name: "Công ty B",
      email: "contact@congtyb.com",
      phone: "0987 654 321",
      canPost: false,
      isAccountLocked: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCanPost, setFilterCanPost] = useState("Tất cả");
  const [filterAccountStatus, setFilterAccountStatus] = useState("Tất cả");

  const handleTogglePostPermission = (id: number) => {
    setEmployers((prevEmployers) =>
      prevEmployers.map((employer) =>
        employer.id === id
          ? { ...employer, canPost: !employer.canPost }
          : employer
      )
    );
  };

  const handleToggleAccountLock = (id: number) => {
    setEmployers((prevEmployers) =>
      prevEmployers.map((employer) =>
        employer.id === id
          ? { ...employer, isAccountLocked: !employer.isAccountLocked }
          : employer
      )
    );
  };

  const filteredEmployers = employers.filter((employer) => {
    const matchesSearchTerm =
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.phone.includes(searchTerm);

    const matchesFilterCanPost =
      filterCanPost === "Tất cả" ||
      (filterCanPost === "Có quyền" && employer.canPost) ||
      (filterCanPost === "Không có quyền" && !employer.canPost);

    const matchesFilterAccountStatus =
      filterAccountStatus === "Tất cả" ||
      (filterAccountStatus === "Đã khóa" && employer.isAccountLocked) ||
      (filterAccountStatus === "Chưa khóa" && !employer.isAccountLocked);

    return matchesSearchTerm && matchesFilterCanPost && matchesFilterAccountStatus;
  });

  return (
    <div className="flex bg-gray-200">
      <div className="container mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-semibold"> Quản lý nhà tuyển dụng ({filteredEmployers.length})</h1>
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
            value={filterCanPost}
            onChange={(e) => setFilterCanPost(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Có quyền">Có quyền đăng bài</option>
            <option value="Không có quyền">Không có quyền đăng bài</option>
          </select>

          <select
            value={filterAccountStatus}
            onChange={(e) => setFilterAccountStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đã khóa">Đã khóa</option>
            <option value="Chưa khóa">Chưa khóa</option>
          </select>
        </div>

        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-4 px-6 text-left">Tên nhà tuyển dụng</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Số điện thoại</th>
              <th className="py-4 px-6 text-left w-1/5">Quyền đăng bài</th>
              <th className="py-4 px-6 text-left w-1/5">Khóa tài khoản</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployers.map((employer) => (
              <tr
                key={employer.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-4 px-6 font-semibold">{employer.name}</td>
                <td className="py-4 px-6">{employer.email}</td>
                <td className="py-4 px-6">{employer.phone}</td>

                <td className="py-4 px-6 w-40">
                  <button
                    className={`flex items-center px-3 py-1 rounded-lg text-white transition-colors ${
                      employer.canPost
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleTogglePostPermission(employer.id)}
                  >
                    <span className="mr-2">
                      {employer.canPost
                        ? "Khóa quyền đăng bài"
                        : "Mở quyền đăng bài"}
                    </span>
                    {employer.canPost ? <HiLockClosed /> : <HiLockOpen />}
                  </button>
                </td>

                <td className="py-4 px-6 w-40">
                  <button
                    className={`flex items-center px-3 py-1 rounded-lg text-white transition-colors ${
                      employer.isAccountLocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() => handleToggleAccountLock(employer.id)}
                  >
                    <span className="mr-2">
                      {employer.isAccountLocked
                        ? "Mở khóa tài khoản"
                        : "Khóa tài khoản"}
                    </span>
                    {employer.isAccountLocked ? <HiLockOpen /> : <HiLockClosed />}
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
