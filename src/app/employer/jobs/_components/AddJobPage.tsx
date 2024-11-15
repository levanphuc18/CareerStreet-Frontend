/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useCookies } from "react-cookie";

import Alert from "@/components/Alert";
import {
  JobCreateBodyType,
  LevelListResType,
} from "@/app/schemaValidations/job.schema";
import jobApiRequest from "@/app/apiRequest/job";
import { TechListResType } from "@/app/schemaValidations/tech.schema";
import techApiRequest from "@/app/apiRequest/tech";
import {
  TechDetailCreateBodyType,
} from "@/app/schemaValidations/techDetail.schema";
import { useCookies } from "react-cookie";

interface JobFormData {
  companyName: string;
  numberOfEmployees: string;
  companyWebsite: string;
  companyOverview: string;
  title: string;
  jobLocation: string;
  salary: string;
  numberOfRecruitment: number;
  jobDescription: string;
  jobRequirements: string;
  benefits: string;
  educationLevel: string;
  jobRank: string;
  jobType: string;
  gender: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  postingDate: string;
  expirationDate: string;
  views: number;
  status: number;
  employerId: number;
  techIds: number[]; // Đảm bảo techIds là một mảng số
  levelId: number;
}

export default function AddJobPage({
  levelList,
  techList,
}: {
  levelList: LevelListResType["data"] | null;
  techList: TechListResType["data"] | null;
}) {
  const [formData, setFormData] = useState<JobFormData>({
    companyName: "",
    numberOfEmployees: "",
    companyWebsite: "",
    companyOverview: "",
    title: "",
    jobLocation: "",
    salary: "",
    numberOfRecruitment:0,
    jobDescription: "",
    jobRequirements: "",
    benefits: "",
    educationLevel: "",
    jobRank: "",
    jobType: "",
    gender: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    contactAddress: "",
    postingDate: "",
    expirationDate: "",
    levelId: 0,
    techIds: [], // Khởi tạo như một mảng số
    status: 0,
    views: 0,
    employerId: 0,
  });

  const [cookies] = useCookies(["userId"]); // Nhận cookie

  // Sử dụng useEffect để lấy userId từ cookie khi component được render
  useEffect(() => {
    const userId = cookies.userId; // Lấy giá trị userId từ cookie
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        employerId: userId, // Gán giá trị userId cho employerId
      }));
    }
  }, [cookies]); // Chạy một lần khi component được mount

  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng của dropdown
  const [selectedTech, setSelectedTech] = useState(new Set(formData.techIds)); // Lưu trữ công nghệ đã chọn

  // Hàm xóa công nghệ
  const removeTech = (id: number) => {
    setFormData((prevData) => ({
      ...prevData,
      techIds: prevData.techIds.filter((techId) => techId !== id), // Lọc ra công nghệ không phải là id cần xóa
    }));

    // Cập nhật selectedTech khi xóa công nghệ
    setSelectedTech((prev) => {
      const updatedTech = new Set(prev);
      updatedTech.delete(id); // Xóa id khỏi selectedTech
      return updatedTech; // Trả về Set đã cập nhật
    });
  };

  // Hàm xử lý bật/tắt dropdown
  const handleToggleDropdown = () => {
    console.log("Toggled Dropdown"); // Kiểm tra xem hàm này có được gọi không
    setIsOpen((prev) => !prev); // Chuyển trạng thái dropdown
  };

  // Hàm chọn công nghệ
  const handleSelectTech = (id: number) => {
    const updatedTech = new Set(selectedTech); // Tạo một bản sao của selectedTech

    if (updatedTech.has(id)) {
      updatedTech.delete(id); // Nếu đã chọn thì xóa
    } else {
      updatedTech.add(id); // Nếu chưa chọn thì thêm
    }

    // Log các ID được chọn vào console
    console.log(Array.from(updatedTech) + " mang id tech"); // Chuyển đổi Set thành mảng để hiển thị

    setSelectedTech(updatedTech); // Cập nhật trạng thái công nghệ đã chọn

    // Cập nhật formData
    setFormData((prevData) => ({
      ...prevData,
      techIds: Array.from(updatedTech), // Chuyển đổi Set thành mảng
    }));
  };

  const techIdsArray = Array.from(selectedTech); // Lấy danh sách techIds từ selectedTech

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [x, setX] = useState(0); // Biến để lưu số ngày chênh lệch
  // Lấy ngày hiện tại và đặt vào formData
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay ở định dạng YYYY-MM-DD
    setFormData((prevData) => ({
      ...prevData,
      postingDate: today,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;

    // Lấy ngày hiện tại
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    // Cập nhật giá trị mới vào formData
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Tiếp tục với các kiểm tra ngày tháng
    const postingDate =
      id === "postingDate"
        ? new Date(value)
        : new Date(formData.postingDate || today);
    const expirationDate =
      id === "expirationDate"
        ? new Date(value)
        : new Date(formData.expirationDate || today);
    const currentDate = new Date(today); // Ngày hiện tại

    // Kiểm tra các điều kiện ngày tháng
    if (postingDate < currentDate) {
      alert("Ngày đăng không được nhỏ hơn ngày hiện tại.");
      setFormData((prevData) => ({
        ...prevData,
        postingDate: today, // Reset lại giá trị nếu sai
      }));
      return; // Dừng lại nếu có lỗi
    }

    if (postingDate > expirationDate) {
      alert("Ngày đăng không được lớn hơn ngày hết hạn.");
      setFormData((prevData) => ({
        ...prevData,
        postingDate: today, // Reset lại giá trị nếu sai
        expirationDate: "", // Reset lại giá trị nếu sai
      }));
      return; // Dừng lại nếu có lỗi
    }

    if (expirationDate < postingDate) {
      alert("Ngày hết hạn phải lớn hơn hoặc bằng ngày đăng.");
      setFormData((prevData) => ({
        ...prevData,
        expirationDate: "", // Reset lại giá trị nếu sai
      }));
      return; // Dừng lại nếu có lỗi
    }

    // Tính số ngày chênh lệch
    const timeDiff = expirationDate.getTime() - postingDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    setX(dayDiff); // Lưu số ngày chênh lệch vào biến x
  };

  const validateForm = () => {
    const {
      companyName,
      numberOfEmployees,
      companyWebsite,
      companyOverview,
      jobLocation,
      title,
      salary,
      jobDescription,
      jobRequirements,
      benefits,
      educationLevel,
      jobRank,
      jobType,
      contactPerson,
      contactPhone,
      contactEmail,
      contactAddress,
      postingDate,
      expirationDate,
    } = formData; // formData là object chứa các giá trị của form.

    const formErrors: { [key: string]: string } = {};

    // Kiểm tra từng trường

    // Kiểm tra các trường liên quan đến thông tin công ty và công việc
    if (!companyName)
      formErrors.companyName = "Tên công ty không được để trống.";
    if (!numberOfEmployees)
      formErrors.numberOfEmployees = "Số lượng nhân viên không được để trống.";
    if (!companyWebsite)
      formErrors.companyWebsite = "Website của công ty không được để trống.";
    if (!salary) formErrors.salary = "Mức lương không được để trống.";
    if (!jobType) formErrors.jobType = "Loại công việc không được để trống.";
    if (!contactPerson)
      formErrors.contactPerson = "Người liên hệ không được để trống.";
    if (!contactAddress)
      formErrors.contactAddress = "Địa chỉ liên hệ không được để trống.";
    if (!contactPhone)
      formErrors.contactPhone = "Số điện thoại liên hệ không được để trống.";
    if (!contactEmail)
      formErrors.contactEmail = "Email liên hệ không được để trống.";
    if (!postingDate)
      formErrors.postingDate = "Ngày đăng bài không được để trống.";
    if (!expirationDate)
      formErrors.expirationDate = "Ngày hết hạn không được để trống.";

    // Kiểm tra các trường còn thiếu khác
    if (!companyOverview)
      formErrors.companyOverview = "Mô tả công ty không được để trống.";
    if (!jobLocation)
      formErrors.jobLocation = "Địa điểm làm việc không được để trống.";
    if (!jobDescription)
      formErrors.jobDescription = "Mô tả công việc không được để trống.";
    if (!jobRequirements)
      formErrors.jobRequirements = "Yêu cầu công việc không được để trống.";
    if (!benefits) formErrors.benefits = "Phúc lợi không được để trống.";
    if (!educationLevel)
      formErrors.educationLevel = "Trình độ học vấn không được để trống.";
    if (!jobRank) formErrors.jobRank = "Cấp bậc công việc không được để trống.";
    if (!title) formErrors.title = "Chức danh không được để trống.";

    // Đặt lỗi vào state và trả về true nếu không có lỗi, false nếu có lỗi
    setErrors(formErrors);
    // Sau khi kiểm tra lỗi:
    // In ra lỗi nếu có
    console.log(JSON.stringify(formErrors, null, 2) + " validate"); // In ra nếu có lỗi trong form
    return Object.keys(formErrors).length === 0;
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    console.log("Click Create Job");

    // Kiểm tra tính hợp lệ của form
    if (validateForm()) {
      console.log("Click Create Job123");
      try {
        // Tạo đối tượng dữ liệu cho Job
        const jobData: JobCreateBodyType = {
          companyName: formData.companyName,
          numberOfEmployees: formData.numberOfEmployees,
          companyWebsite: formData.companyWebsite,
          companyOverview: formData.companyOverview,
          jobLocation: formData.jobLocation,
          title: formData.title,
          salary: formData.salary,
          numberOfRecruitment: formData.numberOfRecruitment,
          jobDescription: formData.jobDescription,
          jobRequirements: formData.jobRequirements,
          benefits: formData.benefits,
          educationLevel: formData.educationLevel,
          jobRank: formData.jobRank,
          jobType: formData.jobType,
          gender: formData.gender,
          contactPerson: formData.contactPerson,
          contactPhone: formData.contactPhone,
          contactEmail: formData.contactEmail,
          contactAddress: formData.contactAddress,
          postingDate: formData.postingDate,
          expirationDate: formData.expirationDate,
          employerId: formData.employerId, // ID của nhà tuyển dụng
          techIds: formData.techIds, // Đảm bảo techIds là mảng các ID
          levelId: formData.levelId, // ID cấp độ
          status: 0, // Trạng thái
          views: 0, // Số lượt xem
          levelName:"",
        };

        // Gửi yêu cầu tạo công việc và nhận phản hồi
      const jobResult = await jobApiRequest.createJob(jobData);
      console.log(jobResult);

      // Lấy jobId từ kết quả trả về (giả sử ID công việc nằm trong jobResult.payload.id)
      const jobId = jobResult.payload.data.jobId; // Cập nhật theo cấu trúc thực tế của phản hồi từ API

      // Tạo đối tượng dữ liệu cho TechDetail
      const techDetailData: TechDetailCreateBodyType = {
        jobId: jobId, // Sử dụng jobId vừa lấy
        techIds: techIdsArray, // Đảm bảo techIds là mảng các ID
      };

      // Gửi yêu cầu tạo chi tiết công nghệ
      try {
        const techDetailResult = await techApiRequest.createTechDetail(techDetailData);
        console.log(techDetailResult);
        console.log(techDetailData);

        Alert.success("Thành công!", techDetailResult.payload.message); // Hiển thị thông báo thành công cho techDetail
      } catch (error) {
        console.error("Error creating tech detail:", error);
        Alert.error("Lỗi!", "Đã xảy ra lỗi khi tạo chi tiết công nghệ.");
      }

      // Hiển thị thông báo thành công cho job
      Alert.success("Thành công!", jobResult.payload.message);
      router.push("/employer/jobs"); // Chuyển hướng về trang danh sách công việc
      router.refresh(); // Làm mới trang
    } catch (error) {
      console.error("Error creating job:", error);
      Alert.error("Lỗi!", "Đã xảy ra lỗi khi tạo công việc.");
    }
  }
};

  return (
    <>
      <h5 className="text-3xl text-center text-blue-600 mb-6 rounded-lg bg-slate-200">
        Đăng công việc
      </h5>
      <hr className="border-t border-gray-300 mb-4" /> {/* Đường kẻ ngang */}
      <div className="flex bg-gray-100">
        {/* Cột bên trái: Form thêm CV */}
        <div className=" h-[85vh] flex-1 p-4 overflow-y-auto hide-scrollbar rounded-lg bg-white">
          <h2 className="text-xl text-center font-bold mb-4 text-blue-600 ">
            Thông tin công việc
          </h2>
          <hr className="border-t border-gray-300 mb-4" />{" "}
          {/* Đường kẻ ngang */}
          <form onSubmit={handleSubmit} method="POST">
            {/* Thông tin công ty */}
            <h3 className="text-lg font-semibold mt-6 mb-2">
              Thông tin công ty
            </h3>

            <label className="block mb-2" htmlFor="companyName">
              Tên công ty*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="companyName"
              placeholder="CTTNHHMTV"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">{errors.companyName}</span>
            )}

            <label className="block mb-2" htmlFor="numberOfEmployees">
              Số nhân viên*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              id="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleChange}
            />
            {errors.numberOfEmployees && (
              <span className="text-red-500 text-sm">
                {errors.numberOfEmployees}
              </span>
            )}

            <label className="block mb-2" htmlFor="companyWebsite">
              Website công ty
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
            />
            {errors.companyWebsite && (
              <span className="text-red-500 text-sm">
                {errors.companyWebsite}
              </span>
            )}

            <label className="block mb-2" htmlFor="companyOverview">
              Sơ lược công ty*
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="companyOverview"
              rows={5}
              value={formData.companyOverview}
              onChange={handleChange}
            ></textarea>
            {errors.companyOverview && (
              <span className="text-red-500 text-sm">
                {errors.companyOverview}
              </span>
            )}

            {/* Thông tin công việc */}
            <h3 className="text-lg font-semibold mt-6 mb-2">
              Thông tin công việc
            </h3>

            <label className="block mb-2" htmlFor="title">
              Chức Danh*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="title"
              placeholder="Tên công việc"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}

<label className="block mb-2" htmlFor="numberOfRecruitment">
              Số lượng tuyển*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              id="numberOfRecruitment"
              value={formData.numberOfRecruitment}
              onChange={handleChange}
            />
            {errors.numberOfRecruitment && (
              <span className="text-red-500 text-sm">
                {errors.numberOfRecruitment}
              </span>
            )}

            <label className="block mb-2" htmlFor="jobLocation">
              Địa điểm*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="jobLocation"
              placeholder="Địa điểm làm việc"
              value={formData.jobLocation}
              onChange={handleChange}
            />
            {errors.jobLocation && (
              <span className="text-red-500 text-sm">{errors.jobLocation}</span>
            )}

            <label className="block mb-2" htmlFor="salary">
              Lương*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              id="salary"
              placeholder="10"
              value={formData.salary}
              onChange={handleChange}
            />
            {errors.salary && (
              <span className="text-red-500 text-sm">{errors.salary}</span>
            )}

            <p className="text-xs text-gray-500">
              Không hiển thị mức lương có thể làm giảm 30% lượng CV ứng tuyển!
            </p>

            <label className="block mb-2" htmlFor="jobDescription">
              Mô tả công việc*
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="jobDescription"
              rows={5}
              value={formData.jobDescription}
              onChange={handleChange}
            ></textarea>
            {errors.jobDescription && (
              <span className="text-red-500 text-sm">
                {errors.jobDescription}
              </span>
            )}

            <label className="block mb-2" htmlFor="jobRequirements">
              Yêu cầu công việc*
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="jobRequirements"
              rows={5}
              value={formData.jobRequirements}
              onChange={handleChange}
            ></textarea>
            {errors.jobRequirements && (
              <span className="text-red-500 text-sm">
                {errors.jobRequirements}
              </span>
            )}

            <label className="block mb-2" htmlFor="benefits">
              Quyền lợi*
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="benefits"
              rows={5}
              value={formData.benefits}
              onChange={handleChange}
            ></textarea>
            {errors.benefits && (
              <span className="text-red-500 text-sm">{errors.benefits}</span>
            )}

            {/* Chi tiết công việc */}
            <h3 className="text-lg font-semibold mt-6 mb-2">
              Chi tiết công việc
            </h3>

            <div className="flex items-center mb-4">
              <label className="block w-1/4 mb-2" htmlFor="educationLevel">
                Trình độ học vấn*
              </label>
              <select
                className="w-3/4 p-2 border border-gray-300 rounded"
                id="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
              >
                <option value="">Chọn trình độ học vấn</option>
                <option value="Trung học phổ thông">Trung học phổ thông</option>
                <option value="Cao đẳng">Cao đẳng</option>
                <option value="Đại học">Đại học</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
              </select>
              {errors.educationLevel && (
                <span className="text-red-500 text-sm">
                  {errors.educationLevel}
                </span>
              )}
            </div>

            <div className="flex items-start mb-4">
              <label className="block w-1/4 mb-2" htmlFor="techIds">
                Công nghệ*
              </label>

              <div className="w-3/4">
                {/* Hiển thị các thẻ công nghệ đã chọn */}
                <div className="flex flex-wrap mb-2">
                  {formData.techIds && formData.techIds.length > 0 ? (
                    formData.techIds.map((id) => {
                      const tech = techList
                        ? techList.find((tech) => tech.techId === id)
                        : null; // Kiểm tra techList trước khi sử dụng

                      return (
                        <div
                          key={id}
                          className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 mr-2 mb-2"
                        >
                          {tech ? tech.name : "Unknown"}
                          <button
                            className="ml-2 text-white hover:text-red-300 focus:outline-none"
                            onClick={() => removeTech(id)} // Gọi hàm xóa công nghệ
                            aria-label={`Xóa công nghệ ${
                              tech ? tech.name : "Unknown"
                            }`}
                          >
                            &times; {/* Biểu tượng xóa */}
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-gray-500">
                      Chưa có công nghệ nào được chọn.
                    </span>
                  )}
                </div>

                {/* Dropdown cho phép chọn nhiều công nghệ */}
                <div className="relative">
                  <button
                    type="button"
                    className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleToggleDropdown}
                  >
                    Chọn công nghệ
                  </button>

                  {isOpen &&
                    techList && ( // Thêm kiểm tra null cho techList
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                        {techList.length > 0 ? ( // Kiểm tra xem techList có phần tử nào không
                          techList.map((tech) => (
                            <div
                              key={tech.techId}
                              className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                selectedTech.has(tech.techId)
                                  ? "bg-blue-200"
                                  : ""
                              }`}
                              onClick={() => handleSelectTech(tech.techId)} // Gọi hàm chọn công nghệ
                            >
                              {tech.name}
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">
                            Không có dữ liệu công nghệ
                          </div>
                        )}
                      </div>
                    )}
                </div>

                {errors.techIds && (
                  <span className="text-red-500 text-sm">{errors.techIds}</span> // Hiển thị thông báo lỗi nếu có
                )}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className="block w-1/4 mb-2" htmlFor="levelId">
                Mức kinh nghiệm*
              </label>
              <select
                className="w-3/4 p-2 border border-gray-300 rounded"
                id="levelId"
                value={formData.levelId}
                onChange={handleChange}
              >
                <option value="">Chọn mức kinh nghiệm</option>
                {levelList && levelList.length > 0 ? (
                  levelList.map((level) => (
                    <option key={level.levelId} value={level.levelId}>
                      {level.name}
                    </option>
                  ))
                ) : (
                  <option value="">Không có dữ liệu cấp độ</option>
                )}
              </select>
              {errors.experienceLevel && (
                <span className="text-red-500 text-sm">
                  {errors.experienceLevel}
                </span>
              )}
            </div>

            <div className="flex items-center mb-4">
              <label className="block w-1/4 mb-2" htmlFor="jobRank">
                Cấp bậc*
              </label>
              <select
                className="w-3/4 p-2 border border-gray-300 rounded"
                id="jobRank"
                value={formData.jobRank}
                onChange={handleChange}
              >
                <option value="">Chọn cấp bậc</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Giám đốc">Giám đốc</option>
              </select>
              {errors.jobRank && (
                <span className="text-red-500 text-sm">{errors.jobRank}</span>
              )}
            </div>

            <div className="flex items-center mb-4">
              <label className="block w-1/4 mb-2" htmlFor="jobType">
                Hình thức làm việc*
              </label>
              <select
                className="w-3/4 p-2 border border-gray-300 rounded"
                id="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">Chọn hình thức làm việc</option>
                <option value="Toàn thời gian">Toàn thời gian</option>
                <option value="Bán thời gian">Bán thời gian</option>
                <option value="Thực tập">Thực tập</option>
              </select>
              {errors.jobType && (
                <span className="text-red-500 text-sm">{errors.jobType}</span>
              )}
            </div>

            <div className="flex items-center mb-4">
              <label className="block w-1/4 mb-2" htmlFor="gender">
                Giới tính*
              </label>
              <select
                className="w-3/4 p-2 border border-gray-300 rounded"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm">{errors.gender}</span>
              )}
            </div>

            {/* Thông tin liên hệ */}
            <h3 className="text-lg font-semibold mt-6 mb-2">
              Thông tin liên hệ
            </h3>

            <label className="block mb-2" htmlFor="contactPerson">
              Người liên hệ*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
            />
            {errors.contactPerson && (
              <span className="text-red-500 text-sm">
                {errors.contactPerson}
              </span>
            )}

            <label className="block mb-2" htmlFor="contactPhone">
              Số điện thoại liên hệ*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="tel"
              id="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
            />
            {errors.contactPhone && (
              <span className="text-red-500 text-sm">
                {errors.contactPhone}
              </span>
            )}

            <label className="block mb-2" htmlFor="contactEmail">
              Email liên hệ*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
            />
            {errors.contactEmail && (
              <span className="text-red-500 text-sm">
                {errors.contactEmail}
              </span>
            )}

            <label className="block mb-2" htmlFor="contactAddress">
              Địa chỉ liên hệ
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
            />
            {errors.contactAddress && (
              <span className="text-red-500 text-sm">
                {errors.contactAddress}
              </span>
            )}

            <label className="block mb-2" htmlFor="postingDate">
              Ngày đăng*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="date"
              id="postingDate"
              value={formData.postingDate}
              onChange={handleChange}
            />
            {errors.postingDate && (
              <span className="text-red-500 text-sm">{errors.postingDate}</span>
            )}

            <label className="block mb-2" htmlFor="expirationDate">
              Ngày hết hạn*
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="date"
              id="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
            {errors.expirationDate && (
              <span className="text-red-500 text-sm">
                {errors.expirationDate}
              </span>
            )}

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Đăng tuyển
            </button>
          </form>
        </div>

        {/* Cột bên phải: Preview */}
        <div className="w-1/2 h-[85vh] p-4 m-1 bg-white border-l overflow-y-auto hide-scrollbar rounded-lg">
          <h2 className="text-xl text-center text-blue-600 font-bold mb-4">
            Xem trước
          </h2>
          {/* <div className="bg-gray-100 p-4 rounded"> */}
          <hr className="border-t border-gray-300 mb-4" />{" "}
          {/* Đường kẻ ngang */}
          <div className="p-4 job-post bg-white shadow-xl shadow-gray-200 w-full rounded-lg ">
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
              <h1 className="title text-2xl font-bold">{formData.title}</h1>
              <span className="job-type bg-teal-500 text-white p-1 text-xs mr-4">
                {formData.jobType}
              </span>

              <div className="flex items-center mb-2">
                <p className="job-salary">Lương: {formData.salary}tr</p>
              </div>

              <div className="flex items-center mb-2">
                <p className="address-job">Địa chỉ: {formData.jobLocation}</p>
              </div>

              <span className="flex items-center mb-2">
                Ngày đăng tuyển:{" "}
                <span className="font-bold">{formData.postingDate}</span> | Hết
                hạn trong: <span className="font-bold">{x} Ngày tới </span>
              </span>
              <div className="flex items-center mb-2">
                <p className="numberOfRecruitment-job">Số lượng tuyển: {formData.numberOfRecruitment}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4"></div>
            <div className="job-description mb-4">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Mô tả công việc
              </h3>
              <pre>{formData.jobDescription}</pre>
            </div>
            <div className="job-skills mb-4">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Kỹ năng yêu cầu
              </h3>
              <pre>{formData.jobRequirements}</pre>
              <ul className="list-disc ml-6">
                <li>Trình độ học vấn: {formData.educationLevel}</li>
                <li>Kinh nghiệm: {formData.levelId}</li>
                <li>Cấp bậc: {formData.jobRank}</li>
                <li>Giới tính: {formData.gender}</li>
              </ul>
            </div>
            <div className="job-benefits mb-4">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Quyền lợi
              </h3>
              <pre>{formData.benefits}</pre>
            </div>
            <div className="job-contact mb-4">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Thông tin liên hệ
              </h3>
              <p>Người liên hệ: {formData.contactPerson}</p>
              <p>Số điện thoại: {formData.contactPhone}</p>
              <p>Email liên hệ: {formData.contactEmail}</p>
              <p>Địa chỉ liên hệ: {formData.contactAddress}</p>
            </div>
            <div className="job-contact mb-4">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Thông tin công ty
              </h3>
              <p>Công ty: {formData.companyName}</p>
              <p>Số lượng nhân viên: {formData.numberOfEmployees}</p>
              <p>Website công ty: {formData.companyWebsite}</p>

              <pre>Sơ lược công ty: {formData.companyOverview}</pre>
              <pre>Địa chỉ: {formData.contactAddress}</pre>
            </div>
          </div>{" "}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
