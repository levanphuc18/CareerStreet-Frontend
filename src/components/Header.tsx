"use client";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next"; // Import hàm deleteCookie
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.png";
import icon from "/public/images/icon.jpg";
import {
  MdExpandMore,
  MdChevronRight,
  MdKeyboardArrowDown,
} from "react-icons/md"; // Import biểu tượng từ react-icons

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Tạo state cho username

  useEffect(() => {
    // Lấy cookie 'username' và 'sessionToken'
    const user = getCookie("username");
    const sessionToken = getCookie("sessionToken");

    if (user && sessionToken) {
      setUsername(user); // Lưu username vào state
      setIsLoggedIn(true); // Đánh dấu đã đăng nhập
    }
  }, []);

  // Hàm xử lý logout
  const handleLogout = () => {
    deleteCookie("username"); // Xóa cookie
    deleteCookie("userId"); // Xóa cookie
    deleteCookie("sessionToken"); // Xóa cookie
    setIsLoggedIn(false);
    window.location.href = "/"; // Chuyển hướng về trang chủ
  };

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
                  <MdExpandMore className="ml-2 w-4 h-4" />{" "}
                  {/* Sử dụng biểu tượng mới */}
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
                      <MdChevronRight className="ml-12 w-4 h-4" />{" "}
                      {/* Sử dụng biểu tượng mới */}
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
                      <MdChevronRight className="ml-12 w-4 h-4" />{" "}
                      {/* Sử dụng biểu tượng mới */}
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

              {/* <li className="relative group">
                <Link
                  className="text-xs text-gray-800 hover:text-blue-600 transition-colors duration-300"
                  href="#"
                >
                  Công ty
                </Link>
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </li> */}

              <li className="relative group">
                <Link
                  className="text-xs text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center"
                  href="#"
                >
                  Blog IT
                  <MdExpandMore className="ml-2 w-4 h-4" />{" "}
                  {/* Sử dụng biểu tượng mới */}
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
          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition duration-300 px-4 py-2 rounded-full"
              >
                Đăng Nhập/Đăng ký
              </Link>

            </div>
          ) : (
            /* Giao diện khi người dùng đã đăng nhập */
            <div className="relative group z-50">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                  src={icon}
                  alt="Profile Icon"
                />
                <span className="text-xs font-semibold text-gray-800">
                  {username}
                </span>
                <MdKeyboardArrowDown className="ml-2 w-4 h-4" />
              </div>

              {/* Menu tùy chọn */}
              <ul className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-10">
                <li>
                  <Link
                    className="text-xs block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200 rounded-t-lg"
                    href="/candidate"
                  >
                    CarrerStreet
                  </Link>
                </li>
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
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
