"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import Alert from "@/components/Alert";
// import { CvCreateBodyType } from "../../schemaValidations/cv.schema";

import { BlogCreateBodyType } from "@/app/schemaValidations/blog.schema";
import blogApiRequest from "@/app/apiRequest/blog";

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    date: "",
    origin: "",
    admin_id: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [cookies] = useCookies(["userId"]); // Nhận cookie

  // Sử dụng useEffect để lấy userId từ cookie khi component được render
  useEffect(() => {
    const userId = cookies.userId; // Lấy giá trị userId từ cookie
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        candidate_id: Number(userId), // Gán giá trị userId cho candidate_id
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

  const validateForm = () => {
    const { title } = formData;

    const formErrors: { [key: string]: string } = {};

    // Kiểm tra từng trường
    if (!title) formErrors.fullName = "Tiêu đề không được để trống.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Click Create Blog");

    if (validateForm()) {
      try {
        const BlogData: BlogCreateBodyType = {
          author: formData.author,
          title: formData.title,
          content: formData.content,
          date: formData.date,
          origin: formData.origin,
          admin_id: 5,
        };

        const result = await blogApiRequest.createBlog(BlogData);

        Alert.success("Thành công!", result.payload.message);
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Error creating candidate:", error);
        Alert.error("Lỗi!", "Đã xảy ra lỗi khi tạo Blog.");
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
            {/* Blog Information */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Blog Information
            </h2>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="author"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Author:
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.author && (
                <span className="text-red-500 text-sm">{errors.author}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="title"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Title:
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Blog Title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>

            <div className="col-span-2 mb-5 border p-4 rounded-md">
              <label
                htmlFor="content"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Content:
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Blog Content"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                rows={6}
              ></textarea>
              {errors.content && (
                <span className="text-red-500 text-sm">{errors.content}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="date"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Date:
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">{errors.date}</span>
              )}
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="origin"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Origin:
              </label>
              <input
                id="origin"
                name="origin"
                type="text"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Origin of the Blog"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.origin && (
                <span className="text-red-500 text-sm">{errors.origin}</span>
              )}
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
