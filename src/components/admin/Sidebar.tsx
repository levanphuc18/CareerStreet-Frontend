"use client";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isCandidatesDropdownOpen, setIsCandidatesDropdownOpen] =
    useState(false);

  const toggleJobsDropdown = () => {
    setIsJobsDropdownOpen(!isJobsDropdownOpen);
    setIsCandidatesDropdownOpen(false); // Đóng dropdown của My Candidates khi mở Jobs
  };

  const toggleCandidatesDropdown = () => {
    setIsCandidatesDropdownOpen(!isCandidatesDropdownOpen);
    setIsJobsDropdownOpen(false); // Đóng dropdown của Jobs khi mở My Candidates
  };

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 shadow-lg">
        <Link
          href="/admin/home"
          className="flex items-center justify-center h-16 bg-gray-900"
        >
          <span className="text-white font-bold uppercase">
            My CareerStreet
          </span>
        </Link>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            {/* Nhóm chức năng */}
            <h2 className="text-gray-400 px-4 text-center">Quản lý</h2>

            {/* Mục Jobs với dropdown */}
            <div>
              <button
                onClick={toggleJobsDropdown}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg w-full text-left"
              >
                <span>Quản lý người dùng</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-auto transition-transform ${
                    isJobsDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isJobsDropdownOpen && (
                <div className="pl-4">
                  <Link
                    href="/admin/candidate"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"
                  >
                    <span>Ứng viên</span>
                  </Link>
                  <Link
                    href="/admin/employer"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"
                  >
                    <span>Nhà tuyển dụng</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mục My Candidates với dropdown */}
            <div>
              <button
                onClick={toggleCandidatesDropdown}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg w-full text-left"
              >
                <span>Quản lý tin tuyển dụng</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-auto transition-transform ${
                    isCandidatesDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isCandidatesDropdownOpen && (
                <div className="pl-4">
                  <Link
                    href="/admin/jobs"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"
                  >
                    <span>Tin tuyển dụng</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"
            >
              <span>Blog</span>
            </Link>
          </nav>
          {/* Thông tin người dùng */}
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <span className="font-semibold text-gray-300">Avatar:</span>
            <div className="flex items-center mt-1">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="rounded-full"
              />
              <span className="ml-2 text-gray-200">CTTNHHMTV</span>
            </div>
            <div className="text-gray-400">levanphuc181101@gmail.com</div>
          </div>
        </div>
      </div>
    </>
  );
}
