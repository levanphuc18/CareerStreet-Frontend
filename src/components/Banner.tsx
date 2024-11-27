import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface BannerProps {
  onSearch: (searchTerm: string) => void;
}

export default function Banner({ onSearch }: BannerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10" />

      <div className="relative z-10 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">Bạn đang tìm kiếm</span>
            <span className="block bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
              công việc mơ ước?
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-100 sm:text-2xl">
            Khám phá hàng ngàn cơ hội việc làm hấp dẫn
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
            <div className="flex rounded-full bg-white/10 p-1 backdrop-blur-lg">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm công việc, vị trí, công ty..."
                  className="w-full rounded-full bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="ml-2 rounded-full bg-blue-600 px-8 py-4 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-gray-300">Tìm kiếm phổ biến:</span>
            {['java Developer', 'UI/UX Designer', 'Product Manager'].map((term) => (
              <button
                key={term}
                onClick={() => onSearch(term)}
                className="rounded-full bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-lg transition-all hover:bg-white/20"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 -translate-x-1/2 transform">
        <div className="h-48 w-48 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/2 transform">
        <div className="h-48 w-48 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl" />
      </div>
    </div>
  );
}