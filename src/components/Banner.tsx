export default function Banner() {
    return (
        <div>
            {/* <!-- ====== CTA Section Start --> */}
            <div
                className="text-xs relative z-10 overflow-hidden py-10 lg:py-[50px]"
                style={{ backgroundColor: '#6699FF' }} // Thay đổi màu banner thành xanh lá cây
            >
                <div className="container mx-auto">
                    <div className="relative overflow-hidden">
                        <div className="flex flex-wrap items-stretch -mx-4">
                            <div className="w-full px-4">
                                <div className="mx-auto max-w-[570px] text-center">
                                    <h2
                                        className="mb-2.5 text-xl font-bold text-white md:text-[38px] md:leading-[1.44]"
                                    >
                                        <span className="text-3xl" > Bạn đang tìm kiếm 1 công việc?</span>
                                        <p></p>
                                        <span className="text-3xl"> Bắt đầu ngay bây giờ </span>
                                    </h2>

                                    {/* Form tìm kiếm */}
                                    <form className="mb-6 flex justify-center">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm công việc..."
                                            className="rounded-l-md p-3 text-black border border-gray-300 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-[#0BB489] text-white font-medium px-6 py-3 rounded-r-md hover:bg-[#0A9C7F]"
                                        >
                                            Tìm kiếm
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="absolute top-0 left-0">
                        <svg
                            width="495"
                            height="470"
                            viewBox="0 0 495 470"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="55"
                                cy="442"
                                r="138"
                                stroke="white"
                                strokeOpacity="0.04"
                                strokeWidth="50"
                            />
                            <circle
                                cx="446"
                                r="39"
                                stroke="white"
                                strokeOpacity="0.04"
                                strokeWidth="20"
                            />
                            <path
                                d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
                                stroke="white"
                                strokeOpacity="0.08"
                                strokeWidth="12"
                            />
                        </svg>
                    </span>
                    <span className="absolute bottom-0 right-0">
                        <svg
                            width="493"
                            height="470"
                            viewBox="0 0 493 470"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="462"
                                cy="5"
                                r="138"
                                stroke="white"
                                strokeOpacity="0.04"
                                strokeWidth="50"
                            />
                            <circle
                                cx="49"
                                cy="470"
                                r="39"
                                stroke="white"
                                strokeOpacity="0.04"
                                strokeWidth="20"
                            />
                            <path
                                d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
                                stroke="white"
                                strokeOpacity="0.06"
                                strokeWidth="13"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
