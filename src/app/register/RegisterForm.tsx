"use client";

import React, { useState } from "react";
import {
  CandidateCreateBodyType,
  RegisterAccountBodyType,
} from "@/app/schemaValidations/candidate.schema";
import authApiRequest from "@/app/apiRequest/auth";
import candidateApiRequest from "@/app/apiRequest/candidate";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    birthday: "",
    avatar: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const {
      username,
      password,
      fullName,
      email,
      phone,
      address,
      birthday,
    } = formData;
    const formErrors: { [key: string]: string } = {};

    if (!username) formErrors.userName = "Tên người dùng không được để trống.";
    if (!password || password.length < 3)
      formErrors.password = "Mật khẩu phải có ít nhất 3 ký tự.";
    if (!fullName) formErrors.fullName = "Tên không được để trống.";
    if (!email) formErrors.email = "Email không được để trống.";
    if (!phone) formErrors.phone = "Số điện thoại không được để trống.";
    if (!address) formErrors.address = "Địa chỉ không được để trống.";

    // if (!gender) formErrors.gender = "Giới tính không được để trống.";
    if (birthday === null)
      formErrors.birthday = "Ngày sinh không được để trống.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Click DK");

    if (validateForm()) {
      try {
        const accountData: RegisterAccountBodyType = {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: 3,
        };

        const response = await authApiRequest.register(accountData);

        const CandidateData: CandidateCreateBodyType = {
          fullName: formData.fullName,
          address: formData.address,
          gender: true,
          phone: formData.phone,
          birthday: formData.birthday,
          avatar: formData.avatar, // Default avatar is null
          username: formData.username,
        };

        const result = await candidateApiRequest.createCandidate(CandidateData);
        // const customer = await customerApiRequest.customerClient(
        //   response.payload.data.username
        // );
        // console.log("candidate: ", candidate);
        await authApiRequest.auth({
          sessionToken: response.payload.data.token,
          username: response.payload.data.username,
          userId: response.payload.data.userId,
        });

        Alert.success("Thành công!", result.payload.message);
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Error creating candidate:", error);
        Alert.error("Lỗi!", "Đã xảy ra lỗi khi tạo khách hàng.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="flex sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="sm:w-full sm:max-w-sm bg-white rounded-lg shadow-md p-8 space-y-4">
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng Ký Tài Khoản
          </h2>
          
          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Họ và tên
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Tên người dùng
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="username123"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Địa chỉ email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Địa chỉ
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="123 Đường ABC"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0901234567"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Giới tính
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
                <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                  Tải ảnh đại diện (tuỳ chọn)
                </label>
                <div className="w-2/3">
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 file:py-2 file:px-4 file:border-0 
                              file:rounded-md file:bg-gray-200 file:text-gray-800 
                              hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
                              rounded-lg shadow-sm transition duration-150 ease-in-out"
                  />
                </div>
              </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900 w-1/3">
                Ngày sinh (tuỳ chọn)
              </label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                className="block w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.birthday && (
                <span className="text-red-500 text-sm">{errors.birthday}</span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng Ký
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Đăng nhập
            </a>
          </p>
        </div>

        <div className="hidden sm:block sm:w-1/2">
        <img
            alt="Your Company"
            src="/images/logoRegister.jpg"
            className="mx-auto h-[700px] w-500" // Sử dụng h-[600px] để chiều cao logo bằng chiều cao của form
          />
        </div>
      </div>
    </div>
  );
}
