"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import Alert from "@/components/Alert";
// import { CvCreateBodyType } from "../../schemaValidations/cv.schema";
import cvApiRequest from "@/app/apiRequest/cv";
import PdfViewer from "@/components/PdfViewer";

export default function AddCvPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    school: "",
    language: "",
    experience: "",
    title: "",
    currentSalary: "",
    preferenceSalary: "",
    level: "",
    positionType: "",
    workLocation: "",
    file: null as File | null,
    candidate_id: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [cookies] = useCookies(["userId"]); // Nhận cookie

  // Sử dụng useEffect để lấy userId từ cookie khi component được render
  useEffect(() => {
    const userId = cookies.userId; // Lấy giá trị userId từ cookie
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        candidate_id: userId, // Gán giá trị userId cho candidate_id
      }));
    }
  }, [cookies]); // Chạy một lần khi component được mount

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // view pdf
  const defaultFileUrl = "https://default-url.com/default.pdf";
  const [fileUrl, setFileUrl] = useState(defaultFileUrl); // URL mặc định

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, file }); // Lưu tệp vào formData

      // Tạo URL tạm thời cho tệp PDF
      const url = URL.createObjectURL(file);
      setFileUrl(url); // Cập nhật URL tạm thời
    }
  };

  const validateForm = () => {
    const {
      fullName,
      address,
      phone,
      email,
      school,
      language,
      experience,
      title,
      currentSalary,
      preferenceSalary,
      level,
      positionType,
      workLocation,
      file,
    } = formData;

    const formErrors: { [key: string]: string } = {};

    // Kiểm tra từng trường
    if (!fullName) formErrors.fullName = "Họ tên không được để trống.";
    if (!address) formErrors.address = "Địa chỉ không được để trống.";
    if (!phone) formErrors.phone = "Số điện thoại không được để trống.";
    if (!email) formErrors.email = "Email không được để trống.";
    if (!school) formErrors.school = "Trường học không được để trống.";
    if (!language) formErrors.language = "Ngôn ngữ không được để trống.";
    if (!experience)
      formErrors.experience = "Kinh nghiệm làm việc không được để trống.";
    if (!title) formErrors.title = "Chức danh mong muốn không được để trống.";
    if (!currentSalary)
      formErrors.currentSalary = "Lương hiện tại không được để trống.";
    if (!preferenceSalary)
      formErrors.preferenceSalary = "Lương mong muốn không được để trống.";
    if (!level) formErrors.level = "Cấp độ nghề nghiệp không được để trống.";
    if (!positionType)
      formErrors.positionType = "Loại hình công việc không được để trống.";
    if (!workLocation)
      formErrors.workLocation =
        "Địa điểm làm việc mong muốn không được để trống.";
    if (!file) formErrors.file = "Vui lòng tải lên file CV.";

    // Đặt lỗi vào state và trả về true nếu không có lỗi, false nếu có lỗi
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Click Create CV");

    if (validateForm()) {
      try {
        const formDataRequest = new FormData();

        // Thêm dữ liệu vào FormData
        formDataRequest.append(
          "data",
          new Blob(
            [
              JSON.stringify({
                fullName: formData.fullName,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                school: formData.school,
                language: formData.language,
                experience: formData.experience,
                title: formData.title,
                currentSalary: formData.currentSalary,
                preferenceSalary: formData.preferenceSalary,
                level: formData.level,
                positionType: formData.positionType,
                workLocation: formData.workLocation,
                candidate_id: formData.candidate_id,
              }),
            ],
            { type: "application/json" }
          ) // Đảm bảo đây là kiểu JSON
        );

        // Kiểm tra và thêm file
        if (formData.file instanceof File) {
          formDataRequest.append("file", formData.file);
        }

        const result = await cvApiRequest.createCv(formDataRequest);
        console.log("Result from API: ", result);
        Alert.success("Thành công!", result.payload.message);
        router.push("/candidate/cvs");
        router.refresh();
      } catch (error) {
        console.error("Error creating cv:", error);
        Alert.error("Lỗi!", "Đã xảy ra lỗi khi tạo hồ sơ.");
      }
    }
  };

  return (
    <>
      {/* Form thêm CV */}
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[800px] bg-white p-6 border border-gray-300 rounded-lg">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="grid grid-cols-2 gap-6"
          >
            {/* Contact Information */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Thông tin liên hệ:
            </h2>
            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="fullName"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Họ và tên:
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Lê Văn Phúc"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="phone"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Số điện thoại:
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="0814201800"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="email"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                E-mail:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="levanphuc181101@gmail.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="address"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Địa chỉ:
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Thủ Đức, Thu Duc City, Ho Chi Minh, Viet Nam"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>

            {/* Education and Languages */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Học vấn / Ngôn ngữ
            </h2>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="school"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Học vấn:
              </label>
              <input
                id="school"
                name="school"
                type="text"
                value={formData.school} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Post & Telecommunications Institute and Technology - Southern"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.school && (
                <span className="text-red-500 text-sm">{errors.school}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="language"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Ngôn ngữ khác:
              </label>
              <input
                id="language"
                name="language"
                type="text"
                value={formData.language} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="English - Intermediate"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.language && (
                <span className="text-red-500 text-sm">{errors.language}</span>
              )}
            </div>

            {/* Work Experience */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Kinh nghiệm làm việc
            </h2>

            <div className="col-span-2 mb-5 border p-4 rounded-md">
              <label
                htmlFor="experience"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Năm kinh nghiệm:
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="0"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.experience && (
                <span className="text-red-500 text-sm">
                  {errors.experience}
                </span>
              )}
            </div>

            {/* Career Objective */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Career Objective
            </h2>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="title"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Tiêu đề hồ sơ:
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Java Backend"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="currentSalary"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Mức lương hiện tại:
              </label>
              <input
                id="currentSalary"
                name="currentSalary"
                type="text"
                value={formData.currentSalary} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="1,000,000 VND"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.currentSalary && (
                <span className="text-red-500 text-sm">
                  {errors.currentSalary}
                </span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="preferenceSalary"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Mức lương mong muốn:
              </label>
              <input
                id="preferenceSalary"
                name="preferenceSalary"
                type="text"
                value={formData.preferenceSalary} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="5,000,000 VND"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.preferenceSalary && (
                <span className="text-red-500 text-sm">
                  {errors.preferenceSalary}
                </span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="level"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Mức kinh nghiệm:
              </label>
              <input
                id="level"
                name="level"
                type="text"
                value={formData.level} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Senior"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.level && (
                <span className="text-red-500 text-sm">{errors.level}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="positionType"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Hình thức làm việc:
              </label>
              <input
                id="positionType"
                name="positionType" // Đã thay đổi thành positionType
                type="text"
                value={formData.positionType} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Full-time"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.positionType && (
                <span className="text-red-500 text-sm">
                  {errors.positionType}
                </span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="workLocation"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Địa chỉ làm việc:
              </label>
              <input
                type="text"
                name="workLocation"
                id="workLocation"
                value={formData.workLocation} // Thêm value cho trường này
                onChange={handleChange} // Thêm onChange để cập nhật formData
                placeholder="Ho Chi Minh - All districts"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.workLocation && (
                <span className="text-red-500 text-sm">
                  {errors.workLocation}
                </span>
              )}
            </div>

            {/* Upload File */}
            <div className="mb-5 border p-4 rounded-md col-span-2">
              <label
                htmlFor="file"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Tải hồ sơ:
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept="application/pdf" // Chỉ cho phép tải lên file PDF
                onChange={handleFileChange}
                className="w-full"
              />
              {errors.file && (
                <span className="text-red-500 text-sm">{errors.file}</span>
              )}

              {/* Chỉ hiển thị phần xem trước nếu người dùng đã chọn file */}
              {fileUrl !== defaultFileUrl && (
                <div className="p-4 rounded-md h-[600px] mt-4">
                  <h4 className="font-bold text-lg mb-2">Tập tin đính kèm</h4>
                  <PdfViewer url={fileUrl} />{" "}
                  {/* Hiển thị URL tạm thời hoặc URL mặc định */}
                </div>
              )}
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Tạo hồ sơ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
