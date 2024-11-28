/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";
import jobApiRequest from "@/app/apiRequest/job";

interface JobFormData {
  title: string;
  jobLocation: string;
  salary: string;
  numberOfRecruitment: number;
  jobDescription: string;
  jobRequirements: string;
  benefits: string;
  educationLevel: string;
  jobType: string;
  gender: string;
  expirationDate: string;
  status: number;
  techIds: number[];
  levelId: number;
  companyName: string;
  companyWebsite: string;
  companyOverview: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  jobRank: string;
  numberOfEmployees?: number;
  postingDate?: string;
  views?: number;
  employerId?: number;
  levelName?: string;
}

export default function UpdateJobPage({ jobId }: { jobId: number }) {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    jobLocation: "",
    salary: "",
    numberOfRecruitment: 0,
    jobDescription: "",
    jobRequirements: "",
    benefits: "",
    educationLevel: "",
    jobType: "",
    gender: "",
    expirationDate: "",
    status: 0,
    techIds: [],
    levelId: 0,
    companyName: "",
    companyWebsite: "",
    companyOverview: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    contactAddress: "",
    jobRank: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JobFormData, string>>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobData = await jobApiRequest.getJobById(jobId);
        setFormData({
          ...jobData.payload.data,
          salary: jobData.payload.data.salary.toString(),
        });
      } catch (error) {
        console.error("Error fetching job data:", error);
        Alert.error("Lỗi!", "Không thể tải thông tin công việc.");
      }
    };
    fetchJobData();
  }, [jobId]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof JobFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề không được để trống";
    }
    
    if (!formData.jobLocation.trim()) {
      newErrors.jobLocation = "Vị trí làm việc không được để trống";
    }
    
    if (!formData.salary.trim()) {
      newErrors.salary = "Mức lương không được để trống";
    }
    
    if (formData.numberOfRecruitment <= 0) {
      newErrors.numberOfRecruitment= "Số lượng tuyển dụng phải lớn hơn 0";
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Mô tả công việc không được để trống";
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = "Ngày hết hạn không được để trống";
    } else {
      const today = new Date();
      const expDate = new Date(formData.expirationDate);
      if (expDate <= today) {
        newErrors.expirationDate = "Ngày hết hạn phải lớn hơn ngày hiện tại";
      }
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Tên công ty không được để trống";
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Người liên hệ không được để trống";
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = "Số điện thoại không hợp lệ";
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await jobApiRequest.updateJob(jobId, formData as any);
        Alert.success("Thành công!", result.payload.message);
        router.push("/employer/jobs");
        router.refresh();
      } catch (error) {
        console.error("Error updating job:", error);
        Alert.error("Lỗi!", "Đã xảy ra lỗi khi cập nhật công việc.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cập nhật thông tin công việc</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tiêu đề công việc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề công việc *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Vị trí làm việc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vị trí làm việc *
            </label>
            <input
              type="text"
              value={formData.jobLocation}
              onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.jobLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.jobLocation}</p>
            )}
          </div>

          {/* Mức lương */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mức lương *
            </label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          {/* Số lượng tuyển dụng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng tuyển dụng *
            </label>
            <input
              type="number"
              value={formData.numberOfRecruitment}
              onChange={(e) => setFormData({ ...formData, numberOfRecruitment: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              min="1"
            />
            {errors.numberOfRecruitment && (
              <p className="text-red-500 text-sm mt-1">{errors.numberOfRecruitment}</p>
            )}
          </div>
        </div>

        {/* Mô tả công việc */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả công việc *
          </label>
          <textarea
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.jobDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>
          )}
        </div>

        {/* Yêu cầu công việc */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yêu cầu công việc *
          </label>
          <textarea
            value={formData.jobRequirements}
            onChange={(e) => setFormData({ ...formData, jobRequirements: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phúc lợi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phúc lợi
          </label>
          <textarea
            value={formData.benefits}
            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Đang tuyển</option>
              <option value={0}>Tạm dừng</option>
            </select>
          </div>

          {/* Ngày hết hạn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày hết hạn *
            </label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>
            )}
          </div>
        </div>

        {/* Thông tin công ty */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin công ty</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên công ty *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website công ty
              </label>
              <input
                type="text"
                value={formData.companyWebsite}
                onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giới thiệu công ty
            </label>
            <textarea
              value={formData.companyOverview}
              onChange={(e) => setFormData({ ...formData, companyOverview: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin liên hệ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Người liên hệ *
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại *
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                value={formData.contactAddress}
                onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
} 