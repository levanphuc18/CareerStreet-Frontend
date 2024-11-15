"use client"
import { useCandidateContext } from "@/app/context/CandidateContext";

export default function AccountPage(){
  const {candidateContext} = useCandidateContext();
  return (
    <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-0">
      <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
        <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">
          CareerStreet
        </p>
        <div className="block lg:hidden sticky inset-0">
          <button
            id="menu-toggle"
            className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-yellow-600 appearance-none focus:outline-none"
          >
            <svg
              className="fill-current h-3 float-right"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>
        <div
          className="w-full sticky inset-0 hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
          style={{ top: "6em" }}
          id="menu-content"
        >
          <ul className="list-reset py-2 md:py-0">
            <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-yellow-600">
              <a
                href="#section1"
                className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600"
              >
                <span className="pb-1 md:pb-0 text-sm">Thông tin cá nhân</span>
              </a>
            </li>
            <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
              <a
                href="#section2"
                className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600"
              >
                <span className="pb-1 md:pb-0 text-sm">Đổi mật khẩu</span>
              </a>
            </li>

            <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
              <a
                href="#section6"
                className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600"
              >
                <span className="pb-1 md:pb-0 text-sm">Thoát</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <!--Section container--> */}
      <section className="w-full lg:w-4/5">
        {/* <!--Title--> */}
        <h1 className="text-gray-700 text-xl lg:text-2xl font-bold px-4 mt-12 lg:mt-0">
          Hồ sơ
        </h1>

        {/* <!--divider--> */}
        <hr className="bg-gray-300 my-8 lg:my-12" />

        {/* <!--Title--> */}
        <h2 id="section1" className="text-gray-700 text-xl font-bold px-4 pb-6">
          Thông tin cá nhân
        </h2>

        {/* <!--Card--> */}
        {/* <!--Card--> */}
        <div className="p-6 lg:p-8 mt-6 lg:mt-8 rounded-lg shadow-lg bg-white flex flex-col md:flex-row">
          {/* Avatar Container */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-01.png"
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-yellow-700 bg-gray-200 border border-gray-300 rounded-md px-4 py-2 flex items-center justify-center"
            >
              <span>Upload Avatar</span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-3/4">
            <form>
              {/* Text Field - Full Name */}
              <div className="flex flex-col md:flex-row mb-6">
                <label
                  className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                  htmlFor="my-textfield-name"
                >
                  Họ và tên
                </label>
                <div className="md:w-2/3">
                  <input
                    className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    id="my-textfield-name"
                    value={candidateContext?.fullName}
                    type="text"
                    placeholder="Enter text here"
                  />
                </div>
              </div>

              {/* Text Field - Email */}
              <div className="flex flex-col md:flex-row mb-6">
                <label
                  className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                  htmlFor="my-textfield-email"
                >
                  Email
                </label>
                <div className="md:w-2/3">
                  <input
                    className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    id="my-textfield-email"
                    value="levanphuc@gmail.com"
                    type="email"
                    placeholder="Enter email here"
                  />
                </div>
              </div>

              {/* Drop down field - Gender */}
              <div className="flex flex-col md:flex-row mb-6">
                <label
                  className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                  htmlFor="my-select-gender"
                >
                  Giới tính
                </label>
                <div className="md:w-2/3">
                  <select
                    className="form-select block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    id="my-select-gender"
                      value={candidateContext?.gender ? "1" : "0"} // Sử dụng value từ API
                  >
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </div>
              </div>

              {/* Text Field - Phone Number */}
              <div className="flex flex-col md:flex-row mb-6">
                <label
                  className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                  htmlFor="my-textfield-phone"
                >
                  Số điện thoại
                </label>
                <div className="md:w-2/3">
                  <input
                    className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    id="my-textfield-phone"
                    type="text"
                    value = {candidateContext?.phone}
                    placeholder="Enter phone number here"
                  />
                </div>
              </div>

              {/* Date Field - Ngày sinh */}
              <div className="flex flex-col md:flex-row mb-6">
                <label
                  className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                  htmlFor="birthdate"
                >
                  Ngày sinh
                </label>
                <div className="md:w-2/3">
                  <input
                    className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    id="birthdate"
                    type="date"
                    placeholder="Chọn ngày sinh"
                      value={
                        candidateContext?.birthday ? candidateContext.birthday.slice(0, 10) : ""
                      } // Format date to yyyy-mm-dd
                    readOnly // Nếu bạn muốn chỉ hiển thị mà không cho phép thay đổi
                  />
                </div>
              </div>

              {/* Text Area - Address */}
              <div className="flex flex-col md:flex-row mb-6">
                <label
                  className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                  htmlFor="my-textarea"
                >
                  Địa chỉ
                </label>
                <div className="md:w-2/3">
                  <textarea
                    className="form-textarea block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                    id="my-textarea"
                      value={candidateContext?.address}
                    rows={2}
                    placeholder="Enter details here"
                  ></textarea>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  className="shadow bg-yellow-700 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white font-bold py-2 px-4 rounded-md"
                  type="button"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <!--/Card--> */}

        {/* SECTION 2 */}
        {/* <!--divider--> */}
        <hr className="bg-gray-300 my-8 lg:my-12" />

        {/* <!--Title--> */}
        <h2 id="section2" className="text-gray-700 text-xl font-bold px-4 pb-6">
          Đổi mật khẩu
        </h2>

        {/* <!--Card--> */}
        <div className="p-6 lg:p-8 mt-6 lg:mt-8 rounded-lg shadow-lg bg-white">
          <form>
            {/* Text Field */}
            <div className="flex flex-col md:flex-row mb-6">
              <label
                className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                htmlFor="my-textfield"
              >
                Mật khẩu cũ
              </label>
              <div className="md:w-2/3">
                <input
                  className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  id="my-textfield"
                  type="text"
                  placeholder="Nhập mật khẩu cũ"
                />
              </div>
            </div>

            {/* Text Field */}
            <div className="flex flex-col md:flex-row mb-6">
              <label
                className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                htmlFor="my-textfield"
              >
                Mật khẩu mới
              </label>
              <div className="md:w-2/3">
                <input
                  className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  id="my-textfield"
                  type="text"
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
            </div>

            {/* Text Field */}
            <div className="flex flex-col md:flex-row mb-6">
              <label
                className="text-gray-600 font-bold mb-2 md:mb-0 md:w-1/3 pr-4"
                htmlFor="my-textfield"
              >
                Nhập lại mật khẩu mới
              </label>
              <div className="md:w-2/3">
                <input
                  className="form-input block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  id="my-textfield"
                  type="text"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                className="shadow bg-yellow-700 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white font-bold py-2 px-4 rounded-md"
                type="button"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {/* <!--/Card--> */}

        {/* SECTION 3 */}
        {/* <!--divider--> */}
        {/* <hr className="bg-gray-300 my-8 lg:my-12" /> */}
      </section>
    </div>
  );
}
