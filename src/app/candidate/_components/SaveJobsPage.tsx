import Link from 'next/link';

export default function SaveJobsPage() {
  return (
      <div className="relative flex min-h-screen flex-col bg-gray-50 p-6 sm:p-12">
          {/* Di chuyển phần sắp xếp lên trên */}
          <div className="flex items-center mb-6 ml-14">
              <span className="text-sm text-gray-600 mr-auto">Công việc đã lưu (3)</span>
          </div>

          {/* Thêm div này để căn giữa hai cột */}
          <div className="flex justify-center">
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-screen-xl">
                  {/* Cột công việc */}
                  <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col gap-4 p-6 rounded-md">
                      {/* Công việc 1 */}
                      <Link href="/jobs/1" className="flex justify-between items-start border border-gray-300 p-4 rounded-md transition hover:shadow-lg">
                          <div className="flex flex-col">
                              <span className="text-purple-800 text-sm">Engineering</span>
                              <h3 className="font-bold mt-px">Senior Full Stack Backend Engineer</h3>
                              <div className="flex items-center gap-3 mt-2">
                                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                                  <span className="text-slate-600 text-sm flex gap-1 items-center">
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                      >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      Remote, UK
                                  </span>
                              </div>
                          </div>
                          <div className="flex items-center mt-4">
                              <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
                                  Apply Now
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                  >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                              </button>
                          </div>
                      </Link>

                      {/* Công việc 2 */}
                      <Link href="/jobs/1" className="flex justify-between items-start border border-gray-300 p-4 rounded-md mt-4 transition hover:shadow-lg">
                          <div className="flex flex-col">
                              <h3 className="font-bold mt-px">Junior Backend Developer</h3>
                              <div className="flex items-center gap-3 mt-2">
                                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                                  <span className="text-slate-600 text-sm flex gap-1 items-center">
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                      >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      Remote, USA
                                  </span>
                              </div>
                          </div>
                          <div className="flex items-center mt-4">
                              <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
                                  Apply Now
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                  >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                              </button>
                          </div>
                      </Link>

                      {/* Công việc 3 */}
                      <Link href="/jobs/1" className="flex justify-between items-start border border-gray-300 p-4 rounded-md mt-4 transition hover:shadow-lg">
                          <div className="flex flex-col">
                              <h3 className="font-bold mt-px">Frontend Developer</h3>
                              <div className="flex items-center gap-3 mt-2">
                                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Part-time</span>
                                  <span className="text-slate-600 text-sm flex gap-1 items-center">
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                      >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      On-site, Canada
                                  </span>
                              </div>
                          </div>
                          <div className="flex items-center mt-4">
                              <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
                                  Apply Now
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                  >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                              </button>
                          </div>
                      </Link>

                      {/* Bạn có thể thêm nhiều công việc hơn ở đây */}
                  </div>

                  {/* Cột danh sách công việc đề xuất */}
                  <div className="bg-white shadow-xl shadow-gray-100 w-full max-w-xs p-6 rounded-md">
                      <h2 className="text-lg font-semibold text-purple-800 mb-4">Đề xuất công việc</h2>
                      <ul className="space-y-4">
                          <li className="border-b pb-2">
                              <Link href="/jobs/frontend-developer" className="hover:underline">
                                  <h4 className="font-bold">Frontend Developer</h4>
                                  <p className="text-slate-600 text-sm">Remote, US</p>
                                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Part-time</span>
                              </Link>
                          </li>
                          <li className="border-b pb-2">
                              <Link href="/jobs/ui-ux-designer" className="hover:underline">
                                  <h4 className="font-bold">UI/UX Designer</h4>
                                  <p className="text-slate-600 text-sm">On-site, Canada</p>
                                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/jobs/devops-engineer" className="hover:underline">
                                  <h4 className="font-bold">DevOps Engineer</h4>
                                  <p className="text-slate-600 text-sm">Remote, UK</p>
                                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  );
}
