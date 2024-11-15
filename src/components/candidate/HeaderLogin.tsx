"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.png";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export default function Header() {

  return (
    <header className="bg-slate-200 py-2 shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="w-12 h-auto cursor-pointer"
              src={logo}
              alt="Logo"
            />
          </Link>

          <div className="nav-links duration-500 md:static absolute bg-slate-200 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-4 p-4 border-t border-gray-200 md:border-t-0 md:space-x-4 space-y-4 md:space-y-0 z-50">
              {/* Các menu item */}
              <li className="relative group">
                <Link
                  className="text-gray-800 text-xs hover:text-blue-600 transition-colors duration-300 flex items-center"
                  href="#"
                >
                  Việc làm IT
                  <ChevronDownIcon className="ml-2 w-4 h-4" />
                </Link>
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>

                {/* Dropdown Menu */}
                <ul className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1 transition-all duration-300 z-10">
                  <li className="relative group">
                    <Link
                      className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                      href="#"
                    >
                      Theo cấp bậc
                      <ChevronRightIcon className="ml-12 w-4 h-4" />
                    </Link>
                    {/* Submenu */}
                    <ul className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-1 transition-all duration-300 z-10">
                      <li>
                        <Link
                          className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Junior 1
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Mid-Level 1
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Senior 1
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="relative group">
                    <Link
                      className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                      href="#"
                    >
                      Theo kỹ năng
                      <ChevronRightIcon className="ml-12 w-4 h-4" />
                    </Link>
                    {/* Submenu */}
                    <ul className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-1 transition-all duration-300 z-10">
                      <li>
                        <Link
                          className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Junior 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Mid-Level 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Senior 2
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="relative group">
                <Link
                  className="text-xs text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center"
                  href="#"
                >
                  Blog IT
                  <ChevronDownIcon className="ml-2 w-4 h-4" />
                </Link>
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                {/* Dropdown Menu */}
                <ul className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1 transition-all duration-300 z-10">
                  <li>
                    <Link
                      className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      href="#"
                    >
                      Công nghệ thông tin
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      href="#"
                    >
                      Trí tuệ nhân tạo
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      href="#"
                    >
                      Phần mềm
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* kiểm tra đăng nhập */}
        <div className="text-xs">
          {/* Giao diện khi người dùng chưa đăng nhập */}
        </div>
      </nav>
    </header>
  );
}
