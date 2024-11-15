"use client"; // Đánh dấu đây là Client Component
import {
  MdWork,
  MdLocationOn,
  MdAttachMoney,
  MdCalendarToday,
  MdBookmark,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next"; // Import hàm getCookie từ cookies-next
import ApplyJobForm from "./ApplyJobForm";
import { JobResType } from "@/app/schemaValidations/job.schema";
import { useRouter } from "next/navigation";
import { CvListResType } from "@/app/schemaValidations/cv.schema";
import { TechListResType } from "@/app/schemaValidations/tech.schema";
import { useApplyContext } from "@/app/context/ApplyContext";

const calculateDaysLeft = (
  postingDate?: string | Date,
  expirationDate?: string | Date
): number => {
  // Kiểm tra nếu một trong hai ngày là undefined
  if (!postingDate || !expirationDate) {
    return 0; // Hoặc giá trị nào bạn muốn khi không có đủ ngày
  }

  // Chuyển đổi về đối tượng Date
  const startDate = new Date(postingDate);
  const endDate = new Date(expirationDate);

  // Kiểm tra xem các ngày có hợp lệ không
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }

  // Tính số milliseconds giữa hai ngày
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Chuyển milliseconds thành ngày
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft;
};

export default function JobsPage({
  job,
  cvList,
  candidateId,
  tech,
}: {
  job: JobResType["data"] | null;
  cvList: CvListResType["data"] | null;
  candidateId: number | null;
  tech: TechListResType["data"] | null;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    const username = getCookie("username"); // Lấy giá trị username từ cookie
    console.log("username:", username); // Kiểm tra giá trị username trong cookie

    if (!username) {
      alert("Bạn cần đăng nhập để nộp đơn."); // Thông báo nếu chưa đăng nhập
      router.push("/login"); // Điều hướng đến trang đăng nhập
    } else {
      setIsModalOpen(true); // Mở modal nếu đã đăng nhập
    }
  };

  useEffect(() => {
    const username = getCookie("username"); // Kiểm tra xem username có trong cookie chưa
    console.log("Updated username:", username); // Kiểm tra xem username đã cập nhật chưa
  }, []);

  const handleSaveJob = () => {
    const username = getCookie("username"); // Lấy giá trị username từ cookie
    console.log("username:", username); // Kiểm tra giá trị username trong cookie

    if (!username) {
      alert("Bạn cần đăng nhập để lưu công việc."); // Thông báo nếu chưa đăng nhập
      router.push("/login"); // Điều hướng đến trang đăng nhập
      return; // Dừng thực thi nếu chưa đăng nhập
    }

    // Logic lưu công việc
    console.log("Đã lưu công việc thành công!"); // Thực hiện lưu công việc
    // Bạn có thể gọi API để lưu công việc ở đây
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  const daysLeft = calculateDaysLeft(job?.postingDate, job?.expirationDate);

  const { checkApplicationStatus } = useApplyContext(); // Lấy hàm kiểm tra trạng thái ứng tuyển từ context
  const [isApplied, setIsApplied] = useState(false); // Lưu trạng thái ứng tuyển

  useEffect(() => {
    // Kiểm tra trạng thái ứng tuyển khi jobId thay đổi
    const checkStatus = async () => {
      if (job?.jobId) {
        const status = await checkApplicationStatus(job.jobId);
        console.log("jobID:" + job.jobId);
        console.log("status apply:" + status);
        setIsApplied(status); // Cập nhật trạng thái ứng tuyển
      }
    };

    checkStatus();
  }, [job?.jobId, checkApplicationStatus]); // Chạy lại khi jobId thay đổi

  return (
    <>
      <div className="flex flex-wrap max-w-6xl mx-auto">
        {/* Cột 1: Job Post */}
        <div className="job-post bg-white shadow-xl shadow-gray-200 w-full md:w-8/12 mr-4">
          {" "}
          {/* Thêm margin-right cho cột 1 */}
          {/* Banner Image */}
          <div className="banner mb-4 w-full">
            <img
              src="/images/logo.png" // Thay thế URL này bằng URL của hình ảnh banner bạn muốn
              alt="Banner"
              className="w-200 h-200"
            />
          </div>
          {/* New Job Post: IT Security Manager */}
          <div className="job-meta mb-4 mt-8">
            <h1 className="job-title text-2xl font-bold">{job?.title}</h1>
            <span className="job-type bg-teal-500 text-white p-1 text-xs mr-4">
              <MdWork className="inline mr-1" /> {/* Icon loại công việc */}
              {job?.jobType}
            </span>

            <div className="flex items-center mb-2">
              <MdLocationOn className="mr-2" /> {/* Icon địa điểm */}
              <p className="job-location">{job?.jobLocation}</p>
            </div>

            <div className="flex items-center mb-2">
              <MdAttachMoney className="mr-2" /> {/* Icon tiền */}
              <p className="job-salary">{job?.salary} Vnđ</p>
            </div>

            <span className="flex items-center mb-2">
              <MdCalendarToday className="mr-2" /> {/* Icon lịch */}
              Ngày đăng tuyển:{" "}
              <span className="font-bold">{job?.postingDate}</span> | Hết hạn
              trong: <span className="font-bold"> {daysLeft} ngày</span>
            </span>

            <div className="flex items-center mb-2">
              <MdAttachMoney className="mr-2" /> {/* Icon tiền */}
              <p className="job-numberOfRecruitment">
                Số lượng tuyển: {job?.numberOfRecruitment} Người
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <a
              href="#"
              className={`border border-teal-500 ${
                isApplied
                  ? "bg-gray-500 text-white cursor-not-allowed" // Thêm cursor-not-allowed cho trạng thái vô hiệu hóa
                  : "bg-transparent hover:bg-teal-500 hover:text-white text-teal-500"
              } text-center block rounded-full py-2 px-6 transition-colors duration-300`}
              onClick={isApplied ? undefined : handleOpenModal} // Vô hiệu hóa hành động click khi isApplied
              aria-disabled={isApplied} // Thêm thuộc tính trợ năng (accessibility)
            >
              {isApplied ? "Bạn đã ứng tuyển" : "Nộp đơn ngay"}
            </a>

            <a
              href="#"
              className="border border-teal-500 bg-transparent hover:bg-teal-500 hover:text-white text-teal-500 text-center block rounded-full py-2 px-4 transition-colors duration-300 flex items-center"
              onClick={handleSaveJob} // Gọi hàm mở modal
            >
              <MdBookmark className="mr-2" />
              Lưu
            </a>
          </div>
          <div className="job-description mb-4">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Mô tả công việc
            </h3>
            <ul className="list-disc ml-6 mb-2">{job?.jobDescription}</ul>
          </div>
          <div className="job-skills mb-4">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Kỹ năng yêu cầu
            </h3>
            <ul className="list-disc ml-6 mb-2">{job?.jobRequirements}</ul>
            <ul className="list-disc ml-6">
              <li className="list-disc ml-6 mb-2">
                Trình độ học vấn: {job?.educationLevel}
              </li>

              <li className="list-disc ml-6 mb-2">
                Công nghệ: {tech?.map((t) => t.name).join(", ")}
              </li>

              <li className="list-disc ml-6 mb-2">
                Kinh nghiệm: {job?.levelName}
              </li>
              <li className="list-disc ml-6 mb-2">Cấp bậc: {job?.jobRank}</li>
              <li className="list-disc ml-6 mb-2">Giới tính: {job?.gender}</li>
            </ul>
          </div>
          <div className="job-benefits mb-4">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Quyền lợi
            </h3>
            <ul className="list-disc ml-6 mb-2">{job?.benefits}</ul>
          </div>
          <div className="job-contact mb-4">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Thông tin liên hệ
            </h3>
            <p className="list-disc ml-6 mb-2">
              Người liên hệ: {job?.contactPerson}
            </p>
            <p className="list-disc ml-6 mb-2">
              Số điện thoại: {job?.contactPhone}
            </p>
            <p className="list-disc ml-6 mb-2">
              Email liên hệ: {job?.contactEmail}
            </p>
            <p className="list-disc ml-6 mb-2">
              Địa chỉ liên hệ: {job?.contactAddress}
            </p>
          </div>
          <div className="job-contact mb-4">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Thông tin công ty
            </h3>
            <p className="list-disc ml-6 mb-2">Công ty: {job?.companyName}</p>
            <p className="list-disc ml-6 mb-2">
              Số lượng nhân viên: {job?.numberOfEmployees}
            </p>
            <p className="list-disc ml-6 mb-2">
              Website công ty: {job?.companyWebsite}
            </p>
            <p className="list-disc ml-6 mb-2">
              Sơ lược công ty: {job?.companyOverview}
            </p>
            <p className="list-disc ml-6 mb-2">
              Địa chỉ: {job?.contactAddress}
            </p>
          </div>
        </div>{" "}
        {/* end job-post */}
        {/* Cột 2: Đề xuất công việc */}
        <div className="w-full hidden md:block md:w-3/12">
          <div className="bg-white shadow-xl shadow-gray-200 w-full max-w-xs p-6 rounded-md">
            <div className="employer-info mb-4 text-center ">
              <img
                className="h-40 w-40 inline-block"
                src="/images/logo.png"
                alt=""
              />
              <a href="#" className="text-sm hover:underline">
                <h3 className="employer-name text-center">
                  CÔNG TY CỔ PHẦN KINH DOANH F88
                </h3>
              </a>
            </div>
            <div className="admin-controls text-center text-sm">
              <div className="company">
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1 mr-1"
                >
                  Công ty
                </a>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Đề xuất công việc
            </h2>
            <ul className="space-y-4">
              <li className="border-b pb-2">
                <a href="/jobs/frontend-developer" className="hover:underline">
                  <h4 className="font-bold">Frontend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, US</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Part-time
                  </span>
                </a>
              </li>
              <li className="border-b pb-2">
                <a href="/jobs/ui-ux-designer" className="hover:underline">
                  <h4 className="font-bold">UI/UX Designer</h4>
                  <p className="text-slate-600 text-sm">Hybrid, Canada</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </a>
              </li>
              <li className="border-b pb-2">
                <a href="/jobs/devops-engineer" className="hover:underline">
                  <h4 className="font-bold">DevOps Engineer</h4>
                  <p className="text-slate-600 text-sm">On-site, UK</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </a>
              </li>
              <li className="border-b pb-2">
                <a href="/jobs/backend-developer" className="hover:underline">
                  <h4 className="font-bold">Backend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, Australia</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>{" "}
        {/* end suggested jobs */}
        {/* Modal Apply Job Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <ApplyJobForm
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              cvList={cvList} // Truyền cvList vào đây
              candidateId={candidateId}
              job={job}
            />
          </div>
        )}
      </div>
    </>
  );
}
