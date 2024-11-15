"use client";

import Image from "next/image";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import icon from "/public/images/icon.jpg"; // Cập nhật đường dẫn tới ảnh đại diện của người dùng
import Link from "next/link";
import { deleteCookie } from "cookies-next";

export default function Header() {
  // Hàm xử lý logout
  const handleLogout = () => {
    deleteCookie("username"); // Xóa cookie
    deleteCookie("userId"); // Xóa cookie
    deleteCookie("sessionToken"); // Xóa cookie
    window.location.href = "/"; // Chuyển hướng về trang chủ
  };

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 p-4">
      <div className="flex items-center px-4">
        <button className="text-gray-500 focus:outline-none focus:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <input
          className="mx-4 w-full border rounded-md px-4 py-2"
          type="text"
          placeholder="Tìm kiếm"
        />
      </div>

      <div className="relative group z-50">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            src={icon}
            alt="Profile Icon"
          />
          <span className="text-xs font-semibold text-gray-800">Phuc</span>
          <ChevronDownIcon className="ml-2 w-4 h-4" />
        </div>

        {/* Menu tùy chọn */}
        <ul className="text-xs absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-10">
          <li>
            <Link
              className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
              href="#"
            >
              Tài khoản
            </Link>
          </li>

          {/* Đường gạch ngang phân cách */}
          <hr className="border-gray-200 my-2" />

          <li>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
