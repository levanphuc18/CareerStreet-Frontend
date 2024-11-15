/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { EmployerCreateBodyType } from "../schemaValidations/employer.schema";
import employerApiRequest from "../apiRequest/employer";

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
    role: 0,
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
      role,
    } = formData;
    const formErrors: { [key: string]: string } = {};

    if (!username) formErrors.userName = "Tên người dùng không được để trống.";
    if (!password || password.length < 3)
      formErrors.password = "Mật khẩu phải có ít nhất 3 ký tự.";
    if (!fullName) formErrors.fullName = "Tên không được để trống.";
    if (!email) formErrors.email = "Email không được để trống.";
    if (!phone) formErrors.phone = "Số điện thoại không được để trống.";
    if (!address) formErrors.address = "Địa chỉ không được để trống.";
    if (!role) formErrors.role = "Vui lòng chọn vai trò.";

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
          role: formData.role,
        };

        // Bước 1: Đăng ký tài khoản
        const response = await authApiRequest.register(accountData);
        const role = Number(formData.role); // Chuyển từ chuỗi sang số

        // Kiểm tra xem tài khoản đã được tạo thành công
        if (response && response.payload && response.payload.data) {
          // Kiểm tra role để quyết định tạo Employer hoặc Candidate
          if (role === 2) {
            // Nếu chọn vai trò Nhà tuyển dụng
            const EmployerData: EmployerCreateBodyType = {
              fullName: formData.fullName,
              address: formData.address,
              gender: true,
              phone: formData.phone,
              birthday: formData.birthday,
              avatar: formData.avatar, // Default avatar is null
              username: formData.username,
            };

            const resultEmployer = await employerApiRequest.createEmployer(
              EmployerData
            );
            Alert.success("Thành công!", resultEmployer.payload.message);
            router.push("/employer/home");
            router.refresh();
          } else if (role === 3) {
            // Nếu chọn vai trò Ứng viên
            const CandidateData: CandidateCreateBodyType = {
              fullName: formData.fullName,
              address: formData.address,
              gender: true,
              phone: formData.phone,
              birthday: formData.birthday,
              avatar: formData.avatar, // Default avatar is null
              username: formData.username,
            };

            const resultCandidate = await candidateApiRequest.createCandidate(
              CandidateData
            );
            Alert.success("Thành công!", resultCandidate.payload.message);
            router.push("/");
            router.refresh();
          }

          // Bước 2: Đăng nhập ngay sau khi tạo tài khoản thành công
          const loginData = await authApiRequest.login({
            username: formData.username,
            password: formData.password,
          });

          // Bước 3: Xác thực để lưu userId và username
          if (loginData && loginData.payload && loginData.payload.data) {
            await authApiRequest.auth({
              sessionToken: loginData.payload.data.token,
              username: loginData.payload.data.username,
              userId: loginData.payload.data.userId,
            });
          } else {
            Alert.error("Lỗi!", "Đăng nhập không thành công.");
          }
        } else {
          Alert.error("Lỗi!", "Tạo tài khoản không thành công.");
        }
      } catch (response: any) {
        // Hiển thị thông báo lỗi với Alert
        Alert.error("Lỗi!", response.payload.message);
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

          <form
            onSubmit={handleSubmit}
            method="POST"
            className="space-y-6 p-6 bg-white shadow rounded-md"
          >
            <div className="flex items-center space-x-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Họ và tên
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Tên người dùng
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="username123"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Địa chỉ email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Địa chỉ
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="123 Đường ABC"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0901234567"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Giới tính
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Tải ảnh đại diện (tuỳ chọn)
              </label>
              <div className="w-2/3">
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-gray-200 file:text-gray-800 hover:file:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="birthday"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Ngày sinh (tuỳ chọn)
              </label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.birthday && (
                <span className="text-red-500 text-sm">{errors.birthday}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900 w-1/3"
              >
                Vai trò
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-2/3 rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Chọn vai trò</option>
                <option value="3">Ứng viên</option>
                <option value="2">Nhà tuyển dụng</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm">{errors.role}</span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                Đăng Ký
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Đăng nhập
            </a>
          </p>
        </div>

        <div className="hidden sm:block sm:w-1/2">
          <img
            alt="Your Company"
            src="/images/logoRegister.jpg"
            className="mx-auto h-[900px] w-500" // Sử dụng h-[600px] để chiều cao logo bằng chiều cao của form
          />
        </div>
      </div>
    </div>
  );
}
