"use client"; // Đánh dấu đây là Client Component

import React, { useState } from 'react';

// Định nghĩa interface cho props
interface ApplyJobFormProps {
  isOpen: boolean;  // Thêm thuộc tính isOpen
  onClose: () => void;
}

const ApplyJobForm: React.FC<ApplyJobFormProps> = ({ isOpen, onClose }) => {
  const [fileSelected, setFileSelected] = useState<File | null>(null); // Lưu thông tin file đã chọn
  const [sourceSelected, setSourceSelected] = useState<string>(''); // Lưu nguồn CV đã chọn

  // Hàm xử lý khi chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file đã chọn
    if (file) {
      setFileSelected(file); // Đánh dấu đã chọn file
      setSourceSelected('');  // Reset nguồn CV đã chọn, để chỉ chọn file
    }
  };

  // Hàm xử lý khi chọn nguồn CV
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSource = event.target.value;
    setSourceSelected(selectedSource); // Cập nhật nguồn CV đã chọn
    setFileSelected(null); // Reset file đã chọn, chỉ sử dụng nguồn CV
  };

  if (!isOpen) return null; // Nếu modal không mở, không hiển thị gì

  return (
    <>
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-lg font-bold text-black">
                Nộp đơn IT Security Manager
              </h3>
              <button
                type="button"
                onClick={onClose} // Đóng modal khi nhấn nút này
                className="text-gray-600 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
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
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form className="p-4">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-bold text-black"
                  >
                    Le Van Phuc
                    <p className="text-black">levanphuc@gmail.com</p>
                  </label>
                </div>

                {/* Chọn CV */}
                <div className="col-span-2">
                  <label
                    htmlFor="resume"
                    className="block mb-2 text-sm font-bold text-black"
                  >
                    Chọn hồ sơ
                  </label>

                  {/* Khối chứa viền */}
                  <div className="border border-gray-400 rounded-lg p-4 mb-4 bg-gray-200">
                    {/* Hiển thị dropdown nếu chưa chọn file */}
                    {!fileSelected && (
                      <div className="mb-4">
                        <select
                          id="category"
                          className="bg-white border border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={handleOptionChange}
                          value={sourceSelected} // Đảm bảo dropdown phản ánh trạng thái
                        >
                          <option className='text-center' value="" disabled>
                            Từ CarrerStreet
                          </option>
                          <option className='text-center' value="javaBackend">Java-Backend</option>
                          <option className='text-center' value="nextJsFrontend">NextJs-Frontend</option>
                          <option className='text-center' value="fullStack">Full</option>
                        </select>
                      </div>
                    )}

                    {/* Trường tải hồ sơ từ máy tính */}
                    {sourceSelected === '' && (
                      <div>
                        <input
                          type="file"
                          name="resume"
                          id="resume"
                          className="bg-white border border-gray-400 text-black text-sm rounded-lg block w-full p-2.5"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-bold text-black"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-white border border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-bold text-black"
                  >
                    Thư xin việc
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập thư xin việc"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Nộp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJobForm;
