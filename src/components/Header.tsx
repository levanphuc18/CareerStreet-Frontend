"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.png";
import icon from "/public/images/icon.jpg";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  return (
    <header className="bg-slate-200 py-2 shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="flex items-center">
          <Link href="/">
          <Image className="w-12 h-auto cursor-pointer" src={logo} alt="Logo" />

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
                        <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Junior 1</Link>
                      </li>
                      <li>
                        <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Mid-Level 1</Link>
                      </li>
                      <li>
                        <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Senior 1</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="relative group">
                    <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center" href="#">
                      Theo kỹ năng
                      <ChevronRightIcon className="ml-12 w-4 h-4" />
                    </Link>
                    {/* Submenu */}
                    <ul className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-1 transition-all duration-300 z-10">
                      <li>
                        <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Junior 2</Link>
                      </li>
                      <li>
                        <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Mid-Level 2</Link>
                      </li>
                      <li>
                        <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Senior 2</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="relative group">
                <Link className="text-xs text-gray-800 hover:text-blue-600 transition-colors duration-300" href="#">Công ty</Link>
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </li>

              <li className="relative group">
                <Link className="text-xs text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center" href="#">
                  Blog IT
                  <ChevronDownIcon className="ml-2 w-4 h-4" />
                </Link>
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                {/* Dropdown Menu */}
                <ul className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1 transition-all duration-300 z-10">
                  <li>
                    <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Công nghệ thông tin</Link>
                  </li>
                  <li>
                    <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Trí tuệ nhân tạo</Link>
                  </li>
                  <li>
                    <Link className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200" href="#">Phần mềm</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative group z-50">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative inline-block mr-3">
              {/* Dropdown toggle button */}
              <button
                onClick={toggleDropdown}
                className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
              >
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div
                  onClick={closeDropdown}
                  className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80 dark:bg-gray-800"
                >
                  <div className="py-2">
                    {/* Các mục trong dropdown */}
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                      <img
                        className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                        alt="avatar"
                      />
                      <p className="mx-2 text-sm text-gray-600 dark:text-white">
                        <span className="text-xs font-bold">Sara Salah</span> replied on
                        the{" "}
                        <span className="text-xs text-blue-500 hover:underline">
                          Upload Image
                        </span>{" "}
                        article . 2m
                      </p>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                      <img
                        className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        alt="avatar"
                      />
                      <p className="mx-2 text-sm text-gray-600 dark:text-white">
                        <span className="text-xs font-bold">Slick Net</span> start
                        following you . 45m
                      </p>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                    >
                      <img
                        className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                        src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                        alt="avatar"
                      />
                      <p className="mx-2 text-sm text-gray-600 dark:text-white">
                        <span className="text-xs font-bold">Jane Doe</span> Like Your
                        reply on{" "}
                        <span className="text-xs text-blue-500 hover:underline">
                          Test with TDD
                        </span>{" "}
                        article . 1h
                      </p>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img
                        className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                        alt="avatar"
                      />
                      <p className="mx-2 text-sm text-gray-600 dark:text-white">
                        <span className="text-xs font-bold">Abigail Bennett</span> start
                        following you . 3h
                      </p>
                    </a>
                  </div>
                  <a
                    href="#"
                    className="text-xs block py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline"
                  >
                    See all notifications
                  </a>
                </div>
              )}
            </div>

            <Image
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              src={icon}
              alt="Profile Icon"
            />
            <span className="text-xs font-semibold text-gray-800">Phuc</span>
            <ChevronDownIcon className="ml-2 w-4 h-4" />
          </div>

          {/* Menu tùy chọn */}
          <ul className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-10">
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
