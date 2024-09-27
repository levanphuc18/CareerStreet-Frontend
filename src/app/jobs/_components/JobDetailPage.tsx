"use client"; // Đánh dấu đây là Client Component
import { MdWork, MdLocationOn, MdAttachMoney, MdHome, MdCalendarToday, MdBookmark } from 'react-icons/md';
import { useState } from 'react';
import ApplyJobForm from './ApplyJobForm';

export default function JobsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý trạng thái modal

    const handleOpenModal = () => {
        setIsModalOpen(true); // Mở modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Đóng modal
    };
    
    return (
        <>
            <div className="flex flex-wrap max-w-6xl mx-auto">
                {/* Cột 1: Job Post */}
                <div className="job-post bg-white shadow-xl shadow-gray-200 w-full md:w-8/12 mr-4"> {/* Thêm margin-right cho cột 1 */}
                    {/* Banner Image */}
                    <div className="banner mb-4 w-full">
                        <img 
                            src="/images/logo.png" // Thay thế URL này bằng URL của hình ảnh banner bạn muốn
                            alt="Banner"
                            className="w-200 h-200"
                        />
                    </div>

                    {/* New Job Post: IT Security Manager */}
                    <div className="job-meta mb-4 mt-8">
                        <h1 className="job-title text-2xl font-bold">IT Security Manager</h1>
                        <span className="job-type bg-teal-500 text-white p-1 text-xs mr-4">
                            <MdWork className="inline mr-1" /> {/* Icon loại công việc */}
                            Full-time
                        </span>
                        
                        <div className="flex items-center mb-2">
                            <MdLocationOn className="mr-2" /> {/* Icon địa điểm */}
                            <p className="job-location">Quận Thanh Xuân, Hà Nội</p>
                        </div>
                        
                        <div className="flex items-center mb-2">
                            <MdAttachMoney className="mr-2" /> {/* Icon tiền */}
                            <p className="job-salary">2,000 USD - 4,000 USD</p>
                        </div>
                        
                        <div className="flex items-center mb-2">
                            <MdHome className="mr-2" /> {/* Icon remote */}
                            <p className="remote-job">Remote Job</p>
                        </div>

                        <span className="flex items-center mb-2">
                            <MdCalendarToday className="mr-2" /> {/* Icon lịch */}
                            Ngày đăng tuyển: <span className="font-bold">25-09-2024</span> | Hết hạn trong: <span className="font-bold">31 Ngày tới</span>
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                        <a 
                            href="#" 
                            className="border border-teal-500 bg-transparent hover:bg-teal-500 hover:text-white text-teal-500 text-center block rounded-full py-2 px-6 transition-colors duration-300"
                            onClick={handleOpenModal} // Gọi hàm mở modal
                        >
                            Nộp đơn ngay
                        </a>
                        <a 
                            href="/candidate/saved" 
                            className="border border-teal-500 bg-transparent hover:bg-teal-500 hover:text-white text-teal-500 text-center block rounded-full py-2 px-4 transition-colors duration-300 flex items-center"
                        >
                            <MdBookmark className="mr-2" />
                            Lưu
                        </a>
                    </div>




                    <div className="job-description mb-4">
                        <h3 className="text-xl font-semibold text-purple-800 mb-4">Mô tả công việc</h3>
                        <ul className="list-disc ml-6 mb-2">
                            <li>Xây dựng kế hoạch/lộ trình đảm bảo An toàn thông tin (ATTT) cho F88 giai đoạn 2024-2026.</li>
                            <li>Triển khai các dự án ATTT để đảm bảo tính bảo mật, tính an toàn vận hành của toàn bộ hệ thống CNTT.</li>
                            <li>Thực hiện các công việc chuyên môn về An toàn thông tin.</li>
                            <li>Quản lý và phát triển năng lực đội ngũ An toàn thông tin.</li>
                        </ul>
                    </div>

                    <div className="job-benefits mb-4">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">Quyền lợi</h3>
                        <ul className="list-disc ml-6">
                            <li>Môi trường làm việc trẻ trung, văn hóa doanh nghiệp hiện đại.</li>
                            <li>Đội ngũ nhân viên trẻ trung, năng động.</li>
                            <li>Cơ hội học hỏi, trải nghiệm và thăng tiến công bằng.</li>
                            <li>Khám sức khỏe, du lịch hàng năm.</li>
                        </ul>
                    </div>

                    <div className="job-skills mb-4">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">Kỹ năng yêu cầu</h3>
                        <ul className="list-disc ml-6">
                            <li>Tốt nghiệp Đại học trở lên chuyên ngành CNTT, ATTT.</li>
                            <li>Tối thiểu 5 năm kinh nghiệm trong lĩnh vực ATTT.</li>
                            <li>Có kiến thức chuyên sâu về Bảo mật, An toàn thông tin, đặc biệt về lĩnh vực Banking - Finance.</li>
                        </ul>
                    </div>

                    <div className="job-contact mb-4">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">Thông tin liên hệ</h3>
                        <p>Tên liên hệ: Phòng Nhân sự</p>
                        <p>Tòa nhà N01A - 275 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội, Viet Nam</p>
                        <p>Ứng viên quan tâm vui lòng gửi hồ sơ trực tuyến qua hệ thống CareerLink.</p>
                    </div>
                </div> {/* end job-post */}

                {/* Cột 2: Đề xuất công việc */}
                <div className="w-full hidden md:block md:w-3/12">
                    <div className="bg-white shadow-xl shadow-gray-200 w-full max-w-xs p-6 rounded-md">
                        <div className="employer-info mb-4 text-center ">
                            <img
                                className="h-40 w-40 inline-block"
                                src="/images/logo.png"
                                alt=""
                            />
                            <a href="#" className="text-sm hover:underline">
                                <h3 className="employer-name text-center">CÔNG TY CỔ PHẦN KINH DOANH F88</h3>
                            </a>
                        </div>
                        <div className="admin-controls text-center text-sm">
                            <div className="company">
                                <a
                                    href="#"
                                    className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1 mr-1"
                                >
                                    Công ty
                                </a>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold text-purple-800 mb-4">
                            Đề xuất công việc
                        </h2>
                        <ul className="space-y-4">
                            <li className="border-b pb-2">
                                <a href="/jobs/frontend-developer" className="hover:underline">
                                    <h4 className="font-bold">Frontend Developer</h4>
                                    <p className="text-slate-600 text-sm">Remote, US</p>
                                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Part-time</span>
                                </a>
                            </li>
                            <li className="border-b pb-2">
                                <a href="/jobs/ui-ux-designer" className="hover:underline">
                                    <h4 className="font-bold">UI/UX Designer</h4>
                                    <p className="text-slate-600 text-sm">Hybrid, Canada</p>
                                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                                </a>
                            </li>
                            <li className="border-b pb-2">
                                <a href="/jobs/devops-engineer" className="hover:underline">
                                    <h4 className="font-bold">DevOps Engineer</h4>
                                    <p className="text-slate-600 text-sm">On-site, UK</p>
                                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                                </a>
                            </li>
                            <li className="border-b pb-2">
                                <a href="/jobs/backend-developer" className="hover:underline">
                                    <h4 className="font-bold">Backend Developer</h4>
                                    <p className="text-slate-600 text-sm">Remote, Australia</p>
                                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Full-time</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> {/* end suggested jobs */}

                {/* Modal Apply Job Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ApplyJobForm isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Truyền isOpen vào đây */}
                </div>
                )}
                
            </div>
        </>
    )
}
