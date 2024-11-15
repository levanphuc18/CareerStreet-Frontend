"use client";
import Link from "next/link";
import { GiBriefcase, GiPaperClip } from "react-icons/gi"; // Cập nhật import các biểu tượng

export default function HomePage() {
  // Dữ liệu mẫu
  const recentApplications = [
    {
      id: 1,
      receivedAt: "2024-10-10",
      status: "Đã xem",
      job: "Lập trình viên Frontend",
      message: "Cảm ơn bạn đã ứng tuyển!",
    },
    {
      id: 2,
      receivedAt: "2024-10-11",
      status: "Chưa xem",
      job: "Nhà thiết kế UX/UI",
      message: "Chúng tôi sẽ liên hệ sớm!",
    },
  ];

  const activeJobs = [
    {
      id: 1,
      status: "Đang hoạt động",
      job: "Lập trình viên Backend",
      applications: 4,
      views: 20,
      display: "Công khai",
    },
    {
      id: 2,
      status: "Ngừng hoạt động",
      job: "Chuyên viên Marketing",
      applications: 2,
      views: 15,
      display: "Riêng tư",
    },
  ];
  // dữ liệu mẫu
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Nội dung chính */}
        <div className="flex flex-col flex-1 flex flex-col flex-1 overflow-y-auto hide-scrollbar">
          
          {/* Nội dung chính */}
          <div className="p-4">
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Bảng thông tin tài khoản */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-semibold p-4 border-b">
                  Thông tin nhà tuyển dụng
                </h2>
                <div className="flex items-center p-4">
                  <img
                    alt="Your Company"
                    src="/images/logo.png"
                    className="h-25 w-auto mr-4" // Thêm khoảng cách bên phải của ảnh
                  />
                  <div>
                    <p className="font-bold">NTD</p>
                    <p>
                      Email:{" "}
                      <span className="text-gray-600">
                        levanphuc@gmail.com
                      </span>
                    </p>
                    <p>
                      Ngày đăng ký:{" "}
                      <span className="text-gray-600">23 Aug, 2024</span>
                    </p>
                    <p>
                      Trạng thái:{" "}
                      <span className="text-gray-600">No action</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bảng số liệu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-100 shadow-md rounded-lg p-4 text-center">
                  <GiBriefcase className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="font-bold">Công việc đang hoạt động:</p>
                  <p className="text-3xl">0</p>
                </div>
                <div className="bg-blue-100 shadow-md rounded-lg p-4 text-center">
                  <GiPaperClip className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="font-bold">Công việc chưa được kích hoạt:</p>
                  <p className="text-3xl">0</p>
                </div>
                <div className="bg-yellow-100 shadow-md rounded-lg p-4 text-center">
                  <GiPaperClip className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                  <p className="font-bold">Số đơn ứng tuyển:</p>
                  <p className="text-3xl">0</p>
                </div>
                <div className="bg-red-100 shadow-md rounded-lg p-4 text-center">
                  <GiPaperClip className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <p className="font-bold">Ứng viên đã lưu:</p>
                  <p className="text-3xl">0</p>
                </div>
              </div>
            </div>
            {/* Bảng Đơn ứng tuyển gần đây */}
            <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Đơn ứng tuyển gần đây</h2>
                {/* Nút lọc */}
                <div className="flex space-x-2">
                  <Link href="jobs/1/applies" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Tất cả
                  </Link>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Chưa xem
                  </button>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đơn ứng tuyển
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nhận lúc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Công việc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tin nhắn
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentApplications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4">{`Đơn #${application.id}`}</td>
                        <td className="px-6 py-4">{application.receivedAt}</td>
                        <td className="px-6 py-4">{application.status}</td>
                        <td className="px-6 py-4">{application.job}</td>
                        <td className="px-6 py-4">{application.message}</td>
                      </tr>
                    ))}
                    {recentApplications.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          Bạn không có thư xin việc nào phù hợp
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bảng Công việc đang kích hoạt */}
            <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">
                  Công việc đã kích hoạt
                </h2>
                {/* Nút lọc */}
                <div className="flex space-x-2">
                <Link href="jobs" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Xem tất cả
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Công việc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đơn ứng tuyển
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lượt xem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cách hiển thị
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Làm mới
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeJobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4">{job.status}</td>
                        <td className="px-6 py-4">{job.job}</td>
                        <td className="px-6 py-4">{job.applications}</td>
                        <td className="px-6 py-4">{job.views}</td>
                        <td className="px-6 py-4">{job.display}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-500 hover:text-blue-700">
                            Làm mới
                          </button>
                        </td>
                      </tr>
                    ))}
                    {activeJobs.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          Không có công việc nào đang được kích hoạt
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bảng */}
          </div>
        </div>
      </div>
    </>
  );
}
