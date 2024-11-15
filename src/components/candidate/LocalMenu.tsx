import { useState } from "react";
import { AiFillHome } from "react-icons/ai"; // Home icon từ Ant Design
import { MdDescription } from "react-icons/md"; // Document icon từ Material Design
import { RiBookmarkFill } from "react-icons/ri"; // Bookmark icon từ Remix Icons
import { AiOutlineCheckCircle } from "react-icons/ai"; // CheckCircle icon từ Ant Design
import { AiOutlineBell } from "react-icons/ai"; // Bell icon từ Ant Design
import { AiOutlineUser } from "react-icons/ai"; // User icon từ Ant Design
import Link from "next/link";

export default function LocalMenu() {
  const [activeTab, setActiveTab] = useState("home"); // State để lưu tab đang hoạt động

  return (
    <>
      <div className="mb-4 border-b border-gray-100 dark:border-gray-600 bg-gray-100">
        <ul className="text-xs flex flex-wrap justify-center -mb-px text-sm font-medium text-center">
          <li>
            <Link href="/candidate">
              <button
                className={`text-black hover:text-blue-700 inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "home" ? "border-blue-500" : "border-transparent"
                }`}
                type="button"
                onClick={() => setActiveTab("home")} // Cập nhật state khi nhấn
              >
                <AiFillHome className="h-5 w-5 inline-block mr-2" />
                My CareerStreet
              </button>
            </Link>
          </li>
          <li className="me-2 border-r border-gray-300 dark:border-gray-600">
            <Link href="/candidate/cvs">
              <button
                className={`text-black hover:text-blue-700 inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "cvs" ? "border-blue-500" : "border-transparent"
                }`}
                type="button"
                onClick={() => setActiveTab("cvs")}
              >
                <MdDescription className="h-5 w-5 inline-block mr-2" />
                Hồ sơ xin việc
              </button>
            </Link>
          </li>
          <li className="me-2 border-r border-gray-300 dark:border-gray-600">
            <Link href="/candidate/saved">
              <button
                className={`text-black hover:text-blue-700 inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "saved" ? "border-blue-500" : "border-transparent"
                }`}
                type="button"
                onClick={() => setActiveTab("saved")}
              >
                <RiBookmarkFill className="h-5 w-5 inline-block mr-2" />
                Việc đã lưu
              </button>
            </Link>
          </li>
          <li className="me-2 border-r border-gray-300 dark:border-gray-600">
            <Link href="/candidate/applied">
              <button
                className={`text-black hover:text-blue-700 inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "applied" ? "border-blue-500" : "border-transparent"
                }`}
                type="button"
                onClick={() => setActiveTab("applied")}
              >
                <AiOutlineCheckCircle className="h-5 w-5 inline-block mr-2" />
                Việc đã ứng tuyển
              </button>
            </Link>
          </li>
          <li className="me-2 border-r border-gray-300 dark:border-gray-600">
            <Link href="/candidate/notifications">
              <button
                className={`text-black hover:text-blue-700 inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "notifications" ? "border-blue-500" : "border-transparent"
                }`}
                type="button"
                onClick={() => setActiveTab("notifications")}
              >
                <AiOutlineBell className="h-5 w-5 inline-block mr-2" />
                Thông báo việc làm
              </button>
            </Link>
          </li>
          <li>
            <Link href="/candidate/account">
              <button
                className={`text-black hover:text-blue-700 inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "account" ? "border-blue-500" : "border-transparent"
                }`}
                type="button"
                onClick={() => setActiveTab("account")}
              >
                <AiOutlineUser className="h-5 w-5 inline-block mr-2" />
                Tài khoản
              </button>
            </Link>
          </li>
        </ul>
      </div>
      {/* Phần nội dung của tab */}
      <div id="default-styled-tab-content">{/* Nội dung cho từng tab */}</div>
    </>
  );
}
