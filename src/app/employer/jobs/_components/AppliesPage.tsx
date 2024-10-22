"use client";
import React, { useState } from "react";

export default function AppliesPage() {
  // Dữ liệu chi tiết công việc mẫu
  const jobDetails = {
    jobName: "Thực tập sinh phát triển phần mềm", // Tên công việc mẫu
    totalApplicants: 5, // Tổng số ứng viên
    totalViews: 150, // Tổng số lượt xem
    postDate: "14/10/2024", // Ngày đăng công việc
  };

  // Dữ liệu thư xin việc mẫu
  const [receivedApplications, setReceivedApplications] = useState([
    {
      receivedAt: "14/10/2024 10:00 AM",
      status: "Đang chờ xử lý",
      type: "Bản tạm",
      note: "Ứng viên chưa hoàn tất hồ sơ",
      message: "Xin chào, tôi rất quan tâm đến vị trí này.",
    },
    {
      receivedAt: "15/10/2024 02:00 PM",
      status: "Đã duyệt",
      type: "Chính thức",
      note: "Hồ sơ đầy đủ",
      message:
        "Tôi đã gửi đầy đủ hồ sơ, mong sớm nhận phản hồi từ quý công ty.",
    },
    {
      receivedAt: "16/10/2024 09:30 AM",
      status: "Bị từ chối",
      type: "Chính thức",
      note: "Không phù hợp yêu cầu",
      message: "Xin lỗi, tôi không phù hợp với vị trí này.",
    },
  ]);

  // Danh sách các trạng thái
  const statusOptions = [
    { value: "thuviec", label: "Tất cả thư xin việc (0)" },
    { value: "chuaxem", label: "Chưa xem (0)" },
    { value: "daxem", label: "Đã xem (0)" },
    { value: "daduyet", label: "Đã duyệt (0)" },
    { value: "sapxepphongvan", label: "Sắp xếp phỏng vấn (0)" },
    { value: "damoiphongvan", label: "Đã mời phỏng vấn (0)" },
    { value: "damoinhan", label: "Đã mời nhận việc (0)" },
    { value: "tuchoi", label: "Từ chối (0)" },
  ];

  const applicationOptions = [
    { value: "thuviec", label: "Tất cả thư xin việc (0)" },
    { value: "chuaxem", label: "Chưa xem (0)" },
    { value: "daxem", label: "Đã xem (0)" },
    { value: "daduyet", label: "Đã duyệt (0)" },
    { value: "sapxepphongvan", label: "Sắp xếp phỏng vấn (0)" },
    { value: "damoiphongvan", label: "Đã mời phỏng vấn (0)" },
    { value: "damoinhan", label: "Đã mời nhận việc (0)" },
    { value: "tuchoi", label: "Từ chối (0)" },
  ];

  const timeOptions = [
    { value: "1ngay", label: "Trong vòng 1 ngày" },
    { value: "3ngay", label: "Trong vòng 3 ngày" },
    { value: "7ngay", label: "Trong vòng 7 ngày" },
    { value: "15ngay", label: "Trong vòng 15 ngày" },
    { value: "1thang", label: "Trong vòng 1 tháng" },
  ];

  // Hàm cập nhật trạng thái
  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedApplications = [...receivedApplications];
    updatedApplications[index].status = newStatus;
    setReceivedApplications(updatedApplications);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Phần thông tin tổng quan */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Thư xin việc đã nhận
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 shadow-md p-2 rounded-md">
          <p className="font-semibold">Tổng số ứng viên:</p>
          <p>{jobDetails.totalApplicants}</p>
        </div>
        <div className="bg-green-100 shadow-md p-2 rounded-md">
          <p className="font-semibold">Tổng số lượt xem:</p>
          <p>{jobDetails.totalViews}</p>
        </div>
      </div>

      {/* Phần bảng hiển thị thông tin ứng viên */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Tiêu đề nằm cạnh nhau với option */}
        <div className="flex mb-4">
          <select className="border border-gray-300 rounded-md p-1 mr-2">
            {applicationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select className="border border-gray-300 rounded-md p-1">
            <option value="">Nhận trong vòng</option>
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {receivedApplications.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Nhận lúc</th>
                <th className="py-2 px-4 text-left">Loại</th>
                <th className="py-2 px-4 text-left">Ghi chú</th>
                <th className="py-2 px-4 text-left">Tin nhắn</th>
                <th className="py-2 px-4 text-left">Trạng thái</th>
                <th className="py-2 px-4 text-left">Thay đổi trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {receivedApplications.map((application, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{application.receivedAt}</td>
                  <td className="py-2 px-4">{application.type}</td>
                  <td className="py-2 px-4">{application.note}</td>
                  <td className="py-2 px-4">{application.message}</td>
                  <td className="py-2 px-4">{application.status}</td>
                  <td className="py-2 px-4">
                    <select
                      value={application.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">
            Chưa có đơn ứng tuyển nào phù hợp với trạng thái này
          </p>
        )}
      </div>
    </div>
  );
}
