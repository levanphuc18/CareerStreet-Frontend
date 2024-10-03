"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.png";
import icon from "/public/images/icon.jpg";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // Cập nhật đường dẫn import

export default function Header() {

  return (
    <header className="bg-slate-200 py-2 shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="w-12 h-auto cursor-pointer mr-4"
              src={logo}
              alt="Logo"
            />
          </Link>

          
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
                className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200 rounded-t-lg"
                href="/candidate/cvs"
              >
                Hồ sơ xin việc
              </Link>
            </li>
            <li>
              <Link
                className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
                href="/candidate/applied"
              >
                Việc đã ứng tuyển
              </Link>
            </li>
            <li>
              <Link
                className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
                href="candidate/saved"
              >
                Việc đã lưu
              </Link>
            </li>
            <li>
              <Link
                className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
                href="/candidate/account"
              >
                Tài khoản
              </Link>
            </li>

            {/* Đường gạch ngang phân cách */}
            <hr className="border-gray-200 my-2" />

            <li>
              <button className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200 w-full text-left rounded-b-lg">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
