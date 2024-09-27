import Link from 'next/link';

export default function CvsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 p-6 sm:p-12">
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-screen-xl">
          {/* Cột danh sách file CV */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col gap-4 p-6 rounded-md">
            {/* CV 1 */}
            <Link href="cvs/cv1" className="flex justify-between items-start bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <h3 className="font-bold mt-px">CV của Nguyễn Văn A</h3>
            <p className="text-slate-600 text-sm">Kinh nghiệm: 5 năm phát triển web</p>
          </div>
          <div className="flex items-center mt-4">
            <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
              Xem CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </Link>

        {/* CV 2 */}
        <Link href="cvs/cv2" className="flex justify-between items-start bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <h3 className="font-bold mt-px">CV của Trần Thị B</h3>
            <p className="text-slate-600 text-sm">Kinh nghiệm: 3 năm thiết kế UX/UI</p>
          </div>
          <div className="flex items-center mt-4">
            <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
              Xem CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </Link>

        {/* CV 3 */}
        <Link href="cvs/cv3" className="flex justify-between items-start bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <h3 className="font-bold mt-px">CV của Lê Văn C</h3>
            <p className="text-slate-600 text-sm">Kinh nghiệm: 4 năm phát triển backend</p>
          </div>
          <div className="flex items-center mt-4">
            <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
              Xem CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </Link>

            {/* Thêm nhiều CV hơn ở đây */}
          </div>

          {/* Cột danh sách công việc đề xuất */}
          <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xs p-6 rounded-md">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Đề xuất công việc
            </h2>
            <ul className="space-y-4">
              <li className="border-b pb-2">
                <Link href="/jobs/frontend-developer" className="hover:underline">
                  <h4 className="font-bold">Frontend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, US</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Part-time
                  </span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link href="/jobs/ui-ux-designer" className="hover:underline">
                  <h4 className="font-bold">UI/UX Designer</h4>
                  <p className="text-slate-600 text-sm">Hybrid, Canada</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link href="/jobs/devops-engineer" className="hover:underline">
                  <h4 className="font-bold">DevOps Engineer</h4>
                  <p className="text-slate-600 text-sm">On-site, UK</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </Link>
              </li>
              <li className="border-b pb-2">
                <Link href="/jobs/backend-developer" className="hover:underline">
                  <h4 className="font-bold">Backend Developer</h4>
                  <p className="text-slate-600 text-sm">Remote, Australia</p>
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    Full-time
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  }
