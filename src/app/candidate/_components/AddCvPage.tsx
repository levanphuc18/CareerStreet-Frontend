export default function AddCvPage() {
  return (
    <>
      {/* Form thêm CV */}
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[800px] bg-white p-6 border border-gray-300 rounded-lg">
          <form className="grid grid-cols-2 gap-6">
            {/* Contact Information */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Contact Information
            </h2>
            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="name"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="Lê Văn Phúc"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="phone"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                defaultValue="0814201800"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="email"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                E-mail:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue="levanphuc181101@gmail.com"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="address"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Address:
              </label>
              <input
                type="text"
                name="address"
                id="address"
                defaultValue="Thủ Đức, Thu Duc City, Ho Chi Minh, Viet Nam"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Education and Languages */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Education / Languages
            </h2>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="schoolName"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                School Name (Highest Degree):
              </label>
              <input
                type="text"
                name="schoolName"
                id="schoolName"
                defaultValue="Post & Telecommunications Institute and Technology - Southern"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="foreignLanguage"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Foreign Language:
              </label>
              <input
                type="text"
                name="foreignLanguage"
                id="foreignLanguage"
                defaultValue="English - Intermediate"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Work Experience */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Work Experience
            </h2>

            <div className="col-span-2 mb-5 border p-4 rounded-md">
              <label
                htmlFor="workExperience"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Total Work Experience:
              </label>
              <input
                type="text"
                name="workExperience"
                id="workExperience"
                defaultValue="0 year"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Career Objective */}
            <h2 className="col-span-2 text-xl font-semibold mb-5 text-[#07074D] border-b pb-2">
              Career Objective
            </h2>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="desiredJobTitle"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Desired Job Title:
              </label>
              <input
                type="text"
                name="desiredJobTitle"
                id="desiredJobTitle"
                defaultValue="Java Backend"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="currentSalary"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Current Salary:
              </label>
              <input
                type="text"
                name="currentSalary"
                id="currentSalary"
                defaultValue="1,000,000 VND"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="preferenceSalary"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Preference Salary:
              </label>
              <input
                type="text"
                name="preferenceSalary"
                id="preferenceSalary"
                defaultValue="1,000,000 VND - 5,000,000 VND"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="desiredCareerLevel"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Desired Career Level:
              </label>
              <input
                type="text"
                name="desiredCareerLevel"
                id="desiredCareerLevel"
                defaultValue="New Entry"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="positionType"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Position Type:
              </label>
              <input
                type="text"
                name="positionType"
                id="positionType"
                defaultValue="Full-time"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 border p-4 rounded-md">
              <label
                htmlFor="preferredWorkLocation"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Preferred Work Location:
              </label>
              <input
                type="text"
                name="preferredWorkLocation"
                id="preferredWorkLocation"
                defaultValue="Ho Chi Minh - All districts"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Upload File */}
            <div className="mb-5 border p-4 rounded-md col-span-2">
              <label
                htmlFor="resumeUpload"
                className="mb-3 block text-xs font-medium text-[#07074D]"
              >
                Upload Resume:
              </label>
              <input
                type="file"
                name="resumeUpload"
                id="resumeUpload"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
