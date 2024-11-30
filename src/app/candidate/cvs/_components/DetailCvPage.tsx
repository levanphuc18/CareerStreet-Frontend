"use client";
import { CvResType } from "@/app/schemaValidations/cv.schema";
import PdfViewer from "@/components/PdfViewer";
import Link from "next/link";

export default function DetailCvPage({ cv }: { cv: CvResType["data"] | null }) {
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
                  <strong>Họ và tên:</strong> {cv?.fullName}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {cv?.phone}
                </p>
                <p>
                  <strong>E-mail:</strong> {cv?.email}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {cv?.address}
                  Minh, Việt Nam
                </p>
              </div>
            </div>

            {/* Học vấn/Ngoại ngữ */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Học vấn/Ngoại ngữ</h4>
              <p>
                <strong>Tên trường (Bằng cấp cao nhất):</strong> {cv?.school}
              </p>
              <p>
                <strong>Ngoại ngữ:</strong> {cv?.language}
              </p>
            </div>

            {/* Kinh nghiệm làm việc */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Kinh nghiệm làm việc</h4>
              <p>
                <strong>Tổng số năm kinh nghiệm làm việc:</strong>{" "}
                {cv?.experience} năm
              </p>
            </div>

            {/* Mục tiêu nghề nghiệp */}
            <div className="border border-gray-300 p-4 rounded-md">
              <h4 className="font-bold text-lg mb-2">Mục tiêu nghề nghiệp</h4>
              <p>
                <strong>Vị trí mong muốn:</strong> {cv?.title}
              </p>
              <p>
                <strong>Mức lương gần đây nhất:</strong> {cv?.currentSalary}
              </p>
              <p>
                <strong>Mức lương mong muốn:</strong> {cv?.preferenceSalary}
                VND
              </p>
              <p>
                <strong>Cấp bậc mong muốn:</strong> {cv?.levelName}
              </p>
              <p>
                <strong>Loại hình công việc:</strong> {cv?.positionType}
              </p>
              <p>
                <strong>Nơi làm việc ưa thích:</strong> {cv?.workLocation}
              </p>
            </div>

            {/* Phần iframe */}
            <div className=" p-4 rounded-md h-[600px]">
              <h4 className="font-bold text-lg mb-2">Tập tin đính kèm</h4>
              <PdfViewer
                url={cv?.filePath || "https://default-url.com/default.pdf"} // Sử dụng cv?.filePath nếu có, nếu không sử dụng URL mặc định
              />
            </div>
          </div>

          {/* Cột 2*/}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xs p-6 rounded-md">
            <div className="mt-4 flex gap-4">
              <Link
                href={`${cv?.candidateCvId}/edit`}
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-400 transition-colors"
              >
                Chỉnh sửa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
