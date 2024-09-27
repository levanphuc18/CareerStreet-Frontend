import Link from "next/link";

type Job = {
  jobId: number;
  companyName: string;
  title: string;
  address: string;
  salary: string;
};

export default function HomePage() {
  // Danh sách công việc mẫu
  const jobList: Job[] = [
    {
      jobId: 1,
      companyName: "Công Ty ABC",
      title: "Lập Trình Viên",
      address: "Hà Nội",
      salary: "20,000,000 VND",
    },
    {
      jobId: 2,
      companyName: "Công Ty XYZ",
      title: "Kỹ Sư Phần Mềm",
      address: "Hồ Chí Minh",
      salary: "25,000,000 VND",
    },
    {
      jobId: 3,
      companyName: "Công Ty 123",
      title: "Quản Trị Hệ Thống",
      address: "Đà Nẵng",
      salary: "18,000,000 VND",
    },
  ];

  return (
    <div
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[40px]"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mb-7 max-w-[485px] text-left">
              <h2 className="mb-3 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Việc làm hấp dẫn
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {jobList.map((job, index) => (
            <div
              key={index}
              className="w-full px-4 sm:w-1/2 lg:w-1/3 xl:w-1/3 relative mb-6"
            >
              <Link href={`/jobs/${job.jobId}`}>
                <div className="block bg-white group rounded-xl shadow-testimonial dark:bg-dark dark:shadow-none relative border border-yellow-900 rounded-lg cursor-pointer">
                  <div className="flex">
                    <div className="flex-shrink-0 p-4">
                      <img
                        src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-01.png"
                        alt="team image"
                        className="h-[60px] w-[60px] rounded-full"
                      />
                    </div>
                    <div className="flex-1 p-4 mx-2 min-w-0">
                      <div className="text-left">
                        <p className="text-xs mb-2 text-base font-semibold text-dark dark:text-black truncate" title={job.companyName}>
                          Công Ty: <span className="text-xs font-normal">{job.companyName}</span>
                        </p>
                        <p className="text-xs mb-2 text-base font-semibold text-dark dark:text-black truncate" title={job.title}>
                          Vị Trí: <span className="text-xs font-normal">{job.title}</span>
                        </p>
                        <p className="text-xs mb-2 text-base font-semibold text-dark dark:text-black truncate" title={job.address}>
                          Địa Chỉ: <span className="text-xs font-normal">{job.address}</span>
                        </p>
                        <p className="text-xs mb-2 text-base font-semibold text-dark dark:text-violet-400 truncate" title={job.salary}>
                          Mức Lương: <span className="text-xs font-normal">{job.salary}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
