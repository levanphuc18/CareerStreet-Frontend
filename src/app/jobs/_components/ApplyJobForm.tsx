import React, { useState } from "react";
import { CvListResType } from "@/app/schemaValidations/cv.schema";
import { JobResType } from "@/app/schemaValidations/job.schema";
import { ApplyCreateBodyType } from "@/app/schemaValidations/apply.schema";
import applyApiRequest from "@/app/apiRequest/apply";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";

interface ApplyJobFormProps {
  isOpen: boolean;
  onClose: () => void;
  cvList: CvListResType["data"] | null;
  candidateId: number | null;
  job: JobResType["data"] | null;
}

const ApplyJobForm: React.FC<ApplyJobFormProps> = ({
  isOpen,
  onClose,
  cvList,
  job,
}) => {
  const [formData, setFormData] = useState({
    candidateCvId: cvList ? cvList[0]?.candidateCvId || null : null,
    jobId: job?.jobId || null,
    coverLetter: "",
    status: 1,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [sourceSelected, setSourceSelected] = useState<string>(
    cvList ? String(cvList[0]?.candidateCvId) : ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const { coverLetter } = formData;
    const formErrors: { [key: string]: string } = {};
    if (!coverLetter) {
      formErrors.coverLetter = "Thư xin việc không được để trống.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const ApplyData: ApplyCreateBodyType = {
          candidateCvId: formData.candidateCvId ? Number(formData.candidateCvId) : 0,
          jobId: formData.jobId ? Number(formData.jobId) : 0,
          coverLetter: formData.coverLetter,
          status: 0,
        };
        const result = await applyApiRequest.createApply(ApplyData);
        Alert.success("Thành công!", result.payload.message);
        router.push("/candidate/applied");
        router.refresh();
      } catch (error) {
        Alert.error("Lỗi!", "Đã xảy ra lỗi khi tạo khách hàng.");
      }
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCvId = event.target.value; // Lấy giá trị `candidateCvId` được chọn
    setSourceSelected(selectedCvId); // Cập nhật trạng thái `sourceSelected`
    setFormData((prevState) => ({
      ...prevState,
      candidateCvId: selectedCvId ? Number(selectedCvId) : null, // Cập nhật `candidateCvId`
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-lg font-bold text-black">Nộp đơn {job?.title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-bold text-black">Chọn CV</label>
                <select
                  id="cvSelect"
                  className="bg-white border border-gray-400 text-black text-sm rounded-lg block w-full p-2.5"
                  onChange={handleOptionChange}
                  value={sourceSelected}
                >
                  <option value="" disabled>Chọn CV từ danh sách</option>
                  {cvList &&
                    cvList.map((cv) => (
                      <option key={cv.candidateCvId} value={cv.candidateCvId}>
                        {cv.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="coverLetter" className="block mb-2 text-sm font-bold text-black">
                  Thư xin việc
                </label>
                <textarea
                  id="coverLetter"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-400"
                  placeholder="Nhập thư xin việc"
                  value={formData.coverLetter}
                  onChange={handleChange}
                />
                {errors.coverLetter && <span className="text-red-500 text-sm">{errors.coverLetter}</span>}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Nộp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobForm;
