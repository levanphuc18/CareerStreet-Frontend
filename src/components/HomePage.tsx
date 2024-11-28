"use client";
import Link from "next/link";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useState, useEffect } from "react"; // Thêm useEffect
import { useJobContext } from "@/app/context/JobContext";
import {
  FilterJobListResType,
  Job
} from "@/app/schemaValidations/job.schema";
import Banner from "./Banner";

// hàm dùng để lọc các ký tự
const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
    .replace(/\s+/g, '') // Loại bỏ khoảng trắng (tùy chọn)
    .replace(/-/g, '');  // Loại bỏ dấu gạch ngang
}

export default function HomePage() {
  // Thay đổi 1: Sử dụng jobListContext thay vì jobListContext
  const { jobListContext } = useJobContext();
  const [jobTypes, setJobType] = useState<string[]>([]);
  const [jobRanks, setJobRank] = useState<string[]>([]);

  // Thay đổi 2: Khởi tạo filteredJobs là mảng rỗng
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [filters, setFilters] = useState<FilterJobListResType>({
    title: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "",
    jobRank: "",
    companyName: ""
  });

  // Thay đổi 3: Thêm useEffect để cập nhật filteredJobs khi context thay đổi
  useEffect(() => {
    if (jobListContext) {

      setFilteredJobs(jobListContext);

      const uniqueJobTypes = Array.from(
        new Set(jobListContext.map(job => job.jobType))
      ).filter(Boolean).sort();

      const uniqueJobRanks = Array.from(
        new Set(jobListContext.map(job => job.jobRank))
      ).filter(Boolean).sort();

      setJobType(uniqueJobTypes);
      setJobRank(uniqueJobRanks);

    }
  }, [jobListContext]);

  // Thay đổi 4: Cập nhật điều kiện loading
  if (!jobListContext) {
    return <div className="text-center text-red-500">Đang tải dữ liệu...</div>;
  }

  const jobsPerPage = 15;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    currentPage * jobsPerPage,
    (currentPage + 1) * jobsPerPage
  );

  // Thay đổi 5: Thêm xử lý filter thực tế
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));

    // Thay đổi 6: Thêm logic lọc trực tiếp
    const newFilters = {
      ...filters,
      [name]: value,
    };

    // Nếu tất cả các job filter đều trống, hiển thị tất cả các jobs
    const hasAtiveFilter = Object.values(newFilters).some(filters => filters !== "");

    if (!hasAtiveFilter) {
      setFilteredJobs(jobListContext);
      return;
    }

    const filtered = jobListContext.filter((job) => {
      return (
        (!newFilters.title ||
          normalizeString(job.title).includes(normalizeString(newFilters.title))) &&
        (!newFilters.location ||
          normalizeString(job.jobLocation).includes(normalizeString(newFilters.location))) &&
        (!newFilters.salaryMin || job.salary >= parseInt(newFilters.salaryMin)) &&
        (!newFilters.salaryMax || job.salary <= parseInt(newFilters.salaryMax)) &&
        (!newFilters.jobType || job.jobType === newFilters.jobType) &&
        (!newFilters.jobRank || job.jobRank === newFilters.jobRank) &&
        (!newFilters.companyName || 
          normalizeString(job.companyName).includes(normalizeString(newFilters.companyName)))
      );
    });

    setFilteredJobs(filtered);
    setCurrentPage(0);
  };



  // Hàm dùng để reset jobs
  const handleResetFilters = () => {
    setFilters({
      title: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      jobType: "",
      jobRank: "",
      companyName: ""
    });
    setFilteredJobs(jobListContext);
    setCurrentPage(0);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm tìm kiếm bên banner 

  // Sửa lại hàm handleBannerSearch để giống với handleFilterChange
  const handleBannerSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
  
      const searchTerms = searchTerm.split(',').map(term => term.trim());
  
      const filtered = jobListContext.filter(job => {
        return searchTerms.some(term => {
          const normalizedTerm = normalizeString(term);
          
          const matchTitle = normalizeString(job.title).includes(normalizedTerm);
          const matchLocation = normalizeString(job.jobLocation).includes(normalizedTerm);
          const matchJobType = normalizeString(job.jobType).includes(normalizedTerm);
          const matchCompany = normalizeString(job.companyName).includes(normalizedTerm); // Thêm dòng này
  
          return matchTitle || matchLocation || matchJobType || matchCompany;
        });
      });
  
      const newFilters = { ...filters };
      
      searchTerms.forEach(term => {
        const normalizedTerm = normalizeString(term);
  
        const matchingJobs = jobListContext.filter(job => {
          const matchTitle = normalizeString(job.title).includes(normalizedTerm);
          const matchLocation = normalizeString(job.jobLocation).includes(normalizedTerm);
          const matchJobType = normalizeString(job.jobType).includes(normalizedTerm);
          const matchCompany = normalizeString(job.companyName).includes(normalizedTerm); // Thêm dòng này
  
          if (matchJobType) newFilters.jobType = job.jobType;
          else if (matchLocation) newFilters.location = job.jobLocation;
          else if (matchCompany) newFilters.companyName = job.companyName; // Thêm dòng này
          else if (matchTitle) newFilters.title = term;
  
          return matchTitle || matchLocation || matchJobType || matchCompany;
        });
  
        if (matchingJobs.length === 0) {
          newFilters.title = term;
        }
      });
  
      setFilters(newFilters);
      setFilteredJobs(filtered);
      document.getElementById('jobList')?.scrollIntoView({ behavior: 'smooth' });
  
    } catch (error) {
      console.error('Lỗi search jobs:', error);
    } finally {
      setLoading(false);
      setCurrentPage(0);
    }
  };
  return (
    <>
      <Banner onSearch={handleBannerSearch} />
      <div id="jobList" className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-12 pt-20 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          {/* Search Results */}
          {filters.title && (
            <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
              <span className="font-medium">Kết quả tìm kiếm cho {filters?.title}:</span> {filteredJobs?.length} công việc
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Bộ lọc tìm kiếm
                  </h3>
                  <button
                    onClick={handleResetFilters}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  >
                    Đặt lại
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Filter Inputs */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      value={filters.title}
                      onChange={handleFilterChange}
                      placeholder="Tiêu đề công việc"
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="Địa điểm"
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="salaryMin"
                        value={filters.salaryMin}
                        onChange={handleFilterChange}
                        placeholder="Lương tối thiểu"
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                      />
                      <input
                        type="number"
                        name="salaryMax"
                        value={filters.salaryMax}
                        onChange={handleFilterChange}
                        placeholder="Lương tối đa"
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                      />
                    </div>

                    <select
                      name="jobType"
                      value={filters.jobType}
                      onChange={handleFilterChange}
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <option value="">Loại hình công việc</option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    <select
                      name="jobRank"
                      value={filters.jobRank}
                      onChange={handleFilterChange}
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <option value="">Cấp bậc</option>
                      {jobRanks.map((rank) => (
                        <option key={rank} value={rank}>{rank}</option>
                      ))}
                    </select>

                    {/* Thêm input này vào phần Filter Inputs */}
                    <input
                      type="text"
                      name="companyName"
                      value={filters.companyName}
                      onChange={handleFilterChange}
                      placeholder="Tên công ty"
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job List */}
            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : currentJobs.length === 0 ? (
                <div className="rounded-lg bg-white p-8 text-center text-gray-500 dark:bg-gray-800">
                  Không tìm thấy công việc phù hợp
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {currentJobs.map((job) => (
                    <Link key={job.jobId} href={`/jobs/${job.jobId}`}>
                      <div className="group h-full overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800">
                        <div className="flex items-start gap-4">
                          <img
                            src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-01.png"
                            alt="company logo"
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 space-y-2">
                            <h3 className="line-clamp-2 font-medium text-gray-900 group-hover:text-blue-600 dark:text-white">
                              {job.title}
                            </h3>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {job.companyName}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                  {job.jobLocation}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                  {job.salary ? `${job.salary.toLocaleString()} VNĐ` : "Thương lượng"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600"
                >
                  <AiOutlineLeft className="mr-2" size={16} />
                  Trang trước
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Trang {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600"
                >
                  Trang sau
                  <AiOutlineRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
