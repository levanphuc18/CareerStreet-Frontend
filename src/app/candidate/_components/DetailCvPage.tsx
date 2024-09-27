"use client";
import PdfViewer from "@/components/PdfViewer";

export default function DetailCvPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 p-6 sm:p-12">
      {/* Thêm div này để căn giữa hai cột */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-screen-xl">
          {/* Cột TT */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col gap-4 p-6 rounded-md">
            {/* Thông tin liên hệ */}
            <div className="border border-gray-300 p-4 rounded-md flex">
              {/* Thêm ảnh bên trái */}
              <img
                src="/images/logo.png" // Thay đổi đường dẫn đến hình ảnh của bạn
                alt="Avatar"
                className="w-24 h-24 rounded-full mr-4" // Điều chỉnh kích thước và thêm khoảng cách bên phải
              />
              <div>
                <h4 className="font-bold text-lg mb-2">Thông tin liên hệ</h4>
                {/* Thêm thông tin mới */}
                <p>
                  <strong>Họ và tên:</strong> Lê Phúc
                </p>
                <p>
                  <strong>CV:</strong> CV-LEVANPHUC-JAVA-BACKEND.pdf
                </p>
                <p>
                  <strong>Địa chỉ:</strong> Thủ Đức, Thành Phố Thủ Đức, Hồ Chí
                  Minh, Việt Nam
                </p>
                <p>
                  <strong>Điện thoại:</strong> 0814201800
                </p>
                <p>
                  <strong>E-mail:</strong> levanphuc181101@gmail.com
                </p>
                <p>
                  <strong>Giới tính:</strong> Nam
                </p>
                <p>
                  <strong>Ngày sinh:</strong> 18/11/2001
                </p>
              </div>
            </div>

            {/* Học vấn/Ngoại ngữ */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Học vấn/Ngoại ngữ</h4>
              <p>
                <strong>Tên trường (Bằng cấp cao nhất):</strong> HV Công Nghệ
                Bưu chính Viễn thông - Phía Nam
              </p>
              <p>
                <strong>Trình độ học vấn:</strong> Cử nhân
              </p>
              <p>
                <strong>Ngoại ngữ:</strong> Tiếng Anh - Trung cấp
              </p>
            </div>

            {/* Kinh nghiệm làm việc */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Kinh nghiệm làm việc</h4>
              <p>
                <strong>Tổng số năm kinh nghiệm làm việc:</strong> 0 năm
              </p>
            </div>

            {/* Người tham khảo */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Người tham khảo</h4>
              <p>Chưa có thông tin người tham khảo.</p>
            </div>

            {/* Mục tiêu nghề nghiệp */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Mục tiêu nghề nghiệp</h4>
              <p>
                <strong>Vị trí mong muốn:</strong> Java Backend
              </p>
              <p>
                <strong>Mức lương gần đây nhất:</strong> 1,000,000 VND
              </p>
              <p>
                <strong>Mức lương mong muốn:</strong> 1,000,000 VND - 5,000,000
                VND
              </p>
              <p>
                <strong>Cấp bậc mong muốn:</strong> Mới đi làm
              </p>
              <p>
                <strong>Loại công việc:</strong> Nhân viên toàn thời gian
              </p>
              <p>
                <strong>Ngành nghề mong muốn:</strong> CNTT - Phần mềm
              </p>
              <p>
                <strong>Nơi làm việc ưa thích:</strong> Hồ Chí Minh - Tất cả
                quận/huyện
              </p>
            </div>

            {/* Phần iframe */}
            <div className=" p-4 rounded-md h-96">
              <h4 className="font-bold text-lg mb-2">Tập tin đính kèm</h4>
              <PdfViewer
                url={
                  "https://res.cloudinary.com/dknwov2xw/raw/upload/v1727092456/cvs/CV-LEVANPHUC-JAVA-BACKEND_2ba79bbb-09d1-44ee-95d9-707ea75909a0"
                }
              />
            </div>
          </div>

          {/* Cột 2*/}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xs p-6 rounded-md">
            <div className="mt-4 flex gap-4">
              <button
                className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md"
                onClick={() => {
                  /* Hàm tải CV PDF */
                }}
              >
                Tải CV PDF
              </button>
              <button
                className="bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md"
                onClick={() => {
                  /* Hàm chỉnh sửa thông tin */
                }}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
