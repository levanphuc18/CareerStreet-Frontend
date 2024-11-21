"use client";
import { getStatusLabel } from "@/app/schemaValidations/apply.schema";
import applyApiRequest from "@/app/apiRequest/apply";
import { useApplyContext } from "@/app/context/ApplyContext";

export default function AppliesPage() {
  const { appliesListByEmployerId, setAppliesListByEmployerId } = useApplyContext();

  // Hàm cập nhật trạng thái ứng tuyển
  const handleStatusChange = async (applyId: number, newStatus: number) => {
    try {
      const response = await applyApiRequest.updateApplyStatus(applyId, newStatus);
      console.log(`Cập nhật trạng thái applyId ${applyId} thành công`, response);

      // Cập nhật trong context
      setAppliesListByEmployerId?.((prev) =>
        prev?.map((application) =>
          application.applyId === applyId
            ? { ...application, status: newStatus }
            : application
        ) || []
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái ứng tuyển:", error);
    }
  };

  // Lấy màu trạng thái
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-yellow-200";
      case 1:
        return "bg-blue-200";
      case 2:
        return "bg-green-200";
      case 3:
        return "bg-orange-200";
      case 4:
        return "bg-gray-200";
      case 5:
        return "bg-teal-200";
      case -1:
        return "bg-red-200";
      default:
        return "bg-white";
    }
  };

  const statusOptions = [
    { value: 0, label: "Chờ xét duyệt" },
    { value: 1, label: "Đang được xem xét" },
    { value: 2, label: "Đang chờ phỏng vấn" },
    { value: 3, label: "Phỏng vấn xong" },
    { value: 4, label: "Đang chờ quyết định" },
    { value: 5, label: "Đã tuyển dụng" },
    { value: -1, label: "Bị từ chối" },
  ];

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Danh sách đơn ứng tuyển</h1>
      </div>

      <div className="overflow-y-auto hide-scrollbar max-h-[calc(100vh-200px)]">
        <div className="bg-white shadow-md rounded-lg p-4">
          {appliesListByEmployerId && appliesListByEmployerId.length > 0 ? (
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
                {appliesListByEmployerId.map((application) => (
                  <tr
                    key={application.applyId}
                    className={`border-b ${getStatusColor(application.status)}`}
                  >
                    <td className="py-2 px-4">{application.date}</td>
                    <td className="py-2 px-4">{"Lê Văn phúc"}</td>
                    <td className="py-2 px-4">
                      {application.candidateCvId || "Không có hồ sơ"}
                    </td>
                    <td className="py-2 px-4">
                      {application.coverLetter || "Không có tin nhắn"}
                    </td>
                    <td className="py-2 px-4">{getStatusLabel(application.status)}</td>
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
            <p className="text-center text-gray-500">Chưa có đơn ứng tuyển nào</p>
          )}
        </div>
      </div>
    </div>
  );
}
