"use client"
import { useState, useEffect } from "react";
import { ApplyListResType, getStatusLabel } from "@/app/schemaValidations/apply.schema";
import applyApiRequest from "@/app/apiRequest/apply";

export default function AppliesPage({ applyList }: { applyList: ApplyListResType["data"] | null }) {
  // Sử dụng useState để lưu trữ danh sách ứng tuyển
  const [applications, setApplications] = useState(applyList || []);

  useEffect(() => {
    setApplications(applyList || []);  // Cập nhật lại khi applyList thay đổi từ props
  }, [applyList]);

  const handleStatusChange = async (applyId: number, newStatus: number) => {
    try {
      // Gọi API để cập nhật trạng thái
      const response = await applyApiRequest.updateApplyStatus(applyId, newStatus);
      console.log("Cập nhật trạng thái " + applyId + " giá trị " + newStatus + " thành công:", response);

      // Cập nhật trạng thái trong state applications
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.applyId === applyId
            ? { ...application, status: newStatus } // Cập nhật trạng thái cho đơn ứng tuyển
            : application
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái ứng tuyển:", error);
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return "bg-yellow-200";  // Chờ xét duyệt
      case 1: return "bg-blue-200";    // Đang được xem xét
      case 2: return "bg-green-200";   // Đang chờ phỏng vấn
      case 3: return "bg-orange-200";  // Phỏng vấn xong
      case 4: return "bg-gray-200";    // Đang chờ quyết định
      case 5: return "bg-teal-200";    // Đã tuyển dụng
      case -1: return "bg-red-200";    // Bị từ chối
      default: return "bg-white";
    }
  };

  const statusOptions = [
    { value: 0, label: "Chờ xét duyệt" },
    { value: 1, label: "Đang được xem xét" },
    { value: 2, label: "Đang chờ phỏng vấn" },
    { value: 3, label: "Phỏng vấn xong" },
    { value: 4, label: "Đang chờ quyết định" },
    { value: 5, label: "Đã tuyển dụng" },
    { value: -1, label: "Bị từ chối" }
  ];

  const listToRender = applications.length > 0 ? applications : null;

  return (
    <div className=" bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Danh sách đơn ứng tuyển</h1>
      </div>

      <div className="overflow-y-auto hide-scrollbar max-h-[calc(100vh-200px)]">
        <div className="bg-white shadow-md rounded-lg p-4">
          {listToRender ? (
            <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">Ngày nhận</th>
                  <th className="py-2 px-4 text-left">Tên ứng viên</th>
                  <th className="py-2 px-4 text-left">Hồ sơ</th>
                  <th className="py-2 px-4 text-left">Tin nhắn</th>
                  <th className="py-2 px-4 text-left">Trạng thái</th>
                  <th className="py-2 px-4 text-left">Thay đổi trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {listToRender.map((application) => (
                  <tr key={application.applyId} className={`border-b ${getStatusColor(application.status)}`}>
                    <td className="py-2 px-4">{application.date}</td>
                    <td className="py-2 px-4">{"Lê Văn Phúc"}</td>
                    <td className="py-2 px-4">
                      {application.candidateCvId || "Không có hồ sơ"}
                    </td>
                    <td className="py-2 px-4">
                      {application.coverLetter || "Không có tin nhắn"}
                    </td>
                    <td className="py-2 px-4">
                      {getStatusLabel(application.status)}
                    </td>
                    <td className="py-2 px-4">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          handleStatusChange(application.applyId, parseInt(e.target.value))
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
              Chưa có đơn ứng tuyển nào
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
