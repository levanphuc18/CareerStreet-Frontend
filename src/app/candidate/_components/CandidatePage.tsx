import Link from "next/link";

export default function CandidatePage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Thêm div này để căn giữa hai cột */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-6"> {/* Thêm ml-6 ở đây */}
          {/* Cột công việc */}
          <div className="text-xs bg-white shadow-xl shadow-gray-100 w-full sm:w-1/3 flex flex-col gap-4 p-6 rounded-md"> {/* Thay max-w-xs bằng sm:w-1/3 */}
            {/* Phần Thông tin tài khoản */}
            <div className="mb-6 border border-gray-300 rounded-lg p-4 flex flex-col h-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {/* Avatar */}
                  <img
                    src="/images/logo.png" // Thay đường dẫn ảnh đại diện
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-2">
                    {" "} {/* Giảm khoảng cách bên trái */}
                    <h2 className="font-bold text-lg">Lê Phúc</h2>
                    <span className="text-xs text-gray-500">
                      levanphuc181101@gmail.com
                    </span>
                    <p className="text-xs text-gray-500">
                      Register Date 2024-08-23
                    </p>
                  </div>
                </div>
              </div>
              {/* Icon sửa và nút Sign out */}
              <div className="flex justify-end mt-2">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <span className="mr-2 text-sm">Sign out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Phần My Resumes */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">My resumes</h3>
                <Link
                  href="/candidate/cvs"
                  className="ml-2 text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                <Link
                  href="/candidate/cvs/1" // Đường dẫn tới file PDF
                  className="text-black hover:text-blue-700"
                  target="_blank" // Mở file PDF trong tab mới
                >
                  <span className="text-xs">CV-LEVANPHUC-JAVA-BACKEND.pdf</span>
                </Link>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Last updated 26-09-2024
              </div>
              <div className="flex justify-center">
                <button className="mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100">
                  Create new
                </button>
              </div>
            </div>
          </div>

          {/* Cột danh sách công việc đề xuất */}
          <div className="flex-grow p-4 max-w-xl sm:w-2/3"> {/* Thay đổi chiều rộng cho cột danh sách công việc */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-purple-100 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-gray-500">Viewed by Employers</div>
              </div>
              <div className="bg-yellow-100 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-gray-500">Việc đã lưu</div>
              </div>
              <div className="bg-red-200 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-gray-500">Việc đã ứng tuyển</div>
              </div>
              <div className="bg-green-200 shadow rounded p-4 text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-gray-500">Test Assignments</div>
              </div>
            </div>

            <div className="bg-white shadow rounded mb-4">
              <div className="border-b p-4 flex justify-between items-center">
                <div className="font-bold">Công việc đã nộp gần đây</div>
                <Link
                  href="/candidate/applied"
                  className="text-blue-500 text-xs hover:underline"
                >
                  Xem tất cả CV đã nộp
                </Link>
              </div>
              <div className="p-4">
                <Link
                  href="/jobs/123"
                  className="bg-gray-100 p-4 rounded mb-4 flex justify-between items-center block hover:bg-gray-200 transition"
                >
                  <div>
                    <div className="text-l font-bold">THỰC TẬP SINH IT</div>
                    <div className="text-gray-500 text-xs">
                      Công Ty Cổ Phần MEDSI
                    </div>
                    <div className="text-gray-500 text-xs">
                      Hết hạn: 1 ngày trước
                    </div>
                    <div className="text-gray-500 text-xs">
                      Ngày nộp: 2024-08-28
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="bg-green-500 text-xs text-white rounded px-2 py-1">
                      Đã Nộp
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white shadow rounded">
              <div className="border-b p-4 font-bold">Recommended jobs</div>
              <div>
                <Link href="/jobs/123" className="border-b p-4 block">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-l font-bold">
                        HÀ NỘI NHÂN VIÊN TESTER
                      </div>
                      <div className="text-gray-500 text-xs">
                        CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ ĐIỆN TỬ BÌNH AN
                      </div>
                      <div className="text-gray-500 text-xs">
                        {" "} 40,000,000 VND - 40,000,000 VND
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                        ❤️
                      </span>
                    </div>
                  </div>
                </Link>

                <Link href="/jobs/123" className="border-b p-4 block">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-l font-bold">
                        Training Manager (Net Upto 40M ++)
                      </div>
                      <div className="text-gray-500 text-xs">
                        Tập Đoàn Giáo Dục Quốc Tế
                      </div>
                      <div className="text-gray-500 text-xs">
                        {" "} 20,000,000 VND - 40,000,000 VND
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                        ❤️
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
